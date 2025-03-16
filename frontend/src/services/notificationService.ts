import { SOUND_URL, REMINDER_MESSAGE } from '../types/constants';

export const notificationService = {
    playSound: () => {
        const audio = new Audio(SOUND_URL);
        return audio.play();
    },

    showAlert: () => {
        alert(REMINDER_MESSAGE);
    },

    notify: () => {
        notificationService.playSound();
        notificationService.showAlert();
    }
}; 