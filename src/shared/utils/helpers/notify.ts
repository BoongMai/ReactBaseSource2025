export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if (!('Notification' in window)) return 'denied';
  if (Notification.permission === 'granted') return 'granted';
  return await Notification.requestPermission();
};

export const showDemoNotification = async (title: string, body: string) => {
  if (!('serviceWorker' in navigator)) return;
  if (Notification.permission !== 'granted') {
    const perm = await requestNotificationPermission();
    if (perm !== 'granted') return;
  }
  const reg = await navigator.serviceWorker.getRegistration();
  if (!reg) return;
  await reg.showNotification(title, {
    body,
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    tag: 'demo',
  });
};

export const enablePushSubscription = async (vapidPublicKeyBase64Url: string) => {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return null;
  if (Notification.permission !== 'granted') {
    const perm = await requestNotificationPermission();
    if (perm !== 'granted') return null;
  }
  const reg = await navigator.serviceWorker.ready;
  const existing = await reg.pushManager.getSubscription();
  if (existing) return existing;
  const convertedKey = urlBase64ToUint8Array(vapidPublicKeyBase64Url);
  return await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: convertedKey,
  });
};

export const getPushSubscription = async (): Promise<PushSubscription | null> => {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return null;
  const reg = await navigator.serviceWorker.ready;
  return await reg.pushManager.getSubscription();
};

export const disablePushSubscription = async (): Promise<boolean> => {
  const sub = await getPushSubscription();
  if (!sub) return true;
  return await sub.unsubscribe();
};

const urlBase64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
};
