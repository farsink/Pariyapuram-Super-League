import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { serverurl } from "../../Api/ServerURL";
import axios from "axios";
import { Check, Share2, XCircle, AlertCircle, ArrowLeft } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

const SkeletonLoader = () => (
  <div className="max-w-lg w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 animate-pulse">
    {/* Skeleton Icon */}
    <div className="flex justify-center mb-6">
      <div className="rounded-full bg-gray-200 p-3">
        <div className="w-8 h-8" />
      </div>
    </div>

    {/* Skeleton Title and Subtitle */}
    <div className="text-center mb-8">
      <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-3" />
      <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto" />
    </div>

    {/* Skeleton Payment Details */}
    <div className="space-y-4 mb-8">
      <div className="h-4 bg-gray-200 rounded w-1/3" />
      <div className="grid grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <React.Fragment key={i}>
            <div className="h-4 bg-gray-200 rounded w-2/3" />
            <div className="h-4 bg-gray-200 rounded w-full ml-auto" />
          </React.Fragment>
        ))}
      </div>
    </div>

    {/* Skeleton QR and Button */}
    <div className="border-t pt-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="bg-gray-200 p-6 rounded-lg">
          <div className="w-24 h-24" />
        </div>
        <div className="h-10 bg-gray-200 rounded w-40" />
      </div>
    </div>
  </div>
);
const ConfirmationElement = ({
  amount,
  recipientName,
  paymentDate,
  paymentMethod,
  paymentId,
  success,
  errorMessage,
  qrcode,
  loading,
}) => {
  const handleShare = () => {
    // Implement share functionality
    if (navigator.share) {
      navigator
        .share({
          title: "Payment Confirmation",
          text: `Payment of ${amount} completed successfully.`,
        })
        .catch(console.error);
    }
  };
  const handleTryAgain = () => {
    // Implement retry payment logic
    console.log("Retrying payment...");
  };
  if (loading) {
    return <SkeletonLoader />;
  }
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
      {/* Status Icon */}
      <div className="flex justify-center mb-6">
        <div className={`rounded-full ${success ? "bg-cyan-100" : "bg-red-100"} p-3`}>
          {success ? (
            <Check className="w-8 h-8 text-cyan-500" />
          ) : (
            <XCircle className="w-8 h-8 text-red-500" />
          )}
        </div>
      </div>

      {/* Status Message */}
      <div className="text-center mb-8">
        <h2 className={`text-2xl font-semibold ${success ? "text-gray-800" : "text-red-600"}`}>
          {success ? "Payment received" : "Payment failed"}
        </h2>
        <p className="text-gray-600 mt-2">
          {success ? `We've received your $${amount} payment, ${recipientName}.` : errorMessage}
        </p>
      </div>

      {success ? (
        <>
          {/* Payment Details */}
          <div className="space-y-4 mb-8">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Payment Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-gray-500">Payment amount</div>
              <div className="text-right font-medium">${amount}</div>

              <div className="text-gray-500">Payment date</div>
              <div className="text-right">{paymentDate}</div>

              <div className="text-gray-500">Payment method</div>
              <div className="text-right">{paymentMethod}</div>

              <div className="text-gray-500">payment ID</div>
              <div className="text-right overflow-hidden overflow-ellipsis">{paymentId}</div>
            </div>
          </div>

          {/* QR Code and Share Section */}
          <div className="border-t pt-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-gray-100 p-6 rounded-lg">
                <QRCodeSVG
                  value={qrcode}
                  title={"Title for my QR Code"}
                  size={128}
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"L"}
                  imageSettings={{
                    src: "https://img.icons8.com/?size=100&id=4g4sWVMZZgeK&format=png&color=000000",
                    x: undefined,
                    y: undefined,
                    height: 24,
                    width: 24,
                    opacity: 1,
                    excavate: true,
                  }}
                />
                {/* <  className="w-24 h-24 text-gray-700" /> */}
              </div>
              <button
                onClick={handleShare}
                className="flex items-center px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Receipt
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Error Details */}
          <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3" />
              <div>
                <h4 className="font-medium text-red-800">Transaction Details</h4>
                <ul className="mt-2 text-sm text-red-700 space-y-1">
                  <li>Amount: ${amount}</li>
                  <li>Payment Method: {paymentMethod}</li>
                  <li>Date: {paymentDate}</li>
                  <li>Reference: {paymentId}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleTryAgain}
              className="w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
            <button className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Dashboard
            </button>
          </div>
        </>
      )}
    </div>
  );
};

function Confirmation() {
  const [ticket, setticket] = useState([]);
  const [response, setresponse] = useState({});
  const [isloading, setisLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Extract ticketId and session_id from the URL
    const params = new URLSearchParams(location.search);
    const ticketId = params.get("ticketId");
    const sessionId = params.get("session_id");

    if (sessionId && ticketId) {
      // Optionally, fetch the session status from your backend
      axios
        .get(`${serverurl}/api/payment/session-status?session_id=${sessionId}`)
        .then((res) => setresponse({ ...res.data, ticket: ticketId }))
        .catch((err) => console.error(err));

      //update the ticket
      axios
        .put(`${serverurl}/api/ticket/update`, {
          ticketId: ticketId,
          paymentStatus: response.status,
          paymentId: sessionId,
        })
        .then((res) => {
          setticket(res.data.ticket);
          setTimeout(() => setisLoading(false), 2000);
        })
        .catch((err) => {
          console.error(err);
          setTimeout(() => setisLoading(false), 2000);
        });
    }
  }, [location]);

  // Render the confirmation component with the fetched data and loading state as props

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <ConfirmationElement
        amount={ticket.totalPrice}
        recipientName={response?.customer_email}
        paymentDate={new Date(ticket.bookingDate).toLocaleDateString()}
        paymentMethod="Bank Account *9026"
        paymentId={ticket.paymentId}
        success={response.status === "paid"}
        errorMessage={"Your payment could not be processed. Please try again or contact support."}
        qrcode={ticket._id}
        loading={isloading} // Pass the loading state to the component as a proploading}
      />
    </div>
  );
}

export default Confirmation;
