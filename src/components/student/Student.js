import React from 'react';
import { useSelector } from "react-redux";
import {useParams} from "react-router-dom";
import {Link} from 'react-router-dom';
import { createArrayWithUniqueValues, log } from '../../utils';

const Student = () => {
    const { studentsMockData } = useSelector((state) => state.studentsMockdata);
    const {id} = useParams()
    log('comp StudentPage:');
    log(studentsMockData);


    let listOfUniqueStudentNames = createArrayWithUniqueValues(studentsMockData, "studentName"); // rename to createArrayWithUniqueStudentNames ??
    log(listOfUniqueStudentNames);

  return (
    <>
    <div className="studentPage">
        student page 
    </div>
    <div>student id: {id} </div>
    {/* Use id to filter data to display in Victory Chart */}
    </>
  )
}

export default Student





