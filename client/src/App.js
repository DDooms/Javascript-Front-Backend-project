import React, {useState} from 'react';
import Register from "./register/register";
import Login from "./register/login";

function App() {
    const [showLogin, setShowLogin] = useState(true);

    const handleToggle = () => {
        setShowLogin(!showLogin);
    };

    return (
        <div>
            {showLogin ? (<Login onToggle={handleToggle}/>) : (<Register onToggle={handleToggle}/>)}
        </div>
    );
}

export default App;