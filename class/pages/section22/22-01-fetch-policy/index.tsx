import {useQuery, gql} from '@apollo/client'
import { useState } from 'react'
import { useRouter } from 'next/router'
import type { IQuery, IQueryFetchBoardsArgs } from '../../../src/commons/types/generated/types'
import FetchPolicyExample from '../../../src/components/units/21-fetch-policy'

const FETCH_BOARDS = gql`
  query fetchBoards{
    fetchBoards{
      _id
      writer
      title
    }
  }
`
export default function FetchBoardsPage():JSX.Element{
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false)
  const { data } = useQuery<Pick<IQuery,"fetchBoards">,IQueryFetchBoardsArgs>(FETCH_BOARDS)
  const onClickIsOpen = ():void => {
    setIsOpen(true)
  }
  const onClickMove = ():void => {
    void router.push("/section22/22-01-fetch-policy-moved")
  }
  return (
    <div>
      <button onClick={onClickIsOpen}>클릭 시 새로 등장</button>
      {isOpen && <FetchPolicyExample /> }
      ====================
      <button onClick={onClickMove}>클릭 시 페이지가 이동</button>
    </div>
  )
}