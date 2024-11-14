import React, {useState, useEffect, useRef} from "react";

// Import SVG icons
import Check from "./assets/check.svg";
import Delete from "./assets/delete.svg";
import Pencil from "./assets/pencil.svg";
import PlusIcon from "./assets/PlusIcon";

const Checklist = ({initialChecklist}) => {
    const [checklist, setChecklist] = useState(initialChecklist); // State to store checklist
    const [hoveredIndex, setHoveredIndex] = useState(null); // State to track current item
    const [isEditing, setIsEditing] = useState(null); // State to track edited item
    const [editedText, setEditedText] = useState(""); // State to store edited text

    // Ref for input field focus during editing
    const inputRef = useRef(null);

    // Initialize checklist
    useEffect(() => setChecklist(initialChecklist), [initialChecklist]);

    // Highlight element while editing
    useEffect(() => {
        if (isEditing !== null) inputRef.current?.focus();
    }, [isEditing]);

    // Toggle item check
    const toggleComplete = (index) =>
        setChecklist((prev) =>
            prev.map((item, i) =>
                i === index ? {...item, completed: !item.completed} : item
            )
        );

    // Add item to list
    const addItem = () => {
        if (!checklist.some((item) => item.text === "")) {
            setChecklist([...checklist, {text: "", completed: false}]);
            setIsEditing(checklist.length);
            setEditedText("");
        }
    };

    // Delete item from list
    const deleteItem = (index) => {
        setChecklist((prev) => prev.filter((_, i) => i !== index));
        cancelEdit();
    };

    // Edit list item
    const startEdit = (index, text) => {
        setIsEditing(index);
        setEditedText(text);
        setHoveredIndex(index);
    };

    // Cancel edit
    const cancelEdit = () => {
        setIsEditing(null);
        setEditedText("");
        setHoveredIndex(null);
    };

    // Save edit to list
    const saveEdit = (index) => {
        if (editedText === "") deleteItem(index);
        else {
            setChecklist((prev) =>
                prev.map((item, i) =>
                    i === index ? {...item, text: editedText} : item
                )
            );
            cancelEdit();
        }
    };

    return (
        <div className="flex flex-col w-[400px] h-[500px] mx-auto border border-black rounded-lg">

            {/* New Item */}
            <button
                onClick={addItem}
                className="mx-4 px-2 mt-4 mb-2 py-1 inline-flex items-center text-gray-500 rounded-lg hover:bg-gray-100"
            >
                <PlusIcon className="w-3 h-3 mr-2" />
                Add item
            </button>

            {/* Checklist */}
            <div className="flex-grow flex flex-col px-4 pb-4 overflow-y-auto">
                {checklist.map((item, index) => (
                    <div
                        key={index}
                        onMouseEnter={() => !isEditing && setHoveredIndex(index)}
                        onMouseLeave={() => !isEditing && setHoveredIndex(null)}
                        className={`flex items-center space-x-2 py-1 px-2 rounded-lg transition duration-150 ${
                            (hoveredIndex === index || isEditing === index) &&
                            "shadow bg-gray-100"
                        }`}
                    >
                        {/* Checkbox */}
                        <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => toggleComplete(index)}
                        />

                        {/* Input Field || Text Display */}
                        {isEditing === index ? (
                            <input
                                type="text"
                                value={editedText}
                                onChange={(e) => setEditedText(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") saveEdit(index);
                                    else if (e.key === "Escape") cancelEdit();
                                }}
                                ref={inputRef}
                                className="flex-grow px-2 py-0.5 my-0 text-base rounded focus:outline-none focus:ring-0"
                            />
                        ) : (
                            <span
                                className={`text-start flex-grow text-base px-2 py-0.5 my-0 cursor-pointer ${item.completed ? "line-through" : ""} ${hoveredIndex !== index ? "pr-5" : ""}`}
                                onDoubleClick={() => startEdit(index, item.text)}
                                onClick={() => toggleComplete(index)}
                            >
                                    {item.text}
                                </span>
                        )}

                        <div>
                            {/* Edit Icon */}
                            {hoveredIndex === index && isEditing !== index && (
                                <img
                                    src={Pencil}
                                    onClick={() => startEdit(index, item.text)}
                                    alt="Edit icon"
                                    className="cursor-pointer w-5 h-5 pl-1"
                                />
                            )}

                            {/* Edit State Icons */}
                            {isEditing === index && (
                                <div className="flex gap-x-1">
                                    <img
                                        src={Check}
                                        onClick={() => saveEdit(index)}
                                        alt="check icon"
                                        className="cursor-pointer w-4 h-4"
                                    />
                                    <img
                                        src={Delete}
                                        onClick={() => deleteItem(index)}
                                        alt="delete icon"
                                        className="cursor-pointer w-4 h-4   git push --atomic new-origin +refs/heads/* +refs/tagsgit push --atomic new-origin +refs/heads/* +refs/tags"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Checklist;
