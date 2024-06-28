import FolderTree, { testData } from 'react-folder-tree';
import 'react-folder-tree/dist/style.css';
import { useEffect, useState } from "react";
import { createFile, createFolder, deleteP, fetchArchitecture, rename } from 'Utils/utils.ts';
import { useTranslation } from 'react-i18next';

function getNode(path: number[], fileTree: any) {
    let tmp: any = fileTree.children;
    for (const i of path) {
        tmp = tmp[i].children ? tmp[i].children : tmp[i];
    }
    return tmp;
}

async function getPath(rootPath: string, path: number[], fileTree: any) {
    let res: string = rootPath;
    let tmp: any = fileTree.children;
    for (const i of path) {
        // Terrible but we can't use path inside a React path...
        // @ts-ignore
        res = await window.electron.joinPath(res, tmp[i].name);
        tmp = tmp[i].children ? tmp[i].children : tmp[i];
    }
    return res;
}

const BasicTree = ({ openTab, rootPath }: any) => {
    const { t } = useTranslation();
    const [fileTree, setFileTree] = useState(testData);

    useEffect(() => {
        const archi = async () => {
            const architecture = await fetchArchitecture(rootPath);
            setFileTree(architecture);
        }
        archi();
    }, [rootPath]);

    const onTreeStateChange = async (state: any, event: any) => {
        // console.log(state, event);
        if (event.type == "deleteNode") {
            const prevTree = JSON.parse(JSON.stringify(fileTree));
            const absolutePath = await getPath(rootPath, event.path, prevTree);

            if (confirm(t('deleteConfirm') + absolutePath + " ?")) {
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
            const absolutePath = await getPath(rootPath, event.path, prevTree);
            // newName doesn't contains the full path
            const newName = event.params[0];

            rename(absolutePath, newName);

            //console.log("Renaming node. Previous path:", absolutePath, ". New name:", newName);
        } else if (event.type == "addNode") {
            // Problem because the added node has no absolutePath attribute
            // We need to recompose the path using event.path
            const children = getNode(event.path, state);
            const absolutePath = await getPath(rootPath, event.path, state);

            if (event.params[0] == false) {
                // @ts-ignore
                const file_path = await window.electron.joinPath(absolutePath, children[0].name);
                //console.log("Creating file called:", file_path);
                createFile(file_path);
            } else {
                // @ts-ignore
                const folder_path = await window.electron.joinPath(absolutePath, children[children.length - 1].name);
                //console.log("Creating folder called:", folder_path);
                createFolder(folder_path);
            }
        }
    };

    const onNameClick = async ({ defaultOnClick, nodeData }) => {
        defaultOnClick();
        const path = await getPath("", nodeData.path, fileTree);
        // @ts-ignore
        const absPath = await window.electron.joinPath(rootPath, path);
        // console.log('File selected: ', absPath);
        if (nodeData.isOpen == undefined) // It's a file, so open a tab
            openTab(absPath, path);
    };

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