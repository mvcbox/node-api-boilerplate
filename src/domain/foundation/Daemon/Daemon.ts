import { DaemonOptionsDTO } from './DaemonOptionsDTO';

export abstract class Daemon {
  public interval: number;
  public isActive: boolean;
  public timerId?: NodeJS.Timer;
  public startImmediate: boolean;

  public constructor(options: DaemonOptionsDTO) {
    this.isActive = false;
    this.interval = options.interval;
    this.startImmediate = options.startImmediate ?? false;
  }

  protected schedule(): void {
    if (!this.isActive) {
      return;
    }

    this.timerId = setTimeout(async () => {
      await this.handle().catch(console.error);
      this.schedule();
    }, !this.timerId && this.startImmediate ? 0 : this.interval);
  }

  public start(): void {
    this.stop();
    this.isActive = true;
    this.schedule();
  }

  public stop(): void {
    this.isActive = false;
    this.timerId && clearTimeout(this.timerId);
    this.timerId = undefined;
  }

  public abstract handle(): Promise<void>;
}
