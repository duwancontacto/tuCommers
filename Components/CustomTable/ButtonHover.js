import styled from "styled-components";
//In  Props     size={"2rem"}

const ButtonHover = styled.button`
  font-size: ${(props) => (props.size ? props.size : "2em")};
  display: flex;
  align-items: "start";
  justify-content: center;
  margin: 0 auto;
  cursor: pointer;
  background: transparent;

  border: none;
  color: inherit;
  :hover {
    transform: scale(1.2);
  }
  :active {
    transform: scale(0.8);
  }
`;

export default ButtonHover;
