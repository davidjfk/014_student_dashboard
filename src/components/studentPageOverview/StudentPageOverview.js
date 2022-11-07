import React from 'react';
import { useSelector } from "react-redux";
import {Routes, Route, Link } from "react-router-dom";
// import {Link} from 'react-router-dom';
import { createArrayWithUniqueStudentNames, log } from '../../utils';
import Student from '../student/Student';


const StudentPageOverview = () => {
    const { studentsMockData } = useSelector((state) => state.studentsMockdata);
    log('comp StudentPage:');
    log(studentsMockData);

    let listOfUniqueStudentNames = createArrayWithUniqueStudentNames(studentsMockData, "studentName");
    log(listOfUniqueStudentNames);


  return (
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

    <>
        <br/>
        <h2> student_pages_separate_routing_per_student </h2>
        <p> design: route parameter is 'name'. There are 10 unique student names. So 'name' will  serve as the primary key that connects the 2 json-files: <br/>
        1 json file with grades for  each student. Another json file with personal data for each student. </p> <br/>
        <p> First connect the transformed data to the dumb components in 1,2 and 3 below. This is needed, before you can move on with steps 4,5 and 6.</p> <br/>
        <p>Implementation order: 1 to 6. </p><br/>

        <h2> 1. seperate routing per student: </h2>
        <p> smart component: transform data from json file, in such a way that it can be fed into the x-axis and y-axis of the dumb components below. <br/>
            Using the data (props-object) that is fed into the dumb component of assignment 'Dashboard Overview', I filter the data of 1 student at a time, that will  serve as input <br/>
            for the dumb components 'barchart' and 'linechart' below. 
        </p>

        <br/>
        <h2> 2. student_pages_separate_routing_per_student </h2>
        <p>I need combi of smart component and dumb component to implement this.</p>
        <p> dumb component: as an app user I want to see an overview in the form of a bar chart of the evaluations (fun & difficult) of each assignment (there are 56 assigments) per student. <br/>
            So the data of 1 student is shown at a time.
        </p>
        <p>design: same smart component as in assignment 'Dashboard Overview'. Only difference: label that describes the meaning of the y-axis: 'grade for student Foo', instead of 'average <br/>
            grade of all students'. But no need to do this, because requirement: <br/>
            Tip: the chart remains the same on the X and Y axes, only gets "less" data, namely the data of 1 student.
        </p> <br/>


        <br/>
        <h2> 3. slicing and dicing option 3: </h2>
        <p>dumb component: as a user, I want to see a line-chart representation of my data showing the average grade for "fun" and the average grade for "difficult".
        </p>
        <p>Just like the barchart. Same axes as barchart, so feed the same props obj into the linechart. The slicing-and-dicing options will be reflected at the same 
            <br/> time in barchart and linechart.
        </p>


        <br/>
        <h2> 4. slicing and dicing option 1: </h2>
        <p>smart component: as a user, I want to be able to indicate by means of a checkbox (checkbox will be a dumb component with form-ui-control, connected  to this smart component) whether I only want to show in the bar chart how nice the assignment was,
            <br/> only want to see how difficult the assignment was, or both.
        </p>
        <br/>

        <h2> 5. bonus: Sort the bar charts of assignments by average grade (high to low or low to high): </h2>
        <p> smart component with selectbox with 3 options: 'no sort (default option)', 'sort (low-high)', 'sort (high-low)'. <br/>
            Definition: 'average grade' can be 1 out of 3 things: 
            (a) fun + difficult combined per assignment for 1 selected student.
            (b) fun per assignment for 1 selected student.
            (c) difficult per assignment for 1 selected student. 
            
            This definition requires that the calculation of the average grade takes into account the values of the checkboxes (i.e. checked or not checked) of requirement 1 <br/>
            (see chapter 'Other requirements' at the  end of this document) about slicing and  dicing option 1 (remark: option 2 is only relevant on the dashboard_overview !). <br/>
            I will create a 'props-pipeline' in which these variables (how to sort?, on what to filter: i.e. fun and/or difficult ? ) can interact. <br/>
            Remark: 'nr of students? can vary in the dashboard_overview, but on the StudentPages only 1 student can be selected at a time !
        </p>
        <br/>


        <h2> 6. bonus: user profiles: </h2>
        <p>
            Save  the data locally in a json file.
            There will be 2 json-files:
            1 with data about 'fun' and 'difficulty' for each assignment of each student.
            1 with personal data about each student. 
            A unique identifier will (automatically) be added to both json-files, so the data from both json-files can be combined for 1 student.

            idea: implement personal data with nested routing via a button (but first get it to work without)
        </p>
        <p>dumb component: by using Mockaroo you can retrieve objects with fake data in them. You can then add a profile for each student page and further enrich 
            <br/> the fictitious students with:
                    <ul>
                        <li>Last name</li>
                        <li>Age</li>
                        <li>Phone number</li>
                        <li>email address</li>
                        <li>phote from url</li>
                    </ul>
        </p>
    </>

    </div>
  )
}

export default StudentPageOverview