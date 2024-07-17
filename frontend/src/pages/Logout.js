import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { handleError,handleMessage,handleSuccess } from "../utils";
import { Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { pink } from "@mui/material/colors";
import LogoutIcon from '@mui/icons-material/Logout';


function LogOut(props) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  }
  const accept = () => {
    handleMessage("You have successfully been logged out");
    props.funct();
  };


return(<>
  <div className="card flex flex-wrap gap-2 justify-content-center flex-row self-end">
          <IconButton
            onClick={handleClickOpen}
            icon="pi pi-times"
            label="LogOut"
            ><LogoutIcon sx={{ color: pink[500] }} /></IconButton>
    </div>
    <Dialog
    open={open}
    onClose={handleClickClose}
    aria-labelledby="responsive-dialog-title"
    >
    <DialogTitle className="bg-red" id="responsive-dialog-title">
      {"Do you want to Logout?"}
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        Click on LOGOUT to signout and CANCEL to stay
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={handleClickClose}>
        Cancel
      </Button>
      <Button onClick={accept} autoFocus>
        LogOut
      </Button>
    </DialogActions>
  </Dialog>
  </>
)
}
export default LogOut