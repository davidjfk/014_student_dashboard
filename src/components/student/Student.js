import React from 'react';
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom';
import { createArrayWithUniqueStudentNames, log } from '../../utils';

const Student = () => {
    const { studentsMockData } = useSelector((state) => state.studentsMockdata);
    log('comp StudentPage:');
    log(studentsMockData);

    let listOfUniqueStudentNames = createArrayWithUniqueStudentNames(studentsMockData, "studentName");
    log(listOfUniqueStudentNames);

  return (
    <div className="studentPage">student page 
    </div>
  )
}

export default Student