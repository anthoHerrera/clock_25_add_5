import React from "react";

type sessionProps = {
    title: string;
    timer: () => string;
    styled: object;
};

function Session(props: sessionProps) {
    return (
        <div id="timer-label">
            <div>{props.title}</div>
            <div id="time-left" style={props.styled}>
                {props.timer()}
            </div>
        </div>
    );
}

export default Session;
