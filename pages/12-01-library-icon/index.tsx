import { BackwardOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";

const MyIcon = styled(BackwardOutlined)`
  color:red;
  font-size: larger;
`
export default function LibraryIconPage() {
  return (
    <MyIcon rev={undefined} />
  )
}