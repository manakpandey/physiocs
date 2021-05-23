import React from 'react';
import './index.css';

export default function RepCounter({repResult, count}) {

    // Convert count to percentage
    const currProgress = (x) => {
        var s = (x*10).toString();
        return s.concat("%");
    }
    

    return (
        <div className="row">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Rep Counter</h5>
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped progress-bar-animated" 
                        role="progressbar" 
                        aria-valuenow="75" 
                        aria-valuemin="0" 
                        aria-valuemax="10" 
                        style={{"width": currProgress(count)}}
                        />
                    </div>
                </div>
            </div>
            <div className={`card text-white bg-${repResult?'success':'warning'}`}>
                <div className="card-body">
                    <h5 className="card-title counter">{count}</h5>
                </div>
            </div>
        </div>
    );
}