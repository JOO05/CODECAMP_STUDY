import { gql, useQuery } from "@apollo/client"
import type { IQuery, IQueryFetchPointTransactionsOfSellingArgs } from "../../../../src/commons/types/generated/types"
const FETCH_POINT = gql`
  query {
    fetchPointTransactionsOfSelling {
      _id
      impUid
      amount
    }
  }
`
export default function CompletePage():JSX.Element {
  const { data } = useQuery<Pick<IQuery,"fetchPointTransactionsOfSelling">,IQueryFetchPointTransactionsOfSellingArgs>(FETCH_POINT)
  return <>충전한 포인트는 {data?.fetchPointTransactionsOfSelling.amount}원</>
}