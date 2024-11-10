import "./App.css";
import Checklist from "./01-checklist/checklist";

function App () {
    const initialItems = [
        {text: "Buy groceries for the week", completed: false},
        {text: "Prepare presentation for Monday meeting", completed: true},
        {text: "Call the electrician to fix kitchen lights", completed: false},
        {text: "Finish reading the latest book", completed: false},
        {text: "Schedule annual health check-up", completed: true},
    ];

    return (
        <Checklist initialChecklist={initialItems} />
    );
}

export default App;
