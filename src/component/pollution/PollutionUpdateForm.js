import React, { useState, useEffect } from "react";
import axios from "axios";

function PollutionUpdateForm({ pollution, onUpdate }) {
    const [formData, setFormData] = useState({
        objectName: pollution.objectName,
        pollutantId: pollution.pollutantId,
        year: pollution.year,
        valuePollution: pollution.valuePollution.toFixed(2),
        pollutionConcentration: pollution.pollutionConcentration.toFixed(2)
    });

    const [pollutants, setPollutants] = useState([]);
    const [error, setError] = useState("");
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        async function fetchPollutants() {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/pollutants");
                setPollutants(response.data);
            } catch (error) {
                console.error("Error fetching pollutants:", error);
            }
        }
        fetchPollutants();
    }, []);

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
        if (
            !formData.objectName ||
            !formData.pollutantId ||
            !formData.year ||
            !formData.valuePollution ||
            !formData.pollutionConcentration
        ) {
            setError("All fields are required.");
            return;
        }

        if (
            formData.year < 0 || formData.valuePollution < 0 || formData.pollutionConcentration < 0
        ) {
            setError("number can't be less than 0.")
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:8080/api/v1/pollutions/${pollution.id}`,
                formData
            );
            if (response.status === 200) {
                setError(""); // Clear any previous errors
                onUpdate();
                setIsFormVisible(false); // Hide the form after submission
            }
        } catch (error) {
            console.error("Error updating pollution data:", error);
            setError(error.response.data);
        }
    };

    return (
        <div className="text-center m-3">
            <button className="btn btn-info" onClick={toggleFormVisibility}>
                {isFormVisible ? "Hide Update Form" : "Update Pollution Data"}
            </button>
            {isFormVisible && (
                <div className="d-flex justify-content-center">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Object Name:</label>
                            <br />
                            <input
                                disabled="disabled"
                                type="text"
                                name="objectName"
                                value={formData.objectName}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Pollutant ID:</label>
                            <br />
                            <select style={{"max-width":"200px"}}
                                    name="pollutantId"
                                    value={formData.pollutantId}
                                    onChange={handleChange}
                            >
                                <option value="">Select Pollutant ID</option>
                                {pollutants.map((pollutant) => (
                                    <option key={pollutant.id} value={pollutant.id}>
                                        {pollutant.name} {pollutant.pollutantType.pollutantTypeName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Year:</label>
                            <br />
                            <input
                                type="number"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Value Pollution:</label>
                            <br />
                            <input
                                step=".0001"
                                type="number"
                                name="valuePollution"
                                value={formData.valuePollution}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Pollution Concentration:</label>
                            <br/>
                            <input
                                step=".0001"
                                type="number"
                                name="pollutionConcentration"
                                value={formData.pollutionConcentration}
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

export default PollutionUpdateForm;
