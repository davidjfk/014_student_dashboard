import React, { useState, useEffect, useRef, useMemo  } from 'react';
import { useSelector } from "react-redux";

// start of imports for filter-and-sort-comp:
import { Checkbox } from '../checkbox/Checkbox';
import {Container} from '../styles/Container.styled'
// import ClientInClientList from './ClientInClientList.js'
import {ClientListAreaStyled, ClientListStyled, Column, FormControlArea, Headers, Intro, Section1, Section2, Section3} from './ClientList.styled'
import {StyledSelectbox} from '../styles/Selectbox.styled';

// end of imports for filter-and-sort-comp:



import {
    VictoryZoomContainer,
    VictoryBrushContainer,
    VictoryBar,
    VictoryChart,
    VictoryGroup,
    VictoryTooltip,
    VictoryLabel,
    VictoryLine,
    VictoryPie,
    VictoryAxis 
} from "victory";

import {BrushAndZoomWithBarChart} from '../brushAndZoomWithBarChart/BrushAndZoomWithBarChart'

import {
    createArrayWithAssignmentObjects,
    createArrayWithUniqueValues, 
    createAssignmentObjectForEachAssignmentId,

    createStudentObjectForEachStudentId,
    createArrayWithStudentObjects,

    log } from '../../utils';

import {wincTheme} from "../styles/wincTheme";
import { StyledCheckbox } from '../styles/Checkbox.styled';

