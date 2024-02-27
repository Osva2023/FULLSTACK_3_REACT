import React from 'react';
import Toast from 'react-bootstrap/Toast';

export const BootstrapSuccessToast = ({ message, onClose }) => (
  <div style={{ position: 'fixed', top: 0, right: 0, left: 0, zIndex: 9999, display: 'flex', justifyContent: 'center' }}>
    <Toast show={true} onClose={onClose} bg="success" autohide delay={3000}>
      <Toast.Header closeButton={false}>
        <strong className="mr-auto">Success</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  </div>
);

export const BootstrapErrorToast = ({ message, onClose }) => (
  <div style={{ position: 'fixed', top: 0, right: 0, left: 0, zIndex: 9999, display: 'flex', justifyContent: 'center' }}>
    <Toast show={true} onClose={onClose} bg="danger">
      <Toast.Header closeButton={false}>
        <strong className="mr-auto">Error</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  </div>
);
export const BootstrapConfirmToast = ({ message, onConfirm, onCancel }) => (
  <Toast show={true}>
    <Toast.Header closeButton={false}>
      <strong className="mr-auto">Confirmación</strong>
    </Toast.Header>
    <Toast.Body>
      {message}
      <div className="mt-2">
        <button className="btn btn-success mr-2" onClick={onConfirm}>
          Confirmar
        </button>
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </Toast.Body>
  </Toast>
);
