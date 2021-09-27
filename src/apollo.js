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
});

const authLink = setContext((_,{headers}) => {
    return {
        headers:{
            ...headers,
            token: localStorage.getItem(TOKEN),
        },
    };
});
export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        typePolicies:{
            User:{
                keyFields: (obj) => `User:${obj.username}`
            }
        }
    }),
});
/*
Apollo Cache 이용 --> 객체를 명확하게 구분하기 위해서 (with 고유식별자)
    
 */