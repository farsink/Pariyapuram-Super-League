import React from "react";
import styled from "styled-components";

const Loader = ({width,height}) => {
  return (
    <StyledWrapper>
      <div className="loader w-10 h-10"/>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loader {
    background: linear-gradient(#fff0 calc(1 * 100% / 6), #000 0 calc(3 * 100% / 6), #fff0 0),
      linear-gradient(#fff0 calc(2 * 100% / 6), #000 0 calc(4 * 100% / 6), #fff0 0),
      linear-gradient(#fff0 calc(3 * 100% / 6), #000 0 calc(5 * 100% / 6), #fff0 0);
    background-size: 10px 400%;
    background-repeat: no-repeat;
    animation: matrix 1s infinite linear;
  }

  @keyframes matrix {
    0% {
      background-position: 0% 100%, 50% 100%, 100% 100%;
    }

    100% {
      background-position: 0% 0%, 50% 0%, 100% 0%;
    }
  }
`;

export default Loader;
