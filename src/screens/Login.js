import { faFacebookSquare, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import routes from "../routes";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

function Login() {
    return (
        <AuthLayout>
            <FormBox>
                <div>
                    <FontAwesomeIcon icon={faInstagram} size="3x"/>
                </div>
                <form>
                    <Input type="text" placeholder="Username" />
                    <Input type="password" placeholder="Password" />
                    <Input type="submit" value="Login" />
                </form>
                <Separator>
                    <div></div>
                    <span>Or</span>
                    <div></div>
                </Separator>
                <FacebookLogin>
                    <FontAwesomeIcon icon={faFacebookSquare} />
                </FacebookLogin>
            </FormBox>
            <BottomBox
                cta="Don't have an account?"
                linkText="Sign Up"
                link={routes.signUp}
            />
        </AuthLayout>
    );
}

export default Login;