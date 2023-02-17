import { useSelector } from "react-redux";
import {
    VictoryChart,
    VictoryGroup,
    VictoryTooltip,
    VictoryLabel,
    VictoryScatter,
    VictoryAxis 
} from "victory";
import {
    correlationCoefficientBetween2Arrays,
    createArrayWithAssignmentObjects,
    createAssignmentObjectForEachAssignmentId,
    createArrayWithPropertyValueFromEachArrayObject,
    createArrayWithUniqueValues, 
    createStudentObjectForEachStudentId,
    createArrayWithStudentObjects,
    filterOutliers,
    log } from '../../utils';
import {Container} from '../styles/Container.styled'
import {ClientListStyled, FormControlArea, Headers, Intro, Section1} from './ClientList.styled'
import { StyledTable } from '../styles/Table.styled';
import {wincTheme} from "../styles/wincTheme";

const Scatterplot = () => {
    const { studentsMockData } = useSelector((state) => state.studentsMockdata);
    log('comp Scatterplot:');
    log(studentsMockData);

    /*
        scatterplot 1: asssignments:
        All assignments (56) on X-axis with average fun-score of 10 students, and on Y-axis assignments (56) with average difficult score of 10 students: so 
        for each assignment you can see "on average" how the perceived fun-score and difficult-score correlate. 
    */
    const arrayWithUniqueAssignmentIds = createArrayWithUniqueValues(studentsMockData, "assignmentId");
    const arrayWithAssignmentObjects = createArrayWithAssignmentObjects(createAssignmentObjectForEachAssignmentId, studentsMockData, arrayWithUniqueAssignmentIds);
 
    /*
        scatterplot 2: students:
        All students (10) on X-axis with their individual average fun-socre andon Y-axis with their individual average difficult-score: so 
        for each student you can see how the average fun correlates with average diffiicult.
    */
    const arrayWithUniqueStudents = createArrayWithUniqueValues(studentsMockData, "studentName");
    const arrayWithUniqueStudentObjects = createArrayWithStudentObjects(createStudentObjectForEachStudentId, studentsMockData, arrayWithUniqueStudents);

    //  correlation coefficient: assignments and students:
    let arrayWithAssignmentAverageDifficultyValues = createArrayWithPropertyValueFromEachArrayObject(arrayWithAssignmentObjects, "difficulty");
    let arrayWithAssignmentAverageFunValues = createArrayWithPropertyValueFromEachArrayObject(arrayWithAssignmentObjects, "fun");
    let arrayWithStudentAverageDifficultyValues = createArrayWithPropertyValueFromEachArrayObject(arrayWithUniqueStudentObjects, "difficulty");
    let arrayWithStudentAverageFunValues = createArrayWithPropertyValueFromEachArrayObject(arrayWithUniqueStudentObjects, "fun");
    let correlationBetweenDifficultyAndFunForEachAssignmentOfAllStudents = correlationCoefficientBetween2Arrays(arrayWithAssignmentAverageDifficultyValues, arrayWithAssignmentAverageFunValues);
    let correlationBetweenDifficultyAndFunForEachAssignmentOfAllStudentsOn2Decimals = parseFloat(correlationBetweenDifficultyAndFunForEachAssignmentOfAllStudents.toFixed(2));
    let correlationBetweenDifficultyAndFunForStudentOfAllAssignments = correlationCoefficientBetween2Arrays(arrayWithStudentAverageDifficultyValues, arrayWithStudentAverageFunValues);
    let correlationBetweenDifficultyAndFunForStudentOfAllAssignmentsOn2Decimals = parseFloat(correlationBetweenDifficultyAndFunForStudentOfAllAssignments.toFixed(2));

    // check data for outliers:
    let outliersInarrayWithAssignmentAverageDifficultyValues = filterOutliers(arrayWithAssignmentAverageDifficultyValues);
    let isOutliersInarrayWithAssignmentAverageDifficultyValues = (outliersInarrayWithAssignmentAverageDifficultyValues.length == 0) ? 
    "no" : `yes, please investigate: ${outliersInarrayWithAssignmentAverageDifficultyValues.toString().split(',')}`;

    let outliersInarrayWithAssignmentAverageFunValues = filterOutliers(arrayWithAssignmentAverageFunValues);
    let isOutliersInarrayWithAssignmentAverageFunValues = (outliersInarrayWithAssignmentAverageFunValues.length == 0) ? 
    "no" : `yes, please investigate: ${outliersInarrayWithAssignmentAverageFunValues.toString().split(',')}`;

    let outliersInarrayWithStudentsAverageDifficultyValues = filterOutliers(arrayWithStudentAverageDifficultyValues);
    let isOutliersInArrayWithStudentsAverageDifficultyValues = (outliersInarrayWithStudentsAverageDifficultyValues.length == 0) ? 
    "no" : `yes, please investigate: ${outliersInarrayWithStudentsAverageDifficultyValues.toString().split(',')}`;

    let outliersInarrayWithStudentsAverageFunValues = filterOutliers(arrayWithStudentAverageFunValues);
    let isOutliersInarrayWithStudentsAverageFunValues = (outliersInarrayWithStudentsAverageFunValues.length == 0) ? 
    "no" : `yes, please investigate: ${outliersInarrayWithStudentsAverageFunValues.toString().split(',')}`;
     
    return (
    <>
    <Container> 
        <ClientListStyled>
            <Intro>scatter plot of assignments (blue) and students (yellow) </Intro>
            <FormControlArea>            
                <Section1>
                    <StyledTable>
                        <tr>
                            <th className="tableTitle">Assignments:</th>
                        </tr>
                        <tr>
                            <th>correlation coefficient between difficulty and fun:</th>
                        </tr>
                        <tr>
                            <th>{correlationBetweenDifficultyAndFunForEachAssignmentOfAllStudentsOn2Decimals}</th>
                        </tr>
                    </StyledTable>
                </Section1>
                <Section1>
                    <StyledTable>
                        <tr>
                            <th className="tableTitle">Students:</th>
                        </tr>
                        <tr>
                            <th>correlation coefficient between difficulty and fun:</th>
                        </tr>
                        <tr>
                            <th>{correlationBetweenDifficultyAndFunForStudentOfAllAssignmentsOn2Decimals}</th>
                        </tr>
                    </StyledTable>
                </Section1>
                <Section1>
                    <StyledTable>
                        <tr>
                            <th className="tableTitle">VARIABLE:</th>
                            <th className="tableTitle">RATING:</th>
                            <th className="tableTitle">OUTLIERS:</th>
                        </tr>
                        <tr>
                            <th>assignments</th>
                            <th>difficulty</th>
                            <th>{isOutliersInarrayWithAssignmentAverageDifficultyValues} </th>
                        </tr>
                        <tr>
                            <th>assignments</th>
                            <th>fun</th>
                            <th>{isOutliersInarrayWithAssignmentAverageFunValues}</th>
                        </tr>
                        <tr>
                            <th>students</th>
                            <th>difficulty</th>
                            <th>{isOutliersInArrayWithStudentsAverageDifficultyValues}</th>
                        </tr>
                        <tr>
                            <th>students</th>
                            <th>fun</th>
                            <th>{isOutliersInarrayWithStudentsAverageFunValues} </th>
                        </tr>
                    </StyledTable>
                </Section1>
            </FormControlArea>
            <Headers>
            </Headers>
        </ClientListStyled>  
    </Container>

    <VictoryChart 
        theme={wincTheme} 
        width={300} 
        height={230}    
    >
            <VictoryGroup offset={0} 
                    style = {{
                        data: {
                            padding: 10,
                            strokeWidth: 15 
                        },
                        labels: {
                            fontFamily: "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
                        }
                    }}            
            >
                <VictoryScatter 
                    size={3}
                    symbol= "triangleUp"
                    style = {{
                        data: {
                            fill: "#D4E7FA", 
                            padding: 0,
                            strokeWidth: 5 
                        }
                    }}
                    labelComponent={
                        <VictoryTooltip   
                            style={{fontSize: '5px'}}
                            flyoutWidth={160}
                            flyoutHeight={30}
                            cornerRadius={8}
                            pointerLength={20}
                            flyoutStyle={{
                                strokeWidth: 1,
                            }}  
                        />
                    }
                    data={arrayWithAssignmentObjects}
                    x = "difficulty"
                    y = "fun"
                    tickValues={[1, 2, 3, 4, 5]}
                    tickFormat={arrayWithAssignmentObjects.map(
                        avg => avg.difficulty
                        )}
                />
                <VictoryScatter 
                    size={2}
                    style = {{
                        data: {
                            fill: "#FCD808", 
                            padding: 0,
                            strokeWidth: 5 
                        }
                    }}

                    labelComponent={
                        <VictoryTooltip 
                            style={{fontSize: '5px'}}
                            flyoutWidth={110}
                            flyoutHeight={30}
                            cornerRadius={8}
                            pointerLength={20}
                            flyoutStyle={{
                                strokeWidth: 1,
                            }} 
                        />
                    }                    
                    data={arrayWithUniqueStudentObjects}
                    x = "difficulty"
                    y = "fun"
                    tickValues={[1, 2, 3, 4, 5]}
                    tickFormat={arrayWithUniqueStudentObjects.map(
                        avg => avg.difficulty
                        )}
                />   
            </VictoryGroup>
            <VictoryAxis 
                domain={[1.5, 3.5]}
                standalone={false}
                label={() => ""}
                axisLabelComponent={<VictoryLabel dx={0} dy={0} text="average difficulty rating" />}
                style={{
                    axisLabel: {
                        fontSize: 5,
                        angle: 0,
                        padding: 14,
                    },
                    tickLabels: {
                        fontSize: 4,
                        angle: 0,
                        padding: 1,
                    },
                    ticks: {
                        fill: "transparent",
                        size: 5,
                        stroke: "#90A4AE",
                        strokeWidth: 3,
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                    }
                }}
            />
            <VictoryAxis dependentAxis 
                domain={[1.5, 4.5]}
                standalone={false}
                label={() => ""}
                axisLabelComponent={<VictoryLabel dx={0} dy={4} text="average fun rating" />}
                style={{
                    axisLabel: {
                        fontSize: 5,
                        angle: -90,
                        padding: 20,
                    },
                    tickLabels: {
                        fontSize: 4,
                        angle: 0,
                        padding: 1,
                    },                                   

                    ticks: {
                        fill: "transparent",
                        size: 5,
                        stroke: "#90A4AE",
                        strokeWidth: 3,
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                    }                    
                }}
            />
    </VictoryChart>
    </>
  )
}

export default Scatterplot