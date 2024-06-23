const HelpMenuHelp = () => {
    console.log('Help');
}

const HelpMenuTipOfTheDay = () => {
    console.log('Tip of the Day');
}

const HelpMenu = () => (
    <div className="top-menu" id="help-menu">
        <ul>
            <li onClick={HelpMenuHelp}>Help</li>
            <li onClick={HelpMenuTipOfTheDay}>Tip of the Day</li>
        </ul>
    </div>
);

export default HelpMenu;

