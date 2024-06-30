import {useTranslation} from 'react-i18next';

const EditMenu = ({ editorRef }) => {
    const {t} = useTranslation();

    const EditMenuCut = () => {
        editorRef.current.focus();
        editorRef.current.trigger('source', 'editor.action.clipboardCutAction');
    }

    const EditMenuCopy = () => {
        editorRef.current.focus();
        editorRef.current.trigger('source', 'editor.action.clipboardCopyAction');
    }

    const EditMenuPaste = () => {
        editorRef.current.focus();
        editorRef.current.trigger('source', 'editor.action.clipboardPasteAction');
    }

    const EditMenuDelete = () => {
        editorRef.current.focus();
        const selection = editorRef.current.getSelection();
        editorRef.current.executeEdits('source', [
            {
                range: selection,
                text: '',
                forceMoveMarkers: true
            }
        ]);
    }

    return (
        <div className="top-menu" id="edit-menu">
            <ul>
                <li onClick={EditMenuCut}>{t('cut')}</li>
                <li onClick={EditMenuCopy}>{t('copy')}</li>
                <li onClick={EditMenuPaste}>{t('paste')}</li>
                <li onClick={EditMenuDelete}>{t('delete')}</li>
            </ul>
        </div>
    );
};

export default EditMenu;

