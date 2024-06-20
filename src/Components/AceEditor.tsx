import AceEditor from "react-ace";
import { useEffect } from 'react';

import ace from 'ace-builds/src-noconflict/ace';

import IntercalMode from '../ace-intercal/intercal-mode';
import IntercalCompleter from '../ace-intercal/intercal-completer';

import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

function onChange(newValue: any) {
    console.log("change", newValue);
}

ace.config.set('basePath', '/src/ace-intercal')

const AceEdit = () => {

    // Register the custom mode with highlighting
    ace.define('ace/mode/intercal', [], (require: any, exports: any, module: any) => {
        module.exports = IntercalMode;
    });

    // Add the custom completer
    ace.require('ace/ext/language_tools').addCompleter(IntercalCompleter);

    return (
        <AceEditor
            width="95%"
            height="100%"
            mode="intercal"
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