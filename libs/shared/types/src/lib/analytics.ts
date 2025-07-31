export interface AnalyticsEvent {
  eventType: string;
  userId?: string;
  productId?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}
