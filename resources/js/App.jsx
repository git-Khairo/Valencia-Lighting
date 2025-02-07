import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Project from "./Components/Project";
import Home from "./Pages/Home";

//For routes
const App = () => {
    return ( 
        <>
        <Router>
            <Routes>
                <Route path="/">
                    <Route index element={<Home />} />
                    <Route path="project" element={<Project />} />
                </Route>
            </Routes>
        </Router>
        </>
     );
}
 
export default App;