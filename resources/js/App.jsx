import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Project from "./Components/Project";
import Home from "./Pages/Home";
import Layout from "./Layout";
import Sections from "./Pages/Sections";
import ProductDetails from "./Pages/ProductDetails";


//For routes
const App = () => {
    return ( 
        <Router>
            <Layout>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/project/:id" element={<Project />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/sections" element={<Sections/>}/>
            </Routes>
            </Layout>
        </Router>
     );
}
ReactDOM.createRoot(document.getElementById('app')).render(<App/>)
export default App;