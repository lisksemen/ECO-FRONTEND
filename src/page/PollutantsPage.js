import React, { useEffect, useState } from "react";
import axios from "axios";
import CreatePollutantForm from "../component/pollutant/CreatePollutantForm";
import PollutantsTable from "../component/table/PollutantsTable";

function PollutantsPage() {
    const [pollutants, setPollutants] = useState([]); // Change state variable name
    const [successMessage, setSuccessMessage] = useState(""); // State variable for success message

    useEffect(() => {
        fetchPollutants(); // Change function name
    }, []);

    const fetchPollutants = async () => { // Change function name
        const response = await axios.get("http://localhost:8080/api/v1/pollutants"); // Change API endpoint
        setPollutants(response.data); // Change state variable name
    };

    const onPollutantUpdate = async () => { // Change function name
        // Clear any previous success message
        setSuccessMessage("");
        try {
            await fetchPollutants(); // Change function name
            setSuccessMessage("Pollutant updated successfully"); // Change success message
        } catch (error) {
            console.error("Error updating pollutant:", error); // Change error message
        }
    };

    const onPollutantCreated = async () => { // Change function name
        // Clear any previous success message
        setSuccessMessage("");
        try {
            await fetchPollutants(); // Change function name
            setSuccessMessage("Pollutant created successfully"); // Change success message
        } catch (error) {
            console.error("Error creating pollutant:", error); // Change error message
        }
    };

    const onPollutantDelete = async () => { // Change function name
        // Clear any previous success message
        setSuccessMessage("");
        try {
            await fetchPollutants(); // Change function name
            setSuccessMessage("Pollutant deleted successfully"); // Change success message
        } catch (error) {
            console.error("Error deleting pollutant:", error); // Change error message
        }
    };

    return (
        <div>
            <CreatePollutantForm onPollutantCreated={onPollutantCreated} />
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}
            <PollutantsTable
                pollutants={pollutants}
                onPollutantUpdate={onPollutantUpdate}
                onPollutantDelete={onPollutantDelete}
            />
        </div>
    );
}

export default PollutantsPage;
