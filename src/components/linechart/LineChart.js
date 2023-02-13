import React, { useState, useEffect } from 'react';

import { useSelector } from "react-redux";

import {
    VictoryAxis,
    VictoryZoomContainer,
    VictoryBrushContainer,
    VictoryBar,
    VictoryChart,
    VictoryGroup,
    VictoryTooltip,
    VictoryLabel,
    VictoryLine,
    VictoryPie,
    VictoryScatter

} from "victory";

import {BrushAndZoomWithBarChart} from '../brushAndZoomWithBarChart/BrushAndZoomWithBarChart'

import {
    calculateAverageForDifficultyForOneAssignmentOfAllStudents,
    calculateAverageForFunForOneAssignmentOfAllStudents,
    createArrayWithAssignmentObjects,
    createArrayWithUniqueValues, 
    createAssignmentObjectForEachAssignmentId,
    log } from '../../utils';

import {wincTheme} from "../styles/wincTheme";

const LineChart = () => {
    const { studentsMockData } = useSelector((state) => state.studentsMockdata);
    log('comp DashboardOverview:');
    log(studentsMockData);

    const listOfUniqueAssignmentIds = createArrayWithUniqueValues(studentsMockData, "assignmentId");
    log(`listOfUniqueAssignmentIds: `)
    log(listOfUniqueAssignmentIds);
    
    const arrayWithAssignmentObjects = createArrayWithAssignmentObjects(createAssignmentObjectForEachAssignmentId, studentsMockData, listOfUniqueAssignmentIds);
    log(`arrayWithAssignmentObjects: `)
    log(arrayWithAssignmentObjects);  

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
                
                {/* line 1of4: */}
                <VictoryLine
                    style = {{
                        data: {
                            stroke: "#FCD808", // Yellow from wincacademy.nl.
                            padding: 0,
                            strokeWidth: 2.5 // bar width
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
                <VictoryScatter 
                    // style={{ data: { fill: "purple" } }} // chart responds to change
                    // height={100}
                    size={3}
                    // symbol= "triangleUp"
                    style = {{
                        data: {
                            fill:  "orange",
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
                    y = "difficulty"
                    // tickValues={['1.0', '2.0', '3.0', '4.0', '5.0']}
                    tickValues={[1, 2, 3, 4, 5]}
                    tickFormat={arrayWithAssignmentObjects.map(
                        avg => avg.difficulty
                        )}
                />
                
                {/* line 2of4: */}
                <VictoryLine 
                    // style={{ data: { fill: "purple" } }} // chart responds to change
                    height={100}
                    style = {{
                        data: {
                            stroke: "#D4E7FA", // Light-blue from wincacademy.nl
                            // fill: "#D4E7FA", 
                            padding: 0,
                            strokeWidth: 2.5 // bar width
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
                <VictoryScatter 
                    // style={{ data: { fill: "purple" } }} // chart responds to change
                    // height={100}
                    size={3}
                    symbol= "triangleUp"
                    style = {{
                        data: {
                            fill: "blue",
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
                        avg => avg.difficulty
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

        <VictoryGroup offset={10}/>
            {/* line 3of4: */}
            <VictoryLine
                    style = {{
                        data: {
                            // stroke: "#D4E7FA", // Light-blue from wincacademy.nl
                            stroke: "#FCD808", // Yellow from wincacademy.nl.
                            // 2 figure out later: 2 show 'difficulty' as 'light-blue' I must select 'yellow'...leave it for now.
                            padding: 0,
                            strokeWidth: 2.5 // bar width
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
                y = "difficulty"
            />
            <VictoryScatter 
                // style={{ data: { fill: "purple" } }} // chart responds to change
                // height={100}
                size={3}
                // symbol= "triangleUp"
                style = {{
                    data: {
                        fill:  "orange",
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
                y = "difficulty"
                // tickValues={['1.0', '2.0', '3.0', '4.0', '5.0']}
                tickValues={[1, 2, 3, 4, 5]}
                tickFormat={arrayWithAssignmentObjects.map(
                    avg => avg.difficulty
                    )}
            />


            {/* line 4of4: */}
            <VictoryLine
                    style = {{
                        data: {
                            // stroke: "#FCD808", // Yellow from wincacademy.nl.
                            stroke: "#D4E7FA", // Light-blue from wincacademy.nl
                            // 2 figure out later: 2 show 'fun' as 'yellow' I must select 'light-blue'...leave it for now.
                            padding: 0,
                            strokeWidth: 2.5 // bar width
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
            />
            <VictoryScatter 
                // style={{ data: { fill: "purple" } }} // chart responds to change
                // height={100}
                size={3}
                symbol= "triangleUp"
                style = {{
                    data: {
                        fill: "blue", 
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
                    avg => avg.difficulty
                    )}
            />
        <VictoryGroup/>
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

export default LineChart