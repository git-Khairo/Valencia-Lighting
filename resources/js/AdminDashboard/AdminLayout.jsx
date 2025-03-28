import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminLayout = () => {
    const navigate = useNavigate();

     useEffect(() => {
          fetch('/api/CheckAuth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'token': sessionStorage.getItem('token')})
        })
          .then(res => {
            if(!res.ok){
                throw Error('Could not get result');
            }
            return res.json();
          })
          .then(data => {
            if(!data) {
              navigate('/');
            }
          })
          .catch(err => {
            console.log(err);
          })
        
        }, []);

    return ( 
        <div>
        <div className="flex flex-col justify-center items-center">
            <header>Admin Dashboard Header</header>
            <nav>
                <a href="">Overview</a> | 
                <a href="">Users</a> | 
                <a href="">Settings</a>
            </nav>
        </div>
            <main>
                <Outlet />
            </main>
        </div>
     );
}
 
export default AdminLayout;