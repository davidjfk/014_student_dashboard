# intro
This is a working document. As I roll along, the info below gets updated. 

Each chart-to-create roughly consists of the following tasks: 
- create routing (upfront for all assignments together in (first) branch 01_project_set_up)
- smart component: transform the data so it can serve as input in a victory chart (or grid-table). E.g. <br/>
  perform calculation based on props-object from json-file (e.g. calculate average)
- dumb component: display the dat in victory chart (or grid-table).
- smart with dumb component: do filtering and sorting on the props-object. Precondition: smart and dumb <br/>
  components from the previous 2 tasks are ready, (because I need them in this step). 
- pour props-object into required victory chart.
- style the chart.

First execute tasks in branch_01_project_set_up (see further below for contents of the other branches).

Routing brings all assignments from the Student Dashboard together inside 1 application and helps to determine the logical order in which to execute the individual winc-assignments. 

Design choice: all tasks that belong/ work together on the same route, will be part of the same git branch. 
Design choice: each route will be a git branch.  

Branches (in addition to branch_01_project_set_up): (see below for contents of each branch).
branch_02_dashboard_overview
branch 03_student_pages_with_separate_routing_for_each_student
branch 04_scatterplot_design_your_own_tool
branch_05_table_view
branch_06_sort_students_by_average_grades

Remark: the game plan inside each branch-description below is in html, so I can keep a copy inside the main component  <br/>
(to which a route points) of each branch (for the sake of convenience). 

At the end of  this README-doc is a short list with 'Other Requirements'.

# branch_01_project_set_up  
steps to take:
- create README files.
- create github repo
- install victory chart  ( npm i --save victory )
- install package d3, to convert csv to json. d3 is recomended in winc slack channel. ( npm install d3 --save)
- install styled components (for styling).
- install react-router-dom@6 (version 6).
- study react-router 6. Output of this step: get "architectural" idea of how to implement the combined routing for all tasks of the assignment, including the bonus requirements, so everything works together nicely. status: done

  EXPERIMENT
- create a pet react app with redux toolkit, styled components, d3 and  victory in vscode.
- experiment with pet project: create a bar chart with very little data from array inside the same component.
- now import this data from a csv-file and create the same barchart.
- experiment with the axis labels.
- add colors to barchart columns.

  ROUTING (part 1)
- implement (basic, initial) routing for all tasks of upcoming branches. For this I must get a (preliminary) idea of how to fit all the (implementations of the) requirements into the application. --> nested routing can only be implemented when the csv data is available as json. So do routing and csv stuff simultaneously. For some routing (e.g. branch 03_separate_routing_per_student) json data must be available. Otherwise route parameters cannot be implemented.

  CSV:
- add csv to project files, in directory data.
- import csv with student data into app
- convert csv to json when application starts (useEffect hook)
- change  column headers:
    Wie ben je? --> wordt: studentName
    Welke opdracht of welk project lever je nu in?  -->wordt: assignment
    Hoe moeilijk vond je deze opdracht? -->wordt: difficulty
    Hoe leuk vond je deze opdracht? -->wordt: fun
- put json into redux-toolkit-slice.
- load (useSelector hook) json into component where  dashboards must be created.

Routing (part 2)
Creating routing for branch 03_student_pages_with_separate_routing_for_each_student. Here json data must be available  to use as route parameters.

Create (this) file README_plan_to_solve_winc_assignment.md, with a game plan for each task in the assignment (see below).

# branch_02_dashboard_overview

INTRO: 

Your WebApplication must display the following

Dashboard Overview User-story: As a user, when I open the homepage of the application I want to see an overview in the form of a bar chart of the evaluations (fun & difficult) of all students.
As a user, I must be able to distinguish at a glance between the assignments and the fun/difficult evaluation. Make sure that a clear distinction is made visually, for example by working with clear colours. See the example with red and yellow below.

(barchart in image)

steps to take:
    definitions:
    dashboard = home page of the application, see a) and b) below. But the dashboard is not the only page in the application, see below. 
    
- check if parts of my dentist app can be reused and/or modified: e.g. filter, sort, checkbox. 

- about the data:
    10 students
    56 assignment (e.g. SCRUM, W1D1-1, etc.)
    each students gives grade for each subject for both difficulty as well as fun factor on likert scale from 1 to 5 (included)

    x-axis: 56 * 2 = 112 "paired" columns: for each assignment 1 for 'fun' and 1 for 'difficulty'.
    y-axis: average of 56 students for each assignment.

- create average ( Array.reduce())
- create victory barchart to display data.  --> all "filter, slicing and dicing" options have impact on this one and only barchart. --> so I probably need a pipeline, just like in the songsaver app and the dentist app. State is coming into the app from redux-toolkit-slice as PROPS (!). So I will just be handling props. 


GAME PLAN: 

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
        <h2> 2. dashboard overview user-story:  </h2>
        <p> dumb component: as a user, when I open the homepage of the application I want to see an overview in the form of a bar chart of the evaluations (fun & difficult) of all students.
        </p>
        <p>As a user, I must be able to distinguish at a glance between the assignments and the fun/difficult evaluation. Make sure that a clear distinction is made visually, for example 
            <br/> by working with clear colours. See the example with red and yellow below.
        </p><br/>

        
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
    </br>





