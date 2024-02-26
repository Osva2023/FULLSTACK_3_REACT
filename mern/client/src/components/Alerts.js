import React from 'react';
import Toast from 'react-bootstrap/Toast';

export const BootstrapSuccessToast = ({ message, onClose }) => (
  <Toast show={true} onClose={onClose} position="top-center">
    <Toast.Header closeButton={false}>
      <strong className="mr-auto">Success</strong>
    </Toast.Header>
    <Toast.Body>{message}</Toast.Body>
  </Toast>
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
