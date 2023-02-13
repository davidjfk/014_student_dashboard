# intro
This file README_plan_to_solve_winc_assignment.md contains ANALYSIS and DESIGN for each task in the assignment Student Dashobard.
This is a working document. As I roll along, the info below gets updated. 

Each chart-to-create roughly consists of the following tasks: 
- create routing (upfront for all assignments together in (first) branch 01_project_set_up)
- smart component: transform the data so it can serve as input in a victory chart (or grid-table). E.g. <br/>
  perform calculation based on props-object from json-file (e.g. calculate average)
- dumb component: display the data in victory chart (or grid-table).
- smart with dumb component: do filtering and sorting on the props-object. Precondition: smart and dumb <br/>
  components from the previous 2 tasks are ready, (because I need them in this step). 
- pour props-object into required victory chart.
- style the chart.
- check if parts of my dentist app can be reused and/or modified: e.g. filter, sort. 

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

Remark: the DESIGN inside each branch-description below is in html, so I can keep a copy inside the main component  <br/>
(to which a route points) of each branch (for the sake of convenience). 

At the end of  this README-doc is a short list with 'Other Requirements'.

DATA:
    10 students
    56 assignment (e.g. SCRUM, W1D1-1, etc.)
    each students gives grade for each subject for both difficulty as well as fun factor on likert scale from 1 to 5 (included)

    x-axis: 56 * 2 = 112 "paired" columns: for each assignment 1 for 'fun' and 1 for 'difficulty'.
    y-axis: average of 56 students for each assignment.

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



# branch_02_dashboard_overview

REQUIREMENTS: 
    Your WebApplication must display the following

    Dashboard Overview User-story: As a user, when I open the homepage of the application I want to see an overview in the 
    form of a bar chart of the evaluations (fun & difficult) of all students.
    As a user, I must be able to distinguish at a glance between the assignments and the fun/difficult evaluation. 
    Make sure that a clear distinction is made visually, for example by working with clear colours. See the example with red and yellow below.

ANALYSIS:
    dashboard overview = home page of the application. Dashboard is not the only page in the application and contains navbar 
    to got to the other pages. 
    
DESIGN global:
    problem: 56 data points on  the x-axis.  solution: create Brush and Zoom container (alternative: 'squeeze' data into the limited
    space on the x-axis)
    problem: some assignment names in the data are very long. solution: see Victory FAQs:  My axis labels are cut off. How can I fix them?  
    problem: 2 barcharts next to each other. solution: victoryGroup

    1. filter on assignments, so each of the 56 assignments can get its own position on the x-axis (with score for 'fun' and/or 'difficult' on y-axis).
    2. create fn to calculate average ( Array.reduce() --> see the one I created for winc-Big-Array-assignment) for each (of the 56) assignments. 
    3. create victory barchart to display data.  --> for this combine Victory 'Brush and Zoom'with its sample data, with modified winc-example barchart.
    4. tweak styling of styling  'wincTheme'.
    
    
    All "filter, slicing and dicing" options have impact on this one and only barchart. --> so I probably need a pipeline, just like in the 
    songsaver app and the dentist app. State is coming into the app from redux-toolkit-slice as PROPS (!). So I will be handling props. 


