import React, { useEffect, useState } from "react";

function Time() {
    const [timeState, setTimeState] = useState();

    useEffect(() =>{
        setInterval(() => {
           const date = new Date();
           setTimeState(date.toLocaleTimeString());
        }, 1000);

    }, []);

    return <div style={{fontSize:"50px"}}>{timeState}</div>

}


export default Time;