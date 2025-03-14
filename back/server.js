const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const connectDB = require('./db');
const User = require('./models/user');
const Order = require('./models/order');
const axios = require('axios');
const dotenv = require('dotenv');
const crypto = require('crypto');
const JWT_SECRET = crypto.randomBytes(64).toString('hex');
const jwt = require('jsonwebtoken');
const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const mongoose = require("mongoose");

console.log("JWT_SECRET:",JWT_SECRET);

app.use(express.json()); 
app.use(cors());
connectDB();
app.post('/signup', async (req, res) => {
    try {
        const { name, companyName,phoneNumber, workEmail, password } = req.body;
        
        if (!name || !companyName || !workEmail || !phoneNumber || !password) {
            return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
        }

        const existingUser = await User.findOne({ workEmail });
        if (existingUser) {
            return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            companyName,
            phoneNumber,
            workEmail,
            password: hashedPassword,
        });

        await newUser.save();

        const { password: _, ...userWithoutPassword } = newUser.toObject();
        res.status(201).json({ message: 'Utilisateur créé avec succès', user: userWithoutPassword });
        console.log('Utilisateur ajouté avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error.message);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log("token",token);
  
  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("userid",decoded)

    req.userId = decoded.id; 
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Invalid token', error: err.message });
  }
};


app.post('/signin', async (req, res) => {
  const { workEmail, password } = req.body;

  if (!workEmail || !password) {
    return res.status(400).json({ message: 'Email et mot de passe sont obligatoires' });
  }

  try {
    const user = await User.findOne({ workEmail });
    const token = jwt.sign(
      { id: user._id, workEmail: user.workEmail },
      JWT_SECRET,
      { expiresIn: '1h' }  
    );
    console.log("**",token)
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    res.status(200).json({
      message: 'Connexion réussie',
      token, 
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

app.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    console.log("req",user) 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

app.put('/update-name', verifyToken, async (req, res) => {
  const { name } = req.body;

  try {
      const user = await User.findById(req.userId);

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      if (name) {
          user.name = name;
          await user.save();
          return res.json({ message: 'Name updated successfully' });
      }

      return res.status(400).json({ message: 'Name is required' });
  } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
  }
});

app.put('/update-password', verifyToken, async (req, res) => {
  const { password } = req.body;

  try {
      const user = await User.findById(req.userId);

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      if (password) {
          const hashedPassword = await bcrypt.hash(password, 10);
          user.password = hashedPassword;
          await user.save();
          return res.json({ message: 'Password updated successfully' });
      }

      return res.status(400).json({ message: 'Password is required' });
  } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
  }
});

app.post('/save-order', async (req, res) => { 
  const { versioningTool, hostingType, operatingSystem, monitoringTool, hostingJarTool, status, customerId } = req.body;

  console.log("Request Body:", req.body);  
    const order = new Order({
      versioningTool,
      hostingType,
      operatingSystem: hostingType === "On-Premises" ? operatingSystem : "Non requis pour CloudHub 2.0",
      monitoringTool: monitoringTool || undefined,  // If no monitoring tool, it won't be added
      hostingJarTool: hostingJarTool || undefined,  // If no hosting jar tool, it won't be added
      status: status || "en attente",  // Default status if not provided
      customerId,
  });
  
  try {
      await order.save();
      res.status(201).send({ message: "Order saved successfully!" });
  } catch (error) {
      console.error("Error saving order:", error);
      res.status(500).send({ message: "Error saving order!" });
  }
});

app.get("/orders", async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("customerId", "name companyName phoneNumber workEmail -_id") 
            .sort({ createdAt: -1 });

        res.json(orders);
        console.log("orders*****", orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
});

app.get("/customer/:customerId", async (req, res) => {
    try {
        const { customerId } = req.params;
        console.log("Fetching customer with ID:", customerId);
        if (!mongoose.Types.ObjectId.isValid(customerId)) {
            return res.status(400).json({ message: "Invalid customer ID format" });
        }
        const customer = await User.findById(customerId);
        console.log("Full customer object:", customer);

        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        const customerName = customer.name; 
        console.log("Extracted customer name:", customerName);
        res.json({ customerName });
    } catch (error) {
        console.error("Error fetching customer:", error);
        res.status(500).json({ message: "Error fetching customer", error: error.message });
    }
});

require("dotenv").config();
// const GITHUBTOKEN = result.parsed.GITHUBTOKEN;
const GITHUBTOKEN=process.env.GITHUBTOKEN; 
app.get('/client-orders/:customerId', verifyToken, async (req, res) => {
  try {
      const { customerId } = req.params; 
      const orders = await Order.find({ customerId }).sort({ createdAt: -1 });

      if (orders.length === 0) {
          return res.status(404).json({ message: 'No orders found for this customer.' });
      }
      res.status(200).json({ orders });
  } catch (err) {
      res.status(500).json({ message: 'Error retrieving order history', error: err.message });
  }
});

// app.post("/accept-order/:id", async (req, res) => {
//   try {
    
//     const { id } = req.params;

//     const order = await Order.findByIdAndUpdate(
//       id,
//       { status: "acceptée" },
//       { new: true }
//     );
    
//     if (!order) {
//       console.error(`Order not found for ID: ${id}`);
//       return res.status(404).json({ message: "Order not found" });
//     }

//     let workflowDispatchUrl = "https://api.github.com/repos/Ferielkraiem2000/Pipelines_Version2/actions/workflows/github-workflow.yml/dispatches";
//     let workflowRunsUrl = `https://api.github.com/repos/Ferielkraiem2000/Pipelines_Version2/actions/runs`;

//     if (
//       (order.versioningTool === "Gitlab" || order.versioningTool === "AzureDevOps") &&
//       order.hostingType === "On-Premises"
//     ) {
//       workflowDispatchUrl = "https://api.github.com/repos/Ferielkraiem2000/V2_PlanB_Azure_Gitlab_ONP/actions/workflows/github-workflow.yml/dispatches";
//       workflowRunsUrl = `https://api.github.com/repos/Ferielkraiem2000/V2_PlanB_Azure_Gitlab_ONP/actions/runs`;
//     }

//     const workflowInputs = {
//       versioningTool: order.versioningTool,
//       hostingType: order.hostingType,
//       monitoringTool: order.monitoringTool,
//       hostingJarTool: order.hostingJarTool,
//     };

//     try {
//       // const postRequestTime = new Date().toISOString();
//       // console.log(new Date(postRequestTime).getTime());
//       //trigger workflow
//       await axios.post(
//         workflowDispatchUrl,
//         {
//           ref: "main",
//           inputs: workflowInputs,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${GITHUBTOKEN}`,
//             Accept: "application/vnd.github.v3+json",
//           },
//         }
//       );

//       let latestRun = null;
//       const maxAttempts = 15;
//       console.log(maxAttempts);
      
//       for (let attempt = 1; attempt <= maxAttempts; attempt++) {
//         console.log(`Checking workflow status, attempt ${attempt}...`);

//         const { data } = await axios.get(workflowRunsUrl, {
//           headers: {
//             Authorization: `Bearer ${GITHUBTOKEN}`,
//             Accept: "application/vnd.github.v3+json",
//           },
//         });

//         latestRun = data.workflow_runs
//           .filter(
//             (run) =>
//               run.head_branch === "main" &&
//               run.status === "completed" &&
//               run.conclusion === "success" &&
//               run.name === "Create Temporary GitHub Repository for Client" 
//               // new Date(run.run_started_at).getTime() >= new Date(postRequestTime).getTime()
//             ).sort((a, b) => new Date(b.run_started_at) - new Date(a.run_started_at))[0];
        
//         console.log("latestRun",latestRun);
//         if (latestRun) {
//           console.log("Workflow completed successfully.");
//         }
//       }
//     const reposUrl = "https://api.github.com/user/repos";
//     const { data: repos } = await axios.get(reposUrl, {
//       headers: {
//         Authorization: `Bearer ${GITHUBTOKEN}`,
//         Accept: "application/vnd.github.v3+json",
//       },
//     });
//     const filteredRepos = repos.filter((repo) => repo.name.includes("temp-repo"));
//     if (filteredRepos.length === 0) {
//       return res.status(404).json({
//         message: "No temporary repository found." + JSON.stringify(latestRun),
//       });
//     }
//     const latestRepo = filteredRepos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
//     const repoUrl = latestRepo.html_url;
//     const updatedOrder = await Order.findByIdAndUpdate(
//       id,
//       { repoUrl },
//       { new: true }
//     );
//     return res.status(200).json({
//       message: "Workflow completed successfully.",
//       repoUrl: updatedOrder.repoUrl,
//     });

//   } catch (error) {
//       console.error("Error during workflow execution:", error.message, error.stack);
//       return res.status(500).json({
//         message: "An error occurred during the workflow execution.",
//         error: error.message,
//       });
//     }
//   } catch (error) {
//     console.error("Error while processing the order:", error.message, error.stack);
//     return res.status(500).json({
//       message: "An error occurred while processing the order.",
//       error: error.message,
//     });
//   }
// });

app.get("/get-config/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(
      id,
      { status: "acceptée" },
      { new: true }
    ).populate("customerId", "name");;
    console.log("order&&&&&!!!!!!!!*****",order.customerId)
    if (!order.versioningTool || !order.hostingType ) {
      return res.status(400).json({ message: "Missing required fields" });
    } 
    if (order.versioningTool && order.hostingType && order.monitoringTool && order.hostingJarTool) {
    if(order.operatingSystem){
    const dirname = "/home/amine/devopsmule";
    const basePath = path.join(dirname, "Pipelines_Version2");
    const configDir = path.join(basePath, order.versioningTool, order.hostingType, order.monitoringTool, order.hostingJarTool);
    // const customerName = order.customerId?.name || "default";
    // const customerFolder = path.join(dirname, customerName);
    // if (!fs.existsSync(customerFolder)) {
    //   fs.mkdirSync(customerFolder, { recursive: true });
    //   console.log(`Folder created: ${customerFolder}`);
    // }

    if (!fs.existsSync(configDir)) {
      return res.status(404).json({ message: "Configuration directory not found" });
    }
    const zipFileName = `pipeline-${order.versioningTool[0]}-${order.hostingType[0]}-${order.monitoringTool[0]}-${order.hostingJarTool[0]}.zip`
    const zipFilePath = path.join(dirname, zipFileName);
    // const clientZipPath = path.join(customerFolder, zipFileName);
    // fs.copyFileSync(zipFilePath, clientZipPath);
    // console.log(`ZIP file saved to: ${clientZipPath}`);    
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver("zip", { zlib: { level: 9 } });
    archive.pipe(output);
    archive.directory(configDir, false);
    await archive.finalize();
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { repo: `https://devopsmule.cweave.fr/api/download-config/${id}` },
      { new: true }
    );

    return res.status(200).json({
      message: "Configuration ZIP created successfully",
      repo: updatedOrder.repo, 
    });
  }
 else{
    const dirname = "/home/amine/devopsmule";
    const basePath = path.join(dirname, "Pipelines_Version2");
    const configDir = path.join(basePath, order.versioningTool, order.hostingType, order.monitoringTool, order.hostingJarTool);
    // const customerName = order.customerId.name;
    // const basePathCustomer = path.join(dirname, customerName); 

    // if (!fs.existsSync(basePathCustomer)) {
    //   fs.mkdirSync(basePath, { recursive: true }); 
    //   console.log(`Dossier créé : ${basePath}`);
    // }
    if (!fs.existsSync(configDir)) {
      return res.status(404).json({ message: "Configuration directory not found" });
    }
    const zipFileName = `pipeline-${order.versioningTool[0]}-${order.hostingType[0]}-${order.monitoringTool[0]}-${order.hostingJarTool[0]}.zip`
    // const zipFileName = "pipeline-mulesoft.zip"
    const zipFilePath = path.join(dirname, zipFileName);
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver("zip", { zlib: { level: 9 } });
    archive.pipe(output);
    archive.directory(configDir, false);
    await archive.finalize();
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { repo: `https://devopsmule.cweave.fr/api/download-config/${id}` },
      { new: true }
    );

    return res.status(200).json({
      message: "Configuration ZIP created successfully",
      repo: updatedOrder.repo, 
    });
  }}
  if (order.versioningTool && order.hostingType && !order.monitoringTool && !order.hostingJarTool) {    
    if(order.operatingSystem){
    const dirname = "/home/amine/devopsmule";
    const basePath = path.join(dirname, "Pipelines_Version1");
    const configDir = path.join(basePath, order.versioningTool, order.hostingType);
    // const customerName = order.customerId.name;
    // const basePathCustomer = path.join(dirname, customerName); 

    // if (!fs.existsSync(basePathCustomer)) {
    //   fs.mkdirSync(basePath, { recursive: true }); 
    //   console.log(`Dossier créé : ${basePath}`);
    // }  
    if (!fs.existsSync(configDir)) {
      return res.status(404).json({ message: "Configuration directory not found" });
    }
    const zipFileName = `pipeline-${order.versioningTool[0]}-${order.hostingType[0]}.zip`
    // const zipFileName = "pipeline-mulesoft.zip"
    const zipFilePath = path.join(dirname, zipFileName);
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver("zip", { zlib: { level: 9 } });
    archive.pipe(output);
    archive.directory(configDir, false);
    await archive.finalize();
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { repo: `https://devopsmule.cweave.fr/api/download-config/${id}` },
      { new: true }
    );

    return res.status(200).json({
      message: "Configuration ZIP created successfully",
      repo: updatedOrder.repo,
    });
  } 
  else{
    const dirname = "/home/amine/devopsmule";
    const basePath = path.join(dirname, "Pipelines_Version1");
    const configDir = path.join(basePath, order.versioningTool, order.hostingType);
   

// //    const basePathCustomer = path.join(dirname, customerName); 
//   //    console.log("pathwithname", basePathCustomer);

//   //  if (!fs.existsSync(basePathCustomer)) {
//    //   fs.mkdirSync(basePath, { recursive: true }); 
//      // console.log(`Dossier créé : ${basePathCustomer}`);
//     //}
    if (!fs.existsSync(configDir)) {
      return res.status(404).json({ message: "Configuration directory not found" });
    }
    const zipFileName = `pipeline-${order.versioningTool[0]}-${order.hostingType[0]}.zip`
    // const zipFileName = "pipeline-mulesoft.zip"
    const zipFilePath = path.join(dirname, zipFileName);
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver("zip", { zlib: { level: 9 } });
    archive.pipe(output);
    archive.directory(configDir, false);
    await archive.finalize();
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { repo: `https://devopsmule.cweave.fr/api/download-config/${id}` },
      { new: true }
    );
    return res.status(200).json({
      message: "Configuration ZIP created successfully",
      repo: updatedOrder.repo,
    });
  }}
}catch (error) {
    console.error("Error retrieving configuration:", error);
    return res.status(500).json({ message: "Error retrieving configuration", error: error.message });
  }
});

