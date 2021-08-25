import React from "react";

type sessionProps = {
    title: string;
    timer: () => string;
};

function Session(props: sessionProps) {
    return (
        <div id="timer-label">
            <div>{props.title}</div>
            <div id="time-left">{props.timer()}</div>
        </div>
    );
}

export default Session;
