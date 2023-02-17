import React, { useState} from 'react';
import { useSelector } from "react-redux";
import {
    VictoryAxis,
    VictoryZoomContainer,
    VictoryBrushContainer,
    VictoryChart,
    VictoryGroup,
    VictoryTooltip,
    VictoryLine,
    VictoryScatter

} from "victory";
import {
    createArrayWithAssignmentObjects,
    createArrayWithUniqueValues, 
    createAssignmentObjectForEachAssignmentId,
    log } from '../../utils';
import {wincTheme} from "../styles/wincTheme";

const LineChart = () => {
    const { studentsMockData } = useSelector((state) => state.studentsMockdata);
    const [zoomDomain, setZoomDomain] = useState({x: [0, 10], y: [0, 5]}); 
    
    log('comp DashboardOverview:');
    log(studentsMockData);

    const listOfUniqueAssignmentIds = createArrayWithUniqueValues(studentsMockData, "assignmentId");
    log(`listOfUniqueAssignmentIds: `)
    log(listOfUniqueAssignmentIds);
    
    const arrayWithAssignmentObjects = createArrayWithAssignmentObjects(createAssignmentObjectForEachAssignmentId, studentsMockData, listOfUniqueAssignmentIds);
    log(`arrayWithAssignmentObjects: `)
    log(arrayWithAssignmentObjects);  


  return (
    <>
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
                <VictoryLine
                    style = {{
                        data: {
                            stroke: "#FCD808", 
                            padding: 0,
                            strokeWidth: 2.5
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
                    data={arrayWithAssignmentObjects}
                    x = "assignmentIdShort"
                    y = "difficulty"
                    tickValues={[1, 2, 3, 4, 5]}
                    tickFormat={arrayWithAssignmentObjects.map(
                        avg => avg.assignmentId
                        )}
                />  
                <VictoryScatter 
                    size={3}
                    style = {{
                        data: {
                            fill:  "orange",
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
                    data={arrayWithAssignmentObjects}
                    x = "assignmentIdShort"
                    y = "difficulty"
                    tickValues={[1, 2, 3, 4, 5]}
                    tickFormat={arrayWithAssignmentObjects.map(
                        avg => avg.difficulty
                        )}
                />
                <VictoryLine 
                    height={100}
                    style = {{
                        data: {
                            stroke: "#D4E7FA", 
                            padding: 0,
                            strokeWidth: 2.5 
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
                    data={arrayWithAssignmentObjects}
                    x = "assignmentIdShort"
                    y = "fun"
                    tickValues={[1, 2, 3, 4, 5]}
                    tickFormat={arrayWithAssignmentObjects.map(
                        avg => avg.assignmentId
                        )}
                />
                <VictoryScatter 
                    size={3}
                    symbol= "triangleUp"
                    style = {{
                        data: {
                            fill: "blue",
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
                    data={arrayWithAssignmentObjects}
                    x = "assignmentIdShort"
                    y = "fun"
                    tickValues={[1, 2, 3, 4, 5]}
                    tickFormat={arrayWithAssignmentObjects.map(
                        avg => avg.difficulty
                        )}
                />
 
            </VictoryGroup>
            <VictoryAxis 
                tickFormat={arrayWithAssignmentObjects.map(
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

        <VictoryGroup offset={10}/>
            <VictoryLine
                    style = {{
                        data: {
                            stroke: "#FCD808", 
                            padding: 0,
                            strokeWidth: 2.5 
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
                data={arrayWithAssignmentObjects}
                x = "assignmentIdShort"
                y = "difficulty"
            />
            <VictoryScatter 
                size={3}
                style = {{
                    data: {
                        fill:  "orange",
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
                data={arrayWithAssignmentObjects}
                x = "assignmentIdShort"
                y = "difficulty"
                tickValues={[1, 2, 3, 4, 5]}
                tickFormat={arrayWithAssignmentObjects.map(
                    avg => avg.difficulty
                    )}
            />
            <VictoryLine
                    style = {{
                        data: {
                            stroke: "#D4E7FA", 
                            padding: 0,
                            strokeWidth: 2.5 
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
                data={arrayWithAssignmentObjects}
                x = "assignmentIdShort"
                y = "fun"
            />
            <VictoryScatter 
                size={3}
                symbol= "triangleUp"
                style = {{
                    data: {
                        fill: "blue", 
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
                data={arrayWithAssignmentObjects}
                x = "assignmentIdShort"
                y = "fun"
                tickValues={[1, 2, 3, 4, 5]}
                tickFormat={arrayWithAssignmentObjects.map(
                    avg => avg.difficulty
                    )}
            />
        <VictoryGroup/>
        <VictoryAxis  // 
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

export default LineChart