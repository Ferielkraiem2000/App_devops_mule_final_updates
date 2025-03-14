const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    versioningTool: { type: String, required: true },
    hostingType: { type: String, required: true },
    operatingSystem: { type: String, required: false },
    monitoringTool: { type: String, required: false },
    hostingJarTool: { type: String, required: false },
    status: { type: String, required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    repo: { 
      type: String, 
      required: false,
      validate: {
        validator: function(value) {
          return value ? value.endsWith('.zip') : true;
        },
        message: props => `${props.value} is not a valid ZIP file path!`
      }
    }
  },
  { timestamps: true } ); 

module.exports = mongoose.model('Order', OrderSchema);
