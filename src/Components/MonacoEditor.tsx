import {useRef, useEffect, useState} from 'react';
import * as monaco from 'monaco-editor';
import {useTranslation} from 'react-i18next';

const MonacoEditor = ({domId, filename, value, fileContents, setFileContents, setEditorRef}: any) => {
    const {t} = useTranslation();
    const editorRef = useRef(null);
    const [calories, setCalories] = useState("0 " + t('lines') + " | 0 " + t('calories'));

    useEffect(() => {
        // Define the INTERCAL language
        monaco.languages.register({id: 'intercal'});

        monaco.languages.setMonarchTokensProvider('intercal', {
            tokenizer: {
                root: [
                    [/\bDO\b|\bPLEASE\b|\bIGNORE\b|\bNEXT\b|\bABSTAIN\b|\bFORGET\b|\bREMEMBER\b|\bREINSTATE\b|\bRESUME\b|\bGIVE UP\b|\bCOMPUTE\b|\bCOME FROM\b|\bWRITE IN\b|\bREAD OUT\b|\bGIVE UP\b/, 'keyword'],
                    [/\b(?:0|1|2|3|4|5|6|7|8|9)+\b/, 'number'],
                    [/\/\/.*/, 'comment'],
                    [/"([^"\\]|\\.)*$/, 'string.invalid'],
                    [/\(/, 'delimiter.parenthesis'],
                    [/\)/, 'delimiter.parenthesis'],
                    [/"/, {token: 'string.quote', bracket: '@open', next: '@string'}],
                ],
                string: [
                    [/[^\\"]+/, 'string'],
                    [/"/, {token: 'string.quote', bracket: '@close', next: '@pop'}],
                ],
            },
        });

        monaco.languages.setLanguageConfiguration('intercal', {
            comments: {
                lineComment: '//',
            },
            brackets: [
                ['{', '}'],
                ['[', ']'],
                ['(', ')'],
            ],
            autoClosingPairs: [
                {open: '{', close: '}'},
                {open: '[', close: ']'},
                {open: '(', close: ')'},
                {open: '"', close: '"'},
            ],
        });

        // Initialize the Monaco Editor
        // @ts-ignore
        editorRef.current = monaco.editor.create(document.getElementById(domId), {
            value: 'Default text value',
            language: 'intercal',
            theme: 'vs-dark',
            automaticLayout: true,
        });


        const completion = monaco.languages.registerCompletionItemProvider('intercal', {
            // @ts-ignore
            provideCompletionItems: () => {
                const keywords = ['DO', 'PLEASE', 'IGNORE', 'NEXT', 'ABSTAIN', 'FORGET', 'REMEMBER', 'REINSTATE', 'RESUME', 'GIVE UP', 'COMPUTE', 'COME FROM', 'WRITE IN', 'READ OUT', 'GIVE UP'];
                const suggestions = keywords.map(keyword => ({
                    label: keyword,
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    insertText: keyword,
                }));
                return {suggestions: suggestions};
            },
        });

        editorRef.current.onDidChangeModelContent(function (e) {
            // Save on our local dict 'fileContents' every live change in monaco
            let tmp = fileContents;
            tmp[filename] = editorRef.current.getValue();
            setFileContents(tmp);

            const nbLines = tmp[filename].split("\n").length;
            const nbCalories = nbLines * 3;
            setCalories(nbLines + " " + t('lines') + " | " + nbCalories + " " + t('calories'));
        });

        // Get the editor text:
        // console.log(editorRef.current.getValue());

        // Set the editor text:
        editorRef.current.setValue(value);
        // console.log(editorRef.current.getValue());

        setEditorRef(editorRef);

        return () => {
            completion.dispose();
            // @ts-ignore
            editorRef.current.dispose();
        };
    }, []);

    return <div style={{height: '99%', width: '100%', display: 'flex', flexDirection: 'column'}}>
        <div id={domId} style={{height: '100%', width: '100%'}}/>
        <p style={{margin: 0}}>{calories}</p>
    </div>;
};

export default MonacoEditor;
