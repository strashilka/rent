import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = ({ children }) => ReactDOM.createPortal(
  <div className="modal-overlay">
    <div className="modal-content">{children}</div>
  </div>,
  document.getElementById('modal-root'),
);

export default Modal;
