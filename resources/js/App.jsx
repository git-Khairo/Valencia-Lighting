import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, useParams, Navigate } from "react-router-dom";
import ProjectDetails from "./Pages/ProjectDetails";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Layout from "./Layout";
import Sections from "./Pages/Sections";
import ProductDatails from "./Pages/ProductDetails";
import Projects from "./Pages/Projects";
import Products from "./Pages/Products";
import NotFound from "./Pages/NotFound";
import SignIn from "./AdminDashboard/SignIn";
import useFetch from "./useFetch";
import Dashboard from "./AdminDashboard/Dashboard";
import AdminLayout from "./AdminDashboard/AdminLayout";
import PricingList from "./Pages/PricingList";

function ProtectedRoute({ children }){
    const { code } = useParams();
    const { data, loading } = useFetch('/api/getUserLogin');

    if(!loading){
        return data && code == data.toString() ? children : <Navigate to="/" />;
    }
}

//For routes
const App = () => {
    return ( 
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route element={<Layout />} >
                    <Route index path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/project/:id" element={<ProjectDetails />} />
                    <Route path="/product/:code" element={<ProductDatails />} />
                    <Route path="/about us" element={<About />} />
                    <Route path="/categories" element={<Sections/>}/>
                    <Route path="/category/:id" element={<Products/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/pricing list" element={<PricingList/>}/>
                    <Route path="/admin/:code" element={
                        <ProtectedRoute>
                            <SignIn />
                        </ProtectedRoute>
                    }/>
                </Route>

                {/* Admin Dashboard Routes */}
                    <Route element={<AdminLayout />} >
                        <Route index path="/admin/dashboard" element={<Dashboard />} />
                    </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
     );
}
ReactDOM.createRoot(document.getElementById('app')).render(<App/>)
export default App;