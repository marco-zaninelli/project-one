import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// Import your components
import Home from "./pages/Home";
import ChecklistPage from "./pages/ChecklistPage";
import WeatherApiPage from "./pages/WeatherApiPage";

function App() {
    return (
        <Router>
            <div className="App">

                {/* Navbar */}
                <nav className="fixed top- left-1/2 transform -translate-x-1/2 mb-5 w-full max-w-screen-2xl">
                    <ul className="flex flex-row flex-wrap gap-x-5 items-center justify-center mx-auto">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/checklist">Checklist</Link>
                        </li>
                        <li>
                            <Link to="/weather-api">Weather API</Link>
                        </li>
                    </ul>
                </nav>

                {/* Routes */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/checklist" element={<ChecklistPage />} />
                    <Route path="/weather-api" element={<WeatherApiPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
