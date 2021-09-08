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

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
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
//altair에서 하듯이 gql문 작성해주기

function Login() {
    const {register,handleSubmit,errors,formState,getValues,setError,clearErrors} = useForm({
        mode:"onChange",
    });
    //getValues --> useForm안에 받아놓은 value 반환
    //setError--> error custumizing
    //clearErrors --> 원하는 에러 삭제
    const onCompleted = (data) => {
        const {
            login:{ok,error,token}
        } = data;//받아온 데이터 중 login이라는 데이터안의 ok,error,token 값을 받아옴
        //이해가 안된다면 consile.log(data) 해보세유
        if(!ok){
            return setError("result",{
                message:error
            });
            //error 발생시 에러를 result:발생한 에러 로 저장하기 위해 사용
        }
        if(token){
            logUserIn(token);
        }
    };
    /* 함수명을 onCompleted라 지은 이유 
       --> 아래에 useMutation을 사용할 때 useMutation에서 
       onCompleted:함수명 을 사용할수 있는데 사용하게되면 useMutation 동작 처리가 끝나기 직전에 
       불러온 함수를 사용한다
       onCompleted:함수명 이렇게 쓰기 귀찮으니까 함수명을 onCompleted로 하여 onCompleted만 쓰게하려고
    */
    const [login,{loading}] = useMutation(LOGIN_MUTATION,{
        onCompleted,
    });
    const clearLoginError = () => {
        clearErrors("result");
        //위에서 생성한 result:error들을 전부 지움
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