import React, {useEffect, useState} from "react";
import axios from "axios";

function EmergencyUpdateForm({ emergency, onUpdate }) {
    const [formData, setFormData] = useState({
        peopleCountDead: emergency.peopleCountDead,
        peopleCountStrongInjury: emergency.peopleCountStrongInjury,
        peopleCountFatalInjury: emergency.peopleCountFatalInjury,
        peopleCountLightInjury: emergency.peopleCountLightInjury,
        objectName: emergency.object.name,
        pollutantId: emergency.pollutant.id,
        mass: emergency.mass,
        concentration: emergency.concentration,
    });

    const [error, setError] = useState("");
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [pollutants, setPollutants] = useState([]);

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
        if (!formData.peopleCountDead || !formData.peopleCountStrongInjury || !formData.peopleCountFatalInjury ||
            !formData.peopleCountLightInjury || !formData.objectName ||
            !formData.pollutantId || !formData.mass || !formData.concentration) {
            setError("All fields are required.");
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:8080/api/v1/emergencies/${emergency.id}`,
                formData
            );
            if (response.status === 200) {
                setError(""); // Clear any previous errors
                onUpdate();
                setIsFormVisible(false); // Hide the form after submission
            }
        } catch (error) {
            console.error("Error updating emergency data:", error);
            setError(error.response.data);
        }
    };

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

    return (
        <div className="text-center m-3">
            <button className="btn btn-info" onClick={toggleFormVisibility}>
                {isFormVisible ? "Hide Update Form" : "Update Emergency Data"}
            </button>
            {isFormVisible && (
                <div className="d-flex justify-content-center">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Загиблих:</label>
                            <br />
                            <input
                                type="number"
                                min="0" step="1"
                                name="peopleCountDead"
                                value={formData.peopleCountDead}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Тяжкі травми:</label>
                            <br />
                            <input
                                type="number"
                                min="0" step="1"
                                name="peopleCountStrongInjury"
                                value={formData.peopleCountStrongInjury}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Фатальні травми:</label>
                            <br />
                            <input
                                type="number"
                                min="0" step="1"
                                name="peopleCountFatalInjury"
                                value={formData.peopleCountFatalInjury}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Легкі травми:</label>
                            <br />
                            <input
                                type="number"
                                min="0" step="1"
                                name="peopleCountLightInjury"
                                value={formData.peopleCountLightInjury}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Підприємство:</label>
                            <br />
                            <input
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
                                {pollutants
                                    .filter((pollutant) => (
                                        pollutant.pollutantType.id === 1 ||
                                        pollutant.pollutantType.id === 2
                                    ))
                                    .map((pollutant) => (
                                    <option key={pollutant.id} value={pollutant.id}>
                                        {pollutant.name} {pollutant.pollutantType.pollutantTypeName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Маса викидів (т.):</label>
                            <br />
                            <input
                                type="number"
                                name="mass"
                                value={formData.mass}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Концентрація (мг/м³):</label>
                            <br />
                            <input
                                type="number"
                                name="concentration"
                                value={formData.concentration}
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

export default EmergencyUpdateForm;
