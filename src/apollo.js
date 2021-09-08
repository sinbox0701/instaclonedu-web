import {ApolloClient, InMemoryCache, makeVar} from "@apollo/client";

const TOKEN = "token";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
//localStorage에 저장된 token값 불러옴
export const logUserIn = (token) => {
    localStorage.setItem(TOKEN,token);
    isLoggedInVar(true);
}//localStorage에 token에 token값 저장하고 isLoggedInVar에 true 저장 --> Home.js 이동
export const logUserOut = () => {
    localStorage.removeItem(TOKEN);
    isLoggedInVar(false)
}//localStorage에 저장된 token값 제거하고 isLoggedInVar에 false 저장 --> Login.js 이동


export const darkModeVar = makeVar(false);

export const client = new ApolloClient({
    uri:"http://localhost:4000/graphql",
    cache: new InMemoryCache(),
});