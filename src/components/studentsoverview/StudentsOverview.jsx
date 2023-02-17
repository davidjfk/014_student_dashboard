import React, { useState, useEffect, useRef, useMemo  } from 'react';
import { useSelector } from "react-redux";
import { Checkbox } from '../checkbox/Checkbox';
import {Container} from '../styles/Container.styled'
import {ClientListStyled, FormControlArea, Headers, Intro, Section1, Section2} from './ClientList.styled'
import {StyledSelectbox} from '../styles/Selectbox.styled';
import {
    VictoryZoomContainer,
    VictoryBar,
    VictoryChart,
    VictoryGroup,
    VictoryTooltip,
    VictoryAxis 
} from "victory";
import {
    createArrayWithAssignmentObjects,
    createArrayWithUniqueValues, 
    createAssignmentObjectForEachAssignmentId,
    createStudentObjectForEachStudentId,
    createArrayWithStudentObjects,
    log } from '../../utils';
import {wincTheme} from "../styles/wincTheme";
import { StyledCheckbox } from '../styles/Checkbox.styled';

const StudentsOverview = () => {
    const { studentsMockData } = useSelector((state) => state.studentsMockdata);
    const listOfUniqueAssignmentIds = createArrayWithUniqueValues(studentsMockData, "assignmentId");
    let arrayWithAssignmentObjects = useMemo(() => { 
        return createArrayWithAssignmentObjects(createAssignmentObjectForEachAssignmentId, studentsMockData, listOfUniqueAssignmentIds)}, 
        [studentsMockData]
    );
    const [assignmentObjectKeyToSortArrayWithAssignments, setAssignmentObjectKeyToSortArrayWithAssignments] = useState('');
    const [boolShowDifficultyRating, setBoolShowDifficultyRating] = useState(true);
    const [boolShowFunRating, setBoolShowFunRating] = useState(true);
    const [studentsFromCheckBox, setStudentsFromCheckbox] = useState(['Aranka', 'Evelyn', 'Floris', 'Hector', 'Martina', 'Maurits', 'Rahima', 'Sandra', 'Storm', 'Wietske']);
    const ref = useRef(true); 
    const [arrayWithFilteredStudentObjects, setDataToRenderFromUseEffectPipeline] = useState([]);
    const [zoomDomain, setZoomDomain] = useState({x: [0, 10], y: [0, 5]}); 

    const listOfUniqueStudentNames = createArrayWithUniqueValues(studentsMockData, "studentName");
    listOfUniqueStudentNames.sort();
    const arrayWithUniqueStudentObjects = createArrayWithStudentObjects(createStudentObjectForEachStudentId, studentsMockData, listOfUniqueStudentNames);

    const handleFilterOneOrMoreStudentsViaCheckbox = (event) => {
        log(`fn handleFilterOneOrMoreStudentsViaCheckbox: start: `);
        log(event.target.checked);
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


    const filterByOneOrMoreStudents = (arrayWithStudents, studentsToFilterWith ) => {
        log(`fn filterByOneOrMoreStudents: start: rrr`);
        log(studentsToFilterWith);

        let arrayFilteredOnAllCriteria = [];              
        if (studentsToFilterWith[0] === "" ) {
            return arrayWithStudents;
        }  else {
            let copyOfFilteredData = [...arrayWithStudents];
            let arrayFilteredOnOneCriterium;
            
            for (let filtercriterium of studentsToFilterWith) {
                arrayFilteredOnOneCriterium = copyOfFilteredData.filter(
                    (personObject) =>           
                    personObject.studentName.indexOf(filtercriterium) !== -1 
                );
                arrayFilteredOnAllCriteria.push(...arrayFilteredOnOneCriterium)
            }
            return arrayFilteredOnAllCriteria;
        } 
    }
 
    useEffect(() => {
            let pipelineData = filterByDifficultyRating(arrayWithUniqueStudentObjects, boolShowDifficultyRating);
            pipelineData = filterByFunRating(pipelineData, boolShowFunRating);
            pipelineData = filterByOneOrMoreStudents(pipelineData, studentsFromCheckBox ); 
            pipelineData = sortStudents(pipelineData, assignmentObjectKeyToSortArrayWithAssignments);
            setDataToRenderFromUseEffectPipeline(pipelineData);
        }, 
        [arrayWithAssignmentObjects, boolShowDifficultyRating, boolShowFunRating, assignmentObjectKeyToSortArrayWithAssignments, studentsFromCheckBox ]
    );

  return (
    <>
    <Container> 
        <ClientListStyled>
            <Intro>Dashboard Students Overview </Intro>
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
                    <StyledSelectbox                  
                        onChange={(e) => setAssignmentObjectKeyToSortArrayWithAssignments(e.target.value)}                 
                    >      
                        <option value="" >Sort by:</option>
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
                <Section2>
                </Section2>
            </FormControlArea>
            <Headers>
            </Headers>
        </ClientListStyled>  
    </Container>
        <VictoryChart 
            theme={wincTheme} 
            width={800} 
            height={350}    
            containerComponent={
                <VictoryZoomContainer 
                zoomDimension="x" 
                zoomDomain={zoomDomain}
                />
            }
        >
            <VictoryGroup offset={10} 
                    style = {{
                        data: {
                            padding: 10,
                            strokeWidth: 5 
                        },
                        labels: {
                            fontFamily: "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
                            fontSize: 8,
                            letterSpacing: "normal",
                            padding: 18,
                            stroke: "transparent",
                            strokeWidth: 0
                        }
                    }}            
            >
                <VictoryBar 
                    groupComponent={<g transform="translate(-1, -2)" />}
                    barWidth={5}
                    height={100}
                    style = {{
                        data: {
                            fill: "#D4E7FA", 
                            padding: 0,
                            strokeWidth: 5 
                        }
                    }}
                    labelComponent={
                        <VictoryTooltip   
                            style={{fontSize: '10px'}}
                            flyoutWidth={310}
                            flyoutHeight={60}
                            cornerRadius={8}
                            pointerLength={20}
                            flyoutStyle={{
                                strokeWidth: 1,
                            }}  
                        />
                    }
                    data={arrayWithFilteredStudentObjects}
                    x = "studentName"
                    y = "difficulty"
                    tickValues={[1, 2, 3, 4, 5]}
                    tickFormat={arrayWithFilteredStudentObjects.map(
                        avg => avg.studentName
                        )}
                />
                <VictoryBar 
                    groupComponent={<g transform="translate(2, -2)" />}
                    barWidth={5}
                    style = {{
                        data: {
                            fill: "#FCD808", 
                            padding: 0,
                            strokeWidth: 5 
                        },
                    }}

                    labelComponent={
                        <VictoryTooltip 
                            style={{fontSize: '10px'}}
                            flyoutWidth={310}
                            flyoutHeight={60}
                            cornerRadius={8}
                            pointerLength={20}
                            flyoutStyle={{
                                strokeWidth: 1,
                            }} 
                        />
                    }                    
                    data={arrayWithFilteredStudentObjects}
                    x = "studentName"
                    y = "fun"
                    tickValues={[1, 2, 3, 4, 5]}
                    tickFormat={arrayWithFilteredStudentObjects.map(
                        avg => avg.studentName
                        )}
                />   
            </VictoryGroup>
            <VictoryAxis 
                tickFormat={arrayWithFilteredStudentObjects.map(
                avg => avg.studentName 
                )}
                label="Student Names"
                style={{
                    tickLabels: {
                        fontSize: 10,
                        angle: 0,
                        padding: 12,
                      }
                }}
            />
            <VictoryAxis dependentAxis 
                label="Rating of student difficulty (blue) and fun (yellow)"
                style={{
                    tickLabels: {
                        fontSize: 10,
                        angle: 0,
                        padding: 12,
                      }
                }}
            />
          </VictoryChart>
    </>
  )
}

export default StudentsOverview