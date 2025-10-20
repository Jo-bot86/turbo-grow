import {BrowserRouter} from "react-router";
import {AuthProvider} from "./context/AuthContext";
import Switch from "./components/Switch";



function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Switch />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
