import { createContext, useContext, useState } from "react";
import AddPhoto from "../components/AddPhoto";
import ExpandedPhoto from "../components/ExpandedPhoto";

const ModalContext = createContext();

export const ModalContextProvider = ({ children }) => {
  const [modalState, setModalState] = useState(false);
  const [modalType, setModalType] = useState("");

  const [modalParameters, setModalParameters] = useState({});

  function ModalContent() {
    switch (modalType) {
      case "add":
        return <AddPhoto />;
      case "photo":
        return (
          <ExpandedPhoto
            id={modalParameters.id}
            title={modalParameters.title}
            imageUrl={modalParameters.imageUrl}
            postedBy={modalParameters.postedBy}
          />
        );

      //Add more modal content below...

      default:
        return <p>No Modal Type</p>;
    }
  }

  function Modal() {
    return (
      <div
        className="fixed top-0 left-0 h-[100vh] w-[100vw] bg-black/70 flex items-center justify-center z-50"
        onClick={closeModal}
      >
        <div
          className="bg-white w-3/5 h-[85%] rounded-xl px-4 min-w-fit"
          onClick={(e) => e.stopPropagation()}
        >
          <ModalContent />
        </div>
      </div>
    );
  }

  function openModal(type, data = {}) {
    setModalType(type);
    setModalState(true);
    setModalParameters(data);
  }

  function closeModal() {
    setModalState(false);
    setModalType("");
    setModalParameters({});
  }

  return (
    <ModalContext.Provider
      value={{
        modalState,
        modalType,
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
