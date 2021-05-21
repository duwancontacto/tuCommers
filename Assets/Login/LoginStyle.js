import styled from "styled-components";

const LoginStyles = styled.div`
  position: relative;
  width: 100vw;

  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  .vectors {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  .container-form {
    max-width: 350px;
    width: 90%;
    padding: 5rem 0;
    h4 {
      text-transform: uppercase;
      text-align: center;
      font-size: 40px;
      margin-bottom: 1.5rem;
      color: var(--colorText);
    }
    p {
      font-size: 15px;
      text-align: center;
      color: var(--colorTextOpacity-5);
      margin-bottom: 2rem;
    }
    input {
      margin: 1rem 0;
    }
    button {
      margin-top: 2rem;
      background: #20df7f;
      border: none;
      width: 100%;
    }
    .restart-password {
      text-align: center;
      padding-top: 0.5rem;
      cursor: pointer;
      color: var(--colorTextOpacity-7);
      &:active {
        color: #20df7f;
      }
    }
    .register {
      position: fixed;
      top: 20px;
      right: 30px;
      cursor: pointer;
      &:active {
        color: #20df7f;
      }
    }
  }
  @media screen and (max-width: 768px) {
    height: 100vh;
    .container-form {
      padding-top: 7rem;
    }
  }
`;

export {LoginStyles};
