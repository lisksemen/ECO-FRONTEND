import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateObjectForm from "../component/object/CreateObjectForm";
import ObjectsTable from "../component/table/ObjectsTable";

function ObjectsPage() {
    const [objects, setObjects] = useState([]); // Change state variable name
    const [successMessage, setSuccessMessage] = useState(""); // State variable for success message

    useEffect(() => {
        fetchObjects(); // Change function name
    }, []);

    const fetchObjects = async () => { // Change function name
        const response = await axios.get("http://localhost:8080/api/v1/objects"); // Change API endpoint
        setObjects(response.data); // Change state variable name
    };

    const onObjectUpdate = async () => { // Change function name
        // Clear any previous success message
        setSuccessMessage("");
        try {
            await fetchObjects(); // Change function name
            setSuccessMessage("Object updated successfully"); // Change success message
        } catch (error) {
            console.error("Error updating object:", error); // Change error message
        }
    };

    const onObjectCreated = async () => { // Change function name
        // Clear any previous success message
        setSuccessMessage("");
        try {
            await fetchObjects(); // Change function name
            setSuccessMessage("Object created successfully"); // Change success message
        } catch (error) {
            console.error("Error creating object:", error); // Change error message
        }
    };

    const onObjectDelete = async () => { // Change function name
        // Clear any previous success message
        setSuccessMessage("");
        try {
            await fetchObjects(); // Change function name
            setSuccessMessage("Object deleted successfully"); // Change success message
        } catch (error) {
            console.error("Error deleting object:", error); // Change error message
        }
    };

    return (
        <div>
            <CreateObjectForm onObjectCreated={onObjectCreated} />
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}
            <ObjectsTable
                objects={objects}
                onObjectUpdate={onObjectUpdate}
                onObjectDelete={onObjectDelete}
            />
        </div>
    );
}

export default ObjectsPage;
