import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return ( 
        <div>
            <header>Admin Dashboard Header</header>
            <nav>
                <a href="">Overview</a> | 
                <a href="">Users</a> | 
                <a href="">Settings</a>
            </nav>
            <main>
                <Outlet />
            </main>
        </div>
     );
}
 
export default AdminLayout;