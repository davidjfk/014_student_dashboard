import React, { useState, useEffect, useRef  } from 'react';
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
    calculateAverageForDifficultyForOneAssignmentOfAllStudents,
    calculateAverageForFunForOneAssignmentOfAllStudents,
    createArrayWithAssignmentObjects,
    createArrayWithUniqueValues, 
    createAssignmentObjectForEachAssignmentId,
    log } from '../../utils';

import {wincTheme} from "../styles/wincTheme";
import { StyledCheckbox } from '../styles/Checkbox.styled';

const DashboardOverview = () => {

    // part 1: ETL the data: start
        const { studentsMockData } = useSelector((state) => state.studentsMockdata);
        // log('comp DashboardOverview:');
        // log(studentsMockData);

        const listOfUniqueAssignmentIds = createArrayWithUniqueValues(studentsMockData, "assignmentId");
        //// listOfUniqueAssignmentIds.sort(); // do not sort.
        // log(`listOfUniqueAssignmentIds: `)
        // log(listOfUniqueAssignmentIds);

        const listOfUniqueStudentNames = createArrayWithUniqueValues(studentsMockData, "studentName");
        listOfUniqueStudentNames.sort();
        // log(`listOfUniqueStudentNames: `)
        // log(listOfUniqueStudentNames);
        

        const arrayWithAssignmentObjects = createArrayWithAssignmentObjects(createAssignmentObjectForEachAssignmentId, studentsMockData, listOfUniqueAssignmentIds);
        // log(`arrayWithAssignmentObjects: `)
        // log(arrayWithAssignmentObjects);   



        // let assignmentId = "SCRUM";
        // let averageGradeDifficulty = calculateAverageForDifficultyForOneAssignmentOfAllStudents(studentsMockData, assignmentId);
        // log(`averageGradeDifficulty: `)
        // log(averageGradeDifficulty);

    // part 1: ETL the data: END


    // part 2: filter-and-sort-comp: business logic: start

    const [assignmentObjectKeyToSortArrayWithAssignments, setAssignmentObjectKeyToSortArrayWithAssignments] = useState('');
    const [boolShowDifficultyRating, setBoolShowDifficultyRating] = useState(true);
    const [boolShowFunRating, setBoolShowFunRating] = useState(true);
    const [isHovering, setIsHovering] = useState(false);
    const [studentsToFilterWith, setStudentsToFilterWith] = useState([""]);
    const [assignmentsToFilterWith, setAssignmentsToFilterWith] = useState([""]);
    const [arrayWithFilteredAssignmentObjects, setDataToRenderFromUseEffectPipeline] = useState([]);

    const handleFilterOneOrMoreAssignments = (event) => {    
        let value = Array.from(
            event.target.selectedOptions, (option) => option.value
        )   
        log('hi')
        setAssignmentsToFilterWith(value);
    };

    const handleFilterOneOrMoreStudents = (event) => {
        let value = Array.from(
            event.target.selectedOptions, (option) => option.value
        )   
        setStudentsToFilterWith(value);
    };

    // const handleSortAssignments = (event) => { 
    //     setAssignmentObjectKeyToSortArrayWithAssignments(event.target.value);
    // };    

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



    const filterByDifficultyRating = (arrayWithAssignments, boolShowDifficultyRating) => {
        log(`---------------------------------------`);
        log(`arrayWithAssignments:`);
        log(arrayWithAssignments);
        log(`fn filterByDifficultyRating: start: ooo`);
        log(boolShowDifficultyRating.toString())
            let filteredArrayWithAssignments = arrayWithAssignments.map(assignment => {
                // let copiedAssignment = JSON.parse(JSON.stringify(assignment));
                let {fun, ...assignmentObjectWithoutPropertyDifficulty} = assignment;
                // code works with 'fun' as work-around/ 'proxy' for 'difficult'. 
                // 2do  later: issue not on page Students Overview. Figure out why.
                if (boolShowDifficultyRating) {
                    return assignment
                } 
                return assignmentObjectWithoutPropertyDifficulty
            });
        log(`hier:`)
        log(filteredArrayWithAssignments)
        return filteredArrayWithAssignments;
    }

    const filterByFunRating = (arrayWithAssignments, boolShowDifficultyRating) => {
        log(`---------------------------------------`);
        log(`fn filterByFunRating: start: ppp`);
        log(`arrayWithAssignments:`);
        log(arrayWithAssignments);
        log(boolShowDifficultyRating.toString())
            let filteredArrayWithAssignments = arrayWithAssignments.map(assignment => {
                // let copiedAssignment = JSON.parse(JSON.stringify(assignment));
                let {difficulty, ...assignmentObjectWithoutPropertyDifficulty} = assignment; 
                // same anomaly as in fn filterByDifficultyRating above.
                if (boolShowDifficultyRating) {
                    return assignment
                } 
                return assignmentObjectWithoutPropertyDifficulty
            });

        return filteredArrayWithAssignments;
    }

    const sortAssignments = (clients, sortCriteriaFromSelectboxAsSpaceSeparatedString) => {
        // log(`inside fn sortAssignments: `)
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

    const filterByOneOrMoreAssignments = (arrayWithAssignments, assignmentsToFilterWith ) => {
        log(`fn filterByOneOrMoreAssignments: start: qqq`);
        log(assignmentsToFilterWith);

        let arrayFilteredOnAllCriteria = [];              
        if (assignmentsToFilterWith[0] === "" ) {
            return arrayWithAssignments;
        }  else {
            let copyOfFilteredData = [...arrayWithAssignments];
            let arrayFilteredOnOneCriterium;
            
            for (let filtercriterium of assignmentsToFilterWith) {
                arrayFilteredOnOneCriterium = copyOfFilteredData.filter(
                    (personObject) =>           
                    personObject.assignmentIdShort.indexOf(filtercriterium) !== -1 
                );
                arrayFilteredOnAllCriteria.push(...arrayFilteredOnOneCriterium)
            }
            return arrayFilteredOnAllCriteria;
        } 
    }

            
  
    useEffect(() => {
            let pipelineData = filterByDifficultyRating(arrayWithAssignmentObjects, boolShowDifficultyRating);
            pipelineData = filterByFunRating(pipelineData, boolShowFunRating);
            pipelineData = sortAssignments(pipelineData, assignmentObjectKeyToSortArrayWithAssignments);
            // pipelineData = filterByOneOrMoreAssignments(pipelineData, assignmentsToFilterWith );
            setDataToRenderFromUseEffectPipeline(pipelineData);
        }, 
        [boolShowDifficultyRating, boolShowFunRating, assignmentObjectKeyToSortArrayWithAssignments ]
    );



    // part 2: filter-and-sort-comp: business logic: end





    const [zoomDomain, setZoomDomain] = useState({x: [0, 10], y: [0, 5]}); // nr of assignments to display when you open the page.
    // 'zoomDomain' more info: https://formidable.com/open-source/victory/docs/victory-zoom-container#zoomdomain




  return (
    <>

<>
    <Container> 
        <ClientListStyled>
            <Intro>Dashboard Overview</Intro>
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
                        <option value="fun ascending" >difficulty a-z</option> 
                        <option value="fun descending" >difficulty z-a</option>
                        <option value="difficulty ascending" >fun a-z</option>
                        <option value="difficulty descending" >fun z-a</option>
                    </StyledSelectbox>
                </Section1>
                 
                <Section2>
                    {/* <StyledSelectbox 
                        multiple={true}
                        value={assignmentsToFilterWith} // 2do: check if this array contains correct values !!
                        onChange={(event) => handleFilterOneOrMoreAssignments(event)  }   
                        onMouseOver={handleMouseOver} 
                        onMouseOut={handleMouseOut}                
                    >     
                        <option value="" >Filter by assignments:</option>                 
                        <option value="" >do not filter</option>
                        {listOfUniqueAssignmentIds.map(item => {
                            return (<option key={item} value={item}>{item}</option>);
                        })}   
                        </StyledSelectbox>
                        {isHovering && <h3>Press Ctrl or Shift to select multiple assignments</h3>} */}
                </Section2>

                <Section3>
                    {/* <div>
                    <StyledSelectbox 
                        multiple={true}
                        value={studentsToFilterWith}
                        onChange={(e) => handleFilterOneOrMoreStudents(e)  }     
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
                    </div> */}
                </Section3>
            </FormControlArea>
            <Headers>

            </Headers>
        </ClientListStyled>  
    </Container>
    </>














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
                {/* bar 1of3: */}
                <VictoryBar 
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
                    data={arrayWithFilteredAssignmentObjects}
                    x = "assignmentIdShort"
                    y = "fun"
                    // tickValues={['1.0', '2.0', '3.0', '4.0', '5.0']}
                    tickValues={[1, 2, 3, 4, 5]}
                    tickFormat={arrayWithFilteredAssignmentObjects.map(
                        avg => avg.assignmentId
                        )}
                />
                {/* bar 2of3: */}
                <VictoryBar 
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
                    data={arrayWithFilteredAssignmentObjects}
                    x = "assignmentIdShort"
                    y = "difficulty"
                    tickValues={[1, 2, 3, 4, 5]}
                    tickFormat={arrayWithFilteredAssignmentObjects.map(
                        avg => avg.assignmentId
                        )}
                />   
            </VictoryGroup>
            <VictoryAxis 
                // tickValues specifies both the number of ticks and where
                // they are placed on the axis
                // tickValues={[1.0, 2.0, 3, 4, 5]}
                tickFormat={arrayWithFilteredAssignmentObjects.map(
                avg => avg.assignmentIdShort 
                /*
                 pitfall: avg.assignmentId will display long names on x-axis: e.g. actual result:
                 'W3D5 - Project - Todo-List' , instead of the expected result (to save space on x-axis) 'W3D5'.
                */ 
                )}
                label="Assignment IDs"
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
                label="Rating of assignment difficulty (blue) and fun (yellow)"
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


        {/* VictoryBrushContainer: */}
        <VictoryChart  
            theme={wincTheme} 
            width={800} 
            height={150} 
            domainPadding={10}
            padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
            scale={{ x: "linear" }}
            // style={{
            //     label: { stroke: "tomato" }
            // }}
            containerComponent={
                <VictoryBrushContainer
                brushDimension="x"
                brushDomain={zoomDomain}
                onBrushDomainChange={setZoomDomain} 
                />
            }
        >
        {/* bar 3of3: */}
        <VictoryBar 
            //   style={{
            //     data: { stroke: "tomato" }
            //   }}
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
            data={arrayWithFilteredAssignmentObjects}
            x = "assignmentIdShort"
            y = "victoryBrushContainer" 
            /*
                with y="difficulty", unchecking 'Show difficulty rating'
                will make disappear the barchart in 
                VictoryBrushContainer. 
            */
        />
        <VictoryAxis  // 
            // tickValues={[1.0, 2.0, 3.0, 4.0, 5.0]}
            tickFormat={arrayWithFilteredAssignmentObjects.map(
                avg => avg.assignmentIdShort
                )}
                style={{
                    axisLabel: {
                        textAnchor: "middle",
                        fontFamily: "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
                        fontSize: 9,
                        letterSpacing: "normal",
                        padding: 8,
                        fill: "#455A64",
                        stroke: "transparent",
                        strokeWidth: 0
                      },
                    ticks: {
                        fill: "transparent",
                        size: 6,
                        stroke: "#90A4AE",
                        strokeWidth: 3,
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                      },
                    tickLabels: {
                        fontFamily: "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
                        fontSize: 7, 
                        angle: 90, 
                        letterSpacing: "normal",
                        padding: 8,
                        fill: "#455A64",
                        stroke: "transparent",
                        strokeWidth: 0
                    }

                }}
        />
        <VictoryAxis dependentAxis 
            label="Assignment ratings overview"
            tickValues={['1.0', '2.0', '3.0', '4.0', '5.0']} // must be strings, not numbers.
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
    </>
  )
}

export default DashboardOverview