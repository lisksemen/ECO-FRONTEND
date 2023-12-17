import React, {useState} from "react";
import axios from "axios";

function FileUpload({onUpload}) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState(""); // State variable for error message

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const uploadFile = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);

            try {
                await axios.post("http://localhost:8080/api/v1/file", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                // File uploaded successfully
                setSelectedFile(null);
                onUpload(); // Notify the parent component that the upload is complete.
                // Clear any previous error message
                setErrorMessage("");
            } catch (error) {
                console.error("Error uploading file:", error);
                // Handle the error here (e.g., display an error message to the user).
                setErrorMessage(error.response.data);
            }
        }
    };

    return (
        <div className="container text-center mt-3">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="form-group">
                        <label htmlFor="formFile" className="form-label">
                            Завантажити з .xlsx файлу
                        </label>
                        <input
                            id="formFile"
                            type="file"
                            accept=".xlsx"
                            className="form-control"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="form-group">
                        <button
                            className="btn btn-info"
                            onClick={uploadFile}
                        >
                            Upload .xlsx File
                        </button>
                        <a
                            className="btn btn-info m-lg-1"
                            href={"http://localhost:8080/api/v1/file/export"}
                        >
                            Download .xlsx File
                        </a>
                    </div>
                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FileUpload;
