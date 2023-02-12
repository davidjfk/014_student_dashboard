import React, { useState, useEffect } from 'react';

import { useSelector } from "react-redux";

import {
    VictoryBar,
    VictoryChart,
    VictoryGroup,
    VictoryLabel,
    VictoryLine,
    VictoryPie,
    VictoryAxis 
} from "victory";

import {
    calculateAverageForDifficultyForOneAssignmentOfAllStudents,
    calculateAverageForFunForOneAssignmentOfAllStudents,
    createArrayWithUniqueValues, 
    createAssignmentObjectForEachAssignmentId,
    log } from '../../utils';

const BarChart = () => {
    const { studentsMockData } = useSelector((state) => state.studentsMockdata);
    log('comp BarChart:');
    log(studentsMockData);

    const listOfUniqueAssignmentIds = createArrayWithUniqueValues(studentsMockData, "assignmentId");
    // log(listOfUniqueAssignmentIds);

      
    const createArrayWithObjects = (studentsMockData, arrayWithPrimitiveValues) =>
        arrayWithPrimitiveValues.map(primitiveValue => createAssignmentObjectForEachAssignmentId(studentsMockData, primitiveValue));
    
    const arrayWithStudentObjects = createArrayWithObjects(studentsMockData, listOfUniqueAssignmentIds);
    log(`arrayWithStudentObjects: `)
    log(arrayWithStudentObjects);  


    let assignmentId = "SCRUM";
    let averageGradeDifficulty = calculateAverageForDifficultyForOneAssignmentOfAllStudents(studentsMockData, assignmentId);
    log(`averageGradeDifficulty: `)
    log(averageGradeDifficulty);



  return (
    <>

     <div>Dashboard Overview2</div>

     <div className="App">
            <h1>barchart</h1>
            <VictoryChart 
            // style={{tickLabels: { angle: 20 }   } }
            width= {7960}
            height={1380}
            

           
            padding={{ top: 10, bottom: 40, left: 80, right: 10 }}
            > 
                
                {/* <VictoryLabel text="Multi-line labels" x={225} y={30} textAnchor="middle"/> */}
                <VictoryAxis style={{ tickLabels: { fontSize: 50, angle: 60} } } fixLabelOverlap={false}  />
                
                <VictoryAxis dependentAxis style={{tickLabels: { fontSize: 50, angle: 0 } }} 
                    
                  /> 

                <VictoryGroup offset={35} categories={arrayWithStudentObjects.assignmentId} domainPadding={20}    >

                    <VictoryBar
                        alignment="start"
                        style={{ arrayWithStudentObjects: { fill: "red" } }}
                        data={arrayWithStudentObjects} 
                        x="assignmentId" 
                        y="difficulty"
                       
                        // sortKey="country"
                        // sortOrder="descending"
                        groupComponent={<g transform="translate(0, 0)" />}
                        barWidth={30}
                        barRatio={1.6}
                    />

                    <VictoryBar
                        alignment="start"
                        style={{ arrayWithStudentObjects: { fill: "green" } }}
                        data={arrayWithStudentObjects} 
                        x="assignmentId" 
                        y="fun" 
                        groupComponent={<g transform="translate(0, 0)" />}
                        barWidth={30}
                        barRatio={1.6}
                    /> 
                </VictoryGroup>
            </VictoryChart>       
        </div>




      
   




     
    </>
  )
}

export default BarChart;