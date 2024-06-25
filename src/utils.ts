import { testData } from 'react-folder-tree';

async function fetchbase(endpoint: string, path: string): Promise<any> {
    try {
        console.log("Sending message to backend:", path);
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'path': path })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log("Received response from backend:", response);
        return response;

    } catch (error) {
        console.error('Error during fetch:', error);
        return testData;
    }
}

export async function fetchArchitecture(path: string): Promise<any> {
    const data = (await fetchbase("http://localhost:8080/api/architecture", path)).json();
    return data;
}

export async function getFileContent(path: string): Promise<any> {
    const data = (await fetchbase("http://localhost:8080/api/open/file", path)).text();
    return data;
}

export async function moveFile(path: string): Promise<any> {
    const data = (await fetchbase("http://localhost:8080/api/move", path)).json();
    return data;
}

export async function createFile(path: string): Promise<any> {
    const data = (await fetchbase("http://localhost:8080/api/create/file", path)).json();
    return data;
}

export async function createFolder(path: string): Promise<any> {
    const data = (await fetchbase("http://localhost:8080/api/create/folder", path)).json();
    return data;
}

export async function deleteFile(path: string): Promise<any> {
    const data = (await fetchbase("http://localhost:8080/api/delete/file", path)).json();
    return data;
}

export async function deleteFolder(path: string): Promise<any> {
    const data = (await fetchbase("http://localhost:8080/api/delete/folder", path)).json();
    return data;
}

export async function saveFile(path: string, content: string): Promise<any> {
    try {
        console.log("Sending message to backend:", path);
        const response = await fetch("http://localhost:8080/api/save/file", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'path': path, 'content': content })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log("Received response from backend:", response);
        return response;

    } catch (error) {
        console.error('Error during fetch:', error);
        return testData;
    }
}