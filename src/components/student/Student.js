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
    VictoryLabel,
    VictoryLine,
    VictoryPie,
    VictoryAxis 
} from "victory";

import { studentUserProfiles } from '../../data/studentUserProfiles';

import { createArrayWithUniqueValues, log } from '../../utils';

import { makeAssignmentIdShort } from '../../utils';

import {Container} from '../styles/Container.styled'
import {ClientListAreaStyled, ClientListStyled, Column, FormControlArea, Headers, Intro, Section1, Section2, Section3} from './ClientList.styled'
import {wincTheme} from "../styles/wincTheme";

const Student = (props) => {
// part 1: ETL the data: START: 
    // step1: create nested routing:
    const { studentsMockData } = useSelector((state) => state.studentsMockdata);
    let {id} = useParams()
    log(`id:`);
    log(id);

    let listOfUniqueStudentNames = createArrayWithUniqueValues(studentsMockData, "studentName"); // rename to createArrayWithUniqueStudentNames ??
    log(listOfUniqueStudentNames);

    // step2: create data for Victory Brush-and-Zoom:
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
    log(`56 records for each student:`)
    log(arrayWithStudentObjectsFilteredOnOneSpecificAssignmentId)

    const createallGradesForFunAndDifficultyFor1StudentFor1Student = (allGradesForFunAndDifficultyFor1StudentOfTheSameStudent) =>
        allGradesForFunAndDifficultyFor1StudentOfTheSameStudent.map(assignmentObject => ({ 
                "studentName": assignmentObject.studentName,
                "assignmentId": assignmentObject.assignmentId,
                "assignmentIdShort": makeAssignmentIdShort(assignmentObject.assignmentId, 6), // works
                "difficulty": assignmentObject.difficulty,
                "fun": assignmentObject.fun,
                "label": `Student ${assignmentObject.studentName}. Opdracht ${ assignmentObject.assignmentId
                }, difficultyRating: ${assignmentObject.difficulty.toFixed(1)}, 
                enjoymentRating: ${assignmentObject.fun.toFixed(1)}`
            })
        );

    let allGradesForFunAndDifficultyFor1Student = createallGradesForFunAndDifficultyFor1StudentFor1Student(arrayWithStudentObjectsFilteredOnOneSpecificAssignmentId)
    log(`allGradesForFunAndDifficultyFor1Student: `)
    log(allGradesForFunAndDifficultyFor1Student);

    // step3: create data for student user profile:
    log(`studentUserProfiles:`);
    log(studentUserProfiles);
    // objectKeyToFilter = id;
    let studentUserProfileToDisplay = createArrayWithObjectsFilteredOnObjectKey(filterStudentObjectWithAssignmentId, studentUserProfiles);
    // let studentUserProfileToDisplay = studentUserProfiles.filter(student => student.studentName === "Evelyn");
    log(`studentUserProfileToDisplay: `);
    log(studentUserProfileToDisplay[0]);
    let {lastName, firstName, phone, email, age, studentPhoto} = studentUserProfileToDisplay[0];
    // log(age) // ok
// part 1: ETL the data: END: 


// part 2: Student Pages: business logic: START
    // see part1.
// part 2: Student Pages: business logic: START

// part 3: victory-brush-and-zoom: business logic: START
    const [zoomDomain, setZoomDomain] = useState({x: [0, 10], y: [0, 5]}); // nr of assignments to display when you open the page.
    // 'zoomDomain' more info: https://formidable.com/open-source/victory/docs/victory-zoom-container#zoomdomain
// part 3: victory-brush-and-zoom: business logic: END


  return (
    <>

{/* part 4: student profile: dumb component: START  */}
    
<Container> 
        <ClientListStyled>
            <Intro>User Profile of Student: {firstName} {lastName} </Intro>
            <FormControlArea>
                <Section1>
                    {/* <div>{studentPhoto}</div> */}
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
{/* part 4: student profile: dumb component: START   */}
 


{/* part 5: victory-brush-and-zoom: dumb component: START */}
        <VictoryChart 
            theme={wincTheme} 
            width={800} 
            height={350}    
            //domainPadding has no effect.
            //padding has undesirable effect.
        //   style={{ data: { fill: "red" } }}
        //   domain={{ y: [-10, 10] }}
          containerComponent={
                <VictoryZoomContainer 
                zoomDimension="x" // ok, see: https://formidable.com/open-source/victory/docs/victory-zoom-container#zoomdomain
                zoomDomain={zoomDomain}
                // zoomDomain={{x: [0, 10]}} // in useState-hook above.
                //   onZoomDomainChange={this.handleZoom.bind(this)}
                />
            }
        >
            <VictoryGroup offset={10} 
                    // tickValues={['1.0', '2.0', '3.0', '4.0', '5.0']}
                    style = {{
                        // group: {
                        //     colorScale: [
                        //       "#F4511E",
                        //       "#FFF59D",
                        //       "#DCE775",
                        //       "#8BC34A",
                        //       "#00796B",
                        //       "#006064"
                        //     ]},
                        data: {
                            // fill: "yellow",
                            padding: 10,
                            strokeWidth: 5 // responds to change. 
                        },
                        labels: {
                            fontFamily: "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
                            fontSize: 8,
                            letterSpacing: "normal",
                            padding: 18,
                            // fill: "#455A64",
                            stroke: "transparent",
                            strokeWidth: 0
                        }
                    }}            
            >
                {/* bar 1of3: */}
                <VictoryBar 
                    // style={{ data: { fill: "purple" } }} // chart responds to change
                    style = {{
                        data: {
                            fill: "#D4E7FA", // do not put this prop in Theme. Light-blue from wincacademy.nl
                            padding: 0,
                            strokeWidth: 5 // bar width
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
                                // stroke: "tomato",
                                strokeWidth: 1,
                                // fill: "yellow",
                            }}  
                        />
                    }
                    data={allGradesForFunAndDifficultyFor1Student}
                    x = "assignmentIdShort"
                    y = "fun"
                    // tickValues={['1.0', '2.0', '3.0', '4.0', '5.0']}
                    tickValues={[1, 2, 3, 4, 5]}
                    tickFormat={allGradesForFunAndDifficultyFor1Student.map(
                        avg => avg.assignmentId
                        )}
                />
                {/* bar 2of3: */}
                <VictoryBar 
                    style = {{
                        data: {
                            fill: "#FCD808", // do not put this prop in Theme. Yellow from wincacademy.nl.
                            padding: 0,
                            strokeWidth: 5 // bar width
                        },
                        // labels: {
                        //     fontFamily: "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
                        //     fontSize: 8,
                        //     letterSpacing: "normal",
                        //     padding: 38,
                        //     fill: "#455A64",
                        //     stroke: "transparent",
                        //     strokeWidth: 0
                        // }
                    }}

                    labelComponent={
                        <VictoryTooltip 
                            style={{fontSize: '10px'}}
                            flyoutWidth={310}
                            flyoutHeight={60}
                            cornerRadius={8}
                            pointerLength={20}
                            flyoutStyle={{
                                // stroke: "tomato",
                                strokeWidth: 1,
                                // fill: "yellow",
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
                // tickValues specifies both the number of ticks and where
                // they are placed on the axis
                // tickValues={[1.0, 2.0, 3, 4, 5]}
                tickFormat={allGradesForFunAndDifficultyFor1Student.map(
                avg => avg.assignmentIdShort 
                /*
                 pitfall: avg.assignmentId will display long names on x-axis: e.g. actual result:
                 'W3D5 - Project - Todo-List' , instead of the expected result (to save space on x-axis) 'W3D5'.
                */ 
                )}
                label="Assignment IDs"
                style={{
                    tickLabels: {
                        // fontFamily: "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
                        fontSize: 10,
                        angle: 0,
                        // letterSpacing: "normal",
                        padding: 12,
                        // fill: "#455A64",
                        // stroke: "transparent",
                        // strokeWidth: 0
                      }
                }}
            />
            <VictoryAxis dependentAxis 
                label="Rating of assignment difficulty (blue) and fun (yellow)"
                // tickValues={[1, 2, 3, 4, 5]}
                style={{
                    tickLabels: {
                        // fontFamily: "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
                        fontSize: 10,
                        angle: 0,
                        // letterSpacing: "normal",
                        padding: 12,
                        // fill: "#455A64",
                        // stroke: "transparent",
                        // strokeWidth: 0
                      }
                }}
            />
          </VictoryChart>


        {/* VictoryBrushContainer: */}
        <VictoryChart  
            theme={wincTheme} 
            width={800} 
            height={150} 
            domainPadding={10}
            padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
            scale={{ x: "linear" }}
            // style={{
            //     label: { stroke: "tomato" }
            // }}
            containerComponent={
                <VictoryBrushContainer
                brushDimension="x"
                brushDomain={zoomDomain}
                onBrushDomainChange={setZoomDomain} 
                />
            }
        >
        {/* bar 3of3: */}
        <VictoryBar 
            //   style={{
            //     data: { stroke: "tomato" }
            //   }}
            labelComponent={
                <VictoryTooltip   
                    style={{fontSize: '10px'}}
                    flyoutWidth={310}
                    flyoutHeight={60}
                    cornerRadius={8}
                    pointerLength={20}
                    flyoutStyle={{
                        // stroke: "tomato",
                        strokeWidth: 1,
                        // fill: "yellow",
                    }}  
                />
            }    
            data={allGradesForFunAndDifficultyFor1Student}
            x = "assignmentIdShort"
            y = "difficulty"  
            /*
              nice extra: 2do: add checkbox for user to choose between 'fun' and 'difficult' to be shown 
              in VictoryBrushContainer.
              Selection of user in VictoryZoomContainer (e.g. 'fun' and/or 'difficult') must be independent of 
              what user selects in VictoryBrushContainer. 
              In VictoryBrushContainer: 'difficulty' will be default. With checkbox user can also select 'fun'.
            */
        />
        <VictoryAxis  // 
            // tickValues={[1.0, 2.0, 3.0, 4.0, 5.0]}
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
            tickValues={['1.0', '2.0', '3.0', '4.0', '5.0']} // must be strings, not numbers.
            style={{
            tickLabels: {
                // fontFamily: "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
                fontSize: 10,
                angle: 0,
                // letterSpacing: "normal",
                padding: 12,
                // fill: "#455A64",
                // stroke: "transparent",
                // strokeWidth: 0
                }
            }}
        />
        </VictoryChart>
{/* part 5: victory-brush-and-zoom: dumb component: START */}
    </>
  )
}

export default Student





