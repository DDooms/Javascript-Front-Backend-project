import React from 'react';
import {useNavigate} from "react-router-dom";

function Error() {
    const navigate = useNavigate();
        return (
            <div>
                Sorry, this is the error page
                Go back to the main
                <button type="button" onClick={() => navigate("/main")} className="back">
                    Back
                </button>
            </div>
        );
}

export default Error;