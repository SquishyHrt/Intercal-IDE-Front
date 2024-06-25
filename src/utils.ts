import { testData } from 'react-folder-tree';

async function fetchbase(endpoint: string, path: string): Promise<any> {
    try {
        // console.log("Sending message to backend:", path);
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'path': path })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // console.log("Received response from backend:", response);
        return response;

    } catch (error) {
        console.error('Error when contacting the backend at', endpoint, 'with path', path);
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

export async function rename(src: string, dst: string): Promise<any> {
    try {
        const response = await fetch("http://localhost:8080/api/rename", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'src': src, 'dst': dst })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response;

    } catch (error) {
        console.error('Error when contacting the backend at /api/rename with src', src, 'and dst', dst);
        return testData;
    }
}

export async function createFile(path: string): Promise<any> {
    const data = await fetchbase("http://localhost:8080/api/create/file", path);
    return data;
}

export async function createFolder(path: string): Promise<any> {
    const data = await fetchbase("http://localhost:8080/api/create/folder", path);
    return data;
}

export async function deleteP(path: string): Promise<any> {
    const data = await fetchbase("http://localhost:8080/api/delete", path);
    return data;
}

export async function saveFile(path: string, content: string): Promise<any> {
    try {
        const response = await fetch("http://localhost:8080/api/save/file", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'path': path, 'content': content })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response;

    } catch (error) {
        console.error('Error when contacting the backend at', endpoint, 'with path', path);
        return testData;
    }
}