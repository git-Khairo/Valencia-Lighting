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
          <Outlet />
        </div>
     );
}
 
export default AdminLayout;