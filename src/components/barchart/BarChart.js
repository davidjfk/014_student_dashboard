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

import {createArrayWithUniqueValues, log } from '../../utils';

const BarChart = () => {
    const { studentsMockData } = useSelector((state) => state.studentsMockdata);
    log('comp BarChart:');
    log(studentsMockData);

    /*
        GAMEPLAN: 4a) Create array with unique assignmentIds (e.g. W2D3-1) (should be 56 assignmentIds in this array 
            in total as string-values). Use fn createArrayWithUniqueValues to create this array.
    */
    const listOfUniqueAssignmentIds = createArrayWithUniqueValues(studentsMockData, "assignmentId");
    // log(listOfUniqueAssignmentIds);



    const calculateAssignmentAverageDifficultyOfAllStudents = (array, assignmentId) => {
    
        const createArrayWithStudentsForAssignmentId = (array, assignmentId) => {

            let filterStudentObjectWithAssignmentId = student => student.assignmentId === assignmentId;

            const filterStudents = (array, filterFunction) => {
                let filteredArr = array.filter(filterFunction)
                return filteredArr;
            }
        
            let arrayWithStudentObjectsFilteredOnOneSpecificAssignmentId = filterStudents(array, filterStudentObjectWithAssignmentId )
            return arrayWithStudentObjectsFilteredOnOneSpecificAssignmentId;
        }

        let arrayWithStudentObjectsFilteredOnOneSpecificAssignmentId = createArrayWithStudentsForAssignmentId(array, assignmentId);
        // log(arrayWithStudentObjectsFilteredOnOneSpecificAssignmentId);

    
        const calculateAverageForArrayObjectKey = (array, objKey) => array
            .reduce((accumulator, variableDoingNothing, index, array) => accumulator + parseInt(array[index][objKey]), 0) / array.length;

        let averageDifficulty = calculateAverageForArrayObjectKey(arrayWithStudentObjectsFilteredOnOneSpecificAssignmentId, "difficulty");
        let averageDifficultyRoundedToOneDecimal = parseFloat(averageDifficulty.toFixed(1));
        return averageDifficultyRoundedToOneDecimal;
    }



    const calculateAssignmentAverageFunLevelOfAllStudents = (array, assignmentId) => {
    
        const createArrayWithStudentsForAssignmentId = (array, assignmentId) => {

            let filterStudentObjectWithAssignmentId = student => student.assignmentId === assignmentId;

            const filterStudents = (array, filterFunction) => {
                let filteredArr = array.filter(filterFunction)
                return filteredArr;
            }
        
            let arrayWithStudentObjectsFilteredOnOneSpecificAssignmentId = filterStudents(array, filterStudentObjectWithAssignmentId )
            return arrayWithStudentObjectsFilteredOnOneSpecificAssignmentId;
        }

        let arrayWithStudentObjectsFilteredOnOneSpecificAssignmentId = createArrayWithStudentsForAssignmentId(array, assignmentId);
        // log(arrayWithStudentObjectsFilteredOnOneSpecificAssignmentId);

    
        const calculateAverageForArrayObjectKey = (array, objKey) => array
            .reduce((accumulator, variableDoingNothing, index, array) => accumulator + parseInt(array[index][objKey]), 0) / array.length;

        let averageFun = calculateAverageForArrayObjectKey(arrayWithStudentObjectsFilteredOnOneSpecificAssignmentId, "fun");
        let averageFunRoundedToOneDecimal = parseFloat(averageFun.toFixed(1));
        return averageFunRoundedToOneDecimal;
    }


    
    /*
        GAME PLAN: 4b) Create array with 56 assignment-objects. Each object contains 3 keys: 
            - key assignmentId with value (e.g. W2D3-1)
            - key difficult with value 'empty array'. 
            - key fun with value 'empty array'. 
    */
    const createAssignmentObjectForEachAssignmentId = (studentMockData, assignmentId) => ({
        assignmentId,
        difficulty: calculateAssignmentAverageDifficultyOfAllStudents(studentMockData, assignmentId),
        fun: calculateAssignmentAverageFunLevelOfAllStudents(studentMockData, assignmentId),
      });
      
    const createArrayWithObjects = (studentsMockData, arrayWithPrimitiveValues) =>
        arrayWithPrimitiveValues.map(primitiveValue => createAssignmentObjectForEachAssignmentId(studentsMockData, primitiveValue));
    
    const arrayWithStudentObjects = createArrayWithObjects(studentsMockData, listOfUniqueAssignmentIds);
    log(`arrayWithStudentObjects: `)
    log(arrayWithStudentObjects);  

  
    /*
    GAME PLAN: 4C) 
        For key difficult, value is average of all 10 students for this assignmentId. Each student has 1 opinion about each assignment, given 
        that there are 10 students). For this, filter datastructure 'A' (see point a above) on object-key 'assignmentId' 
        (into a new array) AND then apply reduce fn on object-key 'difficult' to create average (1 decimal).
        This has resulted in fn calculateAverageAssignmentDifficultyOfAllStudents above. 
    */  

            /*
    GAME PLAN: 4D) 
        For key fun, value is average of all 10 students for this assignmentId. Each student has 1 opinion about each assignment, given 
        that there are 10 students). For this, filter datastructure 'A' (see point a above) on object-key 'assignmentId' 
        (into a new array) AND then apply reduce fn on object-key 'fun' to create average (1 decimal).
        This has resulted in fn calculateAverageAssignmentFunOfAllStudents above. 
    */  

        
    let assignmentId = "SCRUM";
    let averageGradeDifficulty = calculateAssignmentAverageDifficultyOfAllStudents(studentsMockData, assignmentId);
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
                <VictoryAxis style={{ tickLabels: { fontSize: 50, angle: 60} } } />
                
                <VictoryAxis dependentAxis style={{ tickLabels: { fontSize: 50, angle: 0 } }}   /> 

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