import {PutResponsePddlDomainProblemModeler} from "../http_entities/p3_pddl_domain_problem_modeler/PutResponsePddlDomainProblemModeler";
import {PutResponsePddlDomainValidator} from "../http_entities/p3_pddl_domain_problem_validator/PutResponsePddlDomainValidator";
import {PutResponsePddlProblemValidator} from "../http_entities/p3_pddl_domain_problem_validator/PutResponsePddlProblemValidator";
import {PutResponsePddlPlanSolver} from "../http_entities/p3_pddl_plan_solver/PutResponsePddlPlanSolver";
import {PutResponsePddlPlanValidator} from "../http_entities/p3_pddl_plan_validator/PutResponsePddlPlanValidator";
import {PutResponseHddlPlanSolver} from "../http_entities/p3_hddl_plan_solver/PutResponseHddlPlanSolver";
import {ErrorEntity} from "../http_entities/error/ErrorEntity";
import {CustomHttpError} from "../custom_errors/CustomHttpError";
import {getLogger} from "../logger/LogConfig";

export abstract class ResponseParser {
    static logger = getLogger("model.ResponseParser");

    public static async init(response: Response): Promise<PutResponsePddlDomainProblemModeler | PutResponsePddlDomainValidator | PutResponsePddlProblemValidator | PutResponsePddlPlanSolver | PutResponsePddlPlanValidator | PutResponseHddlPlanSolver> {
        ResponseParser.logger.trace("Getting response text.");
        const responseString: string = await response.text();

        ResponseParser.logger.trace("Checking response HTTP code.");
        if (!response.ok) { // Error response received.
            ResponseParser.logger.trace("Response HTTP code: " + response.status);
            const errorJson: ErrorEntity = JSON.parse(responseString);
            if (errorJson.errorMessage === undefined) {
                errorJson.errorMessage = "ERROR: request failed.";
            }

            throw new CustomHttpError(errorJson.errorMessage);
        }

        ResponseParser.logger.trace("Response parsing done.");
        return JSON.parse(responseString);
    }
}
