import {BrowserRouter, Routes, Route} from "react-router";
import {AuthProvider} from "./context/AuthContext";
import {ProtectedRoute} from "./components/ProtectedRoute";
import {LoginPage} from "./pages/LoginPage";
import {RegisterPage} from "./pages/RegisterPage";
import {DashboardPage} from "./pages/DashboardPage";
import AppLayout from "./layout/AppLayout";
import LandingPage from "./pages/LandingPage";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
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
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
