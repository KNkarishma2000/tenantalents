export interface UserBehaviorRecordedEvent {
    userId: string;
    eventType: string;
    metadata: Record<string, any>;
    timestamp: string;
}
