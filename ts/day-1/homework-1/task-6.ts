abstract class Logger {
  public log(level: string, message: string): void {
    const formattedMessage = this.format(level, message);
    this.write(formattedMessage);
  }

  protected format(level: string, message: string): string {
    return `[${new Date().toISOString()}][${level}] ${message}`;
  }

  protected abstract write(formattedMessage: string): void;
}

class ConsoleLogger extends Logger {
  protected write(formattedMessage: string): void {
    console.log(formattedMessage);
  }
}

class BufferedLogger extends Logger {
  private buffer: string[] = [];

  protected write(formattedMessage: string): void {
    this.buffer.push(formattedMessage);
  }

  public flush(): string[] {
    const output = [...this.buffer];
    this.buffer = [];
    return output;
  }
}
