import  {useState, useEffect }  from "react";
import { useDispatch} from "react-redux";
import {addStudentsMockdataToReduxToolkit} from '../../redux/studentsMockdataSlice';
import { csv } from 'd3';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import studentMockData from '../../data/students-mock-data.csv'; // first import, then use inside useEffect. 

import {log} from  '../../utils';

import BarChart from '../barchart/BarChart';
import LineChart from "../linechart/LineChart";
import DashboardOverview from "../dashboard-overview/DashboardOverview.js";
import StudentPageOverview from "../studentPageOverview/StudentPageOverview.js";
// import Student from "../student/Student";
import Scatterplot from "../scatterplot/Scatterplot";
import TableOverview from "../table-overview/TableOverview";
import SortStudentsByAverageGrades from "../sortStudentsByAverageGrades/SortStudentsByAverageGrades";


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
          // log(studentMockDataWithMoreConciseObjectKeys); 
          /*
            log is sync, but csv.then() is ...async. So won't log anything.
            solution: just to log the  csv, I will use useState-hook.
          */ 
          setData(studentMockDataWithMoreConciseObjectKeys); // I do not need useState-hook as intermediate step to move data to Redux-Toolkit. 
          dispatch(addStudentsMockdataToReduxToolkit(studentMockDataWithMoreConciseObjectKeys));
      }); 
    }, []);

    // log(`csv-data with updated keys, before dispatch to Redux-toolkit slice:`); // (to check intermediate step by working incrementally) (status: ok)
    // log(data); // remark: works, but only after 2nd render (== first re-render). 
    // reason: 'data' from useState-hook is sync, but csv.then() is ...async. So during 1st render, useState-hook has not had chance to update yet.
   
    return (
        <>
            <ThemeProvider theme = {theme}>
            <AppStyled>
            
            <Router>
                <NavigationStyled>
                    <div className="navBar">  
                    <StyledNavLink>
                        <Link to="/">Dashboard Overview</Link>
                    </StyledNavLink>
                    <StyledNavLink>
                        <Link to="/barchart">BarChart</Link>
                    </StyledNavLink>
                    <StyledNavLink>
                        <Link to="/linechart">LineChart</Link>
                    </StyledNavLink>                   
                    <StyledNavLink>
                        <Link to="/studentPages">Student Pages</Link>
                    </StyledNavLink>
                    <StyledNavLink>
                        <Link to="/scatterplot">Scatterplot</Link>
                    </StyledNavLink>
                    <StyledNavLink>
                        <Link to="/tableOverview">Table Overview</Link>
                    </StyledNavLink>
                    <StyledNavLink>
                        <Link to="/sortStudentsByAverageGrades">Students Overview</Link>
                    </StyledNavLink>
                    </div>
                    <Routes>
                    <Route path="/" element={<DashboardOverview  />} />  
                    <Route path="/barchart" element={<BarChart  />} /> 
                    <Route path="/linechart" element={<LineChart  />} /> 
                    <Route path="/studentPages/*" element={<StudentPageOverview />} />  

                    <Route path="/scatterplot" element={<Scatterplot  />} />  
                    <Route path="/tableOverview" element={<TableOverview  />} />  
                    <Route path="/sortStudentsByAverageGrades" element={<SortStudentsByAverageGrades />} />  
                    <Route path="*" element={<DashboardOverview  />} />  
                    </Routes>

                </NavigationStyled>
            </Router>
            </AppStyled>
        </ThemeProvider>
        </>
    );
}

export default App;
