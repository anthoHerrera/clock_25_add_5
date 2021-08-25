import React from "react";
import { ImArrowUp2, ImArrowDown2 } from "react-icons/im";

type counterProps = {
    addID: string;
    lengthTimer: number;
    lengthID: string;
    minID: string;
    title: string;
    titleID: string;
    updateCounter: (e: any) => void;
};

function Counter(props: counterProps) {
    return (
        <div id={props.titleID}>
            <div>{props.title}</div>
            <div className="control__counter">
                <button id={props.minID} value="-" onClick={props.updateCounter}>
                    <ImArrowDown2 />
                </button>
                <div id={props.lengthID}>{props.lengthTimer}</div>
                <button id={props.addID} value="+" onClick={props.updateCounter}>
                    <ImArrowUp2 />
                </button>
            </div>
        </div>
    );
}

export default Counter;
