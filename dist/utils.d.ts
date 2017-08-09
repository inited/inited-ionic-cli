export declare class Utils {
    static readonly projectName: string;
    static setProjectName(value: string): Promise<any>;
    static readonly appVersion: string;
    static setAppVersion(value: string): Promise<any>;
    static readonly appName: string;
    static setAppName(value: string): void;
    static readonly buildNumber: string;
    static setId(value: string): void;
    static exec(command: string): Promise<any>;
    static isIonicApp(): boolean;
    private static readonly packageJson;
    private static readonly config;
}
