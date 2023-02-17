import  {useState, useEffect }  from "react";
import { useDispatch} from "react-redux";
import {addStudentsMockdataToReduxToolkit} from '../../redux/studentsMockdataSlice';
import { csv } from 'd3';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import studentMockData from '../../data/students-mock-data.csv';
import {log} from  '../../utils';
import AssignmentsOverview from "../assignmentsoverview/AssignmentsOverview.js";
import LineChart from "../linechart/LineChart";
import StudentPages from "../studentpages/StudentPages.js";
import Scatterplot from "../scatterplot/Scatterplot";
import TableOverview from "../table-overview/TableOverview";
import SortStudentsByAverageGrades from "../studentsoverview/StudentsOverview";
import {AppStyled} from "./App.styled";
import {NavigationStyled} from "./Navigation.styled";
import {StyledNavLink} from "./NavLink.styled";
import {theme} from "../styles/appStyleTheme";
import {generateRandomPersonId} from '../../utils';

const updateKeysOfArrayWithStudentObjects = (studentMockData) => {
    const updateKeysOfArrayWithStudentObjects = studentMockData.map(item => {
        return {
          studentId: generateRandomPersonId(),
          studentName: item['Wie ben je?'],
          assignmentId: item['Welke opdracht of welk project lever je nu in?'],
          difficulty: parseInt(item['Hoe moeilijk vond je deze opdracht?']),
          fun: parseInt(item['Hoe leuk vond je deze opdracht?'])
        };
    });
    return updateKeysOfArrayWithStudentObjects;
}

function App() {
    log('comp App:');
    const [data, setData] = useState([]); 
    const dispatch = useDispatch();
  
    useEffect(() => {
      csv(studentMockData).then(data => {
          const studentMockDataWithMoreConciseObjectKeys = updateKeysOfArrayWithStudentObjects(data);
          setData(studentMockDataWithMoreConciseObjectKeys); 
          dispatch(addStudentsMockdataToReduxToolkit(studentMockDataWithMoreConciseObjectKeys));
      }); 
    }, []);
   
    return (
        <>
            <ThemeProvider theme = {theme}>
            <AppStyled>
            
            <Router>
                <NavigationStyled>
                    <div className="navBar">  
                    <StyledNavLink>
                        <Link to="/">Assignments Overview</Link>
                    </StyledNavLink>
                    <StyledNavLink>
                        <Link to="/StudentsOverview">Students Overview</Link>
                    </StyledNavLink>
                    <StyledNavLink>
                        <Link to="/studentPages">Student Pages</Link>
                    </StyledNavLink>
                    <StyledNavLink>
                        <Link to="/linechart">LineChart</Link>
                    </StyledNavLink>                   
                    <StyledNavLink>
                        <Link to="/scatterplot">Scatterplot</Link>
                    </StyledNavLink>
                    <StyledNavLink>
                        <Link to="/tableOverview">Table Overview</Link>
                    </StyledNavLink>
                    </div>
                    <Routes>
                    <Route path="/" element={<AssignmentsOverview  />} />  
                    <Route path="/StudentsOverview" element={<SortStudentsByAverageGrades />} /> 
                    <Route path="/studentPages/*" element={<StudentPages />} />  
                    <Route path="/linechart" element={<LineChart  />} /> 
                    <Route path="/scatterplot" element={<Scatterplot  />} />  
                    <Route path="/tableOverview" element={<TableOverview  />} /> 
                    <Route path="*" element={<AssignmentsOverview  />} />  
                    </Routes>

                </NavigationStyled>
            </Router>
            </AppStyled>
        </ThemeProvider>
        </>
    );
}

export default App;
