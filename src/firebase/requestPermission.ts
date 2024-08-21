import {
  getMessaging,
  getToken,
  MessagePayload,
  onMessage,
} from 'firebase/messaging';
import app from './initFirebase';
import { registerServiceWorker } from './registerServiceWorker';
import { registerFcmToken, deleteFcmToken } from '@/api/fcmToken.api';

const messaging = getMessaging(app);

export async function requestPermission() {
  registerServiceWorker();
  try {
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_VAPID_KEY,
      });
      if (token) {
        await registerFcmToken(token);
      } else {
        alert('토큰 생성을 위해 권한을 허용해주세요');
      }
    } else if (permission === 'denied') {
      alert(
        '알림이 차단되었습니다. 알림을 사용하시려면 권한을 허용해주세요.\n\n브라우저 설정 > 개인정보보안 탭에서 허용 가능합니다.',
      );
      await deleteFcmToken();
    }
  } catch (error) {
    console.error('토큰 가져오는 중에 에러 발생', error);
  }
}

onMessage(messaging, (payload: MessagePayload) => {
  const title = payload?.notification?.title || '출석 알림';
  const body = payload?.notification?.body || '출석 10분 전입니다.';
  const notificationOptions = {
    body,
  };

  if (Notification.permission === 'granted') {
    new Notification(title, notificationOptions);
  }
});
