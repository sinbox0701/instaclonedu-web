import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BaseBox } from "../shared";
 
const SBottomBox = styled(BaseBox)`
  padding: 20px 0px;
  text-align: center;
  a {
    font-weight: 600;
    margin-left: 5px;
    color: ${(props) => props.theme.accent};
  }
`;
 
function BottomBox({ cta, link, linkText }) {
    return (
        <SBottomBox>
            <span>{cta}</span>
            <Link to={link}>{linkText}</Link>
        </SBottomBox>
    );
}
 
BottomBox.propTypes = {
    cta: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
};
//BottomBox로 넘겨주는 props(cta,link,linkText)를 전부 String 타입이며 필수로 입력해야한다고 정의함
 
export default BottomBox;