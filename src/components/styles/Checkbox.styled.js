import styled from 'styled-components'

export const StyledCheckbox = styled.div`
  //2do later (backlog): replace style.div by style.input.
  display: flex;
  flex-direction: row;
  margin-left: 2rem;
  gap: 1rem;
  cursor: pointer;

  label {
    font-size: ${({ theme}) => theme.fontSize.default };
  }
  input {
    width:  ${({ theme}) => theme.fontSize.defaultBig };
    height:  ${({ theme}) => theme.fontSize.defaultBig };
  }
`