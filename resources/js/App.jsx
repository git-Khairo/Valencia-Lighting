import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Project from "./Pages/ProjectDetails";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Layout from "./Layout";
import Sections from "./Pages/Sections";
import ProductDetails from "./Pages/ProductDetails";
import Projects from "./Pages/Projects";


//For routes
const App = () => {
    return ( 
        <Router>
            <Layout>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:id" element={<Project />} />
            <Route path="/about us" element={<About />} />
            <Route path="/products/:code" element={<ProductDetails />} />
            <Route path="/Categories" element={<Sections/>}/>
            </Routes>
            </Layout>
        </Router>
     );
}
ReactDOM.createRoot(document.getElementById('app')).render(<App/>)
export default App;