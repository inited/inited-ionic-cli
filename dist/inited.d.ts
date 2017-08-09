export declare class Inited {
    private static platforms;
    initialize(): Promise<any>;
    abuild(): Promise<void>;
    adist(): Promise<void>;
    aprepare(): Promise<any>;
    apub(): void;
    arelease(): void;
    ibuild(): Promise<void>;
    idist(): Promise<void>;
    iprepare(): Promise<void>;
    ipub(): void;
    irelease(): void;
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
    private exec(command);
}
