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

const EditMenu = () => (
    <div className="top-menu" id="edit-menu">
        <ul>
            <li onClick={EditMenuCut}>Cut</li>
            <li onClick={EditMenuCopy}>Copy</li>
            <li onClick={EditMenuDelete}>Delete</li>
            <li onClick={EditMenuFind}>Find</li>
        </ul>
    </div>
);

export default EditMenu;

