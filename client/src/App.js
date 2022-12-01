import './App.css';
import AllRoutes from './AllRoutes';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <div className="App">
            <Router>
                <AllRoutes></AllRoutes>
            </Router>
            <ToastContainer
                position="top-center"
                autoClose={2500}
                theme="dark"
            />
        </div>
    );
}

export default App;
