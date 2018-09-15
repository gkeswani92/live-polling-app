import React from 'react';
import { Link } from 'react-router-dom';


const Error = () => {
    return (
        <div id="not-found">
            <p>
                We cannot find the page that you have requested. Were you looking for one of these?
                <Link to="/">Join as Audience</Link>
                <Link to="/speaker">Join as Speaker</Link>
                <Link to="/board">View the Board</Link>
            </p>
        </div>
    );
}
 
export default Error;