import React from 'react';
import {Row, Column} from './ClientList.styled'
import { ClientInClientListStyled } from './ClientInList.styled';

const ClientInClientList = ({item, index}) => {

  return (
    <Row>
        <Column>
          <ClientInClientListStyled>
            {item.studentId}
          </ClientInClientListStyled>
        </Column>
        <Column>
          <ClientInClientListStyled>
            {item.studentName}
          </ClientInClientListStyled>
        </Column>
        <Column>
          <ClientInClientListStyled>
            {item.assignmentId}
          </ClientInClientListStyled>
        </Column>
        <Column>
          <ClientInClientListStyled>
            {item.difficulty}
          </ClientInClientListStyled>
        </Column>
        <Column>
          <ClientInClientListStyled>
            {item.fun}
          </ClientInClientListStyled>
        </Column>
        
    </Row>
  )
}

export default ClientInClientList;




