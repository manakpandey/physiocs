import React, { useState } from 'react';

const currProgress = (x) => {
    var s = (x*10).toString();
    return s.concat("%");
}


export default function RepCounter(repResult) {
    var [count] = useState(0);
    repResult=false;
    console.log(count + (repResult?0:1));
    count = useState(count + (repResult?1:0));
    return (
        <div className="row" style={{"width":"400px"}}>
            <div class="card text-white bg-primary" style={{"width":"75%","paddingRight":"0"}}>
                <div class="card-body">
                    <h5 class="card-title">Rep Counter</h5>
                    <div class="progress" style={{"height":"10px"}}>
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="10" style={{"width": currProgress(count)}} />
                    </div>
                </div>
            </div>
            <div class={"card text-white bg-".concat(repResult?"success":"warning")} style={{"width":"17%"}}>
                <div class="card-body">
                    <h5 class="card-title counter" style={{"textAlign":"center"}}>{count}</h5>
                </div>
            </div><button>Click me </button>
        </div>
    );
}