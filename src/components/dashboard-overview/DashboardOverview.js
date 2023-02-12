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
    VictoryAxis 
} from "victory";

import {BrushAndZoomWithBarChart} from '../brushAndZoomWithBarChart/BrushAndZoomWithBarChart'

import {
    calculateAverageForDifficultyForOneAssignmentOfAllStudents,
    calculateAverageForFunForOneAssignmentOfAllStudents,
    createArrayWithAssignmentObjects,
    createArrayWithUniqueValues, 
    createAssignmentObjectForEachAssignmentId,
    log } from '../../utils';

import {wincTheme} from "../../styles/wincTheme";

const DashboardOverview = () => {
    const { studentsMockData } = useSelector((state) => state.studentsMockdata);
    log('comp DashboardOverview:');
    log(studentsMockData);
    /*
        BRANCH_02: DESIGN: 4A) 
        Create array with unique assignmentIds (e.g. W2D3-1) (should be 56 assignmentIds in this array 
        in total as string-values). Use fn createArrayWithUniqueValues to create this array.
    */
    const listOfUniqueAssignmentIds = createArrayWithUniqueValues(studentsMockData, "assignmentId");
    log(`listOfUniqueAssignmentIds: `)
    log(listOfUniqueAssignmentIds);
    
    /*
        BRANCH_02: DESIGN: 4b) 
        Create array with 56 assignment-objects. Each object contains 3 keys: 
            - key assignmentId with value (e.g. W2D3-1)
            - key difficult with value 'empty array'. 
            - key fun with value 'empty array'. 
    */
    const arrayWithAssignmentObjects = createArrayWithAssignmentObjects(createAssignmentObjectForEachAssignmentId, studentsMockData, listOfUniqueAssignmentIds);
    log(`arrayWithAssignmentObjects: `)
    log(arrayWithAssignmentObjects);  
    /*
        BRANCH_02: DESIGN: 4C) 
            Create average for 'difficult: fn calculateAverageAssignmentDifficultyOfAllStudents
            For key difficult, value is average of all 10 students for this assignmentId. Each 
            student has 1 opinion about each assignment, given that there are 10 students). For 
            this, filter datastructure 'A' (see point a above) on object-key 'assignmentId' 
            (into a new array) AND then apply reduce fn on object-key 'difficult' to create 
            average (1 decimal).
    */  

    /*
        BRANCH_02: DESIGN: 4D) 
            create average for 'fun': fn calculateAssignmentAverageFunLevelOfAllStudents
            For key fun, same as for key 'difficult', but this time apply reduce fn on object-key 
            'fun' to create average (also 1 decimal).
    */  



    // let assignmentId = "SCRUM";
    // let averageGradeDifficulty = calculateAverageForDifficultyForOneAssignmentOfAllStudents(studentsMockData, assignmentId);
    // log(`averageGradeDifficulty: `)
    // log(averageGradeDifficulty);


    const [zoomDomain, setZoomDomain] = useState({x: [0, 10], y: [0, 5]}); // nr of assignments to display when you open the page.
    // 'zoomDomain' more info: https://formidable.com/open-source/victory/docs/victory-zoom-container#zoomdomain

  return (
    <>
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
                    data={arrayWithAssignmentObjects}
                    x = "assignmentIdShort"
                    y = "fun"
                    // tickValues={['1.0', '2.0', '3.0', '4.0', '5.0']}
                    tickValues={[1, 2, 3, 4, 5]}
                    tickFormat={arrayWithAssignmentObjects.map(
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
                    data={arrayWithAssignmentObjects}
                    x = "assignmentIdShort"
                    y = "difficulty"
                    tickValues={[1, 2, 3, 4, 5]}
                    tickFormat={arrayWithAssignmentObjects.map(
                        avg => avg.assignmentId
                        )}
                />   
            </VictoryGroup>
            <VictoryAxis 
                // tickValues specifies both the number of ticks and where
                // they are placed on the axis
                // tickValues={[1.0, 2.0, 3, 4, 5]}
                tickFormat={arrayWithAssignmentObjects.map(
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
            data={arrayWithAssignmentObjects}
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
            tickFormat={arrayWithAssignmentObjects.map(
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
    </>
  )
}

export default DashboardOverview