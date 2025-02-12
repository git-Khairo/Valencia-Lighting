import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Project from "./Components/Project";
import Home from "./Pages/Home";
import FilterAndSectionTest from "./FilterAndSectionTest";


//For routes
const App = () => {
    return ( 
        <Router>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/project" element={<Project />} />
            <Route path="/sss" element={<FilterAndSectionTest />} />
            </Routes>
        </Router>
     );
}
ReactDOM.createRoot(document.getElementById('app')).render(<App/>)
export default App;