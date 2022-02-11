import styled from "styled-components";

export const Container = styled.div`
  input[type="checkbox"] {
    /* Add if not using autoprefixer */
    -webkit-appearance: none;
    appearance: none;
    /* For iOS < 15 to remove gradient background */
    background-color: #fff;
    /* Not removed via appearance */
    margin: 0;
  }
  > label {
    display: flex;
    align-items: center;
    /* gap: 10px; */
  }
`;
export const CheckBoxContainer = styled.div`
  width: 15px;
  height: 15px;
  border: 1px solid black;
  border-radius: 2px;
  display: inline-block;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

export const IndeterminateIcon = styled.div`
  width: calc(100% - 5px);
  border-bottom: 1px solid black;
`;
