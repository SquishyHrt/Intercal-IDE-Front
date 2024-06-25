import FolderTree, {testData} from 'react-folder-tree';
import 'react-folder-tree/dist/style.css';
import {useEffect, useState} from "react";
import {createFile, createFolder, deleteP, fetchArchitecture, rename} from 'Utils/utils.ts';

function getNode(path: number[], fileTree: any) {
    let tmp: any = fileTree.children;
    for (const i of path) {
        tmp = tmp[i].children ? tmp[i].children : tmp[i];
    }
    return tmp;
}

function getPath(rootPath: string, path: number[], fileTree: any) {
    let res: string = rootPath;
    let tmp: any = fileTree.children;
    for (const i of path) {
        // Really bad but we can't use path inside a React path...
        if (res[res.length - 1] != '/')
            res += '/';
        res += tmp[i].name;
        tmp = tmp[i].children ? tmp[i].children : tmp[i];
    }
    return res;
}

const BasicTree = () => {
    const [fileTree, setFileTree] = useState(testData);
    const [rootPath, setRootPath] = useState("./");
    const [cwd, setCwd] = useState('./');

    const onTreeStateChange = (state: any, event: any) => {
        // console.log(state, event);
        if (event.type == "deleteNode") {
            const prevTree = JSON.parse(JSON.stringify(fileTree));
            const absolutePath = getPath(rootPath, event.path, prevTree);

            if (confirm("Are you sure to delete at " + absolutePath + " ?")) {
                console.log("Deleting node at:", absolutePath);
                deleteP(absolutePath);
            } else {
                // How to preventDefault behaviour ??

                // This bad solution gives me infinite loop on confirmation windows aaaaahhhh
                // fetchArchitecture(rootPath).then(r => setFileTree(r));
                return null;
            }
        } else if (event.type == "renameNode") {
            const prevTree = JSON.parse(JSON.stringify(fileTree));
            const absolutePath = getPath(rootPath, event.path, prevTree);
            // newName doesn't contains the full path
            const newName = event.params[0];

            rename(absolutePath, newName);

            //console.log("Renaming node. Previous path:", absolutePath, ". New name:", newName);
        } else if (event.type == "addNode") {
            // Problem because the added node has no absolutePath attribute
            // We need to recompose the path using event.path
            const children = getNode(event.path, state);
            const absolutePath = getPath(rootPath, event.path, state);

            if (event.params[0] == false) {
                const file_path = absolutePath + '/' + children[0].name;
                //console.log("Creating file called:", file_path);
                createFile(file_path);
            } else {
                const folder_path = absolutePath + '/' + children[children.length - 1].name;
                //console.log("Creating folder called:", folder_path);
                createFolder(folder_path);
            }
        }
    };

    const onNameClick = ({defaultOnClick, nodeData}) => {
        defaultOnClick();
        const absPath = getPath(rootPath, nodeData.path, fileTree);
        console.log('File selected: ', absPath);
    };

    useEffect(() => {
        const fetchCwd = async () => {
            try {
                const currentCwd = await window.electron.getCwd();
                setCwd(currentCwd);
                console.log('CWD:', cwd);

                // These lines should be executed after the cwd is updated
                setRootPath(cwd);
                const architecture = await fetchArchitecture(cwd);
                setFileTree(architecture);
            } catch (error) {
                console.error('Error while fetching CWD:', error);
            }
        };

        fetchCwd();
    }, [cwd]);

    return (
        <FolderTree
            data={fileTree}
            onChange={onTreeStateChange}
            onNameClick={onNameClick}
            initOpenStatus={'closed'}
            showCheckbox={false}
        />
    );
};

export default BasicTree;