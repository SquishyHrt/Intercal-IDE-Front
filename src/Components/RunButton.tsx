import {useEffect, useState} from "react";
import Player from "Components/Player.tsx";
import {compileIntercal} from "Utils/utils.ts";
import confetti from 'canvas-confetti';

const RunButton = ({fileContents, openTabs, fileTabIndex, setInfoTabIndex, setCompilMsg}) => {
    const [posX, setPosX] = useState(130);
    const [backgroundPosX, setBackgroundPosX] = useState(0);
    const [backgroundPosY, setBackgroundPosY] = useState(-160 * 3);
    const [runAnimation, setRunAnimation] = useState(false);
    const [resetAnimation, setResetAnimation] = useState(false);
    //const [playerFallTimeout, setPlayerFallTimeout] = useState(null);

    useEffect(() => {
        let animationFrame;
        let resetTimeout;
        if (runAnimation) {
            const interval = 40; // Change this to control the speed of the animation
            const frames = 6; // Number of frames in the sprite sheet
            let currentFrame = 0;

            setBackgroundPosY(-160 * 1);

            const animate = () => {
                currentFrame = (currentFrame + 1) % frames;
                setBackgroundPosX(-currentFrame * 160); // Assuming each frame is 100px wide
                setPosX((prevPos) => {
                    const newPos = prevPos + 10;
                    const max_X = window.innerWidth - 150;
                    if (newPos >= max_X) {
                        setRunAnimation(false);
                        winningPose();
                        launchConfetti();
                        resetTimeout = setTimeout(startResetAnimation, 3000);
                        return prevPos;
                    }
                    return newPos;
                });
                animationFrame = setTimeout(animate, interval);
            };

            animate();
        } else if (resetAnimation) {
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
                        resetPlayer();
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
            clearTimeout(resetTimeout);
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

    const resetPlayer = () => {
        setPosX(130);
        setBackgroundPosX(0);
        setBackgroundPosY(-160 * 3);
        setResetAnimation(false);
        setRunAnimation(false);
    }

    const playerFall = () => {
        setRunAnimation(false);
        setBackgroundPosX(0);
        setBackgroundPosY(-160 * 4);
        //setPlayerFallTimeout(setTimeout(resetPlayer, 1000));
    }

    const handleRunClick = async () => {
        if (openTabs.length == 0) {
            setCompilMsg('Open a file to run it');
            return;
        }
        setCompilMsg('Compilation in progress...');
        setInfoTabIndex(1);
        //clearTimeout(playerFallTimeout);
        resetPlayer();
        startRunAnimation();
        const content = fileContents[openTabs[fileTabIndex]];
        try {
            let response = await compileIntercal(content);
            response = JSON.parse(response);
            if (response.output) {
                setCompilMsg(response.output);
                if (response.output.trim().startsWith("ICL")) {
                    playerFall();
                }
            } else {
                setCompilMsg('Error: ' + response);
                playerFall();
            }
        } catch (error) {
            setCompilMsg('Error during request. Verify your internet connection.');
            playerFall();
        }
    }

    const launchConfetti = () => {
        let duration_seconds = 1;
        let end = Date.now() + duration_seconds * 1000;
        (function frame() {
            confetti({
                particleCount: 20,
                spread: 30,
                startVelocity: 80,
                origin: {
                    x: Math.random(),
                    y: 1
                }
            });
            // keep going until we are out of time
            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }

    return (<>
        <button id="button-run" onClick={handleRunClick}></button>
        <Player posX={posX} backgroundPosX={backgroundPosX} backgroundPosY={backgroundPosY}
                resetAnimation={resetAnimation}/>
    </>);
}

export default RunButton;