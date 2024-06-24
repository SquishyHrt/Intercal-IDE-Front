import React, {useState, useEffect} from 'react';
import "../Player.css"

const Player = () => {
    const [posX, setPosX] = useState(130);
    const [backgroundPosX, setBackgroundPosX] = useState(0);
    const [backgroundPosY, setBackgroundPosY] = useState(-160 * 3);
    const [runAnimation, setRunAnimation] = useState(false);
    const [resetAnimation, setResetAnimation] = useState(false);

    useEffect(() => {
        let animationFrame;
        if (runAnimation) {
            const interval = 50; // Change this to control the speed of the animation
            const frames = 6; // Number of frames in the sprite sheet
            let currentFrame = 0;

            setBackgroundPosY(-160 * 1);

            const animate = () => {
                currentFrame = (currentFrame + 1) % frames;
                setBackgroundPosX(-currentFrame * 160); // Assuming each frame is 100px wide
                setPosX((prevPos) => {
                    const newPos = prevPos + 10;
                    if (newPos >= 1600) {
                        setRunAnimation(false);
                        winningPose();
                        setTimeout(startResetAnimation, 3000);
                        return prevPos;
                    }
                    return newPos;
                });
                animationFrame = setTimeout(animate, interval);
            };

            animate();
        }
        else if (resetAnimation) {
            const interval = 2; // Change this to control the speed of the animation
            const frames = 6; // Number of frames in the sprite sheet
            let currentFrame = 0;

            setBackgroundPosY(-160 * 1);

            const animate = () => {
                currentFrame = (currentFrame + 1) % frames;
                setBackgroundPosX(-currentFrame * 160); // Assuming each frame is 100px wide
                setPosX((prevPos) => {
                    const newPos = prevPos - 10;
                    if (newPos <= 150) {
                        setResetAnimation(false);
                        resetPlayerPosition();
                        return prevPos;
                    }
                    return newPos;
                });
                animationFrame = setTimeout(animate, interval);
            };

            animate();
        }
        return () => {
            clearTimeout(animationFrame);
        };

    }, [runAnimation, resetAnimation]);

    const startRunAnimation = () => {
        if (!runAnimation) {
            setRunAnimation(true);
        }
    }

    const winningPose = () => {
        setBackgroundPosX(0);
        setBackgroundPosY(-160 * 2);
    }

    const startResetAnimation = () => {
        if (!resetAnimation) {
            setResetAnimation(true);
        }
    }

    const resetPlayerPosition = () => {
        setPosX(130);
        setBackgroundPosX(0);
        setBackgroundPosY(-160 * 3);
    }

    return (<>
        <div className="player-container" id="player" onClick={startRunAnimation} style={{ left: `${posX}px`, transform: resetAnimation ? `scale(0.5) scaleX(-1)` : ``}}>
            <div className="player-sprite" style={{ backgroundPosition: `${backgroundPosX}px ${backgroundPosY}px`  }}>
            </div>
        </div>
    </>);
}

export default Player;