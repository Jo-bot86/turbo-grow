import LandingPage from "./pages/LandingPage";
import {LoginPage} from "./pages/LoginPage";
import {RegisterPage} from "./pages/RegisterPage";
import {ProtectedRoute} from "./ProtectedRoute";
import AppLayout from "./layout/AppLayout";
import { Route, Routes } from "react-router";
import DashboardPage from "./pages/DashboardPage";
import PlantList from "./pages/plant/PlantList";

export default function Switch() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <AppLayout>
                            <DashboardPage/>
                        </AppLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/dashboard/kulturen"
                element={
                    <ProtectedRoute>
                        <AppLayout>
                            <PlantList/>
                        </AppLayout>
                    </ProtectedRoute>
                }
            />
        </Routes>);
}