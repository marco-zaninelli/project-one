import React from "react";

export default function Square ({index, onClick}) {
    return (
        <button className="w-10 h-10 text-xl border border-black" onClick={onClick}>
            {index}
        </button>
    );
}
