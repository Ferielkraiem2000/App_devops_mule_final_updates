import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  Snackbar,
  IconButton,
  Divider,
  Grid,
  Collapse,
} from "@mui/material";
import { Visibility, VisibilityOff, ExpandMore, ExpandLess } from "@mui/icons-material";
import axios from "axios";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  user: { name: string; workEmail: string };
}

const ProfileModal: React.FC<ProfileModalProps> = ({ open, onClose, user }) => {
  const [newName, setNewName] = useState(user.name);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [openNameSection, setOpenNameSection] = useState(false);
  const [openPasswordSection, setOpenPasswordSection] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordUpdateDisabled, setIsPasswordUpdateDisabled] = useState(false);
  const [showPasswordSectionTitle, setShowPasswordSectionTitle] = useState(false);

  useEffect(() => {
    if (open) {
      setNewName(user.name);
      setNewPassword('');
      setCurrentPassword('');
      setConfirmPassword('');
      setShowPasswordConfirmation(false);
      setOpenPasswordSection(false);
      setPasswordError("");
      setIsPasswordUpdateDisabled(false);
      setShowPasswordSectionTitle(false); 
    }
  }, [open, user]);

  const validatePassword = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas.");
      return false;
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(newPassword)) {
      setPasswordError("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleUpdateName = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(
          'https://devopsmule.cweave.fr/api/update-name',
          { name: newName },
          { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowPasswordConfirmation(true)
      setSnackbarMessage('Nom mis à jour avec succès !');
      setSnackbarOpen(true);
      
    } catch (error) {
      setSnackbarMessage("Une erreur est survenue. Veuillez réessayer.");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePwd = async () => {
    if (!validatePassword()) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(
          'https://devopsmule.cweave.fr/api/update-password',
          { password: newPassword },
          { headers: { Authorization: `Bearer ${token}` } }
      );
      setSnackbarMessage('Mot de passe mis à jour avec succès !');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Une erreur est survenue. Veuillez réessayer.");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdateChoice = (choice: string) => {
    if (choice === "oui") {
      setShowPasswordConfirmation(false);
      setOpenPasswordSection(true);
      setShowPasswordSectionTitle(true);  
    } else {
      setIsPasswordUpdateDisabled(true);
      setShowPasswordConfirmation(false);
    }
  };

  const handleClose = () => {
    onClose(); // Close the dialog
    // Reset states to clear the form when closed
    setNewName(user.name);
    setNewPassword('');
    setCurrentPassword('');
    setConfirmPassword('');
    setShowPasswordConfirmation(false);
    setOpenPasswordSection(false);
    setPasswordError("");
    setIsPasswordUpdateDisabled(false);
    setShowPasswordSectionTitle(false); 
  };

  return (
    <>
      <Dialog 
        open={open} 
        onClose={handleClose} 
        fullWidth 
        maxWidth="sm"
      >
        <DialogTitle>Profil</DialogTitle>
        <DialogContent>
          <Typography variant="body1"><strong>Email :</strong> {user.workEmail}</Typography>
          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" onClick={() => setOpenNameSection(!openNameSection)}>
            Modifier le nom {openNameSection ? <ExpandLess /> : <ExpandMore />}
          </Typography>
          <Collapse in={openNameSection}>
            <TextField
              label="Nouveau nom"
              fullWidth
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              margin="normal"
              disabled={showPasswordConfirmation || openPasswordSection}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: showPasswordConfirmation || openPasswordSection ? "gray" : "#d3d3d3", // Default border color (gray or light gray if disabled)
                  },
                  "&:hover fieldset": {
                    borderColor: showPasswordConfirmation || openPasswordSection ? "gray" : "#52929e", // Border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#52929e",
                  },
                },
              }}
            />
            <Button onClick={handleUpdateName} variant="contained"   
  style={{
    backgroundColor: newName === user.name || showPasswordConfirmation || openPasswordSection || isPasswordUpdateDisabled ? "#d3d3d3" : "#52929e", // light gray when disabled
  }}              sx={{
                mt: 2,
                padding: "6px 12px",  
                borderRadius: "20px",  
                fontSize: "0.875rem"}}
              disabled={newName === user.name || showPasswordConfirmation || openPasswordSection || isPasswordUpdateDisabled}>Mettre à jour le nom</Button>
          </Collapse>
          
          {showPasswordConfirmation && (
            <Typography sx={{ mt: 2 }}>Voulez-vous mettre à jour votre mot de passe ?</Typography>
          )}
          {showPasswordConfirmation && !isPasswordUpdateDisabled && (
            <>
              <Button onClick={() => handlePasswordUpdateChoice("oui")} variant="contained" sx={{ mt: 1 }} style={{backgroundColor:"#52929e"}}>Oui</Button>
              <Button onClick={() => handlePasswordUpdateChoice("non")} variant="contained" sx={{ mt: 1, ml: 2 }} disabled={isPasswordUpdateDisabled} style={{backgroundColor:"#52929e"}}>Non</Button>
            </>
          )}

          {showPasswordSectionTitle && (
            <Typography variant="h6" sx={{ mt: 3 }}>
              Modifier le mot de passe
            </Typography>
          )}

          <Collapse in={openPasswordSection}>
            <Grid container spacing={2}>
              {[{ label: "Mot de passe actuel", value: currentPassword, setter: setCurrentPassword, show: showCurrentPassword, toggle: setShowCurrentPassword },
                { label: "Nouveau mot de passe", value: newPassword, setter: setNewPassword, show: showNewPassword, toggle: setShowNewPassword },
                { label: "Confirmer le mot de passe", value: confirmPassword, setter: setConfirmPassword, show: showConfirmPassword, toggle: setShowConfirmPassword }].map(({ label, value, setter, show, toggle }, index) => (
                  <Grid item xs={12} key={index}>
                    <TextField
                      label={label}
                      type={show ? "text" : "password"}
                      fullWidth
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                      margin="normal"
                      error={!!passwordError && (label === "Nouveau mot de passe" || label === "Confirmer le mot de passe")}
                      helperText={label === "Nouveau mot de passe" || label === "Confirmer le mot de passe" ? passwordError : ""}
                      InputProps={{
                        endAdornment: (
                          <IconButton onClick={() => toggle(!show)}>
                            {show ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#d3d3d3", // Default border color (light gray)
                          },
                          "&:hover fieldset": {
                            borderColor: "#52929e", // Border color on hover
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#52929e", // Border color when focused
                          },
                        },
                      }}
              
                    />
                  </Grid>
              ))}
            </Grid>
            <Button onClick={handleUpdatePwd} variant="contained"   
            style={{backgroundColor: newPassword === "" || snackbarOpen ? "#d3d3d3" : "#52929e"}}      
            sx={{
                mt: 2,
                padding: "6px 12px",  
                borderRadius: "20px",  
                fontSize: "0.875rem"}}
            disabled={newPassword === ""|| snackbarOpen}>Mettre à jour le mot de passe</Button>
          </Collapse>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}   sx={{ borderRadius: "20px", borderColor: "#52929e" }} 
  style={{ color: "#52929e" }}

          variant="outlined">Fermer</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={() => setSnackbarOpen(false)} message={snackbarMessage} />
    </>
  );
};

export default ProfileModal;
