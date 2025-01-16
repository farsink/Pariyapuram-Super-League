import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import styled from "styled-components";

function ForgotPassword() {
  const { client } = useClerk();
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await client.signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setShowModal(true); // Show success modal
    } catch (err) {
      console.error("Error sending reset password email:", err);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/reset-verify"); // Redirect to login page after closing modal
  };

  return (
    <Container fluid style={{ height: "100vh",backgroundImage: "url('../src/assets/ticket-gradient.png')",backgroundSize: "cover" }}>
    <StyledWrapper>
      <div className="form-container">
        <div className="logo-container">Forgot Password</div>
        <form className="form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" id="email"  onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Enter your email" required />
          </div>
          <button className="form-submit-btn" type="submit" onClick={handleResetPassword}>
            Send Email
          </button>
        </form>
        <p className="signup-link">
          Don't have an account?
          <Link href="" className="signup-link link"  to={"/register"}>
            {" "}
            Sign up now
          </Link>
        </p>
      </div>

      {/* Success Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          A password reset link has been sent to your email. Please check your inbox.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </StyledWrapper>
    
    </Container>
  );
}
const StyledWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  .form-container {
    max-width: 400px;
    background-color: #333; // Dark background
    padding: 32px 24px;
    font-size: 14px;
    font-family: inherit;
    color: #fff; // Light text
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: 0px 0px 3px rgba(255, 255, 255, 0.084), 0px 2px 3px rgba(255, 255, 255, 0.168); // Adjusted shadow for dark theme
  }

  .form-container button:active {
    scale: 0.95;
  }

  .form-container .logo-container {
    text-align: center;
    font-weight: 600;
    font-size: 18px;
    color: #fff; // Light text
  }

  .form-container .form {
    display: flex;
    flex-direction: column;
  }

  .form-container .form-group {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .form-container .form-group label {
    display: block;
    margin-bottom: 5px;
    color: #fff; // Light text
  }

  .form-container .form-group input {
    width: 100%;
    padding: 12px 16px;
    border-radius: 6px;
    font-family: inherit;
    border: 1px solid #555; // Darker border
    background-color: #222; // Dark input background
    color: #fff; // Light text
  }

  .form-container .form-group input::placeholder {
    opacity: 0.5;
    color: #bbb; // Light placeholder text
  }

  .form-container .form-group input:focus {
    outline: none;
    border-color: #1778f2;
  }

  .form-container .form-submit-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: inherit;
    color: #fff;
    background-color: #1778f2; // Blue button
    border: none;
    width: 100%;
    padding: 12px 16px;
    font-size: inherit;
    gap: 8px;
    margin: 12px 0;
    cursor: pointer;
    border-radius: 6px;
    box-shadow: 0px 0px 3px rgba(255, 255, 255, 0.084), 0px 2px 3px rgba(255, 255, 255, 0.168); // Adjusted shadow for dark theme
  }

  .form-container .form-submit-btn:hover {
    background-color: #1461c1; // Darker blue on hover
  }

  .form-container .link {
    color: #1778f2; // Blue link
    text-decoration: none;
  }

  .form-container .signup-link {
    align-self: center;
    font-weight: 500;
    color: #fff; // Light text
  }

  .form-container .signup-link .link {
    font-weight: 400;
  }

  .form-container .link:hover {
    text-decoration: underline;
  }
`;


export default ForgotPassword;
