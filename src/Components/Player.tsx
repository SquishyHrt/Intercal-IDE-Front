import "../Player.css"

const Player = ({ posX, backgroundPosX, backgroundPosY, resetAnimation}) => {

    return (<>
        <div className="player-container" id="player" style={{ left: `${posX}px`, transform: resetAnimation ? `scale(0.5) scaleX(-1)` : ``}}>
            <div className="player-sprite" style={{ backgroundPosition: `${backgroundPosX}px ${backgroundPosY}px`  }}>
            </div>
        </div>
    </>);
}

export default Player;