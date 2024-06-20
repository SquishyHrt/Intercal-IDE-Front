const intercalKeywords = [
    'DO', 'PLEASE', 'IGNORE', 'NEXT', 'ABSTAIN', 'FORGET', 'REMEMBER',
    'REINSTATE', 'RESUME', 'GIVE UP', 'COMPUTE', 'COME FROM', 'WRITE IN',
    'READ OUT', 'GIVE UP'
];

const IntercalCompleter = {
    getCompletions(editor: any, session: any, pos: any, prefix: string, callback: Function) {
        if (prefix.length === 0) {
            callback(null, []);
            return;
        }
        const completions = intercalKeywords.map((word) => {
            return {
                caption: word,
                value: word,
                meta: 'keyword',
            };
        });
        callback(null, completions);
    },
};

export default IntercalCompleter;
