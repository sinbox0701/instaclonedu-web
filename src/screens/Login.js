import { faFacebookSquare, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {gql, useMutation} from "@apollo/client";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import PageTitle from "../components/PageTitle";
import routes from "../routes";
import { logUserIn } from "../apollo";
import { useLocation } from "react-router";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Notification = styled.div`
  color: #2ecc71;
`;

const LOGIN_MUTATION = gql`
    mutation Login($username:String!,$password:String!){
        login(username:$username,password:$password){
            ok
            token
            error
        }
    }
`;

function Login() {
    const location = useLocation();//useHistory에서 넘어온 값을 사용가능하게 해줌
    const {register,handleSubmit,errors,formState,getValues,setError,clearErrors} = useForm({
        mode:"onChange",
        defaultValues:{
            username:location?.state?.username || "",
            password:location?.state?.password || "",
        }
    });
    //defaultValues --> 원하는 곳(태그의 name value를 이용)에 원하는 값을 처음에 지정 가능
    const onCompleted = (data) => {
        const {
            login:{ok,error,token}
        } = data;
        if(!ok){
            return setError("result",{
                message:error
            });
        }//{"result":{message:"로그인 실패!"}}
        if(token){
            logUserIn(token);
        }
    };
    const [login,{loading}] = useMutation(LOGIN_MUTATION,{
        onCompleted,
    });
    const clearLoginError = () => {
        clearErrors("result");

    };
    const onSubmitValid = (data) => {
        if(loading){
            return ;
        }
        const {username,password} = getValues();
        login({
            variables:{username,password}
        });
    };
    return (
        <AuthLayout>
            <PageTitle title="Login" />
            <FormBox>
                <div>
                    <FontAwesomeIcon icon={faInstagram} size="3x"/>
                </div>
                <Notification>{location?.state?.message}</Notification>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Input 
                        ref={register({
                            required:"Username is required",
                            minLength:{
                                value:5,
                                message:"Username should be longer than 5 chars."
                            }
                        })}
                        onChange={clearLoginError}
                        name="username"
                        type="text" 
                        placeholder="Username"
                        hasError={Boolean(errors?.username?.message)} 
                    />
                    <FormError message={errors?.username?.message} />
                    <Input 
                        ref={register({
                            required:"Password is required",
                        })}
                        onChange={clearLoginError}
                        name="password"
                        type="password" 
                        placeholder="Password"
                        hasError={Boolean(errors?.password?.message)} 
                    />
                    <FormError message={errors?.password?.message} />
                    <Button type="submit" value={loading ? "Loading..." :"Login"} disabled={!formState.isValid || loading} />
                    <FormError message={errors?.result?.message} />
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