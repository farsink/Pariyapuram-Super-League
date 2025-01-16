import React, { useEffect } from "react";
import styled from "styled-components";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaArrowLeft,FaFacebookF, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn, useSignUp, useAuth, useUser } from "@clerk/clerk-react";
import { toast, ToastContainer, Slide } from "react-toastify";
import { useUserContext } from "../context/UserContext";



function Auth({ isregister }) {
  const { signUp } = useSignUp();
  const { signIn } = useSignIn();
  const { signOut, isSignedIn, getToken } = useAuth();
  const { user: clerkUser } = useUser(); // Get user details from Clerk
  const { setUser, setToken, user, token } = useUserContext(); // Update context
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (clerkUser) {
        // Set user details in context
        setUser(clerkUser);
       

        // Fetch and set the token in context
        const token = await getToken();
        setToken(token);
      }
    };

    fetchData();
  }, [clerkUser, setUser, setToken, signIn]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");


    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (isSignedIn) {
      toast.error("You are already signed in");
      await signOut().then(() => {
        toast.info("You've been signed out");
      });
      return;
    }
    try {
      if (isregister) {
        await signUp.create({ emailAddress: email, password });
        await signUp.prepareEmailAddressVerification();
        toast.success("Check your email for the verification link");
        Navigate("/verify-email"); // Redirect to verification page
      } else {
        await signIn.create({ identifier: email, password });
        Navigate("/"); // Redirect after successful login
      }
    } catch (err) {
      // Safely handle the error
      toast.error("ERROR :" + err.message);
      console.error("Error:", err.message || err.errors?.[0]?.message || "An error occurred");
    }
  };

  const handleGoogleSignIn = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback", // Create this route for OAuth callback
      redirectUrlComplete: "/", // Redirect after successful login
    });
  };

  const handleFacebookSignIn = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_facebook",
      redirectUrl: "/sso-callback", // Create this route for OAuth callback
      redirectUrlComplete: "/", // Redirect after successful login
    });
  };

  return (
    <>
      <StyledWrapper>
        <Container fluid className="login-container">
          <Row className="login-row">
            <Container>
              <Link to={"/"}>
                <Button variant="link" className="back-button">
                  <FaArrowLeft /> BACK
                </Button>
              </Link>
            </Container>

            <Col md={6} className="login-form-col">
              <h2 className="login-heading">{isregister ? "Sign Up" : "Log In"}</h2>
              <Form onSubmit={handleSubmit}>
                <div id="clerk-captcha"></div>
                <Form.Group controlId="formEmail">
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    className="form-input"
                    autoComplete="email" // Add autocomplete for email
                  />
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="Your password"
                    className="form-input"
                    autoComplete={isregister ? "new-password" : "current-password"} // Add autocomplete for password
                  />
                </Form.Group>
                <Button variant="success" type="submit" className="login-button">
                  {isregister ? "Sign Up" : "Log In"}
                </Button>
                <Container className="d-flex justify-content-between">
                  {!isregister && (
                    <Button variant="link" className="forgot-password" onClick={() => Navigate("/resetPassword")}>
                      Forgot your password? Reset Password
                    </Button>
                  )}
                  <Button className="forgot-password">-</Button>
                  {!isregister ? (
                    <Button
                      onClick={() => Navigate("/register")}
                      variant="link"
                      className="forgot-password"
                    >
                      SignUp?
                    </Button>
                  ) : (
                    <Button
                      onClick={() => Navigate("/login")}
                      variant="link"
                      className="forgot-password"
                    >
                      login?
                    </Button>
                  )}
                </Container>

                <div className="or-separator">
                  <span>Other ways to sign in</span>
                </div>
                <Button
                  variant="outline-light"
                  className="google-button"
                  onClick={handleGoogleSignIn}
                >
                  <FaGoogle /> Continue With Google
                </Button>
                <Button
                  variant="outline-light"
                  className="facebook-button"
                  onClick={handleFacebookSignIn}
                >
                  <FaFacebookF /> Continue With Facebook
                </Button>
              </Form>
            </Col>
            <Col md={6} className="info-col">
              <div className="info-box">
                <ul className="info-list">
                  <li>Take part in fan debate by leaving comments on matches and articles</li>
                  <li>Sign up is free and makes you part of the PSL community</li>
                  <li>Unlock analysis about your favourite players and teams</li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
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
      </StyledWrapper>
    </>
  );
}

export default Auth;

const StyledWrapper = styled.div`
  .login-container {
    padding: 0;
    background-color: #1a1a1a;
    color: white;
    height: 100vh;
    overflow: hidden;
  }

  .login-row {
    display: flex;
    height: 100%;
  }

  .login-form-col {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #1a1a1a;
  }

  .back-button {
    color: white;
    font-weight: bold;
    margin-left: 0 !important;
  }

  .login-heading {
    margin-bottom: 20px;
    font-size: 2rem;
    color: white;
  }

  .form-input {
    margin-bottom: 15px;
    background-color: #333;
    border: none;
    color: white;
  }

  .form-input::placeholder {
    color: #999;
  }

  .login-button {
    width: 100%;
    margin-bottom: 15px;
  }

  .forgot-password {
    color: #999;
    text-align: center;
    margin-bottom: 20px;
  }

  .or-separator {
    position: relative;
    text-align: center;
    margin-bottom: 20px;
  }

  .or-separator span {
    background-color: #1a1a1a;
    padding: 0 10px;
    position: relative;
    z-index: 1;
  }

  .or-separator::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    border-top: 1px solid #555;
    z-index: 0;
  }

  .google-button,
  .facebook-button {
    width: 100%;
    margin-bottom: 10px;
    color: white;
    border: 1px solid #555;
    gap: 2px;
  }
  .google-button:hover {
    color: black;
  }

  .facebook-button:hover {
    color: black;
  }

  .social-icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  .info-col {
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("./src/assets/hhholographic.webp") no-repeat center center;
    border-radius: 10px;
    background-size: cover;
    position: relative;
  }

  .info-col::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  .info-box {
    position: relative;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 20px;
    border-radius: 10px;
    max-width: 400px;
  }

  .info-list {
    list-style: none;
    padding: 0;
  }

  .info-list li {
    margin-bottom: 15px;
    position: relative;
    padding-left: 20px;
  }

  .info-list li::before {
    content: "★";
    position: absolute;
    left: 0;
    color: #ffcc00;
  }

  @media (max-width: 768px) {
    .login-row {
      flex-direction: column;
    }

    .login-form-col,
    .info-col {
      width: 100%;
      text-align: center;
    }

    .info-box {
      margin: 20px;
    }
  }
`;