DESIGN detailed: 
        1. transform student-data from json file, in such a way that it can 
           be fed into the x-axis and y-axis of a barchart inside a Victory Brush-and-Zoom container.
           The barchart wants as input an array with 56 assignment-objects. Each object contains:
                    1. key with assignmentId, 
                    2. key difficult with value. This value is the average difficulty of 10 students for this assignmentId.
                    3. key fun with value. This value is the average degree of perceived fun of 10 students for this assignmentId.

               How to do this:  
                a) Create array with unique assignmentIds (e.g. W2D3-1) (should be 56 assignmentIds in this array in total as string-values). Use fn createArrayWithUniqueValues to create this array.
                b) Create array with 56 assignment-objects. Each object contains 3 keys: 
                    - key assignmentId with value (e.g. W2D3-1)
                    - key difficult with value 'empty string' as placeholder (will be filled in next step c ). 
                    - key fun with value 'empty string' as placeholder (will be filled in next step d ). 
                c)  create average for 'difficult: fn calculateAverageAssignmentDifficultyOfAllStudents
                    For key difficult, value is average of all 10 students for this assignmentId. Each student has 1 opinion about each assignment, given that there are 10 students). For this, filter datastructure 'A' (see point a above) on object-key 'assignmentId' (into a new array) AND then apply reduce fn on object-key 'difficult' to create average (1 decimal).

                d)  create average for 'fun': fn calculateAssignmentAverageFunLevelOfAllStudents
                    For key fun, same as for key 'difficult', but this time apply reduce fn on object-key 'fun' to create average (also 1 decimal).

                    Remark: round to 1 decimal  place (is what the requirement says, although  data only allows for rounding to 0 decimal place).
        2. create Victory Brush-and-Zoom container.
        3. feed the transformed student-data into the (barcharts inside) brush and zoom container. 
        4. dumb component 'barchart': as a user, when I open the homepage of the application I want to 
            see an overview in the form of a bar chart of the evaluations (fun & difficult) of all students.

        (the remaining features will be implemented in 'branch_05_dashboard_overview_with_slice_and_dice_and_bonus_requirements' )
    

# branch 03_student_pages
ANALYSIS:

    From the navbar on the home page, for each student, you can click to go to a student page. So there are as many student pages, as there are students in the data (10 in the winc dataset). 
    For each student a barchart and a line-chart are shown. So the same charts are shown as on the homepage 'dashboard', but with data for only 1 student. 


    difference compared to branche 02:
        x-axis: 56 * 2 = 112 "paired" columns: for each assignment 1 for 'fun' and 1 for 'difficulty', (so no difference compared to the above)
        y-axis: value 'fun' and 'difficulty' of a student for each of the 56 assignments.
        (So) No need to calculate an average here.

DESIGN:
    Route parameter is 'name'. There are 10 unique student names. So 'name' will  serve as the primary key that connects the 2 json-files: 
        a) 1 json file with grades for  each student. 
        b) Another json file with personal data for each student. 
    First connect the transformed data to the dumb components in 1,2 and 3 below. This is needed, before you can move on with steps 4,5 and 6.
    
        1. seperate routing per student:
            smart component: transform data from json file, in such a way that it can be fed into the x-axis and y-axis of the dumb components below. 
            Using the data (props-object) that is fed into the dumb component of assignment 'Dashboard Overview', I filter the data of 1 student at a time, that will  serve as input 
            for the dumb components 'barchart' and 'linechart' below. 

        2. student_pages_separate_routing_per_student
            I need combi of smart component and dumb component to implement this.</p>
            dumb component: as an app user I want to see an overview in the form of a bar chart of the evaluations (fun & difficult) of each assignment (there are 56 assigments) per student. <br/>
            So the data of 1 student is shown at a time.
     
            design: same smart component as in assignment 'Dashboard Overview'. Only difference: label that describes the meaning of the y-axis: 'grade for student Foo', instead of 'average <br/>
            grade of all students'. But no need to do this, because requirement: <br/>
            Tip: the chart remains the same on the X and Y axes, only gets "less" data, namely the data of 1 student.

        3.  connect data to barchart in brush and zoom container. If you click on a student on student pages, 
            then the data of this one student is shown in a brush-and-zoom container. 

            (the remaining features will be implemented in 'branch_06_student_pages_with_slice_and_dice_and_bonus_requirements' )


# branch 04_scatterplot_design_your_own_tool
(bonus)
GOAL: Create a tool that you are proud of and that you would like to show to a future employer. We pay particular attention to: legibility of the graphs.

my choice: a scatterplot (dumb component).

