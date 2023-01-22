import { useModal } from "../context/ModalContext";
import Header from "./Header"

const Layout = ({children}) => {

  const { Modal, modalState } = useModal();

  return (
    <div className="bg-slate-200 min-h-screen">
      <Header />
      {modalState && <Modal />}
      {children}
    </div>
  )
}

export default Layout