import { createContext, useContext, useState } from "react";
import AddPhoto from "../components/AddPhoto";

const ModalContext = createContext();

export const ModalContextProvider = ({ children }) => {
  const [modalState, setModalState] = useState(false);
  const [modalType, setModalType] = useState("");

  function ModalContent() {
    switch (modalType) {
      case "add":
        return <AddPhoto />;

      //Add more modal content below...

      default:
        return <p>No Modal Type</p>;
    }
  }

  function Modal() {
    return (
      <div
        className="fixed top-0 left-0 h-[100vh] w-[100vw] bg-black/70 flex items-center justify-center z-50"
        onClick={() => {
          closeModal();
        }}
      >
        <div
          className="bg-white w-1/2 h-3/4 rounded-xl p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <ModalContent />
        </div>
      </div>
    );
  }

  function openModal(type) {
    setModalType(type);
    setModalState(true);
  }

  function closeModal() {
    setModalState(false);
    setModalType("");
  }

  return (
    <ModalContext.Provider
      value={{
        modalState,
        modalType,
        setModalState,
        setModalType,
        Modal,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};
