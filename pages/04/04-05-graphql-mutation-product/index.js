import { gql, useMutation } from '@apollo/client'
import { Fragment } from 'react'

const CREATE_PRODUCT = gql`
  mutation createProduct($seller: String, $createProductInput: CreateProductInput!){ 
    createProduct(seller: $seller, createProductInput:$createProductInput){ 
      _id
      number
      message
    }
  }
`

export default function GraphqlMutationPage(){

  const [myFunction] = useMutation(CREATE_PRODUCT)

  const onClickSubmit = async () => {
    const result = await myFunction({
      variables:{
        seller:"ㅈㅎㅈ",
        createProductInput:{
          name:"키보드",
          detail:"개좋음",
          price:10000
        }
      }
    })
    console.log(result)
    alert(result.data.createProduct.message)
  }

  return(
    <Fragment>
      <button onClick={onClickSubmit}>GRAPHQL-API(동기) 요청하기</button>
    </Fragment>
  )
}