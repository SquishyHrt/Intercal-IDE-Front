import FolderTree, { testData } from 'react-folder-tree';
import 'react-folder-tree/dist/style.css';
import {useEffect, useState} from "react";

const BasicTree = () => {
    const onTreeStateChange = (state: any, event: any) => console.log(state, event);
    const [fileTree, setFileTree] = useState(testData);

    useEffect( () => {
        const fetchArchitecture = async () => {
            try {
                console.log("Sending message to backend:", "./");
                const response = await fetch('http://localhost:8080/api/architecture', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({path: "./"})
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setFileTree(data);
                console.log("Received response from backend:", data);
                return data;

            } catch (error) {
                console.error('Error during fetch:', error);
                return testData;
            }
        }
        fetchArchitecture().then(r => setFileTree(r));
    }, []);
    return (
        <FolderTree
            data={ fileTree }
            onChange={ onTreeStateChange }
        />
    );
};

export default BasicTree;