ANALYSIS:

    Victory has component for scatterplot. Semantically, scatterplot is not related to the other victory charts, 
    so scatterplot will get its own  link and route in the navbar.
       

DESIGN:
    scatterplot 1:
    All assignments (56) on X-axis with average fun-score of 10 students, and on Y-axis assignments (56) with average difficult score of 10 students: so 
    for each assignment you can see "on average" how the perceived fun-score and difficult-score correlate. 

    scatterplot 2:
    All students (10) on X-axis with their individual average fun-socre andon Y-axis with their individual average difficult-score: so 
    for each student you can see how the average fun correlates with average diffiicult.


    STEP1: transform the data so it can be fed into the dumb component scatterplot as props-object.
    STEP2: feed data into the dumb component scatterplot as props-object.
    STEP3: calculate correlation coefficient for both scatterplots and analyse/ interpret the result. 
    STEP4: style the 2 scatterplots. 

# branch_05_line_chart_as_slicing_and_dicing_option_3
        
        1.  slicing and dicing option 3: (order of slicing-and-dicing options 3, 1 then 2 is deliberate)
            dumb component: as a user, I want to see a line-chart representation of my data showing the average grade for "fun" and the average grade for "difficult".
            Just like the barchart. Same axes as barchart, so feed the same props obj into the linechart. The slicing-and-dicing options will be reflected at the same time 
            in barchart and linechart.
                use/modify the linechart-styling of 'wincTheme' from winc-example-code.

            I have combined linechart with scatterplot. The nice idea (with rather sparse implementation of how) to do this comes from: 
            https://omarshishani.medium.com/add-points-to-victoryline-chart-by-combining-with-scatter-plot-c56d663fbd35


            The linechart has its own route, 


# branch_6a_dashboard_overview_with_slicing_and_dicing_options_1_and_2_and_bonus_requirements
        (continuation of the code from branch_02_dashboard_overview)

        5. slicing and dicing option 1: 
            smart component: As a user, I want to be able to indicate by means of a checkbox (checkbox will be a dumb component with form-ui-control, connected  to this smart component) 
            whether I only want to show in the bar chart how nice the assignment was,
            only want to see how difficult the assignment was, or both.

        6. slicing and dicing option 2:
            smart component: As a user, in addition to filtering on 1 person, I also want to be able to filter on multiple people. I, therefore, want to 
            see a checkbox (checkbox will be a dumb component with form-ui-control, connected  to this smart component) in the overview of my students that I can do:
            check if I want to include the data of this specific student in my chart.
            uncheck if I want to exclude the data of this specific student from my chart.

            (would be prettier to use drop-down box, but requirements states 'checkboxes'.)

        7. bonus: sort the bar charts of assignments by average grade (high to low or low to high): 
            smart component with selectbox with 3 options: 'no sort (default option)', 'sort (low-high)', 'sort (high-low)'. 
            Definition: 'average grade' can be 1 out of 3 things: 
            (a) fun + difficult combined per assignment for all 56 students combined (OR a subset of the students).
            (b) fun per assignment for all 56 students combined (OR a subset of students).
            (c) difficult per assignment for all 56 students combined (OR a subset of students).
            
            This definition requires that the calculation of the average grade takes into account the values of the checkboxes (i.e. checked or not checked) of requirement 1 
            (see chapter 'Other requirements' at the  end of this document) about slicing and  dicing options 1 and 2. 
            I will create a 'props-pipeline' in which these variables (nr of students?, how to sort?, on what to filter: i.e. fun and/or difficult ? ) can interact. 

            tasks:
            1. victory has in-built prop to sort. See victory-site --> Documentation --> Common Props --> 'sortKey' combined with 'sortOrder'.


