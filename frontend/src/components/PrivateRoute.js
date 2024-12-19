import { Navigate, useLocation, Outlet } from 'react-router-dom';
// import { useQuery, gql } from '@apollo/client';
import { isLoggedInVar } from '../cache';

// const IS_LOGGED_IN = gql`
//  {
//    isLoggedIn @client
//  }
// `;

// PrivateRoute component
const PrivateRoute = () => {
    const isLoggedIn = isLoggedInVar();
    console.log(isLoggedIn);
    // const { loading, error, data } = useQuery(IS_LOGGED_IN);
    const location = useLocation();
    // console.log(data);

    // If the data is loading, display a loading message
    // if (loading) return <p>Loading...</p>;

    // If there is an error fetching the data, display an error message
    // if (error) return <p>Error!</p>;

    
    // If the user is logged in, render the component or child routes
    if (isLoggedIn) {
        return <Outlet />;
    }

    // Otherwise, redirect to the sign-in page
    return <Navigate to="/signin" state={{ from: location }} replace />;
};


export default PrivateRoute;