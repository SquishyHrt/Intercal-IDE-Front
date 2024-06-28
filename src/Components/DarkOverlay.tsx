import {useState, useEffect} from 'react';
import '../App.css'; // Ensure you have this CSS file
import {useTranslation} from 'react-i18next';

const DarkOverlay = ({show, onComplete}) => {

    const [countdown, setCountdown] = useState(10);
    const {t} = useTranslation();

    useEffect(() => {
        let timer;
        if (show) {
            setCountdown(10); // Reset countdown to 10 seconds
            timer = setInterval(() => {
                setCountdown((prevCountdown) => {
                    if (prevCountdown <= 1) {
                        clearInterval(timer);
                        onComplete();
                        return 0;
                    }
                    return prevCountdown - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [show, onComplete]);

    return (
        show && (
            <div className="overlay">
                <div className="countdown-text">
                    <p>{t('compilationFailed')}</p>
                    <p>{t('countdown') + countdown + t('seconds')}</p>
                </div>
            </div>
        )
    );
};

export default DarkOverlay;

