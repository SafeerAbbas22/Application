import ConfigData from "../resources/config.json";
import {PutRequestPddlDomainProblemModeler} from "../http_entities/p3_pddl_domain_problem_modeler/PutRequestPddlDomainProblemModeler";
import {PutResponsePddlDomainProblemModeler} from "../http_entities/p3_pddl_domain_problem_modeler/PutResponsePddlDomainProblemModeler";
import {PutRequestPddlDomainValidator} from "../http_entities/p3_pddl_domain_problem_validator/PutRequestPddlDomainValidator";
import {PutResponsePddlDomainValidator} from "../http_entities/p3_pddl_domain_problem_validator/PutResponsePddlDomainValidator";
import {PutRequestPddlProblemValidator} from "../http_entities/p3_pddl_domain_problem_validator/PutRequestPddlProblemValidator";
import {PutResponsePddlProblemValidator} from "../http_entities/p3_pddl_domain_problem_validator/PutResponsePddlProblemValidator";
import {PutResponsePddlPlanSolver} from "../http_entities/p3_pddl_plan_solver/PutResponsePddlPlanSolver";
import {PutRequestPddlPlanSolver} from "../http_entities/p3_pddl_plan_solver/PutRequestPddlPlanSolver";
import {PutRequestPddlPlanValidator} from "../http_entities/p3_pddl_plan_validator/PutRequestPddlPlanValidator";
import {PutResponsePddlPlanValidator} from "../http_entities/p3_pddl_plan_validator/PutResponsePddlPlanValidator";
import {Base64Processor} from "../tools/Base64Processor";
import {RequestFactory} from "../tools/RequestFactory";
import {RequestExecutor} from "../tools/RequestExecutor";
import {ResponseParser} from "../tools/ResponseParser";
import {getLogger} from "../logger/LogConfig";
import {PutRequestHddlPlanSolver} from "../http_entities/p3_hddl_plan_solver/PutRequestHddlPlanSolver";
import {PutResponseHddlPlanSolver} from "../http_entities/p3_hddl_plan_solver/PutResponseHddlPlanSolver";

const logger = getLogger("model.HttpController");

export abstract class HttpController {

    public static async putPddlDomainProblemModeler(request: PutRequestPddlDomainProblemModeler): Promise<PutResponsePddlDomainProblemModeler> {
        logger.trace("Creating PUT request options.");
        const addressURL: string = ConfigData.API_GATEWAY.ADDRESS + ConfigData.ROUTE.PDDL_DOMAIN_PROBLEM_MODELER;
        const requestOptions: RequestInit = await RequestFactory.createPutRequestPddlDomainProblemModeler(request);

        logger.trace("Initialising PUT request to: " + addressURL);
        const response: Response = await RequestExecutor.init(addressURL, requestOptions);

        logger.trace("Processing PUT response.");
        const responseJson: PutResponsePddlDomainProblemModeler = await ResponseParser.init(response) as PutResponsePddlDomainProblemModeler;

        logger.trace("Decoding PUT response.");
        responseJson.domain = Base64Processor.decode(responseJson.domain);
        responseJson.problem = Base64Processor.decode(responseJson.problem);

        logger.trace("Finished PUT response.");
        return responseJson;
    }

    public static async putPddlDomainValidator(request: PutRequestPddlDomainValidator): Promise<PutResponsePddlDomainValidator> {
        logger.trace("Creating PUT request options.");
        const addressURL: string = ConfigData.API_GATEWAY.ADDRESS + ConfigData.ROUTE.PDDL_DOMAIN_VALIDATOR;
        const requestOptions: RequestInit = await RequestFactory.createPutRequestPddlDomainValidator(request);

        logger.trace("Initialising PUT request to: " + addressURL);
        const response: Response = await RequestExecutor.init(addressURL, requestOptions);

        logger.trace("Processing PUT response.");
        const responseJson: PutResponsePddlDomainValidator = await ResponseParser.init(response) as PutResponsePddlDomainValidator;

        logger.trace("Decoding PUT response.");
        responseJson.domainValidation = Base64Processor.decode(responseJson.domainValidation);

        logger.trace("Finished PUT response.");
        return responseJson;
    }

    public static async putPddlProblemValidator(request: PutRequestPddlProblemValidator): Promise<PutResponsePddlProblemValidator> {
        logger.trace("Creating PUT request options.");
        const addressURL: string = ConfigData.API_GATEWAY.ADDRESS + ConfigData.ROUTE.PDDL_PROBLEM_VALIDATOR;
        const requestOptions: RequestInit = await RequestFactory.createPutRequestPddlProblemValidator(request);

        logger.trace("Initialising PUT request to: " + addressURL);
        const response: Response = await RequestExecutor.init(addressURL, requestOptions);

        logger.trace("Processing PUT response.");
        const responseJson: PutResponsePddlProblemValidator = await ResponseParser.init(response) as PutResponsePddlProblemValidator;

        logger.trace("Decoding PUT response.");
        responseJson.problemValidation = Base64Processor.decode(responseJson.problemValidation);

        logger.trace("Finished PUT response.");
        return responseJson;
    }

