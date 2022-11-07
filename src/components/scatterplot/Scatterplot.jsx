import React from 'react'

const Scatterplot = () => {
  return (
    <>
        <h2> bonus: scatterplot </h2>
        <p>Create a tool that you are proud of and that you would like to show to a future employer. We pay particular 
            <br/> attention to: legibility of the graphs
        </p><br/>

        <p>design: victory has component for scatterplot. Semantically, scatterplot is not related to the other victory charts, so scatterplot will get 
            <br/> its own  link and route in the navbar.
        </p><br/>
        <p>Implementation order: first 1 and 2, then the rest. So adding the filter-functionality (here: with 2 checkboxes) will be the FINAL step. <br/>
           First connect the transformed data to the dumb component scatterplot.</p>

        <br/>

        <h2>1. scatterplot </h2>
        <p> smart component: transform data and feed it into the scatterplot as props-object.  <br/> </p>
        <br/>



        <h2>2. scatterplot </h2>
        <p> dumb component: scatterplot. </p> 

        <br/>
        <h2> 3. show fun, difficult or both: </h2>
        <p>smart component: as a user, I want to be able to indicate by means of a checkbox (checkbox will be a dumb component with form-ui-control, connected  to this smart component) whether I only want to show in the bar chart how nice the assignment was,
            <br/> only want to see how difficult the assignment was, or both.
        </p>
        <br/>
    </>
  )
}

export default Scatterplot