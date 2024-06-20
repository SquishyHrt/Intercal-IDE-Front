import ace from 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-text';
import IntercalHighlightRules from './intercal-highlight-rules';

const TextMode = ace.require('ace/mode/text').Mode;

class IntercalMode extends TextMode {
    constructor() {
        super();
        this.HighlightRules = IntercalHighlightRules;
    }

    $id: string = 'ace/mode/intercal';
}

export default IntercalMode;
