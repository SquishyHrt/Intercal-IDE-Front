import {MouseEvent, useEffect, useState} from "react";
import cheers1 from "@/assets/cheers1.mp3";
import cheers2 from "@/assets/cheers2.mp3";
import cheers3 from "@/assets/cheers3.mp3";
import cheers4 from "@/assets/cheers4.mp3";
import {Fireworks} from "fireworks-js";
import confetti from 'canvas-confetti';

const maxParticleCount = 150;
const maxSpread = 100;
const increment = 5;
const decrement = 30;
const timeout = 300; // Time in milliseconds to reset confettiParams
const colors = [["C40C0C", "#FF6500", "FF8A08", "FFC100"], ["FF7F3E", "FFF6E9", "80C4E9", "604CC3"], ["7BD3EA", "A1EEBD", "F6F7C4", "F6D6D6"],
    ["0D1282", "EEEDED", "F0DE36", "D71313"], ["EA047E", "FF6D28", "FCE700", "00F5FF"], ["900C3F", "C70039", "F94C10", "F8DE22"]];

const Bleachers = () => {
    const [lastClickTime, setLastClickTime] = useState<number | null>(null);
    const [confettiParams, setConfettiParams] = useState({particleCount: 40, spread: 30});

    const handleConfettiClick = (event: MouseEvent<HTMLButtonElement>) => {
        const now = Date.now();
        if (confettiParams.particleCount >= maxParticleCount && confettiParams.spread >= maxSpread) {
            const container = document.querySelector('.bleachers-box');
            if (container) {
                const fireworks = new Fireworks(container, {
                    hue: {min: 0, max: 60},
                    particles: 200,
                    lineWidth: {trace: {min: 0, max: 5}},
                });
                fireworks.start();

                // Stop fireworks after 5 seconds
                setTimeout(() => {
                    fireworks.waitStop(true);
                    setConfettiParams({ particleCount: 40, spread: 30 });
                }, 6000);
            }
        } else {
            if (lastClickTime && (now - lastClickTime < timeout)) {
                setConfettiParams(prev => ({
                    particleCount: Math.min(prev.particleCount + increment, maxParticleCount),
                    spread: Math.min(prev.spread + increment, maxSpread),
                }));
            }

            setLastClickTime(now);

            const confettiX = event.clientX;
            const confettiY = event.clientY;
            const randomColor = colors[Math.floor(Math.random() * colors.length)];

            // Trigger confetti centered at the mouse click position
            confetti({
                particleCount: confettiParams.particleCount,
                spread: confettiParams.spread,
                colors: randomColor,
                origin: {
                    x: confettiX / window.innerWidth,
                    y: confettiY / window.innerHeight
                }
            });
        }
    };

    useEffect(() => {
        const now = Date.now();
        if (lastClickTime && (now - lastClickTime >= timeout)) {
            const timer = setInterval(() => {
                setConfettiParams(prev => ({
                    particleCount: Math.max(prev.particleCount - decrement, 40),
                    spread: Math.max(prev.spread - decrement, 30),
                }));

                // Stop decreasing if we're back to the initial values
                setConfettiParams(prev => {
                    if (prev.particleCount <= 40 && prev.spread <= 30) {
                        clearInterval(timer);
                    }
                    return prev;
                });
            }, 100); // Decrease every 100ms

            return () => clearInterval(timer);
        }
    }, [lastClickTime]);

    const handleAudioClick = () => {
        // Check if audio should play (25% chance)
        if (Math.random() < 0.25) {
            // Play sound
            const cheers = [cheers1, cheers2, cheers3, cheers4];
            const randomCheer = cheers[Math.floor(Math.random() * cheers.length)];

            // Play random cheering sound
            const audio = new Audio(randomCheer);
            audio.play();
        }
    };

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        handleConfettiClick(event);
        handleAudioClick();
    };

    return (
        <button className="bleachers-box" onClick={handleClick}></button>
    );
}

export default Bleachers;