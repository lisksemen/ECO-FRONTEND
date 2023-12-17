import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateEmergencyForm from "../component/emergency/CreateEmergencyForm";
import EmergenciesTable from "../component/table/EmergenciesTable";

function EmergenciesPage() {
    const [emergencies, setEmergencies] = useState([]); // Change state variable name
    const [successMessage, setSuccessMessage] = useState(""); // State variable for success message

    useEffect(() => {
        fetchEmergencies(); // Change function name
    }, []);

    const fetchEmergencies = async () => { // Change function name
        const response = await axios.get("http://localhost:8080/api/v1/emergencies"); // Change API endpoint
        setEmergencies(response.data); // Change state variable name
    };

    const onEmergencyUpdate = async () => { // Change function name
        // Clear any previous success message
        setSuccessMessage("");
        try {
            await fetchEmergencies(); // Change function name
            setSuccessMessage("Emergency updated successfully"); // Change success message
        } catch (error) {
            console.error("Error updating emergency:", error); // Change error message
        }
    };

    const onEmergencyCreated = async () => { // Change function name
        // Clear any previous success message
        setSuccessMessage("");
        try {
            await fetchEmergencies(); // Change function name
            setSuccessMessage("Emergency created successfully"); // Change success message
        } catch (error) {
            console.error("Error creating emergency:", error); // Change error message
        }
    };

    const onEmergencyDelete = async () => { // Change function name
        // Clear any previous success message
        setSuccessMessage("");
        try {
            await fetchEmergencies(); // Change function name
            setSuccessMessage("Emergency deleted successfully"); // Change success message
        } catch (error) {
            console.error("Error deleting emergency:", error); // Change error message
        }
    };

    return (
        <div>
            <CreateEmergencyForm onCreate={onEmergencyCreated} />
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}
            <EmergenciesTable
                emergencies={emergencies}
                onEmergencyUpdate={onEmergencyUpdate}
                onEmergencyDelete={onEmergencyDelete}
            />
        </div>
    );
}

export default EmergenciesPage;
