import React from 'react'

const TableOverview = () => {
  return (
    <>
        <h2> bonus: Table View </h2>
        <p>I need combi of smart component and dumb compoonent to implement this:</p>

        <p>design: table will be implemented with css grid, instead of css table.</p> <br/>
        <p> implementation order: first connect the transformed data to the dumb components in 1 and 2 below. This is needed, before you can move on with steps 4,5 and 6.</p> <br/>
        <p>So adding the filter-and sort-functionality will be the FINAL step. First connect the transformed data to the dumb component table. </p> <br/>

        <h2>1. Table View </h2>
        <p> smart component: transform data and feed it into the grid (grid will be used to implement a table structure). </p><br/>

        <h2>2. Table View </h2>
        <p> dumb component: table overview has its own axes -- 4 columns, 560 rows, see excel student mock data, 
            <br/> so needs its own component with its own link and route in the navbar.
        </p>

        <br/>
        <h2> 3. slicing and dicing option 1: </h2>
        <p>smart component: As a user, I want to be able to indicate by means of a checkbox (checkbox will be a dumb component with form-ui-control, connected  to this smart component) whether I only want to show in the 'Table Overview' how nice the assignment was,
            <br/> only want to see how difficult the assignment was, or both.
        </p>
        <br/>
        <h2> 4. slicing and dicing option 2: </h2>
        <p>smart component: As a user, in addition to filtering on 1 person, I also want to be able to filter on multiple people. I, therefore, want to 
            <br/> see a checkbox (checkbox will be a dumb component with form-ui-control, connected  to this smart component) in the overview of my students that I can do:
            <ul>
                <li>check if I want to include the data of this specific student in my 'Table Overview'</li>
                <li>uncheck if I want to exclude the data of this specific student from my 'Table Overview'.</li>
            </ul>
        </p>
        <br/>

        <h2>5. Table View </h2>
        <p> smart component: Add sort by data column. I do this with selectbox (selectbox will be a dumb form-ui-control, connected to this smart component)  <br/> </p>
        <p> design: for each of the 4 columns in the selectbox 3 options: 'no sort (default option)', 'sort (low-high)', 'sort (high-low)'. <br/>
            So 12 selectbox-options in total.            
        </p> <br/>
    </>
  )
}

export default TableOverview