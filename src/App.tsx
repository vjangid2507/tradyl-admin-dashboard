import React, { useState } from "react";
import "./App.css";
import AppRoutes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AttachmentForm from "./pages/Orders/AttachmentForm";
// import Modal from "react-modal";

const App = () => {
  const [showAttachmentForm, setShowAttachmentForm] = useState(false);

  const showAttachmentFormHandler = () => {
    setShowAttachmentForm(true);
  };
  const hideAttachmentFormHandler = () => {
    setShowAttachmentForm(false);
  };
  return (
    <>
      {/* <Modal isOpen={true}>hello</Modal> */}
      <AppRoutes setShowAttachmentForm={showAttachmentFormHandler} />
      {showAttachmentForm && (
        <AttachmentForm onClose={hideAttachmentFormHandler} />
      )}
      <ToastContainer />
    </>
  );
};

export default App;
