export interface NotificationSentEvent {
  userId: string;
  channel: 'email' | 'sms' | 'push';
  message: string;
  sentAt: string;
}
