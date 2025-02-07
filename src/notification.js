export const showNotification = async (title, message, imageUrl) => {
    if (!('Notification' in window)) {
        console.error('This browser does not support desktop notifications');
        return;
    }

    if (!('serviceWorker' in navigator)) {
        console.error('This browser does not support service workers');
        return;
    }


    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) {
        console.error('No service worker registered');
        return;
    }

    const options = {
        body: message,
        title: title,
        icon: 'app_icon.png', // Replace with your logo
        image: imageUrl, // Optional: URL to an image to display in the notification
        badge: 'app_icon.png', // Optional: URL to a badge image
        lang: 'en', // Optional: Language of the notification content
        actions: [
            { action: 'open', title: 'See Action', icon: 'done.png' },
            { action: 'dismiss', title: 'Mark as read', icon: 'back.png' }
        ], // Optional: Array of action buttons
        data: { customData: 'Custom Data' } // Optional: Custom data associated with the notification
    };

    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
        registration.showNotification(title, options);
    } else {
        throw new Error('Notification permission denied');
    }
};
