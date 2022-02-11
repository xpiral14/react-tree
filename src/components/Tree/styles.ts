import styled from "styled-components";

export const Container = styled.ul`
  &,
  & ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  & ul {
    padding-left: 20px;
  }
  & li {
    line-height: 30px;
    color: #369;
    font-weight: bold;
    border-left: 2px solid rgb(100, 100, 100);
    margin-left: 20px;

    > div {
      margin-left: 38px;
      display: flex;
      align-items: flex-start;
    }
    /* padding: 0 20px; */
    :before {
      position: relative;
      top: 1.5em;
      padding: 0 10px;
      height: 30px;
      width: 10px;
      margin-left: 7px;
      border-bottom: 2px solid rgb(100, 100, 100);
      content: "";
      display: inline-block;
      left: -7px;
    }
  }
`;
