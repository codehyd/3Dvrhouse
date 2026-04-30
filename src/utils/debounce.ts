export interface DebounceOptions {
  enabled?: boolean;
  delay?: number;
}

export class Debounce {
  private timeoutId: ReturnType<typeof setTimeout> | null = null;
  private callback: (...args: unknown[]) => void;
  private enabled: boolean;
  private delay: number;

  constructor(callback: (...args: unknown[]) => void, options?: DebounceOptions) {
    this.callback = callback;
    this.enabled = options?.enabled ?? true;
    this.delay = options?.delay ?? 100;
  }

  public execute(...args: unknown[]): void {
    if (!this.enabled) {
      this.callback(...args);
      return;
    }

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      this.callback(...args);
      this.timeoutId = null;
    }, this.delay);
  }

  public destroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  public setDelay(delay: number): void {
    this.delay = delay;
  }

  public setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }
}