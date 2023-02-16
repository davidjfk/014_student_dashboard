import React from 'react';
import { useSelector } from "react-redux";
import {Routes, Route, Link } from "react-router-dom";
import { createArrayWithUniqueValues, log } from '../../utils';
import Student from '../student/Student';

const StudentPages = () => {
    const { studentsMockData } = useSelector((state) => state.studentsMockdata);
    let listOfUniqueStudentNames = createArrayWithUniqueValues(studentsMockData, "studentName");
    listOfUniqueStudentNames.sort();
  return (
    <>
    <div className="studentPage">student page overview 
        {listOfUniqueStudentNames.map((student) => (  
            <div key={student}>
            <Link to={`student/${student}`}>{student} </Link>
            </div>
        ))}
        <Routes>
            <Route path="/student/:id" element={
                        <>
                            <Student />
                        </>
                    } />  
        </Routes>
    </div>
    </>
  )
}
export default StudentPages