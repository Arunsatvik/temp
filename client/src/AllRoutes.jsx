import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import ViewAllFlights from './pages/ViewAllFlights/ViewAllFlights';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import EmployeePanel from './pages/EmployeePanel/EmployeePanel';
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes';

const AllRoutes = () => {
    return (
        <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/allFlights" element={<ViewAllFlights />} />
            <Route element={<PrivateRoutes role={['admin']} />}>
                <Route exact path="/adminPanel" element={<AdminPanel />} />
            </Route>
            <Route
                element={
                    <PrivateRoutes
                        role={['airlineEmployee', 'airportEmployee']}
                    />
                }
            >
                <Route
                    exact
                    path="/employeePanel"
                    element={<EmployeePanel />}
                />
            </Route>
            <Route exact path="/*" element={<h1>Not a valid page!</h1>}></Route>
        </Routes>
    );
};

export default AllRoutes;
