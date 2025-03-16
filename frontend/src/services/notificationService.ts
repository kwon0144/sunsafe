const SOUND_URL = "https://www.soundjay.com/communication/typewriter-2.wav";
const REMINDER_MESSAGE = "Time to reapply sunscreen! Don't forget to protect your skin from UV rays.";

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