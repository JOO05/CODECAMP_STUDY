import { gql, useApolloClient } from "@apollo/client"
import { wrapAsync } from "../../../src/commons/libraries/asyncFunc"
const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      email
      name
    }
  }
`
export default function LoginSuccessPage():JSX.Element {
  const client = useApolloClient()
  const onClickButton = async ():Promise<void> => {
    const result = await client.query({
      query:FETCH_USER_LOGGED_IN
    })
    console.log(result)
  }
  return (
    <>
      <button onClick={wrapAsync(onClickButton)}>클릭</button>
    </>
  )
}