const StudentsOverview = () => {

    // part 1: ETL the data: start
        const { studentsMockData } = useSelector((state) => state.studentsMockdata);
        // log('comp DashboardOverview:');
        // log(studentsMockData);

        const listOfUniqueAssignmentIds = createArrayWithUniqueValues(studentsMockData, "assignmentId");
        //// listOfUniqueAssignmentIds.sort(); // do not sort.
        // log(`listOfUniqueAssignmentIds: `)
        // log(listOfUniqueAssignmentIds);

        let arrayWithAssignmentObjects = useMemo(() => { 
            return createArrayWithAssignmentObjects(createAssignmentObjectForEachAssignmentId, studentsMockData, listOfUniqueAssignmentIds)}, 
            [studentsMockData]
        );

        // const arrayWithAssignmentObjects = createArrayWithAssignmentObjects(createAssignmentObjectForEachAssignmentId, studentsMockData, listOfUniqueAssignmentIds);
        // log(`arrayWithAssignmentObjects: `)
        // log(arrayWithAssignmentObjects);  


        // let assignmentId = "SCRUM";
        // let averageGradeDifficulty = calculateAverageForDifficultyForOneAssignmentOfAllStudents(studentsMockData, assignmentId);
        // log(`averageGradeDifficulty: `)
        // log(averageGradeDifficulty);


        const listOfUniqueStudentNames = createArrayWithUniqueValues(studentsMockData, "studentName");
        listOfUniqueStudentNames.sort();
        // log(`listOfUniqueStudentNames: `)
        // log(listOfUniqueStudentNames);

        const arrayWithUniqueStudentObjects = createArrayWithStudentObjects(createStudentObjectForEachStudentId, studentsMockData, listOfUniqueStudentNames);
        // log(`comp students overview: arrayWithUniqueStudentObjects: `)
        // log(arrayWithUniqueStudentObjects);  
    // part 1: ETL the data: END


    // part 2: filter-and-sort-comp: business logic: start
    const [assignmentObjectKeyToSortArrayWithAssignments, setAssignmentObjectKeyToSortArrayWithAssignments] = useState('');
    const [boolShowDifficultyRating, setBoolShowDifficultyRating] = useState(true);
    const [boolShowFunRating, setBoolShowFunRating] = useState(true);
    const [isHovering, setIsHovering] = useState(false);
    const [studentsFromCheckBox, setStudentsFromCheckbox] = useState(['Aranka', 'Evelyn', 'Floris', 'Hector', 'Martina', 'Maurits', 'Rahima', 'Sandra', 'Storm', 'Wietske']);
    const ref = useRef(true); // goal: checkboxes must be checked by default
    // more info: https://bobbyhadz.com/blog/react-set-checkbox-checked

    log(`ref: `);
    log(ref.current.checked);
    log(ref.current)

    const [studentsFromSelectBox, setStudentsFromSelectBox] = useState([""]); // works, but requirements state 'checkbox' instead.
    const [assignmentsToFilterWith, setAssignmentsToFilterWith] = useState([""]);
    const [arrayWithFilteredStudentObjects, setDataToRenderFromUseEffectPipeline] = useState([]);

    log(`arrayWithFilteredStudentObjects: `);
    log(arrayWithFilteredStudentObjects);


    log(`studentsFromCheckbox:`);
    log(studentsFromCheckBox);
    log(`studentsFromSelectBox:`);
    log(studentsFromSelectBox);

    const handleFilterOneOrMoreStudentsViaSelectBox = (event) => {
        let value = Array.from(
            event.target.selectedOptions, (option) => option.value
        )   
        setStudentsFromSelectBox(value);
    };

    const handleFilterOneOrMoreStudentsViaCheckbox = (event) => {
        log(`fn handleFilterOneOrMoreStudentsViaCheckbox: start: `);
        log(event.target.checked);
        const isChecked = event.target.checked;
        if(isChecked){
            // source of code in this fn is a class-based component: https://medium.com/codex/handling-checkboxes-in-react-3a2514b140d2
            // this.setState({ languages: [...this.state.languages, event.target.value] });
            setStudentsFromCheckbox([...studentsFromCheckBox, event.target.value]);
        }else{
            // let index = this.state.languages.indexOf(event.target.value);
            let studentsCopy = [...studentsFromCheckBox]
            let index = studentsCopy.indexOf(event.target.value);
            // this.state.languages.splice(index, 1);
            studentsCopy.splice(index, 1);
            // this.setState({ languages: this.state.languages });
            setStudentsFromCheckbox(studentsCopy);
            // log(`languages: `);
            // log(languages)
        }
    };

 
    const handleChangeBoolDifficultyRating = () => {
      setBoolShowDifficultyRating(!boolShowDifficultyRating);
    };
  
    const handleChangeBoolFunRating = () => {
      setBoolShowFunRating(!boolShowFunRating);
    };

    const handleMouseOver = () => {
        setIsHovering(true);
      };
    
    const handleMouseOut = () => {
    setIsHovering(false);
    };



    const filterByDifficultyRating = (arrayWithStudents, boolShowDifficultyRating) => {
        log(`---------------------------------------`);
        log(`fn filterByDifficultyRating: start: ooo`);
        log(`arrayWithSTudents:`);
        log(arrayWithStudents);
        log(boolShowDifficultyRating.toString())
            let filteredArrayWithAssignments = arrayWithStudents.map(assignment => {
                const {difficulty, ...assignmentObjectWithoutPropertyDifficulty} = assignment; 
                if (boolShowDifficultyRating) {
                    return assignment
                } 
                return assignmentObjectWithoutPropertyDifficulty
            });
        log(`hier:`)
        log(filteredArrayWithAssignments)
        return filteredArrayWithAssignments;
    }

    const filterByFunRating = (arrayWithStudents, boolShowDifficultyRating) => {
        log(`---------------------------------------`);
        log(`fn filterByFunRating: start: ppp`);
        log(`arrayWithStudents:`);
        log(arrayWithStudents);
        log(boolShowDifficultyRating.toString())
            let filteredArrayWithAssignments = arrayWithStudents.map(assignment => {
                const {fun, ...assignmentObjectWithoutPropertyDifficulty} = assignment; 
                if (boolShowDifficultyRating) {
                    return assignment
                } 
                return assignmentObjectWithoutPropertyDifficulty
            });

        return filteredArrayWithAssignments;
    }

    const sortStudents = (clients, sortCriteriaFromSelectboxAsSpaceSeparatedString) => {
        log(`inside fn sortAssignments: `)
        // log(clients)
        // log(sortCriteriaFromSelectboxAsSpaceSeparatedString)
        if (!sortCriteriaFromSelectboxAsSpaceSeparatedString) {
            return clients;
        }  
        let sortCriteriaFromSelectboxAsArray = sortCriteriaFromSelectboxAsSpaceSeparatedString.split(' ');
        // log(sortCriteriaFromSelectboxAsArray)
        let personObjectKey = sortCriteriaFromSelectboxAsArray[0];
        // log(`personObjectKey: `)
        // log(personObjectKey)
        // log(`isAscending: `)
        let isAscending = sortCriteriaFromSelectboxAsArray[1] === "ascending" ? true : false;
        // log(isAscending);

        const lookupTable = {
            assignmentIdShort: 'assignmentIdShort',
            difficulty: 'difficulty',
            fun: 'fun'
        };

        const sortProperty = lookupTable[personObjectKey]; 
        // log(`sortProperty:`) 
        // log(sortProperty)

        let sortedPersons;
        if (!isAscending && (sortProperty === "difficulty" ))  {
            sortedPersons = [...clients].sort((person1, person2) => person1[sortProperty] > (person2[sortProperty]) ? 1: -1);
            return sortedPersons.reverse();
            // I choose 'en' as  the unicodeLanguage.
            // unicode allows user to enter any kind of character.
        } else if (isAscending && (sortProperty === "difficulty" ))  {
            sortedPersons = [...clients].sort((person1, person2) => person1[sortProperty] > (person2[sortProperty]) ? 1: -1);
            return sortedPersons;
        } else if (isAscending && (sortProperty === "fun" )) {
            sortedPersons = [...clients].sort((person1, person2) => person1[sortProperty] > (person2[sortProperty]) ? 1: -1);
            return sortedPersons;
        } else if (!isAscending && (sortProperty === "fun")) {
                sortedPersons = [...clients].sort((person1, person2) => person1[sortProperty] > (person2[sortProperty]) ? 1: -1);
                return sortedPersons.reverse();
        } else {
            console.error(`component DashboardOverview: not possible to sort with datatype ${typeof(sortProperty)}. Please investigate. `)
        }
    };


    const filterByOneOrMoreStudents = (arrayWithStudents, studentsToFilterWith ) => {
        log(`fn filterByOneOrMoreStudents: start: rrr`);
        log(studentsToFilterWith);

        let arrayFilteredOnAllCriteria = [];              
        if (studentsToFilterWith[0] === "" ) {
            return arrayWithStudents;
        }  else {
            let copyOfFilteredData = [...arrayWithStudents];
            let arrayFilteredOnOneCriterium;
            
            for (let filtercriterium of studentsToFilterWith) {
                arrayFilteredOnOneCriterium = copyOfFilteredData.filter(
                    (personObject) =>           
                    personObject.studentName.indexOf(filtercriterium) !== -1 //note-to-self: studentName hard-coded.
                );
                arrayFilteredOnAllCriteria.push(...arrayFilteredOnOneCriterium)
            }
            return arrayFilteredOnAllCriteria;
        } 
    }
 
    useEffect(() => {
            let pipelineData = filterByDifficultyRating(arrayWithUniqueStudentObjects, boolShowDifficultyRating);
            pipelineData = filterByFunRating(pipelineData, boolShowFunRating);
            pipelineData = filterByOneOrMoreStudents(pipelineData, studentsFromCheckBox ); 
            // pipelineData = filterByOneOrMoreStudents(pipelineData, studentsFromSelectBox ); //works, but I switch to checkboxes (is Winc-requirement)
            pipelineData = sortStudents(pipelineData, assignmentObjectKeyToSortArrayWithAssignments);
            setDataToRenderFromUseEffectPipeline(pipelineData);
        }, 
        [arrayWithAssignmentObjects, boolShowDifficultyRating, boolShowFunRating, assignmentObjectKeyToSortArrayWithAssignments, studentsFromCheckBox ]
    );



// part 2: filter-and-sort-comp: business logic: end


// part 3: victory-brush-and-zoom: business logic: START
    //not applicable
    const [zoomDomain, setZoomDomain] = useState({x: [0, 10], y: [0, 5]}); // nr of students to display when you open the page.
// part 3: victory-brush-and-zoom: business logic: END

// part 4: filter-and-sort-comp: dumb component: START 
  return (
    <>
    <Container> 
        <ClientListStyled>
            <Intro>Dashboard Students Overview </Intro>
            <FormControlArea>
                <Section1>
                <StyledCheckbox>
                        <Checkbox
                            label="Show difficulty rating"
                            value={boolShowDifficultyRating}
                            onChange={handleChangeBoolDifficultyRating}
                        />
                    </StyledCheckbox>

                </Section1>
                <Section1>
                    <StyledCheckbox>
                        <Checkbox
                            label="Show fun rating"
                            value={boolShowFunRating}
                            onChange={handleChangeBoolFunRating}
                        />
                    </StyledCheckbox>
                </Section1>

                <Section1> 
                    <StyledSelectbox                  
                        onChange={(e) => setAssignmentObjectKeyToSortArrayWithAssignments(e.target.value)}                 
                    >      
                        {/* 
                            work-around:
                                to sort on difficulty, pass 'fun' to useEffect props-pipeline.
                                to sort on fun, pass 'difficulty' to useEffect props-pipeline.
                            reason/ symptom:
                            somehow Victorychart responds to 'fun' as 'difficulty' and vice versa.
                            Not sure why. 
                            No need to fix, because this work-around creates the correct output. 
                            2do later (if time left): investigate
                        
                        */}
                        <option value="" >Sort by:</option>
                        <option value="" >do not sort</option>
                        <option value="difficulty ascending" >difficulty a-z</option> 
                        <option value="difficulty descending" >difficulty z-a</option>
                        <option value="fun ascending" >fun a-z</option>
                        <option value="fun descending" >fun z-a</option>
                    </StyledSelectbox>
                </Section1> 
                <Section2>
                    <div className='studentsOverview'>
                        <form>
                        <p>Filter students:</p>
                        <StyledCheckbox>
                            <input type="checkbox" name="students" value="Aranka"  onChange={handleFilterOneOrMoreStudentsViaCheckbox} ref={ref} defaultChecked={true}/>
                            <label htmlFor="student1"> Aranka</label><br />
                        </StyledCheckbox>
                        <StyledCheckbox>
                            <input type="checkbox" name="students" value="Evelyn" onChange={handleFilterOneOrMoreStudentsViaCheckbox} ref={ref} defaultChecked={true}/>
                            <label htmlFor="student1"> Evelyn</label><br />
                        </StyledCheckbox>
                        <StyledCheckbox>
                            <input type="checkbox" name="students" value="Floris"  onChange={handleFilterOneOrMoreStudentsViaCheckbox} ref={ref} defaultChecked={true}/>
                            <label htmlFor="student1"> Floris</label><br />
                        </StyledCheckbox>
                        <StyledCheckbox>
                            <input type="checkbox" name="students" value="Hector" onChange={handleFilterOneOrMoreStudentsViaCheckbox} ref={ref} defaultChecked={true}/>
                            <label htmlFor="student1"> Hector</label><br />
                        </StyledCheckbox>
                        <StyledCheckbox>
                            <input type="checkbox" name="students" value="Martina" onChange={handleFilterOneOrMoreStudentsViaCheckbox} ref={ref} defaultChecked={true}/>
                            <label htmlFor="student1"> Martina</label><br />
                        </StyledCheckbox>
                        <StyledCheckbox>
                            <input type="checkbox" name="students" value="Maurits" onChange={handleFilterOneOrMoreStudentsViaCheckbox} ref={ref} defaultChecked={true}/>
                            <label htmlFor="student1"> Maurits</label><br />
                        </StyledCheckbox>
                        <StyledCheckbox>
                            <input type="checkbox" name="students" value="Rahima" onChange={handleFilterOneOrMoreStudentsViaCheckbox} ref={ref} defaultChecked={true}/>
                            <label htmlFor="student1"> Rahima</label><br />
                        </StyledCheckbox>
                        <StyledCheckbox>
                            <input type="checkbox" name="students" value="Sandra" onChange={handleFilterOneOrMoreStudentsViaCheckbox} ref={ref} defaultChecked={true}/>
                            <label htmlFor="student1"> Sandra</label><br />
                        </StyledCheckbox>
                        <StyledCheckbox>
                            <input type="checkbox" name="students" value="Storm" onChange={handleFilterOneOrMoreStudentsViaCheckbox} ref={ref} defaultChecked={true}/>
                            <label htmlFor="student1"> Storm</label><br />
                        </StyledCheckbox>
                        <StyledCheckbox>
                            <input type="checkbox" name="students" value="Wietske" onChange={handleFilterOneOrMoreStudentsViaCheckbox} ref={ref} defaultChecked={true}/>
                            <label htmlFor="student1"> Wietske</label><br />
                        </StyledCheckbox>
                        <br />
                        </form>
                        {/* <div>{studentsFromCheckbox}</div> */} 
                    </div>
                </Section2>
                <Section2>
                        {/* 2do later: map the checkboxes */}
                        {/* {listOfUniqueStudentNames.map((student, index) => {  // 2do: check if this array contains correct values !!
                            return (                
                            <StyledCheckbox>
                                <Checkbox
                                    label={student}
                                    value={studentsFromSelectBox[index]}
                                    onChange={handleFilterOneOrMoreStudentsViaCheckbox}  
                                />
                            </StyledCheckbox>);
                        })} */}
                </Section2>
                <Section3>
                    <div>
                    <StyledSelectbox 
                        multiple={true}
                        value={studentsFromSelectBox}
                        onChange={(e) => handleFilterOneOrMoreStudentsViaSelectBox(e)  }     
                        onMouseOver={handleMouseOver} 
                        onMouseOut={handleMouseOut}                 
                    >    
                        <option value="" >Filter by students:</option>
                        <option value="" >do not filter</option>  
                        {listOfUniqueStudentNames.map(item => {  // 2do: check if this array contains correct values !!
                            return (<option key={item} value={item}>{item}</option>);
                        })}
                    </StyledSelectbox>
                    {isHovering && <h3>Press Ctrl or Shift to select multiple students</h3>}
                    </div>
                </Section3>
            </FormControlArea>
            <Headers>

            </Headers>
        </ClientListStyled>  
    </Container>


{/* part 4: filter-and-sort-comp: dumb component: END   */}
{/* part 5: victory-brush-and-zoom: dumb component: START */}


        <VictoryChart 
            theme={wincTheme} 
            width={800} 
            height={350}    
            //domainPadding has no effect.
            //padding has undesirable effect.
        //   style={{ data: { fill: "red" } }}
        //   domain={{ y: [-10, 10] }}
            containerComponent={
                <VictoryZoomContainer 
                zoomDimension="x" // ok, see: https://formidable.com/open-source/victory/docs/victory-zoom-container#zoomdomain
                zoomDomain={zoomDomain}
                // zoomDomain={{x: [0, 10]}} // in useState-hook above.
                //   onZoomDomainChange={this.handleZoom.bind(this)}
                />
            }
        >
            <VictoryGroup offset={10} 
                    // tickValues={['1.0', '2.0', '3.0', '4.0', '5.0']}
                    style = {{
                        // group: {
                        //     colorScale: [
                        //       "#F4511E",
                        //       "#FFF59D",
                        //       "#DCE775",
                        //       "#8BC34A",
                        //       "#00796B",
                        //       "#006064"
                        //     ]},
                        data: {
                            // fill: "yellow",
                            padding: 10,
                            strokeWidth: 5 // responds to change. 
                        },
                        labels: {
                            fontFamily: "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
                            fontSize: 8,
                            letterSpacing: "normal",
                            padding: 18,
                            // fill: "#455A64",
                            stroke: "transparent",
                            strokeWidth: 0
                        }
                    }}            
            >
                {/* bar 1of2: */}
                <VictoryBar 
                    groupComponent={<g transform="translate(-1, -2)" />}
                    barWidth={5}
                    // style={{ data: { fill: "purple" } }} // chart responds to change
                    height={100}
                    style = {{
                        data: {
                            fill: "#D4E7FA", // do not put this prop in Theme. Light-blue from wincacademy.nl
                            padding: 0,
                            strokeWidth: 5 // bar width
                        }
                    }}
                    labelComponent={
                        <VictoryTooltip   
                            style={{fontSize: '10px'}}
                            flyoutWidth={310}
                            flyoutHeight={60}
                            cornerRadius={8}
                            pointerLength={20}
                            flyoutStyle={{
                                // stroke: "tomato",
                                strokeWidth: 1,
                                // fill: "yellow",
                            }}  
                        />
                    }
                    data={arrayWithFilteredStudentObjects}
                    x = "studentName"
                    y = "difficulty"
                    // tickValues={['1.0', '2.0', '3.0', '4.0', '5.0']}
                    tickValues={[1, 2, 3, 4, 5]}
                    tickFormat={arrayWithFilteredStudentObjects.map(
                        avg => avg.studentName
                        )}
                />
                {/* bar 2of2: */}
                <VictoryBar 
                    groupComponent={<g transform="translate(2, -2)" />}
                    barWidth={5}
                    style = {{
                        data: {
                            fill: "#FCD808", // do not put this prop in Theme. Yellow from wincacademy.nl.
                            padding: 0,
                            strokeWidth: 5 // bar width
                        },
                        // labels: {
                        //     fontFamily: "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
                        //     fontSize: 8,
                        //     letterSpacing: "normal",
                        //     padding: 38,
                        //     fill: "#455A64",
                        //     stroke: "transparent",
                        //     strokeWidth: 0
                        // }
                    }}

                    labelComponent={
                        <VictoryTooltip 
                            style={{fontSize: '10px'}}
                            flyoutWidth={310}
                            flyoutHeight={60}
                            cornerRadius={8}
                            pointerLength={20}
                            flyoutStyle={{
                                // stroke: "tomato",
                                strokeWidth: 1,
                                // fill: "yellow",
                            }} 
                        />
                    }                    
                    data={arrayWithFilteredStudentObjects}
                    x = "studentName"
                    y = "fun"
                    tickValues={[1, 2, 3, 4, 5]}
                    tickFormat={arrayWithFilteredStudentObjects.map(
                        avg => avg.studentName
                        )}
                />   
            </VictoryGroup>
            <VictoryAxis 
                // tickValues specifies both the number of ticks and where
                // they are placed on the axis
                // tickValues={[1.0, 2.0, 3, 4, 5]}
                tickFormat={arrayWithFilteredStudentObjects.map(
                avg => avg.studentName 
                /*
                 pitfall: avg.assignmentId will display long names on x-axis: e.g. actual result:
                 'W3D5 - Project - Todo-List' , instead of the expected result (to save space on x-axis) 'W3D5'.
                */ 
                )}
                label="Student Names"
                style={{
                    tickLabels: {
                        // fontFamily: "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
                        fontSize: 10,
                        angle: 0,
                        // letterSpacing: "normal",
                        padding: 12,
                        // fill: "#455A64",
                        // stroke: "transparent",
                        // strokeWidth: 0
                      }
                }}
            />
            <VictoryAxis dependentAxis 
                label="Rating of student difficulty (blue) and fun (yellow)"
                // tickValues={[1, 2, 3, 4, 5]}
                style={{
                    tickLabels: {
                        // fontFamily: "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
                        fontSize: 10,
                        angle: 0,
                        // letterSpacing: "normal",
                        padding: 12,
                        // fill: "#455A64",
                        // stroke: "transparent",
                        // strokeWidth: 0
                      }
                }}
            />
          </VictoryChart>
{/* part 5: victory-brush-and-zoom: dumb component: END */}  




    </>
  )
}

export default StudentsOverview