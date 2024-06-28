import "../style/Player.css"

const Player = ({posX, backgroundPosX, backgroundPosY}) => {

    return (<>
        <div className="player-container" id="player"
             style={{left: `${posX}px`}}>
            <div className="player-sprite" style={{backgroundPosition: `${backgroundPosX}px ${backgroundPosY}px`}}>
            </div>
        </div>
    </>);
}

export default Player;