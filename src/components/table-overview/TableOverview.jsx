import React, { useState, useEffect, useRef} from 'react';
import { useSelector } from "react-redux";

import { Checkbox } from '../checkbox/Checkbox';
import {Container} from '../styles/Container.styled';
import ClientInClientList from './ClientInClientList';
import {ClientListAreaStyled, ClientListStyled, Column, FormControlArea, Headers, Intro, Section1, Section2, Section3} from './ClientList.styled'
import {StyledSelectbox} from '../styles/Selectbox.styled';
import { StyledSelectboxBig } from '../styles/SelectboxBig.styled';
import {createArrayWithUniqueValues, log } from '../../utils'
import { StyledCheckbox } from '../styles/Checkbox.styled';

const StudentsOverview = () => {
    const { studentsMockData } = useSelector((state) => state.studentsMockdata);
    const [assignmentObjectKeyToSortArrayWithAssignments, setAssignmentObjectKeyToSortArrayWithAssignments] = useState('');
    const [boolShowDifficultyRating, setBoolShowDifficultyRating] = useState(true);
    const [boolShowFunRating, setBoolShowFunRating] = useState(true);
    const [isHovering, setIsHovering] = useState(false);
    const [studentsFromCheckBox, setStudentsFromCheckbox] = useState(['Aranka', 'Evelyn', 'Floris', 'Hector', 'Martina', 'Maurits', 'Rahima', 'Sandra', 'Storm', 'Wietske']);
    const ref = useRef(true); // goal: checkboxes must be checked by default
    const [assignmentsFromSelectBox, setAssignmentsFromSelectBox] = useState([""]);
    const [arrayWithFilteredStudentObjects, setDataToRenderFromUseEffectPipeline] = useState([]);

    const listOfUniqueAssignmentIds = createArrayWithUniqueValues(studentsMockData, "assignmentId");
    const listOfUniqueStudentNames = createArrayWithUniqueValues(studentsMockData, "studentName");
    listOfUniqueStudentNames.sort();
    log(`arrayWithFilteredStudentObjects: `);
    log(arrayWithFilteredStudentObjects);

    const handleFilterOneOrMoreAssignmentsViaSelectBox = (event) => {
        let value = Array.from(
            event.target.selectedOptions, (option) => option.value
        )   
        setAssignmentsFromSelectBox(value);
    };

    const handleFilterOneOrMoreStudentsViaCheckbox = (event) => {
        const isChecked = event.target.checked;
        if(isChecked){
            setStudentsFromCheckbox([...studentsFromCheckBox, event.target.value]);
        }else{
            let studentsCopy = [...studentsFromCheckBox]
            let index = studentsCopy.indexOf(event.target.value);
            studentsCopy.splice(index, 1);
            setStudentsFromCheckbox(studentsCopy);
        }
    };

    const handleChangeBoolDifficultyRating = () => {
      setBoolShowDifficultyRating(!boolShowDifficultyRating);
    };
  
    const handleChangeBoolFunRating = () => {
      setBoolShowFunRating(!boolShowFunRating);
    };

    const handleMouseOver = () => {
        setIsHovering(true);
      };
    
    const handleMouseOut = () => {
    setIsHovering(false);
    };

    const filterByDifficultyRating = (arrayWithStudents, boolShowDifficultyRating) => {
            let filteredArrayWithAssignments = arrayWithStudents.map(assignment => {
                const {difficulty, ...assignmentObjectWithoutPropertyDifficulty} = assignment; 
                if (boolShowDifficultyRating) {
                    return assignment
                } 
                return assignmentObjectWithoutPropertyDifficulty
            });
        return filteredArrayWithAssignments;
    }

    const filterByFunRating = (arrayWithStudents, boolShowDifficultyRating) => {
            let filteredArrayWithAssignments = arrayWithStudents.map(assignment => {
                const {fun, ...assignmentObjectWithoutPropertyDifficulty} = assignment; 
                if (boolShowDifficultyRating) {
                    return assignment
                } 
                return assignmentObjectWithoutPropertyDifficulty
            });

        return filteredArrayWithAssignments;
    }

    const sortStudents = (clients, sortCriteriaFromSelectboxAsSpaceSeparatedString) => {
        if (!sortCriteriaFromSelectboxAsSpaceSeparatedString) {
            return clients;
        }  
        let sortCriteriaFromSelectboxAsArray = sortCriteriaFromSelectboxAsSpaceSeparatedString.split(' ');
        let personObjectKey = sortCriteriaFromSelectboxAsArray[0];
        let isAscending = sortCriteriaFromSelectboxAsArray[1] === "ascending" ? true : false;
        const lookupTable = {
            assignmentIdShort: 'assignmentIdShort',
            difficulty: 'difficulty',
            fun: 'fun'
        };
        const sortProperty = lookupTable[personObjectKey]; 
        let sortedPersons;
        if (!isAscending && (sortProperty === "difficulty" ))  {
            sortedPersons = [...clients].sort((person1, person2) => person1[sortProperty] > (person2[sortProperty]) ? 1: -1);
            return sortedPersons.reverse();
        } else if (isAscending && (sortProperty === "difficulty" ))  {
            sortedPersons = [...clients].sort((person1, person2) => person1[sortProperty] > (person2[sortProperty]) ? 1: -1);
            return sortedPersons;
        } else if (isAscending && (sortProperty === "fun" )) {
            sortedPersons = [...clients].sort((person1, person2) => person1[sortProperty] > (person2[sortProperty]) ? 1: -1);
            return sortedPersons;
        } else if (!isAscending && (sortProperty === "fun")) {
                sortedPersons = [...clients].sort((person1, person2) => person1[sortProperty] > (person2[sortProperty]) ? 1: -1);
                return sortedPersons.reverse();
        } else {
            console.error(`component DashboardOverview: not possible to sort with datatype ${typeof(sortProperty)}. Please investigate. `)
        }
    };

    const filterByOneOrMoreAssignments = (arrayWithStudents, studentsToFilterWith ) => {
        // I created this fn for winc-dentist-assignment. 
        let arrayFilteredOnAllCriteria = [];              
        if (studentsToFilterWith[0] === "" ) {
            return arrayWithStudents;
        }  else {
            let copyOfFilteredData = [...arrayWithStudents];
            let arrayFilteredOnOneCriterium;
            
            for (let filtercriterium of studentsToFilterWith) {
                arrayFilteredOnOneCriterium = copyOfFilteredData.filter(
                    (personObject) =>           
                    personObject.assignmentId.indexOf(filtercriterium) !== -1 //note-to-self: assignmentId is hard-coded.
                );
                arrayFilteredOnAllCriteria.push(...arrayFilteredOnOneCriterium)
            }
            return arrayFilteredOnAllCriteria;
        } 
    }

    const filterByOneOrMoreStudents = (arrayWithStudents, studentsToFilterWith ) => {
        let arrayFilteredOnAllCriteria = [];              
        if (studentsToFilterWith[0] === "" ) {
            return arrayWithStudents;
        }  else {
            let copyOfFilteredData = [...arrayWithStudents];
            let arrayFilteredOnOneCriterium;
            
            for (let filtercriterium of studentsToFilterWith) {
                arrayFilteredOnOneCriterium = copyOfFilteredData.filter(
                    (personObject) =>           
                    personObject.studentName.indexOf(filtercriterium) !== -1 //note-to-self: studentName is hard-coded.
                );
                arrayFilteredOnAllCriteria.push(...arrayFilteredOnOneCriterium)
            }
            return arrayFilteredOnAllCriteria;
        } 
    }
 
    useEffect(() => {
            let pipelineData = filterByDifficultyRating(studentsMockData, boolShowDifficultyRating);
            pipelineData = filterByFunRating(pipelineData, boolShowFunRating);
            pipelineData = filterByOneOrMoreStudents(pipelineData, studentsFromCheckBox ); 
            pipelineData = filterByOneOrMoreAssignments(pipelineData, assignmentsFromSelectBox ); 
            pipelineData = sortStudents(pipelineData, assignmentObjectKeyToSortArrayWithAssignments);
            setDataToRenderFromUseEffectPipeline(pipelineData);
        }, 
        [boolShowDifficultyRating, boolShowFunRating, assignmentObjectKeyToSortArrayWithAssignments, studentsFromCheckBox, assignmentsFromSelectBox ]
    );

    const [zoomDomain, setZoomDomain] = useState({x: [0, 10], y: [0, 5]}); 

  return (
    <>
    <Container> 
        <ClientListStyled>
            <Intro>Table Overview </Intro>
            <FormControlArea>
                <Section1>
                <StyledCheckbox>
                        <Checkbox
                            label="Show difficulty rating"
                            value={boolShowDifficultyRating}
                            onChange={handleChangeBoolDifficultyRating}
                        />
                    </StyledCheckbox>

                </Section1>
                <Section1>
                    <StyledCheckbox>
                        <Checkbox
                            label="Show fun rating"
                            value={boolShowFunRating}
                            onChange={handleChangeBoolFunRating}
                        />
                    </StyledCheckbox>
                </Section1>
                <Section1> 
                    <div>Sort difficulty or fun: </div>
                    <StyledSelectbox                  
                        onChange={(e) => setAssignmentObjectKeyToSortArrayWithAssignments(e.target.value)}               
                    >      
                        <option value="" >do not sort</option>
                        <option value="difficulty ascending" >difficulty a-z</option> 
                        <option value="difficulty descending" >difficulty z-a</option>
                        <option value="fun ascending" >fun a-z</option>
                        <option value="fun descending" >fun z-a</option>
                    </StyledSelectbox>
                </Section1> 
                <Section2>
                    <div className='studentsOverview'>
                        <form>
                        <p>Filter students:</p>
                        {/* 2do later: replace by map-fn. */}
                        <StyledCheckbox>
                            <input type="checkbox" name="students" value="Aranka"  onChange={handleFilterOneOrMoreStudentsViaCheckbox} ref={ref} defaultChecked={true}/>
                            <label htmlFor="student1"> Aranka</label><br />
                        </StyledCheckbox>
                        <StyledCheckbox>
                            <input type="checkbox" name="students" value="Evelyn" onChange={handleFilterOneOrMoreStudentsViaCheckbox} ref={ref} defaultChecked={true}/>
                            <label htmlFor="student1"> Evelyn</label><br />
                        </StyledCheckbox>
                        <StyledCheckbox>
                            <input type="checkbox" name="students" value="Floris"  onChange={handleFilterOneOrMoreStudentsViaCheckbox} ref={ref} defaultChecked={true}/>
                            <label htmlFor="student1"> Floris</label><br />
                        </StyledCheckbox>
                        <StyledCheckbox>
                            <input type="checkbox" name="students" value="Hector" onChange={handleFilterOneOrMoreStudentsViaCheckbox} ref={ref} defaultChecked={true}/>
                            <label htmlFor="student1"> Hector</label><br />
                        </StyledCheckbox>
                        <StyledCheckbox>
                            <input type="checkbox" name="students" value="Martina" onChange={handleFilterOneOrMoreStudentsViaCheckbox} ref={ref} defaultChecked={true}/>
                            <label htmlFor="student1"> Martina</label><br />
                        </StyledCheckbox>
                        <StyledCheckbox>
                            <input type="checkbox" name="students" value="Maurits" onChange={handleFilterOneOrMoreStudentsViaCheckbox} ref={ref} defaultChecked={true}/>
                            <label htmlFor="student1"> Maurits</label><br />
                        </StyledCheckbox>
                        <StyledCheckbox>
                            <input type="checkbox" name="students" value="Rahima" onChange={handleFilterOneOrMoreStudentsViaCheckbox} ref={ref} defaultChecked={true}/>
                            <label htmlFor="student1"> Rahima</label><br />
                        </StyledCheckbox>
                        <StyledCheckbox>
                            <input type="checkbox" name="students" value="Sandra" onChange={handleFilterOneOrMoreStudentsViaCheckbox} ref={ref} defaultChecked={true}/>
                            <label htmlFor="student1"> Sandra</label><br />
                        </StyledCheckbox>
                        <StyledCheckbox>
                            <input type="checkbox" name="students" value="Storm" onChange={handleFilterOneOrMoreStudentsViaCheckbox} ref={ref} defaultChecked={true}/>
                            <label htmlFor="student1"> Storm</label><br />
                        </StyledCheckbox>
                        <StyledCheckbox>
                            <input type="checkbox" name="students" value="Wietske" onChange={handleFilterOneOrMoreStudentsViaCheckbox} ref={ref} defaultChecked={true}/>
                            <label htmlFor="student1"> Wietske</label><br />
                        </StyledCheckbox>
                        <br />
                        </form>
                    </div>
                </Section2>
                <Section3>
                    <div>
                    <div>Filter assignments: </div>
                    <break/>
                    <StyledSelectboxBig 
                        multiple={true}
                        value={assignmentsFromSelectBox}
                        onChange={(e) => handleFilterOneOrMoreAssignmentsViaSelectBox(e)  }     
                        onMouseOver={handleMouseOver} 
                        onMouseOut={handleMouseOut}                 
                    >    
                        <option value="" >do not filter</option>  
                        {listOfUniqueAssignmentIds.map(item => {  
                            return (<option key={item} value={item}>{item}</option>);
                        })}
                    </StyledSelectboxBig>
                    {isHovering && <h3>Press Ctrl or Shift to select multiple assignments</h3>}
                    </div>
                </Section3>
            </FormControlArea>
            <Headers>
                <Column>
                    <span>Student Id</span>
                </Column>
                <Column>
                    <span>Student Name</span>
                </Column>
                <Column>
                    <span>Assignment</span>
                </Column>
                <Column>
                    <span>Assignment Difficulty</span>
                </Column>
                <Column>
                    <span>Assignment Fun</span>
                </Column>
            </Headers>
            <ClientListAreaStyled>
                { arrayWithFilteredStudentObjects.length !== 0 ? arrayWithFilteredStudentObjects.map((item, id) => {                                         
                    return ( 
                    <ClientInClientList key={id} item={item}  />
                    )})
                    : 
                    <>No student data to display.</>
                }
            </ClientListAreaStyled>        
        </ClientListStyled>  
    </Container>
    </>
  )
}

export default StudentsOverview