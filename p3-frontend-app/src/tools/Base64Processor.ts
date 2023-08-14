import {Buffer} from "buffer";

export abstract class Base64Processor {
    public static encode(dataString: string): string {
        const dataBase64 = Buffer.from(dataString, "utf8").toString("base64");
        return dataBase64;
    }

    public static decode(dataBase64: string): string {
        const dataString = Buffer.from(dataBase64, "base64").toString("utf8");
        return dataString;
    }
}
