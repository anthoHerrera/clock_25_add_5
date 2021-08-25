import React from "react";

type TitleProps = {
    title: string;
};

function Title(props: TitleProps) {
    return (
        <div id="title">
            <div>{props.title}</div>
        </div>
    );
}

export default Title;