# branch_6b_student_pages_with_slicing_and_dicing_options_1_and_2_and_bonus_requirements
        (continuation of the code from branch_03_student_pages)

        4. slicing and dicing option 1: 
           smart component: as a user, I want to be able to indicate by means of a checkbox (checkbox will be a dumb component with form-ui-control, connected  to this smart component) whether 
           I only want to show in the bar chart how nice the assignment was,
           only want to see how difficult the assignment was, or both.


        6. bonus: Sort the bar charts of assignments by average grade (high to low or low to high):
            smart component with selectbox with 3 options: 'no sort (default option)', 'sort (low-high)', 'sort (high-low)'. 
            Definition: 'average grade' can be 1 out of 3 things: 
            (a) fun + difficult combined per assignment for 1 selected student.
            (b) fun per assignment for 1 selected student.
            (c) difficult per assignment for 1 selected student. 

            1. smart component:transform data and feed it into the dumb components as props-object.
            2. dumb component: 10 students will populate the x-axis, instead of 56 assignments. 
                The y-axis -as a result of this - will contain 'average grade per student', instead of 'average grade per assignment'. 
                So I need a new - read: modified - victory chart 'M' to implement this. 
                Semantically, 'M' is different from the other victory charts, so 'M' gets its own link and route in the navbar.  
                implement 'M' as barchart and linechart.
            
                This definition requires that the calculation of the average grade takes into account the values of the checkboxes (i.e. checked or not checked or display of 'difficult' and/or 'fun).
            3.  scope: page Student Dashboard.
            4.  how2 implement: create a 'props-pipeline' in which these variables (how to sort?, on what to filter: i.e. fun and/or difficult ? ) 
                can interact. 
                Remark: 'nr of students? can vary in the dashboard_overview, but on the StudentPages only 1 student can be selected at a time !


        7. bonus: user profiles: 
            Save  the data locally in a json file.
            There will be 2 json-files:
                1 with data about 'fun' and 'difficulty' for each assignment of each student.
                1 with personal data about each student. 
                Unique identifier in both json-files is name (works in this dataset, generally speaking 'name' is not unique), so 
                the data from both json-files can be combined for 1 student.

                idea: implement personal data with nested routing via a button (but first get it to work without)
 
            dumb component: by using Mockaroo you can retrieve objects with fake data in them. You can then add a profile for each student page and further enrich 
            the fictitious students with:
                Last name
                Age</li>
                Phone number
                email address
                phote from url

# branch_07_table_view
(bonus)

ANALYSIS:
    Table overview of all data ⇒ so as an Excel spreadsheet. You can decide for yourself how you want to structure the columns / rows:

    You can still filter in all the above ways
    Add sort by data column

DESIGN:

    Page 'table overview' on a separate page in react-router, with a clickable link from the navbar on the homepage. 
    Otherwise there is too much info on the Dashboard Overview.  
    To make table responsive, use css grid (instead of table, with tr and td). See my winc-dentist solution.

    all 4 columns contain "data". Implement sorting on all 4 data columns: twice sorting datatype strings and twice datatype int. 
    Use utf-8 as default in the sort fn. 

    how2: sort and/or filter the data (read: props!) before feeding the data into the grid.

    I need combi of smart component and dumb compoonent to implement this:

    design: table will be implemented with css grid, instead of css table.
    implementation order: first connect the transformed data to the dumb components in 1 and 2 below. 
    This is needed, before you can move on with steps 4,5 and 6.</p> <br/>
    So adding the filter-and sort-functionality will be the FINAL step. First connect the transformed data to the dumb component table.

    1. Table View
        smart component: transform data and feed it into the grid (grid will be used to implement a table structure). </p><br/>

    2. Table View 
        dumb component: table overview has its own axes -- 4 columns, 560 rows, see excel student mock data, 
        so needs its own component with its own link and route in the navbar.

    3. slicing and dicing option 1:
        smart component: As a user, I want to be able to indicate by means of a checkbox (checkbox will be a dumb component with form-ui-control, connected  to this smart component) whether I only want to show in the 'Table Overview' how nice the assignment was,
        only want to see how difficult the assignment was, or both.

    4. slicing and dicing option 2: </h2>
        smart component: As a user, in addition to filtering on 1 person, I also want to be able to filter on multiple people. I, therefore, want to 
        see a checkbox (checkbox will be a dumb component with form-ui-control, connected  to this smart component) in the overview of my students that I can do:
    
            a) check if I want to include the data of this specific student in my 'Table Overview'
            b) uncheck if I want to exclude the data of this specific student from my 'Table Overview'.
    


    5. Table View 
        smart component: Add sort by data column. I do this with selectbox (selectbox will be a dumb form-ui-control, connected to this smart component)  
        design: for each of the 4 columns in the selectbox 3 options: 'no sort (default option)', 'sort (low-high)', 'sort (high-low)'.
        So 12 selectbox-options in total.            



