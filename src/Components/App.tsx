// import { useState } from 'react'
import '../App.css'
import BasicTree from "Components/FIleTree.tsx";
import AceEdit from "Components/AceEditor.tsx";


function App() {
    return (
        <body>
        <div className="container">
            <div className="top-box">Top Box (Full Width)</div>
            <div className="bottom-container">
                <div className="bottom-box">Box 1
                    <BasicTree />
                </div>
                <div className="bottom-box" id="editor-box">Box 2
                    <AceEdit />
                </div>
                <div className="bottom-box">Box 3</div>
                <div className="bottom-box">Box 4</div>
            </div>
        </div>
        </body>
    );
}

export default App
