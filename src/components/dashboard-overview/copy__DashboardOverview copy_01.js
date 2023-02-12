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

import {
    calculateAverageForDifficultyForOneAssignmentOfAllStudents,
    calculateAverageForFunForOneAssignmentOfAllStudents,
    createArrayWithUniqueValues, 
    createAssignmentObjectForEachAssignmentId,
    log } from '../../utils';

import {wincTheme} from "../../styles/wincTheme_backup";

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
    // log(listOfUniqueAssignmentIds);
    /*
        BRANCH_02: DESIGN: 4b) 
        Create array with 56 assignment-objects. Each object contains 3 keys: 
            - key assignmentId with value (e.g. W2D3-1)
            - key difficult with value 'empty array'. 
            - key fun with value 'empty array'. 
    */
    const createArrayWithObjects = (studentsMockData, arrayWithPrimitiveValues) =>
        arrayWithPrimitiveValues.map(primitiveValue => createAssignmentObjectForEachAssignmentId(studentsMockData, primitiveValue));
    
    const arrayWithStudentObjects = createArrayWithObjects(studentsMockData, listOfUniqueAssignmentIds);
    log(`arrayWithStudentObjects: `)
    log(arrayWithStudentObjects);  
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

    const [zoomDomain, setZoomDomain] = useState({ x: [new Date(1990, 1, 1), new Date(2009, 1, 1)] });
 
    let assignmentId = "SCRUM";
    let averageGradeDifficulty = calculateAverageForDifficultyForOneAssignmentOfAllStudents(studentsMockData, assignmentId);
    log(`averageGradeDifficulty: `)
    log(averageGradeDifficulty);

  return (
    <>


<div>
        <VictoryChart width={600} height={470} scale={{ x: "time" }} theme={wincTheme}
          containerComponent={
                <VictoryZoomContainer
                zoomDimension="x"
                zoomDomain={zoomDomain}
                //   onZoomDomainChange={this.handleZoom.bind(this)}
                />
            }
        >

            
            <VictoryBar //was: VictoryLine 
            /*
                in 'Brush and Zoom' code from https://formidable.com/open-source/victory/gallery/brush-and-zoom
                I have only replaced the component 'VictoryLabel' by (see line above this comment) 'VictoryBar',
                to create a basic 'Brush and Zoom BarChart'.
                status: ok.
            */
              style={{
                data: { stroke: "tomato" } 
                /*
                    2do: update style with 'wincTheme' from example code from Winc-dentist-assignment.
                    see: https://github.com/WincAcademy/StudentDashboardExample . Enhance
                    this code with that of style-object 'line'. 
                */
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
            <VictoryBar //was: VictoryLine 
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

export default DashboardOverview