# branch_08_sort_students_by_average_grades

ANALYSIS:
    requirement: "sort the students by average grades (high to low or low to high)."

    scope: you need more than 1 student for this --> cannot use a selectbox here. You need a separate chart here: reason: whereas on the 
    'Dashboard Overview' (branch_02) there are 56 points (1 for each assignment) on the x-axis, this time (on branch_06) there
    will be 10 points (1 for each student) on the x-axis.

    x-axis: 10 columns. Each column is 1 student. (so the x-axis is different than that of the previous assignments !!!)
    y-axis: average grade of a student for all 56 assignments. (So) column height of a marker on the barchart indicates the average grade for all 56 assignments of 1 student.

    Add a checkbox:
    unchecked === grades from low to high (from left to right)
    checked === grades from high to low (from right to left)

    On main nav bar add link to separate page (with its own comp) on which to implement branch_10_sort_students_by_average_grades. 

    'average' can be 1 out of 2 things: 
    a) fun per assignment for all 56 students combined.  
    b) difficult per assignment for all 56 students combined.  
    --> "fun + difficult" combined per assignment for all 56 assignments per student combined would be weird: 
        adding "fun + difficult" has no semantic meaning.

DESIGN:
    I need combi of smart component and dumb compoonent to implement this:

    Implementation order: 1 to 6. 
    So adding the sort-functionality will be the FINAL step. First connect the transformed data to the dumb components. 

    1. sort students by average grades
        smart component:transform data and feed it into the dumb components as props-object. 

    2. sort students by average grades
        dumb component: 
        10 students will populate the x-axis, instead of 56 assignments. 
        The y-axis -as a result of this - will contain 'average grade per student', instead of 'average grade per assignment'. 
        So I need a new - read: modified - victory chart 'M' to implement this. 
        Semantically, 'M' is different from the other victory charts, so 'M' gets its own link and route in the navbar.  
        Implement 'M' as barchart and linechart, refactor from assignment 'Dashboard Overview'.

    3. sort students by average grades
        smart component with business logic to implement "sort the students by average grades (high to low or low to high)."
        dumb component with selectbox with 3 options: 'no sort (default option)', 'sort (low-high)', 'sort (high-low)'. (no requirement about 
        which form control to use).
    4. (just for fun): filter (in or out) 1, a few or all assignments. Use pipeline (see my Winc-dentist-assignment) to combine
        sorting and filtering.  


# branch 09_scatterplot_with_correlation_coefficients_and_outliers

    End point of 'branch_02_scatterplot(...)' : inside the scatterplot the assignments and the students have been 'scatterplotted' on the dimensions 'difficult rating' and 'fun rating'.

    1. for 'assignments' calculate correlation coefficient.
    2. automatically analyse the value of the coefficient.
    3. for 'students' calculate correlation coefficient.
    4. automatically analyse the value of the coefficient.
    5. calculate outliers.
    6. if there are outliers (in branch_02_scatterplot(...) visual inspection of scatterplot has resulted in 1 student as an outlier
       and possibly 1 or 2 assignments.)






# slicing-and-dicing and bonus Requirements
    All 'slicing-and-dicing and bonus Requirements' have been incorporated in branches above. 

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



