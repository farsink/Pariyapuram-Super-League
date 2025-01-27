import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ConfirmDeleteToast = ({ onConfirm, onCancel }) => (
  <div>
    <p>Are you sure you want to delete this item?</p>
    <button onClick={onConfirm}>Yes, Delete</button>
    <button onClick={onCancel}>Cancel</button>
  </div>
);

const showConfirmDeleteToast = (onConfirm) => {
  toast(
    <ConfirmDeleteToast
      onConfirm={() => {
        onConfirm();
        toast.dismiss(); // Dismiss the toast after confirmation
      }}
      onCancel={() => toast.dismiss()} // Dismiss the toast on cancel
    />,
    {
      position: "top-center",
      autoClose: false, // Prevent auto-close
      closeOnClick: false, // Prevent close on click outside
      draggable: false,
    }
  );
};

export default showConfirmDeleteToast;
