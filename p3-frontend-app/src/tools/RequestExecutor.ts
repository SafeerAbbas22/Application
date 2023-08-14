import {CustomHttpError} from "../custom_errors/CustomHttpError";
import {getLogger} from "../logger/LogConfig";

export abstract class RequestExecutor {
    static logger = getLogger("model.RequestExecutor");

    public static async init(addressURL: string, requestOptions?: RequestInit): Promise<Response> {
        return await fetch(addressURL, requestOptions)
            .catch((error: Error) => {  // Failure to complete request.
                RequestExecutor.logger.error(error.message);
                throw new CustomHttpError("ERROR: request failed.");
            });
    }
}
