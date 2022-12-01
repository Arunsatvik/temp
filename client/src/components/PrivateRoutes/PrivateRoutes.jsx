import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = ({ role }) => {
    const auth = JSON.parse(localStorage.getItem('user'));
    return role.includes(auth.role) ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
