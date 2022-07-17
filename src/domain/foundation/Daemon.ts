export abstract class Daemon {
    public timeout: number;
    public isActive: boolean;

    public constructor(options: { timeout: number; }) {
        this.isActive = false;
        this.timeout = options.timeout;
    }

    public abstract handle(): Promise<void>;

    protected _cycle(): void {
        if (!this.isActive) {
            return;
        }

        setTimeout(async () => {
            try {
                await this.handle();
            } catch (e) {
                console.error(e);
            }

            this._cycle();
        }, this.timeout);
    }

    public start(): void {
        this.isActive = true;
        this._cycle();
    }

    public stop(): void {
        this.isActive = false;
    }
}
