import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

interface RoleRouteProps {
    role: string;
}

const RoleRoute: React.FC<RoleRouteProps> = ({ role }) => {
    const token = localStorage.getItem('AUTH_TOKEN');
    if (!token) {
        return <Navigate to="/" />;
    }

    const decoded: { role: string } = jwtDecode(token);
    console.log(decoded)
    if (decoded.role !== role) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default RoleRoute;