# branch 03_student_pages_with_separate_routing_for_each_student

INTRO:

From the navbar on the home page, for each student, you can click to go to a student page. So there are as many student pages, as there are students in the data (10 in the winc dataset). For each student a barchart and a line-chart are shown. So the same charts are shown as on the homepage 'dashboard', but with data for only 1 student. 


difference compared to branche 02:
    x-axis: 56 * 2 = 112 "paired" columns: for each assignment 1 for 'fun' and 1 for 'difficulty', (so no difference compared to the above)
    y-axis: value 'fun' and 'difficulty' of a student for each of the 56 assignments.
    (So) No need to calculate an average here.

GAME PLAN:

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
  

# branch 04_scatterplot_design_your_own_tool
INTRO:

Design: Create a tool that you are proud of and that you would like to show to a future employer. We pay particular attention to: legibility of the graphs.

my choice: a scatterplot 😊.

scatterplot 1:
All students (10) on X-axis with their individual average fun-socre andon Y-axis with their individual average difficult-score: so for each student you can see how the average fun correlates with average diffiicult.

scatterplot 2:
All assignments (56) on X-axis with average fun-score of 10 students, and on Y-axis assignments (56) with average difficult score of 10 students: sof for each assignment you can see "on average" how the perceived fun-score and difficult-score correlate. 

GAME PLAN:

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



# branch_05_table_view

INTRO:

On page 'table overview' (bonus feature) --> with react router I will put this on a separate page, with a clickable link from the navbar on the homepage. Otherwise there is too much info on the Dashboard Overview.  To make table responsive, use css grid (instead of table, with tr and td).

Table overview of all data ⇒ so as an Excel spreadsheet. You can decide for yourself how you want to structure the columns / rows:

You can still filter in all the above ways
Add sort by data column  --> all 4 columns contain "data". Implement sorting on all 4 data columns: twice sorting datatype strings and twice datatype int. Use utf-8 as default in the sort fn. 

how2: sort and/or filter the data (read: props!) before feeding the data into the grid.


GAME PLAN:


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


# branch_06_sort_students_by_average_grades

INTRO:

scope: you need more than 1 student for this --> cannot use a selectbox here. You need a separate chart here:

x-axis: 10 columns. Each column is 1 student. (the x-axis is different than that of the previous assignments !!!)
y-axis: average grade of a student for all 56 assignments. (So) column height of a marker on the barchart indicates the average grade for all 56 assignments of 1 student.

Add a checkbox:
unchecked === grades from low to high (from left to right)
checked === grades from high to low (from right to left)

On main nav bar add link to separate page (with its own comp) on which to implement branch_10_sort_students_by_average_grades. 

'average' can be 1 out of 3 things: 
a) fun + difficult combined per assignment for all 56 students combined. (base case)
b) fun per assignment for all 56 students combined.  (optional, if time left)
c) difficult per assignment for all 56 students combined.  (optional, if time left)


GAME PLAN:

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




# Other Requirements

1. slicing and dicing --> has been incorporated in branches above. Info below applies to all branches where <br.>
   slicing and dicing is applicable.

    (requirement: start:)
    Slicing and dicing. - Choose one of the methods below: As a user of the tool you can "slice and dice" the data in a number of ways".
    Option 1: As a user, I want to be able to indicate by means of a checkbox whether I only want to show in the bar chart how nice the assignment was, only want to see how difficult the assignment was, or both.
    Option 2: As a user, in addition to filtering on 1 person, I also want to be able to filter on multiple people. I, therefore, want to see a checkbox in the overview of my students that I can do
    check if I want to include the data of this specific student in my chart
    uncheck if I want to exclude the data of this specific student from my chart.
    Option 3: As a user, I want to see a line-chart representation of my data showing the average grade for "fun" and the average grade for "difficult".
    (requirement: end)

    option 1: 
    3 options (show difficulty, show fun, or both), so 2 checkboxes are needed.
    scope: implement on homepage and on (all 10) student pages.

    option 2: 
    scope: the homepage 'dashboard' will contain the required "overview of my students" in the navbar (at the top of the homepage dashboard).
    Up to this point each student is button on the navbar.
    Behind each button a checkbox will be added:
        checked === student shows up in the chart (barchart, line-chart and table-overview) 
        unchecked ===  student does not show up in these charts.
        --> this is perhaps a good reason to put table-overview on homepage 'dashboard' as well: otherwise you would have to switch to the homepage to select the data that you want to display in the table-overview, with the table-overview residing on another page. Would be user-unfriendly.

    option 3:
    same data as for barchart. Just a different implementation in Victory chart. 
    site victory:gallery: multipoint tooltip labels.

    This is just another visual representation of the SAME data. So I will put this line-chart right below the barchart in the Dashboard Overview and Student Page (with Separate Routing Per Student). 


2. bonus: slice_and_dice_in_more_than_1_way -> has been incorporated in branches above. Info below applies to all branches where <br.>
   slicing and dicing is applicable.


3. bonus: store_everything_in_redux --> use Redux-toolkit from the very start, to prevent rework.


4. bonus: sort_barchart_of_assignments_by_average_grade --> has been incorporated in branch_02_dashboard_overview above, and <br/>
   branch 03_student_pages_with_separate_routing_for_each_student.


# The End



