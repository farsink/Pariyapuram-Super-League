import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, X, Calendar, QrCode } from "lucide-react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { fetchTickets, updateTicketAsync } from "../../Redux/slices/TicketSlices";
import Swal from "sweetalert2";
import "./Global.css";
import { Slide, toast, ToastContainer } from "react-toastify";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useNavigate } from "react-router-dom";

const TicketsContainer = styled.div`
  .ticket-form {
    background: #1f2937;
    border-radius: 0.75rem;
    border: 1px solid #374151;
    transition: all 0.3s ease;
  }

  .ticket-card {
    background: #1f2937;
    border-radius: 0.75rem;
    border: 1px solid #374151;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  }

  .modal-overlay {
    background: rgba(0, 0, 0, 0.5);
  }

  .modal-content {
    background: #1f2937;
    border-radius: 0.75rem;
    border: 1px solid #374151;
  }
  .status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.875rem;

    &.pending {
      background: rgba(99, 102, 241, 0.1);
      color: #6366f1;
    }
    &.paid {
      background: rgba(34, 197, 94, 0.1);
      color: #22c55e;
    }
    &.completed {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
    }
  }
`;

function TicketsManagement() {
  const [showForm, setShowForm] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tickets, status, error } = useSelector((state) => state.tickets);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const ticketData = {
      userId: formData.get("userId"),
      matchId: formData.get("matchId"),
      seatTier: formData.get("seatTier"),
      quantity: formData.get("quantity"),
      pricePerTicket: formData.get("pricePerTicket"),
      totalPrice: formData.get("totalPrice"),
      paymentStatus: formData.get("paymentStatus"),
      paymentId: formData.get("paymentId"),
      status: formData.get("status"),
    };

    try {
      let response;
      if (editingTicket) {
        response = await dispatch(updateTicketAsync({ id: editingTicket._id, ticketData }));
        toast.success("Ticket updated");
      } else {
        response = await dispatch(addTicketAsync(ticketData));
        toast.success("Ticket added");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    dispatch(fetchTickets());
    setShowForm(false);
    setEditingTicket(null);
    setSelectedTicket(null);
  };
 


  const handleDelete = async (id) => {
    try {
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, delete it!",
      });

      if (confirmation.isConfirmed) {
        const response = await dispatch(deleteTicketAsync(id));

        if (response.meta.requestStatus === "fulfilled") {
          Swal.fire("Deleted!", "Ticket deleted successfully!", "success");
        } else {
          Swal.fire("Error!", "Error deleting ticket", "error");
        }
      }
    } catch (error) {
      console.error("Error deleting ticket:", error);
      Swal.fire("Error!", "An unexpected error occurred while deleting the ticket.", "error");
    } finally {
      setSelectedTicket(null);
    }
  };

  if (status === "error") {
    return (
      <TicketsContainer>
        <p className="text-red-500">An error occurred: {error}</p>
      </TicketsContainer>
    );
  }

  return (
    <TicketsContainer>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
        theme="dark"
      />
      <div className="flex justify-between items-center mb-6  gap-3">
        <div className="sm:w-2/3">
          <h1 className="text-2xl font-bold text-white">Tickets Management</h1>
          <p className="text-gray-400">Manage tickets and details</p>
        </div>
        <button
          onClick={()=> navigate("/admin/scanner")}
          className="bg-indigo-600 text-sm  hover:bg-indigo-700 px-2 py-2  rounded-lg flex items-center gap-2"
        >
          <QrCode size={18} />
         <p className="hidden sm:block">Scan Ticket</p>
        </button>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-sm  hover:bg-indigo-700 px-2 py-2  rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
         <p className="hidden sm:block"> Add New Ticket</p>
        </button>
      </div>

      {status === "loading" ? (
        <p className="text-white">Loading...</p>
      ) : (
        <>
          {showForm && (
            <div className="ticket-form p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white">
                {editingTicket ? "Edit Ticket" : "New Ticket"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">User ID</label>
                    <input
                      name="userId"
                      defaultValue={editingTicket?.userId}
                      className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Match ID</label>
                    <input
                      name="matchId"
                      defaultValue={editingTicket?.matchId}
                      className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Seat Tier</label>
                    <select
                      name="seatTier"
                      defaultValue={editingTicket?.seatTier}
                      className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                      required
                    >
                      <option value="low">Low</option>
                      <option value="premium">Premium</option>
                      <option value="VIP">VIP</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      defaultValue={editingTicket?.quantity}
                      className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Price Per Ticket</label>
                    <input
                      type="number"
                      name="pricePerTicket"
                      defaultValue={editingTicket?.pricePerTicket}
                      className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Total Price</label>
                    <input
                      type="number"
                      name="totalPrice"
                      defaultValue={editingTicket?.totalPrice}
                      className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Payment Status</label>
                    <select
                      name="paymentStatus"
                      defaultValue={editingTicket?.paymentStatus}
                      className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                      required
                    >
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                      <option value="Failed">Failed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Payment ID</label>
                    <input
                      name="paymentId"
                      defaultValue={editingTicket?.paymentId}
                      className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Status</label>
                    <select
                      name="status"
                      defaultValue={editingTicket?.status}
                      className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                      required
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingTicket(null);
                    }}
                    className="px-4 py-2 text-gray-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg"
                  >
                    {editingTicket ? "Update" : "Create"} Ticket
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets &&
              tickets
                .slice()
                .sort((a, b) =>
                  new Date(b.bookingDate) > new Date(a.bookingDate) ? 1 : -1
                )
                .map((ticket) => (
                  <div
                    key={ticket._id}
                    className="ticket-card p-6 cursor-pointer"
                    onClick={() => {
                      setSelectedTicket(ticket);
                      setShowForm(false);
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-indigo-400">
                        <Calendar size={18} />
                        <span>{new Date(ticket.bookingDate).toLocaleDateString()}</span>
                      </div>
                      <span className={`status-badge ${ticket.paymentStatus.toLowerCase()} `}>
                        {ticket.paymentStatus}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="overflow-hidden">
                        <h3 className="text-lg font-semibold text-white truncate">
                          Ticket ID: {ticket._id}
                        </h3>
                        <p className="text-sm text-gray-400 truncate">User ID: {ticket.userId}</p>
                        <p className="text-sm text-gray-400 truncate">Match ID: {ticket.matchId}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <span>Seat Tier: {ticket.seatTier}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>Quantity: {ticket.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
            {!tickets && (
              <div>
                <p className="text-red-500">An error occurred</p>
              </div>
            )}
          </div>
        </>
      )}

      <AnimatePresence>
        {selectedTicket && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay"
            onClick={() => setSelectedTicket(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="modal-content p-6 w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Ticket ID: {selectedTicket._id}</h2>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-white">
                      User ID: {selectedTicket.userId}
                    </p>
                    <p className="text-sm text-gray-400">Match ID: {selectedTicket.matchId}</p>
                    <p className="text-sm text-gray-400">Seat Tier: {selectedTicket.seatTier}</p>
                    <p className="text-sm text-gray-400">Quantity: {selectedTicket.quantity}</p>
                    <p className="text-sm text-gray-400">
                      Price Per Ticket: {selectedTicket.pricePerTicket}
                    </p>
                    <p className="text-sm text-gray-400">
                      Total Price: {selectedTicket.totalPrice}
                    </p>
                    <p className="text-sm text-gray-400">
                      Payment Status: {selectedTicket.paymentStatus}
                    </p>
                    <p className="text-sm text-gray-400">Payment ID: {selectedTicket.paymentId}</p>
                    <p className="text-sm text-gray-400">Status: {selectedTicket.status}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setEditingTicket(selectedTicket);
                    setShowForm(true);
                    setSelectedTicket(null);
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Edit size={18} />
                  Edit Ticket
                </button>
                <button
                  onClick={() => handleDelete(selectedTicket._id)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Trash2 size={18} />
                  Delete Ticket
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </TicketsContainer>
  );
}

export default TicketsManagement;