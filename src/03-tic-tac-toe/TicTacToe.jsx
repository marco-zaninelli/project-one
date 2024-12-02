import React, {useState} from "react";
import Board from "./components/Board";

export default function TicTacToe() {
    const [board, setBoard] = useState(Array(9).fill(null));

    const handleClick = () => {
        console.log('click');
    }

    return (
        <div className={'relative w-[400px] h-[400px] mx-auto border border-black rounded-lg'}>
            <Board board={board} onClick={handleClick} />
        </div>
    )
}