    public static async putPddlPlanSolver(request: PutRequestPddlPlanSolver): Promise<PutResponsePddlPlanSolver> {
        logger.trace("Creating PUT request options.");
        const addressURL: string = ConfigData.API_GATEWAY.ADDRESS + ConfigData.ROUTE.PDDL_PLAN_SOLVER;
        const requestOptions: RequestInit = await RequestFactory.createPutRequestPddlPlanSolver(request);

        logger.trace("Initialising PUT request to: " + addressURL);
        const response: Response = await RequestExecutor.init(addressURL, requestOptions);

        logger.trace("Processing PUT response.");
        const responseJson: PutResponsePddlPlanSolver = await ResponseParser.init(response) as PutResponsePddlPlanSolver;

        logger.trace("Decoding PUT response.");
        responseJson.plan = Base64Processor.decode(responseJson.plan);

        logger.trace("Finished PUT response.");
        return responseJson;
    }

    public static async putPddlPlanValidator(request: PutRequestPddlPlanValidator): Promise<PutResponsePddlPlanValidator> {
        logger.trace("Creating PUT request options.");
        const addressURL: string = ConfigData.API_GATEWAY.ADDRESS + ConfigData.ROUTE.PDDL_PLAN_VALIDATOR;
        const requestOptions: RequestInit = await RequestFactory.createPutRequestPddlPlanValidator(request);

        logger.trace("Initialising PUT request to: " + addressURL);
        const response: Response = await RequestExecutor.init(addressURL, requestOptions);

        logger.trace("Processing PUT response.");
        const responseJson: PutResponsePddlPlanValidator = await ResponseParser.init(response) as PutResponsePddlPlanValidator;

        logger.trace("Decoding PUT response.");
        responseJson.planValidation = Base64Processor.decode(responseJson.planValidation);

        logger.trace("Finished PUT response.");
        return responseJson;
    }

    public static async putHddlPlanSolver(request: PutRequestHddlPlanSolver): Promise<PutResponseHddlPlanSolver> {
        logger.trace("Creating PUT request options.");
        const addressURL: string = ConfigData.API_GATEWAY.ADDRESS + ConfigData.ROUTE.HDDL_PLAN_SOLVER;
        const requestOptions: RequestInit = await RequestFactory.createPutRequestHddlPlanSolver(request);

        logger.trace("Initialising PUT request to: " + addressURL);
        const response: Response = await RequestExecutor.init(addressURL, requestOptions);

        logger.trace("Processing PUT response.");
        const responseJson: PutResponseHddlPlanSolver = await ResponseParser.init(response) as PutResponseHddlPlanSolver;

        logger.trace("Decoding PUT response.");
        responseJson.plan = Base64Processor.decode(responseJson.plan);

        logger.trace("Finished PUT response.");
        return responseJson;
    }

    // TODO: delete
    // public static async testGetRequest(): Promise<PutResponsePddlDomainValidator> {
    //     logger.info("Initialising GET request.");
    //     logger.info(ConfigData.API_GATEWAY.ADDRESS + "/api/test2");
    //     const response: Response = await fetch(ConfigData.API_GATEWAY.ADDRESS + "/api/test2")
    //         .catch((error: Error) => {  // Failure to complete request.
    //             logger.warn(error.message);
    //             throw new CustomHttpError("ERROR: request failed.");
    //         });
    //
    //     const responseString: string = await response.text();
    //
    //     if (!response.ok) { // Error response received.
    //         const errorJson: ErrorEntity = JSON.parse(responseString);
    //         if (errorJson.errorMessage === undefined) {
    //             errorJson.errorMessage = "ERROR: request failed.";
    //         }
    //
    //         throw new CustomHttpError(errorJson.errorMessage);
    //     }
    //
    //     return JSON.parse(responseString);
    // }

    // TODO: delete
    // public static async testPutRequest(request: PutRequestPddlDomainValidator): Promise<PutResponsePddlDomainValidator> {
    //     const requestOptions: RequestInit = {
    //         method: "PUT",
    //         // mode: "cors",
    //         headers: {"Content-Type": "application/json"},
    //         // body: JSON.stringify({title: "React PUT Request Example"}),
    //         body: JSON.stringify(request),
    //     };
    //
    //     logger.info("Initialising PUT request.");
    //     logger.info(ConfigData.API_GATEWAY.ADDRESS + "/api/test1");
    //     const response: Response = await fetch(ConfigData.API_GATEWAY.ADDRESS + "/api/test1", requestOptions)
    //         // const response: Response = await fetch("http://localhost:49236/api/test1", requestOptions)
    //         // const response: Response = await fetch(ConfigData.API_GATEWAY.ADDRESS + "/api/test1", {
    //         //     method: "PUT",
    //         //     headers: {"Content-Type": "application/json"},
    //         //     body: JSON.stringify(request),
    //         // })
    //         .catch((error: Error) => {  // Failure to complete request.
    //             logger.warn(error.message);
    //             throw new CustomHttpError("ERROR: request failed.");
    //         });
    //
    //     // return HttpController.processResponse(response);
    //
    //     const responseString: string = await response.text();
    //
    //     if (!response.ok) { // Error response received.
    //         const errorJson: ErrorEntity = JSON.parse(responseString);
    //         if (errorJson.errorMessage === undefined) {
    //             errorJson.errorMessage = "ERROR: request failed: " + response.status;
    //         }
    //
    //         throw new CustomHttpError(errorJson.errorMessage);
    //     }
    //
    //     // return JSON.parse(responseString);
    //     return JSON.parse(responseString);
    // }
}
