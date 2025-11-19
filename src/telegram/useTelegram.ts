import { useEffect, useState } from 'react';
import './types'; // Import types to ensure global Window definition

const tg = window.Telegram?.WebApp;

export function useTelegram() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (tg) {
            tg.expand();
            tg.setHeaderColor('#ffffff');
            tg.setBackgroundColor('#ffffff');
            tg.disableVerticalSwipes();
            tg.ready();
            setIsReady(true);
        }
    }, []);

    const onClose = () => {
        tg?.close();
    };

    const onToggleButton = () => {
        if (tg?.MainButton.isVisible) {
            tg.MainButton.hide();
        } else {
            tg?.MainButton.show();
        }
    };

    return {
        onClose,
        onToggleButton,
        tg,
        user: tg?.initDataUnsafe?.user,
        queryId: tg?.initDataUnsafe?.query_id,
        isReady
    };
}
