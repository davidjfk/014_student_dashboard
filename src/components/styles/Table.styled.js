import styled from 'styled-components'

export const StyledTable = styled.table`
  width: 500px;
  border-width: 1px;
  border-color: black;
  border-style: ridge;
  border-radius: 10px;
  margin-left: 30px;
        
    th {
        border-bottom: 1px solid black;
        border-right: 1px solid black;
        font-weight: normal;
    }
        
    td {
        text-align: center;
    }

  .tableTitle {
    font-weight: bold;
  }
`