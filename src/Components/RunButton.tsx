import React, { forwardRef, useEffect, useState } from 'react';
import Player from 'Components/Player.tsx';
import { compileIntercal } from 'Utils/utils.ts';
import confetti from 'canvas-confetti';
import { useTranslation } from 'react-i18next';

const RunButton = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const [posX, setPosX] = useState(130);
  const [backgroundPosX, setBackgroundPosX] = useState(0);
  const [backgroundPosY, setBackgroundPosY] = useState(-160 * 3);
  const [runAnimation, setRunAnimation] = useState(false);
  const [compilSuccess, setCompilSuccess] = useState(false);

  useEffect(() => {
    let animationFrame;
    if (runAnimation) {
      const interval = 14; // Change this to control the speed of the animation
      const frames = 6; // Number of frames in the sprite sheet
      let currentFrame = 0;
      let tick = 0;

      setBackgroundPosY(-160 * 1);

      const animate = () => {
        ++tick;
        if (tick % 3 === 0) currentFrame = (currentFrame + 1) % frames;
        setBackgroundPosX(-currentFrame * 160); // Assuming each frame is 100px wide
        setPosX((prevPos) => {
          const newPos = prevPos + 10;
          const max_X = window.innerWidth - 140;
          if (compilSuccess) {
            setRunAnimation(false);
            setCompilSuccess(false);
            winningPose();
            launchConfetti();
            return prevPos;
          }
          if (newPos <= max_X) return newPos;
          return prevPos;
        });
        animationFrame = setTimeout(animate, interval);
      };

      animate();
    }
    return () => {
      clearTimeout(animationFrame);
    };
  }, [runAnimation, compilSuccess]);

  const startRunAnimation = () => {
    if (!runAnimation) {
      setRunAnimation(true);
    }
  };

  const winningPose = () => {
    setBackgroundPosX(0);
    setBackgroundPosY(-160 * 2);
  };

  const resetPlayer = () => {
    setPosX(130);
    setBackgroundPosX(0);
    setBackgroundPosY(-160 * 3);
    setRunAnimation(false);
    setCompilSuccess(false);
  };

  const playerFall = () => {
    setRunAnimation(false);
    setBackgroundPosX(0);
    setBackgroundPosY(-160 * 4);
    props.blockScreen(true);
  };

  const handleRunClick = async () => {
    props.setInfoTabIndex(1);
    if (props.openTabs.length == 0) {
      props.setCompilMsg(t('compilOpenFile'));
      return;
    }
    props.setCompilMsg(t('compilProgress'));
    resetPlayer();
    startRunAnimation();
    const content = props.fileContents[props.openTabs[props.fileTabIndex]];
    try {
      let response = await compileIntercal(content);
      response = JSON.parse(response);
      if (response.output) {
        props.setCompilMsg(response.output);
        if (response.output.trim().startsWith('ICL')) {
          playerFall();
        } else {
          setCompilSuccess(true);
        }
      } else {
        props.setCompilMsg('Error: ' + response);
        playerFall();
      }
    } catch (error) {
      props.setCompilMsg(t('compilError'));
      playerFall();
    }
  };

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
          y: 1,
        },
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <>
      <button ref={ref} id="button-run" onClick={handleRunClick}></button>
      <Player posX={posX} backgroundPosX={backgroundPosX} backgroundPosY={backgroundPosY} />
    </>
  );
});

export default RunButton;

