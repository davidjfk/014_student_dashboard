import React from 'react';
import { useSelector } from "react-redux";
import {Routes, Route, Link } from "react-router-dom";
import { createArrayWithUniqueValues} from '../../utils';
import Student from '../student/Student';
import {StyledFlexbox} from '../styles/Flexbox.styled';
import { StyledLink } from '../styles/Link.styled';
import {Container} from '../styles/Container.styled'
import {ClientListStyled, FormControlArea, Headers, Intro, Section1, Section2, Section3} from './ClientList.styled'

const StudentPages = () => {
    const { studentsMockData } = useSelector((state) => state.studentsMockdata);
    let listOfUniqueStudentNames = createArrayWithUniqueValues(studentsMockData, "studentName");
    listOfUniqueStudentNames.sort();
  return (
    <>

    <Container> 
        <ClientListStyled>
            <Intro>Student Pages</Intro>
            <FormControlArea>
                <Section1>
                    <StyledFlexbox>
                        {listOfUniqueStudentNames.map((student) => (  
                            <StyledFlexbox key={student}>
                                <StyledLink 
                                    to={`student/${student}`}>{student} 
                                </StyledLink>
                            </StyledFlexbox>
                        ))}
                    </StyledFlexbox>
                </Section1>
            </FormControlArea>
            <Headers>
            </Headers>
        </ClientListStyled>  
    </Container>






        <Routes>
            <Route path="/student/:id" element={
                        <>
                            <Student />
                        </>
                    } />  
        </Routes>

    </>
  )
}
export default StudentPages