import styled from 'styled-components';


const Button = styled.button`
  display: block;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  :active {
    background-color: #005fa3;
  }

color: white;
  padding: 5px 10px;
  background-color: rgba(12, 12, 12, 0.66);
  border: 2px solid black;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    background-color: white;
    color: black;
    transform: scale(1.1);
  }
 `;
export default Button;