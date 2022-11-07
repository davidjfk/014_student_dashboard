import React from 'react'

const SortStudentsByAverageGrades = () => {
  return (
    <>
        <h2> bonus: sort students by average grades </h2>
        <p>I need combi of smart component and dumb compoonent to implement this:</p> <br/>
        <p>
           design: <br/> 
           hypothesis: if I feed data above into the x-axis and y-axis AND (as a next step) update the variables with which to sort and filter, <br/>
           then I can reuse (by refactoring) all code from assignment 'Dashboard Overview'. <br/><br/>
        </p>
        <p>Implementation order: 1 to 6. </p><br/> 
        <p>So adding the sort-functionality will be the FINAL step. First connect the transformed data to the dumb components. </p>
        <br/>

        <h2>1. sort students by average grades</h2>
        <p> smart component:transform data and feed it into the dumb components as props-object. <br/>
        </p>
        <br/>

        <h2>2. sort students by average grades</h2>
        <p> 
            dumb component: <br/> 
            10 students will populate the x-axis, instead of 56 assignments. <br/>
            The y-axis -as a result of this - will contain 'average grade per student', instead of 'average grade per assignment'. <br/>
            So I need a new - read: modified - victory chart 'M' to implement this. 
            <br/> Semantically, 'M' is different from the other victory charts, so 'M' gets its own link and route in the navbar.  
            <br/> implement 'M' as barchart and linechart, refactor from assignment 'Dashboard Overview'.
        </p> <br/>


        <h2>3. sort students by average grades</h2>
        <p> smart component: sort the students by average grades (high to low or low to high). <br/>
            design: selectbox with 3 options: 'no sort (default option)', 'sort (low-high)', 'sort (high-low)'.
        </p>
        <br/>
    </>
  )
}

export default SortStudentsByAverageGrades