import React, { useEffect, useState } from "react";
import EcoTable from "../component/table/EcoTable";
import CreatePollutionForm from "../component/pollution/CreatePollutionForm";
import axios from "axios";
import FileUpload from "../component/file/FileUpload";

function PollutionsPage() {
    const [pollutions, setPollutions] = useState([]);
    const [successMessage, setSuccessMessage] = useState(""); // State variable for success message

    useEffect(() => {
        fetchPollutions();
    }, []);

    const fetchPollutions = async () => {
        const response = await axios.get("http://localhost:8080/api/v1/pollutions");
        setPollutions(response.data);
    };

    const onPollutionUpdate = async () => {
        // Clear any previous success message
        setSuccessMessage("");
        try {
            await fetchPollutions();
            setSuccessMessage("Pollution updated successfully");
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const onPollutionCreated = async () => {
        // Clear any previous success message
        setSuccessMessage("");
        try {
            await fetchPollutions();
            setSuccessMessage("Pollution created successfully");
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const onPollutionDelete = async () => {
        // Clear any previous success message
        setSuccessMessage("");
        try {
            await fetchPollutions();
            setSuccessMessage("Pollution deleted successfully");
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const handleFileUpload = async () => {
        // Clear any previous success message
        setSuccessMessage("");
        try {
            await fetchPollutions();
            setSuccessMessage("File uploaded successfully");
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return (
        <div className={"bg-dark"}>
            <EcoTable
                pollutions={pollutions}
                onPollutionUpdate={onPollutionUpdate}
                onPollutionDelete={onPollutionDelete}
            />
            <CreatePollutionForm onPollutionCreated={onPollutionCreated} />
        </div>
    );
}

export default PollutionsPage;
