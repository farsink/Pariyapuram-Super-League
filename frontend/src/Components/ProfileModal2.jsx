import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useModal } from "../context/ModalContext";
import { useUserContext } from "../context/UserContext";
import { useAuth } from "@clerk/clerk-react";
import { toast, ToastContainer } from "react-toastify";

const InterestItem = ({ icon, text }) => (
  <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-3 py-1.5">
    {icon}
    <span className="text-sm text-gray-200">{text}</span>
  </div>
);

const ProfileModal2 = () => {
  const { isModalOpen, closeModal } = useModal();
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useUserContext();
  const { signOut } = useAuth();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await signOut().then(() => {
        toast.success("Logged out successfully");
      });
    } catch (error) {
      console.error("Error signing out user:", error);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      setIsVisible(true);
      setIsClosing(false);
    }
  }, [isModalOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      closeModal();
    }, 300);
  };

  if (!isVisible && !isModalOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 rounded-lg ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Background overlay */}
      <div
        className={`bg-black/50 fixed inset-0 transition-opacity duration-300 ${
          isClosing ? "opacity-0" : "opacity-100"
        }`}
        onClick={handleClose}
      />

      {/* Modal content */}
      <div
        className={`relative bg-gray-900 w-full max-w-sm rounded-3xl overflow-hidden md:w-[400px] h-auto md:h-auto sm:h-full sm:rounded-none sm:w-full
          transition-all duration-300 transform
          ${isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"}
          ${isModalOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white z-10 p-2 hover:bg-gray-800 rounded-full transition-transform duration-300 hover:rotate-90 active:scale-90"
        >
          <X size={24} />
        </button>

        {/* Header Background */}
        <div
          className="h-32 bg-gradient-to-r from-blue-600 to-blue-400"
          style={{
            backgroundImage: "url('public/assets/ScoreCard2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Profile Content */}
        <div className="px-6 pb-6 -mt-16">
          {/* Profile Image */}
          <div className="flex justify-center">
            <img
              src={user?.imageUrl}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-gray-900 shadow-xl"
            />
          </div>

          {/* Profile Info */}
          <div className="text-center mt-4">
            <h2 className="text-2xl font-bold text-white">{user?.fullName}</h2>
            <p className="text-gray-400 mt-2 text-sm px-4">
              Passionate about live matches & tracking football stats
            </p>
          </div>

          {/* Badges */}
          <div className="flex justify-center gap-3 mt-4">
            <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
              Manchester United
            </span>
            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
              Midfielder
            </span>
          </div>

          {/* Achievements */}
          <div className="mt-8">
            <h3 className="text-gray-400 font-medium mb-3 text-sm tracking-wider">ACHIEVEMENTS</h3>
            <div className="flex flex-wrap gap-2">
              <InterestItem icon="🏆" text="League Champion 2023" />
              <InterestItem icon="⚽" text="Top Scorer" />
              <InterestItem icon="👟" text="50+ Matches" />
              <InterestItem icon="🎯" text="90% Pass Accuracy" />
            </div>
          </div>

          {/* Logout Button */}
          <div className="flex justify-end mt-8">
            <button
              onClick={handleLogout}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-6 py-2 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default ProfileModal2;
