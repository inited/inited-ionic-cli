export declare class Inited {
    init(args: Array<any>): Promise<any>;
    build(args: Array<string>): Promise<void>;
    debug(args: Array<any>): Promise<void>;
    dist(args: Array<string>): Promise<void>;
    help(): void;
    prepare(args: Array<string>): Promise<void>;
    pub(args: Array<string>): Promise<void>;
    release(args: Array<string>): Promise<void>;
    run(args: Array<string>): Promise<void>;
    set(args: any): Promise<void>;
    private prepareFor(platform, clean?);
    private buildFor(platform);
    private buildAngular(prod?);
    private preBuild(platform);
    private postBuild(platform);
    private preDist(platform);
    private distFor(platform);
    private postDist(platform);
    private pubFile(src, dest);
    private logError(message, error);
    private move(source, destination);
    private unlockKeychain();
    private installAndPrune();
    private removePlatformsAndPlugins();
}
