import React, {useContext} from "react";
import ThemeContext from "../../context/Theme/ThemeContext";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import styled from "styled-components";

const ButtonStyled = styled.div`
  position: absolute;
  width: 30px;
  top: 20px;
  left: 20px;
  background: transparent;
  cursor: pointer;
  svg {
    color: var(--colorText);
  }
`;

export default function ThemeButton() {
  const {changeTheme, theme} = useContext(ThemeContext);

  const handleChangeTheme = async () => {
    const audioPrueba = new Audio("./switch2.mp3");
    audioPrueba.play();

    if (theme === "default") {
      changeTheme("dark");
    } else if (theme === "dark") {
      changeTheme("default");
    }
  };

  return (
    <ButtonStyled onClick={handleChangeTheme}>
      {theme === "default" && <Brightness7Icon />}
      {theme === "dark" && (
        <Brightness3Icon style={{transform: "rotate(130deg)"}} />
      )}
    </ButtonStyled>
  );
}
