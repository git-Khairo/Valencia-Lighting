import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProjectDetails from "./Pages/ProjectDetails";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Layout from "./Layout";
import Sections from "./Pages/Sections";
import ProductDatails from "./Pages/ProductDetails";
import Projects from "./Pages/Projects";
import Products from "./Pages/Products";
import NotFound from "./Pages/NotFound";


//For routes
const App = () => {
    return ( 
        <Router>
            <Layout>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/products" element={<Products />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/product/:code" element={<ProductDatails />} />
            <Route path="/about us" element={<About />} />
            <Route path="/Categories" element={<Sections/>}/>
            <Route path="*" element={<NotFound />} />
            </Routes>
            </Layout>
        </Router>
     );
}
ReactDOM.createRoot(document.getElementById('app')).render(<App/>)
export default App;