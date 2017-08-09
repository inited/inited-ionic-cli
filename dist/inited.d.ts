export declare class Inited {
    private static platforms;
    initialize(args: any): Promise<any>;
    abuild(): Promise<void>;
    adist(): Promise<void>;
    aprepare(): Promise<any>;
    apub(): Promise<void>;
    arelease(): Promise<void>;
    ibuild(): Promise<void>;
    idist(): Promise<void>;
    iprepare(): Promise<void>;
    ipub(): Promise<void>;
    irelease(): Promise<void>;
    setversion(args: any): Promise<void>;
    wbuild(): Promise<void>;
    wdist(): void;
    wprepare(): Promise<any>;
    wrelease(): Promise<void>;
    private prepareFor(platform);
    private buildFor(platform);
    private buildIOS(file);
    private distFor(platform);
    private pubFile(src, dest);
    private logError(message, error);
    private installAndPrune();
    private removePlatformsAndPlugins();
}
