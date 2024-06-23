const ViewMenuAppearance = () => {
    console.log('Appearance');
}

const ViewMenuSwitchThemes = () => {
    console.log('Switch Themes');
}

const ViewMenu = () => (
    <div className="top-menu" id="view-menu">
        <ul>
            <li onClick={ViewMenuAppearance}>Appearance</li>
            <li onClick={ViewMenuSwitchThemes}>Switch Themes</li>
        </ul>
    </div>
);

export default ViewMenu;

