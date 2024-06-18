import '../App.css'
import BasicTree from "Components/FIleTree.tsx";
import AceEdit from "Components/AceEditor.tsx";

const App = () => {
    return (
        <body>
        <div className="container">
            <div className="top-box">
                <div className="top-part"></div>
                <div className="bottom-part"></div>
            </div>
            <div className="bottom-container">
                <div className="bottom-box">
                    <BasicTree/>
                </div>
                <div className="bottom-box" id="editor-box">
                    <AceEdit/>
                </div>
                <div className="bottom-box">Box 3</div>
                <div className="bottom-box">Box 4</div>
            </div>
        </div>
        </body>
    );
}

export default App
