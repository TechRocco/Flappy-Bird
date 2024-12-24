import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { isLoggedInVar } from '../cache';


// PrivateRoute component
const PrivateRoute = () => {
    const isLoggedIn = isLoggedInVar();
    console.log(isLoggedIn);
    const location = useLocation();
    
    // If the user is logged in, render the component or child routes
    if (isLoggedIn) {
        return <Outlet />;
    }
    // Otherwise, redirect to the sign-in page
    return <Navigate to="/signin" state={{ from: location }} replace />;
};


export default PrivateRoute;