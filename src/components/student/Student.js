import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import {useParams} from "react-router-dom";
import {Link} from 'react-router-dom';


import {
    VictoryZoomContainer,
    VictoryBrushContainer,
    VictoryBar,
    VictoryChart,
    VictoryGroup,
    VictoryTooltip,
    VictoryAxis 
} from "victory";

import { studentUserProfiles } from '../../data/studentUserProfiles';
import { makeAssignmentIdShort } from '../../utils';
import {Container} from '../styles/Container.styled';
import {ClientListAreaStyled, ClientListStyled, Column, FormControlArea, Headers, Intro, Section1, Section2, Section3} from './ClientList.styled'
import {wincTheme} from "../styles/wincTheme";

const Student = () => {
    const { studentsMockData } = useSelector((state) => state.studentsMockdata);
    let {id} = useParams()
    const [zoomDomain, setZoomDomain] = useState({x: [0, 10], y: [0, 5]}); 


    let objectKeyToFilter = id;
    let filterStudentObjectWithAssignmentId = student => student.studentName === objectKeyToFilter;

    const createArrayWithObjectsFilteredOnObjectKey = (filterFn, array) => {
        const filterObjects = (array, filterFunction) => {
            let filteredArr = array.filter(filterFunction)
            return filteredArr;
        }
        let arrayWithStudentObjectsFilteredOnOneSpecificAssignmentId = filterObjects(array, filterFn );
        return arrayWithStudentObjectsFilteredOnOneSpecificAssignmentId;
    }
    let arrayWithStudentObjectsFilteredOnOneSpecificAssignmentId = createArrayWithObjectsFilteredOnObjectKey(filterStudentObjectWithAssignmentId, studentsMockData);

    const createallGradesForFunAndDifficultyFor1StudentFor1Student = (allGradesForFunAndDifficultyFor1StudentOfTheSameStudent) =>
        allGradesForFunAndDifficultyFor1StudentOfTheSameStudent.map(assignmentObject => ({ 
                "studentName": assignmentObject.studentName,
                "assignmentId": assignmentObject.assignmentId,
                "assignmentIdShort": makeAssignmentIdShort(assignmentObject.assignmentId, 6), 
                "difficulty": assignmentObject.difficulty,
                "fun": assignmentObject.fun,
                "label": `Student ${assignmentObject.studentName}. Opdracht ${ assignmentObject.assignmentId
                }, difficultyRating: ${assignmentObject.difficulty.toFixed(1)}, 
                enjoymentRating: ${assignmentObject.fun.toFixed(1)}`
            })
        );

    let allGradesForFunAndDifficultyFor1Student = createallGradesForFunAndDifficultyFor1StudentFor1Student(arrayWithStudentObjectsFilteredOnOneSpecificAssignmentId);
    let studentUserProfileToDisplay = createArrayWithObjectsFilteredOnObjectKey(filterStudentObjectWithAssignmentId, studentUserProfiles);
    let {lastName, firstName, phone, email, age, studentPhoto} = studentUserProfileToDisplay[0];

  return (
    <>
    <Container> 
            <ClientListStyled>
                <Intro>User Profile of Student: {firstName} {lastName} </Intro>
                <FormControlArea>
                    <Section1>
                        <img src={studentPhoto} height="80" width="80"/>
                    </Section1>                
                    <Section1>
                        <div>last name:</div>
                        <div>{lastName}</div>
                    </Section1>
                    <Section1>
                        <div>first name:</div>
                        <div>{firstName}</div>
                    </Section1>
                    <Section1> 
                        <div>phone number:</div>
                        <div>{phone}</div>
                    </Section1> 
                    <Section1> 
                        <div>email:</div>
                        <div>{email}</div>
                    </Section1> 
                    <Section1> 
                        <div>age:</div>
                        <div>{age}</div>
                    </Section1> 
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
                    data={allGradesForFunAndDifficultyFor1Student}
                    x = "assignmentIdShort"
                    y = "fun"
                    tickValues={[1, 2, 3, 4, 5]}
                    tickFormat={allGradesForFunAndDifficultyFor1Student.map(
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
                    data={allGradesForFunAndDifficultyFor1Student}
                    x = "assignmentIdShort"
                    y = "difficulty"
                    tickValues={[1, 2, 3, 4, 5]}
                    tickFormat={allGradesForFunAndDifficultyFor1Student.map(
                        avg => avg.assignmentId
                        )}
                />   
            </VictoryGroup>
            <VictoryAxis 
                tickFormat={allGradesForFunAndDifficultyFor1Student.map(
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
            data={allGradesForFunAndDifficultyFor1Student}
            x = "assignmentIdShort"
            y = "difficulty"  
        />
        <VictoryAxis  
            tickFormat={allGradesForFunAndDifficultyFor1Student.map(
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

export default Student