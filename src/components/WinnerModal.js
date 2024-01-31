import React from "react";
import "../assets/css/modal.css";

const WinnerModal = ({ active, price }) => {
  return (
    <div className={`modal-bg ${active && "active"}`}>
      <div
        className="modal"
        style={{
          backgroundImage: `url("https://i.pinimg.com/736x/52/25/ff/5225ff6d0ae6d0b008b5a39561ee82ad.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="modal-title"
          style={{ position: "relative", top: "75px", left: "31px" }}
        >
          Tabriklaymiz, siz {price} yutib oldingiz
        </div>
      </div>
    </div>
  );
};

export default WinnerModal;
