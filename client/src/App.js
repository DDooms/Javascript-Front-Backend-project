import React from 'react';
import Register from "./register/register";
import Login from "./register/login";
import Home from "./home/home";
import Main from "./home/main";
import Error from "./error/error";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/main' element={<Main />} />
                <Route path='*' element={<Error />} />
            </Routes>
        </Router>
    );
}

export default App;