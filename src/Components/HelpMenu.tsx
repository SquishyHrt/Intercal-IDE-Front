const HelpMenuHelp = () => {
    console.log('Help');
}

const texts = [
    "You can't build muscle without a good diet.",
    "Get at least 8 hours of sleep every night.",
    "Don't forget to stretch before and after your workout.",
    "Don't forget to drink water.",
    "Don't forget to warm up before your workout.",
    "Go for a walk every day.",
    "Don't forget to breathe.",
    "Lift with proper form to prevent injury.",
    "Progressively increase the weight you lift.",
    "Include both compound and isolation exercises in your routine.",
    "Rest muscles for at least 48 hours between intense workouts.",
    "Track your progress with a workout journal.",
    "Incorporate a variety of exercises to target all muscle groups.",
    "Stay consistent with your workout schedule.",
    "Make sure to consume enough protein daily.",
    "Carbohydrates are important for energy; don't skip them.",
    "Fats are essential too; include healthy fats in your diet.",
    "Listen to your body and avoid overtraining.",
    "Supplements can help, but focus on whole foods first.",
    "Maintain proper posture during exercises.",
    "Join a fitness community for support and motivation.",
    "Set realistic and specific fitness goals."
];

const HelpMenuTipOfTheDay = () => {
    console.log('Tip of the Day');
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    // @ts-ignore
    window.electron.openTips(randomText);
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

