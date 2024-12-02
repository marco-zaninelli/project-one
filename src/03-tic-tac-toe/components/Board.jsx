import React from "react";
import Square from "./Square";

export default function Board ({board, onClick}) {
    return (
        <div className={"flex flex-col"}>
            {board.map((square, index) => (
                <Square
                    key={index}
                    square={square}
                    onClick={onClick(index)}
                />
            ))}
        </div>
    );
}