import React, { useState } from "react";
import axios from "axios";

function ObjectUpdateForm({ object, onUpdate }) {
    const [formData, setFormData] = useState({
        name: object.name,
        description: object.description,
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
            const response = await axios.put(
                `http://localhost:8080/api/v1/objects/${object.id}`,
                formData
            );
            if (response.status === 200) {
                setError(""); // Clear any previous errors
                onUpdate();
                setIsFormVisible(false); // Hide the form after submission
            }
        } catch (error) {
            console.error("Error updating object data:", error);
            setError(error.response.data);
        }
    };

    return (
        <div className="text-center m-3">
            <button className="btn btn-info" onClick={toggleFormVisibility}>
                {isFormVisible ? "Hide Update Form" : "Update Object Data"}
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
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn mt-2 btn-success">
                            Update
                        </button>
                        {error && <div className="text-danger">{error}</div>}
                    </form>
                </div>
            )}
        </div>
    );
}

export default ObjectUpdateForm;
