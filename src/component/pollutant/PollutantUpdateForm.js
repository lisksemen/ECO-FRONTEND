import React, {useEffect, useState} from "react";
import axios from "axios";

function PollutantUpdateForm({ pollutant, onUpdate }) {
    const [formData, setFormData] = useState({
        name: pollutant.name,
        elv: pollutant.elv,
        mfr: pollutant.mfr,
        tlv: pollutant.tlv,
        sf: pollutant.sf,
        rfc: pollutant.rfc,
        pollutantTypeId: pollutant.pollutantTypeId,
        taxRate: pollutant.taxRate
    });

    const [pollutantTypes, setPollutantTypes] = useState([]);
    const [error, setError] = useState("");
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        async function fetchPollutantTypes() {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/pollutantypes");
                setPollutantTypes(response.data);
            } catch (error) {
                console.error("Error fetching pollutant types:", error);
            }
        }
        fetchPollutantTypes();
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

    const handlePollutantTypeChange = (e) => {
        setFormData({
            ...formData,
            pollutantTypeId: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic not-null checks
        if (!formData.name || formData.elv === null || formData.mfr === null
            || formData.tlv == null || formData.sf == null || formData.rfc == null
            || formData.pollutantTypeId == null || formData.taxRate == null) {
            setError("All fields are required.");
            return;
        }

        if (formData.elv < 0 || formData.mfr < 0 || formData.tlv < 0 || formData.sf < 0 || formData.sf < 0
            || formData.pollutantTypeId < 0 || formData.taxRate < 0) {
            setError("Fields cannot be less than 0.");
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:8080/api/v1/pollutants/${pollutant.id}`,
                formData
            );
            if (response.status === 200) {
                setError(""); // Clear any previous errors
                onUpdate();
                setIsFormVisible(false); // Hide the form after submission
            }
        } catch (error) {
            console.error("Error updating pollutant data:", error);
            setError(error.response.data);
        }
    };

    return (
        <div className="text-center m-3">
            <button className="btn btn-info" onClick={toggleFormVisibility}>
                {isFormVisible ? "Hide Update Form" : "Update Pollutant Data"}
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
                            <label>TLV:</label>
                            <br />
                            <input
                                type="number"
                                name="tlv"
                                value={formData.tlv}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>ELV:</label>
                            <br />
                            <input
                                type="number"
                                name="elv"
                                value={formData.elv}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>MFR:</label>
                            <br />
                            <input
                                type="number"
                                name="mfr"
                                value={formData.mfr}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>RFC:</label>
                            <br />
                            <input
                                type="number"
                                name="rfc"
                                value={formData.rfc}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>SF:</label>
                            <br />
                            <input
                                type="number"
                                name="sf"
                                value={formData.sf}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Pollutant Type:</label>
                            <br />
                            <select style={{"max-width":"200px"}}
                                name="pollutantTypeId"
                                value={formData.pollutantTypeId}
                                onChange={handlePollutantTypeChange}
                            >
                                <option value="">Select Pollutant Type</option>
                                {pollutantTypes.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.pollutantTypeName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Tax rate:</label>
                            <br />
                            <input
                                type="number"
                                name="taxRate"
                                value={formData.taxRate}
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

export default PollutantUpdateForm;
