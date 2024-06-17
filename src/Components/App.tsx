// import { useState } from 'react'
// import reactLogo from '../assets/react.svg'
// import viteLogo from '/electron-vite.animate.svg'
import '../App.css'
import BasicTree from "Components/FIleTree.tsx";

function App() {
    return (
        <body>
        <div className="container">
            <div className="top-box">Top Box (Full Width)</div>
            <div className="bottom-container">
                <div className="bottom-box">Box 1
                    <BasicTree />
                </div>
                <div className="bottom-box">Box 2
                    <textarea className="editable-textarea" placeholder="Enter text here"></textarea>
                </div>
                <div className="bottom-box">Box 3</div>
                <div className="bottom-box">Box 4</div>
            </div>
        </div>
        </body>
    );
}

export default App
