import styled from 'styled-components'

export const StyledFlexboxColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 60px;
  padding-left: 3rem;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 1.4rem;

  .titleOutlier {
    align-self: flex-start;
    margin-left: 60px;
  }

//   font-size: ${({ theme}) => theme.fontSize.default };
//   width:  ${({ theme}) => theme.fontSize.big };
//   height:  ${({ theme}) => theme.fontSize.big };
 
`