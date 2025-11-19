class EventBus {
  private handlers: Map<string, Set<Function>> = new Map();
  static _instance: EventBus;

  private constructor() {}

  public static getInstance(): EventBus {
    if (!EventBus._instance) {
      EventBus._instance = new EventBus();
    }

    return EventBus._instance;
  }

  public on(event: string, handler: Function): () => void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }

    const handlersForEvent = this.handlers.get(event)!;
    handlersForEvent.add(handler);

    return () => {
      handlersForEvent.delete(handler);
    };
  }

  public emit(event: string, payload?: any): void {
    const eventHandlers = this.handlers.get(event);
    if (!eventHandlers) {
      throw new Error('no handler events')
    }

    for (const handler of eventHandlers) {
      handler(payload);
    }
  }
}
