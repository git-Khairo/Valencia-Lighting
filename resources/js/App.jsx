import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Project from "./Components/Project";
import Home from "./Pages/Home";
import Layout from "./Layout";


//For routes
const App = () => {
    return ( 
        <Router>
            <Layout>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/project/:id" element={<Project />} />
            </Routes>
            </Layout>
        </Router>
     );
}
ReactDOM.createRoot(document.getElementById('app')).render(<App/>)
export default App;