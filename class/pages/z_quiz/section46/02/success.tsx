import { gql, useQuery } from "@apollo/client"
import type { IQuery } from "../../../../src/commons/types/generated/types"
import { useAuth } from "../../../../src/components/commons/hooks/useAuth"
const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      name
    }
  }
`
export default function LoginSuccessPage():JSX.Element {
  const { data } = useQuery<Pick<IQuery,"fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN)
  useAuth()
  return <>{data?.fetchUserLoggedIn.name}님 환영합니다.</>
}
