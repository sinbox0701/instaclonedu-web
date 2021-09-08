import {ApolloClient, InMemoryCache, makeVar} from "@apollo/client";

export const isLoggedInVar = makeVar(false);
export const darkModeVar = makeVar(false);

export const client = new ApolloClient({
    uri:"http://localhost:4000/graphql",
    cache: new InMemoryCache(),
});
//uri: backend server
//cache: Apollo가 한번 가져온 정보를 기억해서 재 요청시 백엔드에서 다시 안 가져와도 되게 도와줌