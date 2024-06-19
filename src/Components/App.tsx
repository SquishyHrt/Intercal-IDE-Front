import '../App.css'
import BasicTree from "Components/FIleTree.tsx";
import AceEdit from "Components/AceEditor.tsx";
import Chat from "Components/Chat.tsx";

const App = () => {
    return (
        <body>
        <div className="container">
            <div className="top-box">
                <div className="top-part">
                    <div className="buttons">
                        <button className="button-1"></button>
                        <button className="button-2"></button>
                        <button className="button-3"></button>
                        <button className="button-4"></button>
                    </div>
                </div>
                <div className="bottom-part"></div>
            </div>
            <div className="bottom-container">
                <div className="bottom-box">
                    <BasicTree/>
                </div>
                <div className="bottom-box" id="editor-box">
                    <AceEdit/>
                </div>
                <div className="bottom-box">
                    <Chat/>
                </div>
                <div className="bottom-box">
                    <button className="bleachers-box"></button>
                </div>
            </div>
        </div>
        </body>
    );
}

export default App
