import React from 'react';
import { useSelector } from "react-redux";
import { log } from '../../utils';

const DashboardOverview = () => {
    const { studentsMockData } = useSelector((state) => state.studentsMockdata);
    log('comp DashboardOverview:');
    log(studentsMockData);

  return (
    <>
        <div>dashboard-overview will contain  the following: </div>
        <br/>

        <p>Design: the steps below serve as a proof of concept, also for a big part of the other assignments as well.</p>
        <p>Implementation order: 1 to 6. <br/>
        First connect the transformed data to the dumb components in 1,2 and 3 below. This is needed, before you can move on with steps 4,5 and 6.</p> <br/>

        <h2> 1. dashboard overview user-story: </h2>
            <p> smart component: transform data from json file, in such a way that it can be fed into the x-axis and y-axis of the dumb components below.
            </p>
        <br/>

        <br/>
        <h2> 2. dashboard overview user-story: </h2>
        <p>I need combi of smart component and dumb compoonent to implement this.</p>
        <p> dumb component: as a user, when I open the homepage of the application I want to see an overview in the form of a bar chart of the evaluations (fun & difficult) of all students.
        </p>
        <p>As a user, I must be able to distinguish at a glance between the assignments and the fun/difficult evaluation. Make sure that a clear distinction is made visually, for example 
            <br/> by working with clear colours. See the example with red and yellow below.
        </p>

        <br/>
        <h2> 3. slicing and dicing option 3: </h2>
        <p>dumb component: as a user, I want to see a line-chart representation of my data showing the average grade for "fun" and the average grade for "difficult".
        </p>
        <p>Just like the barchart. Same axes as barchart, so feed the same props obj into the linechart. The slicing-and-dicing options will be reflected at the same 
            <br/> time in barchart and linechart.
        </p> <br/>

        <h2> 4. slicing and dicing option 1: </h2>
        <p>smart component: As a user, I want to be able to indicate by means of a checkbox (checkbox will be a dumb component with form-ui-control, connected  to this smart component) whether I only want to show in the bar chart how nice the assignment was,
            <br/> only want to see how difficult the assignment was, or both.
        </p>
        <br/>
        <h2> 5. slicing and dicing option 2: </h2>
        <p>smart component: As a user, in addition to filtering on 1 person, I also want to be able to filter on multiple people. I, therefore, want to 
            <br/> see a checkbox (checkbox will be a dumb component with form-ui-control, connected  to this smart component) in the overview of my students that I can do:
            <ul>
                <li>check if I want to include the data of this specific student in my chart</li>
                <li>uncheck if I want to exclude the data of this specific student from my chart.</li>
            </ul>
        </p>
        <br/>
        <h2> 6. bonus: sort the bar charts of assignments by average grade (high to low or low to high): </h2>
        <p> smart component with selectbox with 3 options: 'no sort (default option)', 'sort (low-high)', 'sort (high-low)'. <br/>
            Definition: 'average grade' can be 1 out of 3 things: 
            (a) fun + difficult combined per assignment for all 56 students combined (OR a subset of the students).
            (b) fun per assignment for all 56 students combined (OR a subset of students).
            (c) difficult per assignment for all 56 students combined (OR a subset of students).
            
            This definition requires that the calculation of the average grade takes into account the values of the checkboxes (i.e. checked or not checked) of requirement 1 <br/>
            (see chapter 'Other requirements' at the  end of this document) about slicing and  dicing options 1 and 2. <br/>
            I will create a 'props-pipeline' in which these variables (nr of students?, how to sort?, on what to filter: i.e. fun and/or difficult ? ) can interact. 
        </p>
    </>
  )
}

export default DashboardOverview