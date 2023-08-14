import {PutRequestPddlDomainProblemModeler} from "../http_entities/p3_pddl_domain_problem_modeler/PutRequestPddlDomainProblemModeler";
import {PutRequestPddlDomainValidator} from "../http_entities/p3_pddl_domain_problem_validator/PutRequestPddlDomainValidator";
import {PutRequestPddlProblemValidator} from "../http_entities/p3_pddl_domain_problem_validator/PutRequestPddlProblemValidator";
import {PutRequestPddlPlanSolver} from "../http_entities/p3_pddl_plan_solver/PutRequestPddlPlanSolver";
import {PutRequestPddlPlanValidator} from "../http_entities/p3_pddl_plan_validator/PutRequestPddlPlanValidator";
import {PutRequestHddlPlanSolver} from "../http_entities/p3_hddl_plan_solver/PutRequestHddlPlanSolver";
import {Base64Processor} from "./Base64Processor";

export abstract class RequestFactory {
    public static createPutRequestPddlDomainProblemModeler(request: PutRequestPddlDomainProblemModeler): RequestInit {
        request.modelerScript = Base64Processor.encode(request.modelerScript);

        return RequestFactory.createRequestOptions(request);
    }

    public static createPutRequestPddlDomainValidator(request: PutRequestPddlDomainValidator): RequestInit {
        request.domain = Base64Processor.encode(request.domain);

        return RequestFactory.createRequestOptions(request);
    }

    public static createPutRequestPddlProblemValidator(request: PutRequestPddlProblemValidator): RequestInit {
        request.problem = Base64Processor.encode(request.problem);

        return RequestFactory.createRequestOptions(request);
    }

    public static createPutRequestPddlPlanSolver(request: PutRequestPddlPlanSolver): RequestInit {
        request.domain = Base64Processor.encode(request.domain);
        request.problem = Base64Processor.encode(request.problem);

        return RequestFactory.createRequestOptions(request);
    }

    public static createPutRequestPddlPlanValidator(request: PutRequestPddlPlanValidator): RequestInit {
        request.domain = Base64Processor.encode(request.domain);
        request.problem = Base64Processor.encode(request.problem);
        request.plan = Base64Processor.encode(request.plan);

        return RequestFactory.createRequestOptions(request);
    }

    public static createPutRequestHddlPlanSolver(request: PutRequestHddlPlanSolver): RequestInit {
        request.domain = Base64Processor.encode(request.domain);
        request.problem = Base64Processor.encode(request.problem);

        return RequestFactory.createRequestOptions(request);
    }

    private static createRequestOptions(request: PutRequestPddlDomainProblemModeler | PutRequestPddlDomainValidator | PutRequestPddlProblemValidator | PutRequestPddlPlanSolver | PutRequestPddlPlanValidator | PutRequestHddlPlanSolver): RequestInit {
        return {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(request),
        };
    }
}
