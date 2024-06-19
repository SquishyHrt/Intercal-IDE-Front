import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

function onChange(newValue: any) {
    console.log("change", newValue);
}

const AceEdit = () => {
    return (
        <AceEditor
            width="95%"
            height="100%"
            mode="java"
            theme="monokai"
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