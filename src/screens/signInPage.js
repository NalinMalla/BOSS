import * as React from "react";

import Button from '@mui/material/Button';
import SignIn from "../components/signIn"
import CustomModal from "../components/CustomModal";

export default function TransitionsModal(){
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <CustomModal
        open={open}
        onClose={handleClose}
        component= {<SignIn />}
      />
        
    </div>
  );
}