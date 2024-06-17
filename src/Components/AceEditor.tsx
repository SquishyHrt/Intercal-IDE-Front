import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

function onChange(newValue: any) {
    console.log("change", newValue);
}

const AceEdit = () => {
    return (
        <AceEditor
            width="95%"
            height="95%"
            mode="java"
            theme="github"
            keyboardHandler={"vim"}
            onChange={onChange}
            name="editor-box"
            editorProps={{ $blockScrolling: true }}
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
            }}
        />
    );
}

export default AceEdit;