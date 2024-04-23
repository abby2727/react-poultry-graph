console.log('Service Worker Loaded...');

const urlBase64ToUint8Array = (base64String) => {
	const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding)
		.replace(/\-/g, '+')
		.replace(/_/g, '/');

	const rawData = atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}

	return outputArray;
};

const saveSubscription = async (subscription) => {
	const SERVER_URL =
		'https://poultry-backend.vercel.app/api/save-subscription';

	const response = await fetch(SERVER_URL, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(subscription)
	});

	return response.json();
};

self.addEventListener('activate', async () => {
	const subscription = await self.registration.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: urlBase64ToUint8Array(
			'BDu6PIjeyUx-EEFTWh8zDa5Q8unZKnjoO_wFYsJS5GEcIgQVAiV4Q0xKYVHrV51DLGpCF66E6uyvYx5oE0vpBdo'
		)
	});

	const response = await saveSubscription(subscription);
	console.log(response);
});

self.addEventListener('push', (e) => {
	self.registration.showNotification('Poultry Notifications', {
		body: e.data.text()
	});
});
