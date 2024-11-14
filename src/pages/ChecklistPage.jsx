import React from "react";
import Checklist from "../01-checklist/Checklist";

export default function ChecklistPage () {
    const initialItems = [
        {text: "Buy groceries for the week", completed: false},
        {text: "Prepare presentation for Monday meeting", completed: true},
        {text: "Call the electrician to fix kitchen lights", completed: false},
        {text: "Finish reading the latest book", completed: false},
        {text: "Schedule annual health check-up", completed: true}
    ];

    return (
        <div className="h-screen min-h-[500px] w-screen min-w-[400px] flex items-center">
            <Checklist initialChecklist={initialItems} />
        </div>
    );
};