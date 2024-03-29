import React from "react";
import "../assets/css/modal.css";

const Modal = ({ active, handleClick, onClose }) => {
  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <div className={`modal-bg ${active && "active"}`} onClick={handleClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title" style={{ marginBottom: "3rem" }}>
          Siz rostdan ham balingizni ishlatmoqchimisiz?
        </div>
        <div className="modal-footer">
          <button onClick={handleClick}>Ha</button>
          <button onClick={handleClose}>Yo'q</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
