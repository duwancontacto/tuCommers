import styled from "styled-components";

const WelcomeStyles = styled.div`
  box-sizing: border-box;

  .nav_container {
    height: 60px;

    position: absolute;
    top: 0;
    width: 100%;
    z-index: 100;
    background: transparent;
    color: white;
  }
  .title {
    font-family: "Lobster", cursive;
    font-size: 2.5rem;
    span {
      padding-left: 1rem;
    }
  }
  .container {
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;
    margin: 0;
  }
  .col_container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .menu {
    display: flex;
    justify-content: flex-start;
    div {
      margin: 0px 30px;
      cursor: pointer;
      font-weight: 600;
      font-size: 16px;
      color: white;
      font-family: "Manrope", sans-serif;
      p {
        transition: 0.3s all;
        &:hover {
          transition: 0.3s all;
          transform: translateY(7px);
        }
      }
      &:hover {
        opacity: 0.8;
      }
    }
  }

  .main {
    height: 120vh;
    /*  background-image: url("./main2.svg") ;
    background-position: center; */
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    img {
      width: 100%;
      height: 100%;
    }
    .container-all {
      height: 100vh;
      width: 60vw;
      position: absolute;
      top: 0;
    }
    .container-text {
      background: transparent;
      position: absolute;
      z-index: 100;
      top: 0px;
      bottom: 0px;
      margin: auto;
      color: white;
      top: 50%;
      transform: translate(0, -40%);
      .text-title {
        font-family: "Fjalla One", sans-serif;
        font-size: 4rem;
        padding: 0px 4rem;
        line-height: 65px;
        color: rgba(255, 255, 255, 0.95);
      }
      .text-subtitle {
        font-size: 1.5rem;
        padding: 2rem 4rem;
        line-height: 30px;
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
`;

export default WelcomeStyles;
