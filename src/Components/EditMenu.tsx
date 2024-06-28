import {useTranslation} from 'react-i18next';

const EditMenuCut = () => {
    console.log('Cut');
}

const EditMenuCopy = () => {
    console.log('Copy');
}

const EditMenuDelete = () => {
    console.log('Delete');
}

const EditMenuFind = () => {
    console.log('Find');
}

const EditMenu = () => {
    const {t} = useTranslation();

    return (
        <div className="top-menu" id="edit-menu">
            <ul>
                <li onClick={EditMenuCut}>{t('cut')}</li>
                <li onClick={EditMenuCopy}>{t('copy')}</li>
                <li onClick={EditMenuDelete}>{t('delete')}</li>
                <li onClick={EditMenuFind}>{t('find')}</li>
            </ul>
        </div>
    );
};

export default EditMenu;

