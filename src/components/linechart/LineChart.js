import React, { useState, useEffect } from 'react';

import { useSelector } from "react-redux";

import {
    VictoryZoomContainer,
    VictoryBrushContainer,
    VictoryBar,
    VictoryChart,
    VictoryGroup,
    VictoryLabel,
    VictoryLine,
    VictoryPie,
    VictoryAxis 
} from "victory";

import {createArrayWithUniqueValues, log } from '../../utils';

const LineChart = () => {
    const { studentsMockData } = useSelector((state) => state.studentsMockdata);
    log('comp DashboardOverview:');
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

    const [zoomDomain, setZoomDomain] = useState({ x: [new Date(1990, 1, 1), new Date(2009, 1, 1)] });
 
    let assignmentId = "SCRUM";
    let averageGradeDifficulty = calculateAssignmentAverageDifficultyOfAllStudents(studentsMockData, assignmentId);
    log(`averageGradeDifficulty: `)
    log(averageGradeDifficulty);

  return (
    <>


<div>
        <VictoryChart width={600} height={470} scale={{ x: "time" }}
          containerComponent={
            <VictoryZoomContainer
              zoomDimension="x"
              zoomDomain={zoomDomain}
            //   onZoomDomainChange={this.handleZoom.bind(this)}
            />
          }
        >
            <VictoryLine
              style={{
                data: { stroke: "tomato" }
              }}
              data={[
                { a: new Date(1982, 1, 1), b: 125 },
                { a: new Date(1987, 1, 1), b: 257 },
                { a: new Date(1993, 1, 1), b: 345 },
                { a: new Date(1997, 1, 1), b: 515 },
                { a: new Date(2001, 1, 1), b: 132 },
                { a: new Date(2005, 1, 1), b: 305 },
                { a: new Date(2011, 1, 1), b: 270 },
                { a: new Date(2015, 1, 1), b: 470 }
              ]}
              x="a"
              y="b"
            />

          </VictoryChart>
          <VictoryChart
            padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
            width={600} height={100} scale={{ x: "time" }}
            containerComponent={
              <VictoryBrushContainer
                brushDimension="x"
                brushDomain={zoomDomain}
                onBrushDomainChange={setZoomDomain} 
              />
            }
          >
            <VictoryAxis
              tickFormat={(x) => new Date(x).getFullYear()}
            />
            <VictoryLine
              style={{
                data: { stroke: "tomato" }
              }}
              data={[
                { key: new Date(1982, 1, 1), b: 125 },
                { key: new Date(1987, 1, 1), b: 257 },
                { key: new Date(1993, 1, 1), b: 345 },
                { key: new Date(1997, 1, 1), b: 515 },
                { key: new Date(2001, 1, 1), b: 132 },
                { key: new Date(2005, 1, 1), b: 305 },
                { key: new Date(2011, 1, 1), b: 270 },
                { key: new Date(2015, 1, 1), b: 470 }
              ]}
              x="key"
              y="b"
            />
          </VictoryChart>
      </div>
    
  




      
   




     
    </>
  )
}

export default LineChart