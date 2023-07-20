import { Rate } from 'antd';
import styled from "@emotion/styled";
import React, { useState } from 'react';

const MyStar = styled(Rate)`
`
export default function LibraryIconPage() {
  const [value,setValue] = useState(3)

  const qqq = (value:number) => {
    setValue(value)
  }
  return <MyStar onChange={qqq} value={value} />

}