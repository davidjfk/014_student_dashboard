
import React, { useState, useEffect } from 'react';

import { useSelector } from "react-redux";

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
    VictoryScatter,
    VictoryAxis 
} from "victory";

import {BrushAndZoomWithBarChart} from '../brushAndZoomWithBarChart/BrushAndZoomWithBarChart'

import {
    calculateAverageForDifficultyForOneAssignmentOfAllStudents,
    calculateAverageForFunForOneAssignmentOfAllStudents,
    correlationCoefficientBetween2Arrays,
    createArrayWithAssignmentObjects,

    createAssignmentObjectForEachAssignmentId,
    createArrayWithPropertyValueFromEachArrayObject,
    createArrayWithUniqueValues, 

    createStudentObjectForEachStudentId,
    createArrayWithStudentObjects,
    filterOutliers,
    log } from '../../utils';

import {Container} from '../styles/Container.styled'
import {ClientListAreaStyled, ClientListStyled, Column, FormControlArea, Headers, Intro, Section1, Section2, Section3} from './ClientList.styled'
import {wincTheme} from "../styles/wincTheme";

const Scatterplot = () => {
// part 1: ETL the data: start: 
    const { studentsMockData } = useSelector((state) => state.studentsMockdata);
    log('comp Scatterplot:');
    log(studentsMockData);

    /*
        scatterplot 1: asssignments:
        All assignments (56) on X-axis with average fun-score of 10 students, and on Y-axis assignments (56) with average difficult score of 10 students: so 
        for each assignment you can see "on average" how the perceived fun-score and difficult-score correlate. 
    */
    const arrayWithUniqueAssignmentIds = createArrayWithUniqueValues(studentsMockData, "assignmentId");
    log(`comp scatterplot1: arrayWithUniqueAssignmentIds: `)
    log(arrayWithUniqueAssignmentIds);
    
    const arrayWithAssignmentObjects = createArrayWithAssignmentObjects(createAssignmentObjectForEachAssignmentId, studentsMockData, arrayWithUniqueAssignmentIds);
    log(`comp scatterplot1: arrayWithAssignmentObjects: `)
    log(arrayWithAssignmentObjects);  


    /*
        scatterplot 2: students:
        All students (10) on X-axis with their individual average fun-socre andon Y-axis with their individual average difficult-score: so 
        for each student you can see how the average fun correlates with average diffiicult.
    */
        const arrayWithUniqueStudents = createArrayWithUniqueValues(studentsMockData, "studentName");
        log(`comp scatterplot2: arrayWithUniqueStudents: `)
        log(arrayWithUniqueStudents);

        const arrayWithUniqueStudentObjects = createArrayWithStudentObjects(createStudentObjectForEachStudentId, studentsMockData, arrayWithUniqueStudents);
        log(`comp scatterplot2: arrayWithUniqueStudentObjects: `)
        log(arrayWithUniqueStudentObjects);  


    //  correlation coefficient: assignments:
    log(`arrayWithAssignmentAverageDifficultyValues:`)
    let arrayWithAssignmentAverageDifficultyValues = createArrayWithPropertyValueFromEachArrayObject(arrayWithAssignmentObjects, "difficulty");
    log(arrayWithAssignmentAverageDifficultyValues);
    
    log(`arrayWithAssignmentAverageFunValues:`)
    let arrayWithAssignmentAverageFunValues = createArrayWithPropertyValueFromEachArrayObject(arrayWithAssignmentObjects, "fun");
    log(arrayWithAssignmentAverageFunValues);

    //  correlation coefficient: students:
    log(`arrayWithStudentAverageDifficultyValues:`)
    let arrayWithStudentAverageDifficultyValues = createArrayWithPropertyValueFromEachArrayObject(arrayWithUniqueStudentObjects, "difficulty");
    log(arrayWithStudentAverageDifficultyValues);

    log(`arrayWithStudentAverageFunValues:`)
    let arrayWithStudentAverageFunValues = createArrayWithPropertyValueFromEachArrayObject(arrayWithUniqueStudentObjects, "fun");
    log(arrayWithStudentAverageFunValues);

    let correlationBetweenDifficultyAndFunForEachAssignmentOfAllStudents = correlationCoefficientBetween2Arrays(arrayWithAssignmentAverageDifficultyValues, arrayWithAssignmentAverageFunValues);
    log(`correlationBetweenDifficultyAndFunForEachAssignmentOfAllStudents:`);
    log(correlationBetweenDifficultyAndFunForEachAssignmentOfAllStudents);
    let correlationBetweenDifficultyAndFunForEachAssignmentOfAllStudentsOn2Decimals = parseFloat(correlationBetweenDifficultyAndFunForEachAssignmentOfAllStudents.toFixed(2));
    log(correlationBetweenDifficultyAndFunForEachAssignmentOfAllStudentsOn2Decimals);

    let correlationBetweenDifficultyAndFunForStudentOfAllAssignments = correlationCoefficientBetween2Arrays(arrayWithStudentAverageDifficultyValues, arrayWithStudentAverageFunValues);
    log(`correlationBetweenDifficultyAndFunForStudentOfAllAssignments:`);
    log(correlationBetweenDifficultyAndFunForStudentOfAllAssignments);
    let correlationBetweenDifficultyAndFunForStudentOfAllAssignmentsOn2Decimals = parseFloat(correlationBetweenDifficultyAndFunForStudentOfAllAssignments.toFixed(2));
    log(correlationBetweenDifficultyAndFunForStudentOfAllAssignmentsOn2Decimals);

    // check data for outliers:
    let outliersInarrayWithAssignmentAverageDifficultyValues = filterOutliers(arrayWithAssignmentAverageDifficultyValues);
    log(`outliersInarrayWithAssignmentAverageDifficultyValues:`);
    log(outliersInarrayWithAssignmentAverageDifficultyValues);
    let isOutliersInarrayWithAssignmentAverageDifficultyValues = (outliersInarrayWithAssignmentAverageDifficultyValues.length == 0) ? "no" : "yes, please investigate" ;

    let outliersInarrayWithAssignmentAverageFunValues = filterOutliers(arrayWithAssignmentAverageFunValues);
    log(`outliersInarrayWithAssignmentAverageFunValues:`);
    log(outliersInarrayWithAssignmentAverageFunValues);
    let isOutliersInarrayWithAssignmentAverageFunValues = (outliersInarrayWithAssignmentAverageFunValues.length == 0) ? "no" : "yes, please investigate" ;

    let outliersInarrayWithStudentsAverageDifficultyValues = filterOutliers(arrayWithStudentAverageDifficultyValues);
    log(`outliersInarrayWithStudentsAverageDifficultyValues:`);
    log(outliersInarrayWithStudentsAverageDifficultyValues);
    let isOutliersInArrayWithStudentsAverageDifficultyValues = (outliersInarrayWithStudentsAverageDifficultyValues.length == 0) ? "no" : "yes, please investigate" ;

    let outliersInarrayWithStudentsAverageFunValues = filterOutliers(arrayWithStudentAverageFunValues);
    log(`outliersInarrayWithStudentsAverageFunValues:`);
    log(outliersInarrayWithStudentsAverageFunValues);
    let isOutliersInarrayWithStudentsAverageFunValues = (outliersInarrayWithStudentsAverageFunValues.length == 0) ? "no" : `yes, please investigate: ${outliersInarrayWithStudentsAverageDifficultyValues}` ;
    // log(isOutliersInarrayWithStudentsAverageFunValues)

// part 1: ETL the data: END 

// part 2: filter-and-sort-comp: business logic: START
    //2do: put fns to calculate correlation coefficient and outliers in file utils.js
// part 2: filter-and-sort-comp: business logic: END

// part 3: scatterplot: business logic: START
    // not applicable
// part 3: scatterplot: business logic: END

// part 4: scatterplot: dumb component: START      
    return (
    <>

{/* part 4: student profile: dumb component: START  */}
<Container> 
        <ClientListStyled>
            <Intro>scatter plot of assignments (blue) and students (yellow) </Intro>
            <FormControlArea>            
                <Section1>
                    <div>Assignments: </div>
                    <div>correlation coefficient between difficulty and fun:</div>
                    <div>{correlationBetweenDifficultyAndFunForEachAssignmentOfAllStudentsOn2Decimals}</div>
                </Section1>
                <Section1>
                    <div>Students: </div>
                    <div>correlation coefficient between difficulty and fun:</div>
                    <div>{correlationBetweenDifficultyAndFunForStudentOfAllAssignmentsOn2Decimals}</div>
                </Section1>
                <Section1> 
                    <div>outliers:</div>
                    <div>Assignments: difficulty: {isOutliersInarrayWithAssignmentAverageDifficultyValues} </div>
                    <div>Assignments: fun: {isOutliersInarrayWithAssignmentAverageFunValues}</div>
                    <div>Students: difficulty: {isOutliersInArrayWithStudentsAverageDifficultyValues} </div>
                    <div>Students: fun: {isOutliersInarrayWithStudentsAverageFunValues} </div>
                </Section1> 
            </FormControlArea>
            <Headers>

            </Headers>
        </ClientListStyled>  
    </Container>
{/* part 4: student profile: dumb component: START   */}

    <VictoryChart 
            theme={wincTheme} 
            width={300} 
            height={230}    
            //domainPadding has no effect.
            //padding has undesirable effect.
        //   style={{ data: { fill: "red" } }}
        //   domain={{ y: [-10, 10] }}

        >
            <VictoryGroup offset={0} 
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
                            // fontSize: 8,
                            // letterSpacing: "normal",
                            // padding: 8,
                            // // fill: "#455A64",
                            // stroke: "transparent",
                            // strokeWidth: 0
                        }
                    }}            
            >
                {/* bar 1of2: assignments */}
                <VictoryScatter 
                    // style={{ data: { fill: "purple" } }} // chart responds to change
                    // height={100}
                    size={3}
                    symbol= "triangleUp"
                    style = {{
                        data: {
                            fill: "#D4E7FA", // do not put this prop in Theme. Light-blue from wincacademy.nl
                            padding: 0,
                            strokeWidth: 5 // bar width
                        }
                    }}
                    labelComponent={
                        <VictoryTooltip   
                            style={{fontSize: '5px'}}
                            flyoutWidth={160}
                            flyoutHeight={30}
                            cornerRadius={8}
                            pointerLength={20}
                            flyoutStyle={{
                                // stroke: "tomato",
                                strokeWidth: 1,
                                // fill: "yellow",
                            }}  
                        />
                    }
                    data={arrayWithAssignmentObjects}
                    x = "difficulty"
                    y = "fun"
                    // tickValues={['1.0', '2.0', '3.0', '4.0', '5.0']}
                    tickValues={[1, 2, 3, 4, 5]}
                    tickFormat={arrayWithAssignmentObjects.map(
                        avg => avg.difficulty
                        )}
                />
                {/* bar 2of2: students */}
                <VictoryScatter 
                    size={2}
                    style = {{
                        data: {
                            fill: "#FCD808", // do not put this prop in Theme. Yellow from wincacademy.nl.
                            padding: 0,
                            strokeWidth: 5 // bar width
                            
                        }
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
                            style={{fontSize: '5px'}}
                            flyoutWidth={110}
                            flyoutHeight={30}
                            cornerRadius={8}
                            pointerLength={20}
                            flyoutStyle={{
                                // stroke: "tomato",
                                strokeWidth: 1,
                                // fill: "yellow",
                            }} 
                        />
                    }                    
                    data={arrayWithUniqueStudentObjects}
                    x = "difficulty"
                    y = "fun"
                    tickValues={[1, 2, 3, 4, 5]}
                    tickFormat={arrayWithUniqueStudentObjects.map(
                        avg => avg.difficulty
                        )}
                />   
            </VictoryGroup>
            <VictoryAxis 
                domain={[1.5, 3.5]}
                // tickValues specifies both the number of ticks and where
                // they are placed on the axis
                // tickValues={[1.0, 2.0, 3, 4, 5]}
                // tickFormat={arrayWithAssignmentObjects.map(avg => (avg.difficulty + avg.fun)/2)}
                /*
                 pitfall: avg.assignmentId will display long names on x-axis: e.g. actual result:
                 'W3D5 - Project - Todo-List' , instead of the expected result (to save space on x-axis) 'W3D5'.
                */ 
                
                // label="average difficulty rating"
                standalone={false}
                label={() => ""}
                axisLabelComponent={<VictoryLabel dx={0} dy={0} text="average difficulty rating" />}
                style={{
                    axisLabel: {
                        // fontFamily: "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
                        fontSize: 5,
                        
                        angle: 0,
                        // letterSpacing: "normal",
                        padding: 14,
                        // fill: "#455A64",
                        // stroke: "transparent",
                        // strokeWidth: 0
                    },
                    tickLabels: {
                        // fontFamily: "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
                        fontSize: 4,
                        angle: 0,
                        // letterSpacing: "normal",
                        padding: 1,
                        // fill: "#455A64",
                        // stroke: "transparent",
                        // strokeWidth: 0
                    },
                    ticks: {
                        fill: "transparent",
                        size: 5,
                        stroke: "#90A4AE",
                        strokeWidth: 3,
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                    }
                }}
            />
            <VictoryAxis dependentAxis 
                domain={[1.5, 4.5]}
                // label="average fun rating"
                standalone={false}
                label={() => ""}
                axisLabelComponent={<VictoryLabel dx={0} dy={4} text="average fun rating" />}
                // tickValues={[1, 2, 3, 4, 5]}
                // tickFormat={arrayWithAssignmentObjects.map(avg => (avg.difficulty + avg.fun)/2)} 
                style={{
                    axisLabel: {
                        // fontFamily: "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
                        fontSize: 5,
                        
                        angle: -90,
                        // letterSpacing: "normal",
                        padding: 20,
                        // fill: "#455A64",
                        // stroke: "transparent",
                        // strokeWidth: 0
                    },
                    tickLabels: {
                        // fontFamily: "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
                        fontSize: 4,
                        
                        angle: 0,
                        // letterSpacing: "normal",
                        padding: 1,
                        // fill: "#455A64",
                        // stroke: "transparent",
                        // strokeWidth: 0
                    },                                   

                    ticks: {
                        fill: "transparent",
                        size: 5,
                        stroke: "#90A4AE",
                        strokeWidth: 3,
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                    }                    
                }}
            />
    </VictoryChart>
{/* // part 4: scatterplot: dumb component: END  */}
    </>
  )
}

export default Scatterplot