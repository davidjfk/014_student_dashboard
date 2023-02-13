
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
    createArrayWithAssignmentObjects,

    createAssignmentObjectForEachAssignmentId,
    createArrayWithUniqueValues, 

    createStudentObjectForEachStudentId,
    createArrayWithStudentObjects,
    log } from '../../utils';

import {wincTheme} from "../styles/wincTheme";

const Scatterplot = () => {

    const { studentsMockData } = useSelector((state) => state.studentsMockdata);
    log('comp Scatterplot:');
    log(studentsMockData);

    /*
        scatterplot 1:
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
        scatterplot 2:
        All students (10) on X-axis with their individual average fun-socre andon Y-axis with their individual average difficult-score: so 
        for each student you can see how the average fun correlates with average diffiicult.
    */
        const arrayWithUniqueStudents = createArrayWithUniqueValues(studentsMockData, "studentName");
        log(`comp scatterplot2: arrayWithUniqueStudents: `)
        log(arrayWithUniqueStudents);

        const arrayWithUniqueStudentObjects = createArrayWithStudentObjects(createStudentObjectForEachStudentId, studentsMockData, arrayWithUniqueStudents);
        log(`comp scatterplot2: arrayWithUniqueStudentObjects: `)
        log(arrayWithUniqueStudentObjects);  

  return (
    <>
        <h2> bonus: scatterplot </h2>
        {/* <VictoryChart
            theme={wincTheme}
            domain={{ x: [0, 10], y: [0, 10] }}
        >
            <VictoryScatter 
                // rest of styling in file wincTheme.js
                style={{ 
                    data: { 
                        fill: "#c43a31", // "#455A64",  // studa: 2do: change color
                        opacity: 1,
                        stroke: "transparent",
                        strokeWidth: 0                         
                    },
                    labels: {
                        fontFamily: "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
                        fontSize: 12,
                        letterSpacing: "normal",
                        padding: 8,
                        fill: "#455A64",
                        stroke: "transparent",
                        strokeWidth: 0
                      }                    
                }} 
                data={[
                { x: 1, y: 2 },
                { x: 2, y: 3 },
                { x: 3, y: 5 },
                { x: 4, y: 4 },
                { x: 5, y: 7 }
                ]}
                // labels={{
                //     fontFamily: "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
                //     fontSize: 8,
                //     letterSpacing: "normal",
                //     padding: 8,
                //     fill: "#455A64",
                //     stroke: "transparent",
                //     strokeWidth: 0
                // }}
                domainPadding={{x: [0, -100], y: [0, -100]}}
                size = {4} // works, ok
                width = {550}
                height = {350}
                padding = {50}
            />
        
        </VictoryChart> */}


<VictoryChart 
            theme={wincTheme} 
            width={300} 
            height={200}    
            //domainPadding has no effect.
            //padding has undesirable effect.
        //   style={{ data: { fill: "red" } }}
        //   domain={{ y: [-10, 10] }}

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
                <VictoryScatter 
                    // style={{ data: { fill: "purple" } }} // chart responds to change
                    height={100}
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
                    data={arrayWithAssignmentObjects}
                    x = "difficulty"
                    y = "fun"
                    // tickValues={['1.0', '2.0', '3.0', '4.0', '5.0']}
                    tickValues={[1, 2, 3, 4, 5]}
                    tickFormat={arrayWithAssignmentObjects.map(
                        avg => avg.difficulty
                        )}
                />
                {/* bar 2of3: */}
                <VictoryScatter 
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
                            style={{fontSize: '5px'}}
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
                // tickValues specifies both the number of ticks and where
                // they are placed on the axis
                // tickValues={[1.0, 2.0, 3, 4, 5]}
                // tickFormat={arrayWithAssignmentObjects.map(avg => (avg.difficulty + avg.fun)/2)}
                /*
                 pitfall: avg.assignmentId will display long names on x-axis: e.g. actual result:
                 'W3D5 - Project - Todo-List' , instead of the expected result (to save space on x-axis) 'W3D5'.
                */ 
                
                label="difficulty rating"
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
                label="fun rating"
                // tickValues={[1, 2, 3, 4, 5]}
                // tickFormat={arrayWithAssignmentObjects.map(avg => (avg.difficulty + avg.fun)/2)} 
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



    </>
  )
}

export default Scatterplot