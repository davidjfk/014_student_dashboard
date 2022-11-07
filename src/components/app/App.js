import  {useState, useEffect }  from "react";
import { useDispatch} from "react-redux";
import {addStudentsMockdataToReduxToolkit} from '../../redux/studentsMockdataSlice';
import { csv } from 'd3';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import studentMockData from '../../data/students-mock-data.csv'; // first import, then use inside useEffect. 

import {log} from  '../../utils';

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

let updateKeysOfArrayWithStudentObjects = (studentMockData) => {
    const updateKeysOfArrayWithStudentObjects = studentMockData.map(item => {
        return {
          studentId: generateRandomPersonId(),
          studentName: item['Wie ben je?'],
          assignment: item['Welke opdracht of welk project lever je nu in?'],
          difficulty: item['Hoe moeilijk vond je deze opdracht?'],
          fun: item['Hoe leuk vond je deze opdracht?']
        };
    });
    return updateKeysOfArrayWithStudentObjects;
}

function App() {
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
  
    useEffect(() => {
      csv(studentMockData).then(data => {
          const studentMockDataWithMoreConciseObjectKeys = updateKeysOfArrayWithStudentObjects(data);
        //   log(studentMockDataWithMoreConciseObjectKeys); 
          setData(studentMockDataWithMoreConciseObjectKeys); //studa: put data in global state instead. 
          dispatch(addStudentsMockdataToReduxToolkit(studentMockDataWithMoreConciseObjectKeys));
      }); 
    }, []);
   
  return (
    <>
     <ThemeProvider theme = {theme}>
     <AppStyled>
        
        <Router>
          <NavigationStyled>
              <ul className="navBar">  
                <StyledNavLink>
                  <Link to="/">Dashboard Overview</Link>
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
                  <Link to="/sortStudentsByAverageGrades">Sort Students By Average Grades</Link>
                </StyledNavLink>
              </ul>
              <Routes>
                <Route path="/" element={<DashboardOverview  />} />  
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
