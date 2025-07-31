export declare const config: {
    env: "production" | "development" | "test";
    port: number;
    serviceName: string;
    postgres: {
        host: string;
        port: number;
        db: string;
        user: string;
        password: string;
    };
    redis: {
        host: string;
        port: number;
    };
    kafka: {
        broker: string;
        clientId: string;
        groupId: string;
    };
    smtp: {
        host: string;
        port: number;
        user: string;
        pass: string;
        from: string;
    };
    jwt: {
        secret: string;
    };
    minio: {
        endpoint: string;
        port: number;
        accessKey: string;
        secretKey: string;
        bucketName: string;
    };
    imagekit: {
        urlEndpoint: string;
        publicKey: string;
        privateKey: string;
    };
};
