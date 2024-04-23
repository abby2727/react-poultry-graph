const checkPermission = () => {
	console.log('Checking permission...');
	if (!('serviceWorker' in navigator)) {
		throw new Error('No support for service worker!');
	}
};

const requestNotificationPermission = async () => {
	console.log('Requesting permission...');
	const permission = await Notification.requestPermission();

	if (permission !== 'granted') {
		throw new Error('Notification permission not granted!');
	} else {
		new Notification('Request permission granted!');
	}
};

const registerSW = async () => {
	console.log('Registering service worker...');
	const registration = await navigator.serviceWorker.register('sw.js');
	return registration;
};

export const main = async () => {
	checkPermission();
	await requestNotificationPermission();
	await registerSW();
};
