import React from "react";
import TicTacToe from '../03-tic-tac-toe/TicTacToe'

export default function TicTacToePage () {
    return (
        <div className="h-screen min-h-[400px] w-screen min-w-[400px] flex items-center">
            <TicTacToe />
        </div>
    );
};