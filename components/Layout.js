import { useState } from "react";
import { useModal } from "../context/ModalContext";
import Header from "./Header"
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Layout = ({children}) => {

  const { Modal, modalState } = useModal();

  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [severity, setSeverity] = useState("success")

  function createToast(severity, message){
    setSeverity(severity)
    setMessage(message)
    setOpen(true)
  }

  return (
    <div className="bg-slate-200 min-h-screen">
      <Header createToast={createToast} />
      {modalState && <Modal />}
      <Snackbar open={open} onClose={()=> setOpen(false)} autoHideDuration={3000} >
        <Alert severity={severity} variant="filled" >
          {message}
        </Alert>
      </Snackbar>
      {children}
    </div>
  )
}

export default Layout