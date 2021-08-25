import React from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";

type buttonsProps = {
    playStop: () => void;
    resetTimer: () => void;
}

function Buttons(props: buttonsProps) {
    return (
        <div id="timer__control">
            <button id="start_stop" onClick={props.playStop}>
                <FaPlay />
                <FaPause />
            </button>
            <button id="reset" onClick={props.resetTimer}>
                <FiRefreshCw />
            </button>
        </div>
    );
}

export default Buttons;
