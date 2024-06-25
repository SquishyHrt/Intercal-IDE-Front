import { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';

const MonacoEditor = () => {
    const editorRef = useRef(null);

    useEffect(() => {
        // Define the INTERCAL language
        monaco.languages.register({ id: 'intercal' });

        monaco.languages.setMonarchTokensProvider('intercal', {
            tokenizer: {
                root: [
                    [/\bDO\b|\bPLEASE\b|\bIGNORE\b|\bNEXT\b|\bABSTAIN\b|\bFORGET\b|\bREMEMBER\b|\bREINSTATE\b|\bRESUME\b|\bGIVE UP\b|\bCOMPUTE\b|\bCOME FROM\b|\bWRITE IN\b|\bREAD OUT\b|\bGIVE UP\b/, 'keyword'],
                    [/\b(?:0|1|2|3|4|5|6|7|8|9)+\b/, 'number'],
                    [/\/\/.*/, 'comment'],
                    [/"([^"\\]|\\.)*$/, 'string.invalid'],
                    [/\(/, 'delimiter.parenthesis'],
                    [/\)/, 'delimiter.parenthesis'],
                    [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],
                ],
                string: [
                    [/[^\\"]+/, 'string'],
                    [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }],
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
                { open: '{', close: '}' },
                { open: '[', close: ']' },
                { open: '(', close: ')' },
                { open: '"', close: '"' },
            ],
        });

        // Initialize the Monaco Editor
        // @ts-ignore
        editorRef.current = monaco.editor.create(document.getElementById('editor'), {
            value: 'Default text value',
            language: 'intercal',
            theme: 'vs-dark',
            automaticLayout: true,
            width: '100%',
            height: '100%',
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
                return { suggestions: suggestions };
            },
        });

        // Get the editor text:
        // console.log(editorRef.current.getValue());

        // Set the editor text:
        // editorRef.current.setValue('New text value');
        // console.log(editorRef.current.getValue());

        return () => {
            completion.dispose();
            // @ts-ignore
            editorRef.current.dispose();
        };
    }, []);

    return <div id="editor" style={{ height: '100%', width: '100%' }} />;
};

export default MonacoEditor;
