import ace from 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-text';

const TextHighlightRules = ace.require('ace/mode/text_highlight_rules').TextHighlightRules;

class IntercalHighlightRules extends TextHighlightRules {
    constructor() {
        super();
        this.$rules = {
            start: [
                {
                    token: 'comment',
                    regex: '#.*$',
                },
                {
                    token: 'keyword',
                    regex: '\\b(?:DO|PLEASE|IGNORE|NEXT|ABSTAIN|FORGET|REMEMBER|REINSTATE|RESUME|GIVE UP|COMPUTE|COME FROM|WRITE IN|READ OUT|GIVE UP)\\b',
                },
                {
                    token: 'constant.numeric',
                    regex: '\\b\\d+\\b',
                },
                {
                    token: 'string',
                    regex: '".*?"',
                },
                {
                    token: 'paren.lparen',
                    regex: '[\\[\\(]',
                },
                {
                    token: 'paren.rparen',
                    regex: '[\\]\\)]',
                },
                {
                    token: 'text',
                    regex: '\\s+',
                },
            ],
        };
        this.normalizeRules();
    }
}

export default IntercalHighlightRules;