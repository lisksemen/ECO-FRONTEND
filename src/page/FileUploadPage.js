import React, {useState} from "react";
import FileUpload from "../component/file/FileUpload";

function FileUploadPage() {
    const [successMessage, setSuccessMessage] = useState("");

    const handleFileUpload = async () => {
        setSuccessMessage("");
        try {
            setSuccessMessage("File uploaded successfully");
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return (
        <div className={"bg-dark"}>
            <FileUpload onUpload={handleFileUpload}/>
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}
        </div>
    );
}

export default FileUploadPage;
