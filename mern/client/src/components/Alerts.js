import React from "react";
import Toast from "react-bootstrap/Toast";

//TOASTER FOR SUCCESS
export const BootstrapSuccessToast = ({ message, onClose }) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      right: 0,
      left: "50%",
      zIndex: 9999,
      transform: "translateX(-50%)",
      display: "flex",
      justifyContent: "center",
      width: "800px",
    }}
  >
    <Toast show={true} onClose={onClose} bg="success" autohide delay={3000}>
      <Toast.Header closeButton={false}>
        <strong className="mr-auto">Success</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  </div>
);

// TOASTER FOR ERROR
export const BootstrapErrorToast = ({ message, onClose }) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      right: 0,
      left: 0,
      zIndex: 9999,
      display: "flex",
      justifyContent: "center",
    }}
  >
    <Toast show={true} onClose={onClose} bg="danger">
      <Toast.Header closeButton={false}>
        <strong className="mr-auto">Error</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  </div>
);

// TOASTER FOR CONFIRMATION
export const BootstrapConfirmToast = ({ message, onConfirm, onCancel }) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      right: 0,
      left: 0,
      zIndex: 9999,
      display: "flex",
      justifyContent: "center",
    }}
  >
    <Toast show={true} bg="info">
      <Toast.Header closeButton={false}>
        <strong className="mr-auto">Confirm</strong>
      </Toast.Header>
      <Toast.Body>
        {message}
        <div className="mt-2">
          <button className="btn btn-success mr-2" onClick={onConfirm}>
            Yes
          </button>
          <button className="btn btn-secondary" onClick={onCancel}>
            No
          </button>
        </div>
      </Toast.Body>
    </Toast>
  </div>
);
