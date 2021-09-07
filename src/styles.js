import {createGlobalStyle} from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
    accent: "#0095f6",
    bgColor:"#FAFAFA",
    fontColor:"rgb(38, 38, 38)",
    borderColor:"rgb(219, 219, 219)"
};

export const darkTheme = {
    fontColor:"white",
    bgColor:"#2c2c2c"
};
//lightTheme에만 있고 darkTheme에 없는 요소들은 본인이 원하는 색으로 채워보기!

export const GlobalStyles = createGlobalStyle`
    ${reset}
    input {
        all:unset;
    }
    * {
        box-sizing:border-box;
    }
    body{
        background-color: #FAFAFA;
        font-size:14px;
        font-family:'Open Sans', 'sans-serif';
        color:rgb(38,38,38);
    }
    a {
        text-decoration: none;
    }
`;