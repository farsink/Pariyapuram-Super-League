import React, { useState } from "react";
import { useSignUp, useClerk } from "@clerk/clerk-react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import { useRef } from "react";
import { toast, ToastContainer, Slide } from "react-toastify";

function Verify({ isReset }) {
  const Navigate = useNavigate();
  const { signUp } = useSignUp();
  const { client } = useClerk();
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === "") {
      let newCode = code.split("");
      newCode[index] = value;
      newCode = newCode.join("");
      setCode(newCode);

      // Focus next input
      if (value !== "" && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await client.signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        password,
        code,
      });
      toast.success("Password reset successful!");
    } catch (err) {
      toast.error("ERROR :" + err.message);
      console.error("Error resetting password:", err);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const result = await signUp.attemptEmailAddressVerification({ code });
      if (result.status === "complete") {
        toast.success("Email verified successfully!");
        // Redirect or update state
        Navigate("/");
      }
    } catch (err) {
      toast.error("ERROR :" + err.message);
      console.error("Error verifying email:", err.errors[0].message);
    }
  };
 
  
  return (
    <Container
      fluid
      style={{ backgroundImage: "url('/assets/ticket_gradiant.svg')", height: "100dvh",backgroundSize: "cover" }}
    >
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
      <StyledWrapper>
        <form className="form">
          <span className="close" onClick={() => Navigate("/")}>X</span>
          <div className="info">
            <span className="title">{isReset ? "Reset Password" : "Email Verification"}</span>
            <p className="description">Enter the verification code sent to your email address</p>
          </div>
          <div className="input-fields">
            {Array(6)
              .fill("")
              .map((_, index) => (
                <input
                  key={index}
                  maxLength={1}
                  type="tel"
                  value={code[index] || ""}
                  onChange={(e) => handleChange(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                />
              ))}
          </div>

       {isReset &&   <div className="form-group w-100 mt-4">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter new password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>}

          <div className="action-btns">
            <a href="" className="verify" onClick={isReset ? handleReset : handleVerify}>
              Verify
            </a>
            <a href="#" className="clear" onClick={() => {setCode("");setPassword("")}}>
              Clear
            </a>
          </div>
        </form>
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
  justify-content: center;
  width: 100%;

  .form {
    --black: #000000;
    --ch-black: #141414;
    --eer-black: #1b1b1b;
    --night-rider: #2e2e2e;
    --white: rgb(46, 40, 40);
    --af-white: #f3f3f3;
    --ch-white: #e1e1e1;
    --tomato: #fa5656;
    font-family: Helvetica, sans-serif;
    padding: 25px;
    display: flex;
    max-width: 420px;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    color: var(--af-white);
    background-color: var(--black);
    border-radius: 8px;
    position: relative;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
  }

  /*----heading and description-----*/

  .info {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .title {
    font-size: 1.5rem;
    font-weight: 900;
  }

  .description {
    margin-top: 10px;
    font-size: 1rem;
  }

  /*----input-fields------*/

  .form .input-fields {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-right: 10px;
    margin-left: 10px;
  }

  .form .input-fields input {
    height: 2.5em;
    width: 2.5em;
    outline: none;
    text-align: center;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial,
      sans-serif;
    font-size: 1.5rem;
    color: var(--af-white);
    border-radius: 5px;
    border: 2.5px solid var(--eer-black);
    background-color: var(--eer-black);
  }

  .form .input-fields input:focus {
    border: 1px solid var(--af-white);
    box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.15);
    transform: scale(1.05);
    transition: 0.5s;
  }

  /*-----verify and clear buttons-----*/

  .action-btns {
    display: flex;
    margin-top: 20px;
    gap: 0.5rem;
  }

  .verify {
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: 500;
    color: var(--night-rider);
    text-shadow: none;
    background: var(--af-white);
    box-shadow: transparent;
    border: 1px solid var(--af-white);
    transition: 0.3s ease;
    user-select: none;
  }

  .verify:hover,
  .verify:focus {
    color: var(--night-rider);
    background: var(--white);
  }

  .clear {
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: 500;
    color: var(--ch-white);
    text-shadow: none;
    background: transparent;
    border: 1px solid var(--ch-white);
    transition: 0.3s ease;
    user-select: none;
  }

  .clear:hover,
  .clear:focus {
    color: var(--tomato);
    background-color: transparent;
    border: 1px solid var(--tomato);
  }

  /*-----close button------*/

  .close {
    position: absolute;
    right: 10px;
    top: 10px;
    background-color: var(--night-rider);
    color: var(--ch-white);
    height: 30px;
    width: 30px;
    display: grid;
    place-items: center;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    transition: 0.5s ease;
  }

  .close:hover {
    background-color: var(--tomato);
    color: var(--white);
  }

  /*----reset password form-----*/
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .form-group label {
    display: block;
    margin-bottom: 5px;
    color: #fff; // Light text
  }
  .form-group input {
    width: 100%;
    padding: 12px 16px;
    border-radius: 6px;
    font-family: inherit;
    border: 1px solid #555; // Darker border
    background-color: #222; // Dark input background
    color: #fff; // Light text
  }
  .form-group input::placeholder {
    opacity: 0.5;
    color: #bbb; // Light placeholder text
  }
  .form-group input:focus {
    outline: none;
    border-color: #1778f2;
  }
`;

export default Verify;
