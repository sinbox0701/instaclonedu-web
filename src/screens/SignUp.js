import {gql, useMutation} from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import { FatLink } from "../components/shared";
import routes from "../routes";
 
const HeaderContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items: center;
`; 
 
const Subtitle = styled(FatLink)`
    font-size:16px;
    text-align:center;
    margin-top: 10px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccount(
        $firstName: String!
        $lastName: String
        $username: String!
        $email: String!
        $password: String!
    ){
        createAccount(
            firstName: $firstName
            lastName: $lastName
            username: $username
            email: $email
            password: $password
        ){
            ok
            error
        }
    } 
`;
 
function SignUp() {
    const {register,handleSubmit,formState,getValues} = useForm({
        mode:"onChange"
    });
    const history = useHistory();// 원하는 url로 데이터와 함께 이동하고 싶을때 사용 
    const onCompleted = (data) => {
        const {username, password} = getValues();
        const {
            createAccount:{
                ok,
                error
            }
        } = data;
        if(!ok){
            return;
        }
        history.push(routes.home,{
            message: "Account created. Plz Log In.",
            username,
            password
        });
        //보내고 싶은 url(/home)에
        //message:"메세지 내용"
        //username:CREATE_ACCOUNT_MUTATION에서 불러온 username 값
        //password:CREATE_ACCOUNT_MUTATION에서 불러온 password 값
        //위의 3개의 데이터 보내면서 그 url로 넘어감
    };
    const [createAccount,{loading}] = useMutation(CREATE_ACCOUNT_MUTATION,{
        onCompleted,
    });
    const onSubmitValid = (data) => {
        if(loading){
            return;
        }
        createAccount({
            variables:{
                ...data
            }
        });
    }
    return (
        <AuthLayout>
            <PageTitle title="Sign Up" />
            <FormBox>
                <HeaderContainer>
                    <FontAwesomeIcon icon={faInstagram} size="3x"/>
                    <Subtitle>
                        Sign Up to see Photos and Videos from your friends.
                    </Subtitle>
                </HeaderContainer>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Input
                        ref={register({
                            required:"First Name is required."
                        })}
                        name="firstName" 
                        type="text" 
                        placeholder="First Name"
                    />
                    <Input
                        ref={register}
                        name="lastName" 
                        type="text" 
                        placeholder="Last Name"
                    />
                    <Input
                        ref={register({
                            required:"Email is  required."
                        })}
                        name="email" 
                        type="text"
                        placeholder="Email"
                    />
                    <Input 
                        ref={register({
                            required:"Username is  required."
                        })}
                        name="username"
                        type="text" 
                        placeholder="Username" 
                    />
                    <Input 
                        ref={register({
                            required:"Password is  required."
                        })}
                        name="password"
                        type="password" 
                        placeholder="Password" 
                    />
                    <Button 
                        type="submit" 
                        value={loading ? "Loading..." : "Sign up"}
                        disabled={!formState.isValid || loading}
                    />
                </form>
            </FormBox>
            <BottomBox
                cta="Have an account?"
                linkText="Login"
                link={routes.home}
            />
        </AuthLayout>
    );
}
export default SignUp;