import React, { useState } from "react";
import axios from "axios";

function CreateObjectForm({ onObjectCreated }) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });

    const [error, setError] = useState("");
    const [isFormVisible, setIsFormVisible] = useState(false);

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic not-null checks
        if (!formData.name || !formData.description) {
            setError("All fields are required.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/api/v1/objects",
                formData
            );
            if (response.status === 201) {
                // Clear form data on successful submission
                setFormData({
                    name: "",
                    description: "",
                });
                setError(""); // Clear any previous errors
                onObjectCreated(); // You can use this callback to refresh your table or perform other actions
                setIsFormVisible(false); // Hide the form after submission
            }
        } catch (error) {
            console.error("Error creating object data:", error);
            setError(error.response.data);
        }
    };

    return (
        <div className="text-center mt-3">
            <button className="btn btn-info" onClick={toggleFormVisibility}>
                {isFormVisible ? "Hide Form" : "Add a new object"}
            </button>
            {isFormVisible && (
                <div className="d-flex justify-content-center">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Name:</label>
                            <br />
                            <input
                                type="text"
                                name="name"
                                placeholder={"Name"}
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Description:</label>
                            <br />
                            <input
                                type="text"
                                name="description"
                                placeholder={"Description"}
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn mt-2 btn-success">
                            Submit
                        </button>
                        {error && <div className="text-danger">{error}</div>}
                    </form>
                </div>
            )}
        </div>
    );
}

export default CreateObjectForm;
