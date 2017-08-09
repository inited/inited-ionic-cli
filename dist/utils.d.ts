export declare class Utils {
    static readonly projectName: string;
    static readonly appVersion: string;
    static setAppVersion(value: string): Promise<any>;
    static readonly appName: string;
    static readonly buildNumber: string;
    static exec(command: string): Promise<any>;
    static isIonicApp(): boolean;
    private static readonly packageJson;
    private static readonly config;
}
