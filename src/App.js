import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PollutionsPage from "./page/PollutionsPage";
import PollutantsPage from "./page/PollutantsPage";
import ObjectsPage from "./page/ObjectsPage";
import Navbar from "./component/Navbar";
import EmergencyPage from "./page/EmergencyPage";
import FileUploadPage from "./page/FileUploadPage";

function App() {
    return (
        <Router>
            <div className={"bg-dark"}>
                <Navbar/>
                <div className="bg-dark mt-4">
                    <Routes>
                        <Route path="/" element={<PollutionsPage />} />
                        <Route path="/pollutants" element={<PollutantsPage />} />
                        <Route path="/objects" element={<ObjectsPage />} />
                        <Route path="/emergencies" element={<EmergencyPage />} />
                        <Route path="/file" element={<FileUploadPage />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
