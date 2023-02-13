
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

    createAssignmentObjectForEachAssignmentId,
    createArrayWithUniqueValues, 

    createStudentObjectForEachStudentId,
    createArrayWithStudentObjects,
    log } from '../../utils';

import {wincTheme} from "../../styles/wincTheme";

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


    

    </>
  )
}

export default Scatterplot