import {ApolloClient, InMemoryCache, makeVar, createHttpLink} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";

const TOKEN = "token";
const DARK_MODE = "DARK_MODE";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token) => {
    localStorage.setItem(TOKEN,token);
    isLoggedInVar(true);
}
export const logUserOut = () => {
    localStorage.removeItem(TOKEN);
    window.location.reload();
    // 조금 더 효율적이고 안전한 로그아웃 방법!
}

export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));
export const enableDarkMode = () => {
    localStorage.setItem(DARK_MODE,"enabled");
    darkModeVar(true);
};
export const disableDarkMode = () => {
    localStorage.removeItem(DARK_MODE);
    darkModeVar(false);
}

const httpLink = createHttpLink({
    uri:"http://localhost:4000/graphql",
});//기존 client의 uri를 받아주는 링크 

const authLink = setContext((_,{headers}) => {
    return {
        headers:{
            ...headers,
            token: localStorage.getItem(TOKEN),
        },
    };
});//http header customizing --> token을 가져오게끔

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});
//uri대신 link를 이용해 백엔드 연결
/*
    protectedResolver --> token이 유효하지 않거나 없을때 null을 반환
    localStorage에 token이 존재하지만 backend에서 작동X ==> logOut시키기 ==> token을 가짜로 만드는 것 X --> 보안적 측면
    localStorage에 token이 존재하지만 backend에서 사용 X ==> Client에게 token을 사용하라는 명령X
    --> apollo.js 변경 필요
    
 */