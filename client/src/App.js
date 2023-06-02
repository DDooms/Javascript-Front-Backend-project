import React, {/*useEffect,*/ useState} from 'react';
import Register from "./register/register";
import Login from "./register/login";

function App() {
    /*const [backendData, setBackendData] = useState([]);
    useEffect(() => {
        fetch("/users").then(r => r.json())
            .then(data => setBackendData(data))
    }, [])

    return (
        <div>
            {(typeof backendData.addUser === "undefined") ? (
                <p>Loading...</p>) : (backendData.addUser.map((user, i) => (
                <p key={i}>{user.username}</p>
            )))}
        </div>
    );*/
    const [showLogin, setShowLogin] = useState(true);

    const handleToggle = () => {
        setShowLogin(!showLogin);
    };

    return (
        <div>
            {showLogin ? (
                <Login onToggle={handleToggle} />
            ) : (
                <Register onToggle={handleToggle} />
            )}
        </div>
    );
}

export default App;