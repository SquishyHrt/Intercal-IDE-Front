import FolderTree, { testData } from 'react-folder-tree';
import 'react-folder-tree/dist/style.css';
import { useEffect, useState } from "react";

function getNode(path: number[], fileTree: any) {
    let tmp: any = fileTree.children;
    for (const i of path) {
        tmp = tmp[i].children ? tmp[i].children : tmp[i];
    }
    return tmp;
}

const BasicTree = () => {
    const [fileTree, setFileTree] = useState(testData);
    const onTreeStateChange = (state: any, event: any) => {

        console.log(state, event);

        if (event.type == "deleteNode") {
            const prevTree = JSON.parse(JSON.stringify(fileTree));
            const { absolutePath } = getNode(event.path, prevTree);

            console.log("Deleting node at:", absolutePath)
        }
        else if (event.type == "renameNode") {
            const prevTree = JSON.parse(JSON.stringify(fileTree));
            const { absolutePath } = getNode(event.path, prevTree);
            // newName doesn't contains the full path
            const newName = event.params[0];

            console.log("Renaming node. Previous path:", absolutePath, ". New name:", newName);
        }
        else if (event.type == "addNode") {
            // Problem because the added node has no absolutePath attribute
            // We need to recompose the path using event.path
            const { name } = getNode(event.path, state)[0];

            if (event.params[0] == false) {
                console.log("Creating file called:", name);
            }
            else {
                console.log("Creating folder called:", name);
            }
        }
    };

    useEffect(() => {
        const fetchArchitecture = async () => {
            try {
                console.log("Sending message to backend:", "./");
                const response = await fetch('http://localhost:8080/api/architecture', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ path: "/home/lb/EPITA/PING/samuelIDE/my-app" })
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

    const onNameClick = ({ defaultOnClick, nodeData }) => {
        defaultOnClick();

        const { absolutePath } = nodeData;

        console.log('File selected: ', absolutePath);
    };

    return (
        <FolderTree
            data={fileTree}
            onChange={onTreeStateChange}
            onNameClick={onNameClick}
            showCheckbox={false}
        />
    );
};

export default BasicTree;
