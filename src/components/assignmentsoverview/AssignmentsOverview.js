import React, { useState, useEffect, useMemo  } from 'react';
import { useSelector } from "react-redux";
import { Checkbox } from '../checkbox/Checkbox';
import {Container} from '../styles/Container.styled'
import {ClientListStyled, FormControlArea, Headers, Intro, Section1, Section2, Section3} from './ClientList.styled'
import {StyledSelectbox} from '../styles/Selectbox.styled';
import {
    VictoryZoomContainer,
    VictoryBrushContainer,
    VictoryBar,
    VictoryChart,
    VictoryGroup,
    VictoryTooltip,
    VictoryAxis} from "victory";
import {
    createArrayWithAssignmentObjects,
    createArrayWithUniqueValues, 
    createAssignmentObjectForEachAssignmentId} from '../../utils'; 
import {wincTheme} from "../styles/wincTheme";
import { StyledCheckbox } from '../styles/Checkbox.styled';

const AssignmentsOverview = () => {
        const { studentsMockData } = useSelector((state) => state.studentsMockdata);
        const [assignmentObjectKeyToSortArrayWithAssignments, setAssignmentObjectKeyToSortArrayWithAssignments] = useState('');
        const [boolShowDifficultyRating, setBoolShowDifficultyRating] = useState(true);
        const [boolShowFunRating, setBoolShowFunRating] = useState(true);
        const [arrayWithFilteredAssignmentObjects, setDataToRenderFromUseEffectPipeline] = useState([]);
        const [zoomDomain, setZoomDomain] = useState({x: [0, 10], y: [0, 5]}); 
        const listOfUniqueAssignmentIds = createArrayWithUniqueValues(studentsMockData, "assignmentId");
        const listOfUniqueStudentNames = createArrayWithUniqueValues(studentsMockData, "studentName");
        listOfUniqueStudentNames.sort();
        let arrayWithAssignmentObjects = useMemo(() => { 
            return createArrayWithAssignmentObjects(createAssignmentObjectForEachAssignmentId, studentsMockData, listOfUniqueAssignmentIds)}, 
            [studentsMockData]
        );

        const handleChangeBoolDifficultyRating = () => {
        setBoolShowDifficultyRating(!boolShowDifficultyRating);
        };
    
        const handleChangeBoolFunRating = () => {
        setBoolShowFunRating(!boolShowFunRating);
        };

        const filterByDifficultyRating = (arrayWithAssignments, boolShowDifficultyRating) => {
                let filteredArrayWithAssignments = arrayWithAssignments.map(assignment => {
                    let {fun, ...assignmentObjectWithoutPropertyDifficulty} = assignment;
                    if (boolShowDifficultyRating) {
                        return assignment
                    } 
                    return assignmentObjectWithoutPropertyDifficulty
                });
            return filteredArrayWithAssignments;
        }

        const filterByFunRating = (arrayWithAssignments, boolShowDifficultyRating) => {
                let filteredArrayWithAssignments = arrayWithAssignments.map(assignment => {
                    let {difficulty, ...assignmentObjectWithoutPropertyDifficulty} = assignment; 
                    if (boolShowDifficultyRating) {
                        return assignment
                    } 
                    return assignmentObjectWithoutPropertyDifficulty
                });
            return filteredArrayWithAssignments;
        }

        const sortAssignments = (clients, sortCriteriaFromSelectboxAsSpaceSeparatedString) => {
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

        useEffect(() => {
                let pipelineData = filterByDifficultyRating(arrayWithAssignmentObjects, boolShowDifficultyRating);
                pipelineData = filterByFunRating(pipelineData, boolShowFunRating);
                pipelineData = sortAssignments(pipelineData, assignmentObjectKeyToSortArrayWithAssignments);
                setDataToRenderFromUseEffectPipeline(pipelineData);
            }, 
            [arrayWithAssignmentObjects, assignmentObjectKeyToSortArrayWithAssignments, boolShowDifficultyRating, boolShowFunRating  ]
        );
  return (
    
    <>
    <Container> 
        <ClientListStyled>
            <Intro>Dashboard Assignments Overview</Intro>
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
                        <option value="fun ascending" >difficulty a-z</option> 
                        <option value="fun descending" >difficulty z-a</option>
                        <option value="difficulty ascending" >fun a-z</option>
                        <option value="difficulty descending" >fun z-a</option>
                    </StyledSelectbox>
                </Section1>
                <Section2>
                </Section2>
                <Section3>
                </Section3>
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
                    data={arrayWithFilteredAssignmentObjects}
                    x = "assignmentIdShort"
                    y = "fun"
                    tickValues={[1, 2, 3, 4, 5]}
                    tickFormat={arrayWithFilteredAssignmentObjects.map(
                        avg => avg.assignmentId
                        )}
                />
                <VictoryBar 
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
                    data={arrayWithFilteredAssignmentObjects}
                    x = "assignmentIdShort"
                    y = "difficulty"
                    tickValues={[1, 2, 3, 4, 5]}
                    tickFormat={arrayWithFilteredAssignmentObjects.map(
                        avg => avg.assignmentId
                        )}
                />   
            </VictoryGroup>
            <VictoryAxis 
                tickFormat={arrayWithFilteredAssignmentObjects.map(
                avg => avg.assignmentIdShort 
                )}
                label="Assignment IDs"
                style={{
                    tickLabels: {
                        fontSize: 10,
                        angle: 0,
                        padding: 12,
                      }
                }}
            />
            <VictoryAxis dependentAxis 
                label="Rating of assignment difficulty (blue) and fun (yellow)"
                style={{
                    tickLabels: {
                        fontSize: 10,
                        angle: 0,
                        padding: 12,
                      }
                }}
            />
          </VictoryChart>
        <VictoryChart  
            theme={wincTheme} 
            width={800} 
            height={150} 
            domainPadding={10}
            padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
            scale={{ x: "linear" }}
            containerComponent={
                <VictoryBrushContainer
                brushDimension="x"
                brushDomain={zoomDomain}
                onBrushDomainChange={setZoomDomain} 
                />
            }
        >
        <VictoryBar 
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
            data={arrayWithFilteredAssignmentObjects}
            x = "assignmentIdShort"
            y = "victoryBrushContainer" 
        />
        <VictoryAxis  
            tickFormat={arrayWithFilteredAssignmentObjects.map(
                avg => avg.assignmentIdShort
                )}
                style={{
                    axisLabel: {
                        textAnchor: "middle",
                        fontFamily: "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
                        fontSize: 9,
                        letterSpacing: "normal",
                        padding: 8,
                        fill: "#455A64",
                        stroke: "transparent",
                        strokeWidth: 0
                      },
                    ticks: {
                        fill: "transparent",
                        size: 6,
                        stroke: "#90A4AE",
                        strokeWidth: 3,
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                      },
                    tickLabels: {
                        fontFamily: "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
                        fontSize: 7, 
                        angle: 90, 
                        letterSpacing: "normal",
                        padding: 8,
                        fill: "#455A64",
                        stroke: "transparent",
                        strokeWidth: 0
                    }
                }}
        />
        <VictoryAxis dependentAxis 
            label="Assignment ratings overview"
            tickValues={['1.0', '2.0', '3.0', '4.0', '5.0']} 
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

export default AssignmentsOverview