app.get("/download-config/:id", async (req, res) => {
  const { id } = req.params;
  const dirname = "/home/amine/devopsmule";
  const order = await Order.findByIdAndUpdate(
    id,
    { status: "acceptée" },
    { new: true }
  ).populate("customerId", "name");;
  console.log("order&&&&&&&&&&&&&&&&&&&&",order.customerId.name)
  if (order.versioningTool && order.hostingType && order.monitoringTool && order.hostingJarTool) {
    if(order.operatingSystem){
        const zipFileName = `pipeline-${order.versioningTool[0]}-${order.hostingType[0]}-${order.monitoringTool[0]}-${order.hostingJarTool[0]}.zip`
        const customerName = order.customerId?.name || "default";
        const customerFolder = path.join(dirname, customerName);        
        if (!fs.existsSync(customerFolder)) {
          fs.mkdirSync(customerFolder, { recursive: true });
          console.log(`Folder created: ${customerFolder}`);
        }
  	const zipFilePath = path.join(dirname, zipFileName);
    const clientZipPath = path.join(customerFolder, zipFileName);
    fs.copyFileSync(zipFilePath, clientZipPath);
    console.log(`ZIP file saved to: ${clientZipPath}`);
  	 if (fs.existsSync(zipFilePath)) {
    		return res.download(zipFilePath);
 	 }  
     }
    else{
    	const zipFileName = `pipeline-${order.versioningTool[0]}-${order.hostingType[0]}-${order.monitoringTool[0]}-${order.hostingJarTool[0]}.zip`
    const customerName = order.customerId?.name || "default";
    const customerFolder = path.join(dirname, customerName);
    if (!fs.existsSync(customerFolder)) {
      fs.mkdirSync(customerFolder, { recursive: true });
      console.log(`Folder created: ${customerFolder}`);
    }

const zipFilePath = path.join(dirname, zipFileName);
const clientZipPath = path.join(customerFolder, zipFileName);
fs.copyFileSync(zipFilePath, clientZipPath);
    	if (fs.existsSync(zipFilePath)) {
      		return res.download(zipFilePath);
    }  
    }}
if (order.versioningTool && order.hostingType && !order.monitoringTool && !order.hostingJarTool) {
  if(order.operatingSystem){
  const zipFileName = `pipeline-${order.versioningTool[0]}-${order.hostingType[0]}.zip`
  // const zipFileName = "pipeline-mulesoft.zip"
  const customerName = order.customerId?.name || "default";
  const customerFolder = path.join(dirname, customerName);
  
  if (!fs.existsSync(customerFolder)) {
    fs.mkdirSync(customerFolder, { recursive: true });
    console.log(`Folder created: ${customerFolder}`);
  }

const zipFilePath = path.join(dirname, zipFileName);
const clientZipPath = path.join(customerFolder, zipFileName);
fs.copyFileSync(zipFilePath, clientZipPath);
  if (fs.existsSync(zipFilePath)) {

    return res.download(zipFilePath);
  }  
 }
 else{
  // const zipFileName = "pipeline-mulesoft.zip"
   const zipFileName = `pipeline-${order.versioningTool[0]}-${order.hostingType[0]}.zip`
   const customerName = order.customerId?.name || "default";
   const customerFolder = path.join(dirname, customerName);
   
   if (!fs.existsSync(customerFolder)) {
     fs.mkdirSync(customerFolder, { recursive: true });
     console.log(`Folder created: ${customerFolder}`);
   }

const zipFilePath = path.join(dirname, zipFileName);
const clientZipPath = path.join(customerFolder, zipFileName);
fs.copyFileSync(zipFilePath, clientZipPath);
   consoloe.log("zipfilename",zipFileName); 
   if (fs.existsSync(zipFilePath)) {
    return res.download(zipFilePath);
  }  
 }
}
  return res.status(404).json({ message: "ZIP file not found" });
}
);

app.put('/cancel-order/:id', async (req, res) => {
  try {
      const { id } = req.params;

      const updatedOrder = await Order.findByIdAndUpdate(
          id,
          { status: "annulée" },
          { new: true }
      );

      if (!updatedOrder) {
          return res.status(404).json({ message: "Commande introuvable" });
      }

      res.status(200).json({
          message: "Commande mise à jour avec succès",
          order: updatedOrder,
      });
  } catch (error) {
      console.error("Erreur lors de l'annulation de la commande :", error);
      res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

app.delete('/orders', async (req, res) => {
  try {
    const result = await Order.deleteMany({});
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No orders found to delete' });
    }
    res.status(200).json({ message: 'All orders deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/users', async (req, res) => {
  try {
      const users = await User.find(); 
      res.status(200).json(users);
  } catch (err) {
      res.status(500).json({ message: 'Error fetching users', error: err });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
      const { id } = req.params;
      // await Order.deleteMany({ "customerId._id": id });
      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (err) {
      res.status(500).json({ message: 'Error deleting user', error: err });
  }
});

module.exports = app;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
