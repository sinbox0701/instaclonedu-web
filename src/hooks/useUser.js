import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";

export const ME_QUERY = gql`
  query me {
      me {
      id
      username
      avatar
    }
  }
`;

function useUser() {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery(ME_QUERY, {
    skip: !hasToken,
  });//token이 없으면 useQuery 사용 X
  //Query문에는 useQuery, Mutation문에는 useMuatation 사용
  
  useEffect(() => {
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);//data가 변경될때마다 useEffect 실행

  return { data };
}
export default useUser;