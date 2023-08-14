import React, {MutableRefObject, useRef, useState} from "react";
import {getLogger} from "./logger/LogConfig";
import {appStyles} from "./styles/AppStyles";
import {Button, Spinner, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import {ExampleFileReader} from "./tools/ExampleFileReader";
import {HttpController} from "./controllers/HttpController";
import {CustomHttpError} from "./custom_errors/CustomHttpError";
import {PutResponsePddlDomainProblemModeler} from "./http_entities/p3_pddl_domain_problem_modeler/PutResponsePddlDomainProblemModeler";
import {PutRequestPddlDomainProblemModeler} from "./http_entities/p3_pddl_domain_problem_modeler/PutRequestPddlDomainProblemModeler";
import {PutRequestPddlDomainValidator} from "./http_entities/p3_pddl_domain_problem_validator/PutRequestPddlDomainValidator";
import {PutResponsePddlDomainValidator} from "./http_entities/p3_pddl_domain_problem_validator/PutResponsePddlDomainValidator";
import {PutRequestPddlProblemValidator} from "./http_entities/p3_pddl_domain_problem_validator/PutRequestPddlProblemValidator";
import {PutResponsePddlProblemValidator} from "./http_entities/p3_pddl_domain_problem_validator/PutResponsePddlProblemValidator";
import {PutRequestPddlPlanSolver} from "./http_entities/p3_pddl_plan_solver/PutRequestPddlPlanSolver";
import {PutResponsePddlPlanSolver} from "./http_entities/p3_pddl_plan_solver/PutResponsePddlPlanSolver";
import {PutRequestPddlPlanValidator} from "./http_entities/p3_pddl_plan_validator/PutRequestPddlPlanValidator";
import {PutResponsePddlPlanValidator} from "./http_entities/p3_pddl_plan_validator/PutResponsePddlPlanValidator";
import {PutRequestHddlPlanSolver} from "./http_entities/p3_hddl_plan_solver/PutRequestHddlPlanSolver";
import {PutResponseHddlPlanSolver} from "./http_entities/p3_hddl_plan_solver/PutResponseHddlPlanSolver";

const logger = getLogger("model.App");

function App() {
    logger.trace("Initializing UI values.");
    const [valueModeler, setValueModeler] = useState<string>("");
    const [valueDomain, setValueDomain] = useState<string>("");
    const [valueProblem, setValueProblem] = useState<string>("");
    const [valuePlan, setValuePlan] = useState<string>("");
    const [valuePlanValidation, setValuePlanValidation] = useState<string>("");
    const [isCheckedPddlDomainProblemGenerate, setCheckedPddlDomainProblemGenerate] = useState<boolean>(false);
    const [isCheckedPddlDomainValidate, setCheckedPddlDomainValidate] = useState<boolean>(false);
    const [isCheckedPddlProblemValidate, setCheckedPddlProblemValidate] = useState<boolean>(false);
    const [isCheckedPddlPlanGenerate, setCheckedPddlPlanGenerate] = useState<boolean>(false);
    const [isCheckedPddlPlanValidate, setCheckedPddlPlanValidate] = useState<boolean>(false);
    const [isCheckedHddlPlanGenerate, setCheckedHddlPlanGenerate] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);

    logger.trace("Initializing textareas references.");
    const textareaModeler: MutableRefObject<any> = useRef<HTMLTextAreaElement | null>(null);
    const textareaDomain: MutableRefObject<any> = useRef<HTMLTextAreaElement | null>(null);
    const textareaProblem: MutableRefObject<any> = useRef<HTMLTextAreaElement | null>(null);
    const textareaPlan: MutableRefObject<any> = useRef<HTMLTextAreaElement | null>(null);
    const textareaPlanValidation: MutableRefObject<any> = useRef<HTMLTextAreaElement | null>(null);

    logger.trace("Preparing buttons onClick actions.");
    const showFilesExample = () => {
        const fileReader: ExampleFileReader = new ExampleFileReader();
        fileReader.readModelerExample().then((text: string) => setValueModeler(text));
        fileReader.readDomainExample().then((text: string) => setValueDomain(text));
        fileReader.readProblemExample().then((text: string) => setValueProblem(text));
        fileReader.readPlanExample().then((text: string) => setValuePlan(text));
        fileReader.readPlanValidationExample().then((text: string) => setValuePlanValidation(text));
    };
    const showFilesHanoi = () => {
        const fileReader: ExampleFileReader = new ExampleFileReader();
        fileReader.readModelerHanoi().then((text: string) => setValueModeler(text));
        fileReader.readDomainHanoi().then((text: string) => setValueDomain(text));
        fileReader.readProblemHanoi().then((text: string) => setValueProblem(text));
        fileReader.readPlanHanoi().then((text: string) => setValuePlan(text));
        fileReader.readPlanValidationHanoi().then((text: string) => setValuePlanValidation(text));
    };
    const showFilesRobot = () => {
        const fileReader: ExampleFileReader = new ExampleFileReader();
        setValueModeler("");
        fileReader.readDomainRobot().then((text: string) => setValueDomain(text));
        fileReader.readProblemRobot().then((text: string) => setValueProblem(text));
        fileReader.readPlanRobot().then((text: string) => setValuePlan(text));
        setValuePlanValidation("");
    };
    const clear = () => {
        setValueModeler("");
        setValueDomain("");
        setValueProblem("");
        setValuePlan("");
        setValuePlanValidation("");
    };

    logger.trace("Preparing textareas onChange actions.");
    const textareaModelerChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValueModeler(event.target.value);
    };
    const textareaDomainChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValueDomain(event.target.value);
    };
    const textareaProblemChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValueProblem(event.target.value);
    };
    const textareaPlanChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValuePlan(event.target.value);
    };
    const textareaPlanValidationChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValuePlanValidation(event.target.value);
    };

    logger.trace("Preparing checkboxes onChange actions.");
    const checkPddlDomainProblemGenerate = () => {
        setCheckedPddlDomainProblemGenerate(true);
        setCheckedPddlDomainValidate(false);
        setCheckedPddlProblemValidate(false);
        setCheckedPddlPlanGenerate(false);
        setCheckedPddlPlanValidate(false);
        setCheckedHddlPlanGenerate(false);
    };
    const checkPddlDomainValidate = () => {
        setCheckedPddlDomainProblemGenerate(false);
        setCheckedPddlDomainValidate(true);
        setCheckedPddlProblemValidate(false);
        setCheckedPddlPlanGenerate(false);
        setCheckedPddlPlanValidate(false);
        setCheckedHddlPlanGenerate(false);
    };
    const checkPddlProblemValidate = () => {
        setCheckedPddlDomainProblemGenerate(false);
        setCheckedPddlDomainValidate(false);
        setCheckedPddlProblemValidate(true);
        setCheckedPddlPlanGenerate(false);
        setCheckedPddlPlanValidate(false);
        setCheckedHddlPlanGenerate(false);
    };
    const checkPddlPlanGenerate = () => {
        setCheckedPddlDomainProblemGenerate(false);
        setCheckedPddlDomainValidate(false);
        setCheckedPddlProblemValidate(false);
        setCheckedPddlPlanGenerate(true);
        setCheckedPddlPlanValidate(false);
        setCheckedHddlPlanGenerate(false);
    };
    const checkPddlPlanValidate = () => {
        setCheckedPddlDomainProblemGenerate(false);
        setCheckedPddlDomainValidate(false);
        setCheckedPddlProblemValidate(false);
        setCheckedPddlPlanGenerate(false);
        setCheckedPddlPlanValidate(true);
        setCheckedHddlPlanGenerate(false);
    };
    const checkHddlPlanGenerate = () => {
        setCheckedPddlDomainProblemGenerate(false);
        setCheckedPddlDomainValidate(false);
        setCheckedPddlProblemValidate(false);
        setCheckedPddlPlanGenerate(false);
        setCheckedPddlPlanValidate(false);
        setCheckedHddlPlanGenerate(true);
    };

    logger.trace("Initialising a planning action.");
    const initPlanning = async () => {
        if (isCheckedPddlDomainProblemGenerate) {
            if (valueModeler === "") {
                alert("Modeler script field must have Python input.");
                return;
            }
            await executePddlDomainProblemModeler(valueModeler);
            return;
        }

        if (isCheckedPddlDomainValidate) {
            if (valueDomain === "") {
                alert("Domain field must have PDDL input.");
                return;
            }
            await executePddlDomainValidator();
            return;
        }

        if (isCheckedPddlProblemValidate) {
            if (valueProblem === "") {
                alert("Problem field must have PDDL input.");
                return;
            }
            await executePddlProblemValidator();
            return;
        }

        if (isCheckedPddlPlanGenerate) {
            if (valueDomain === "" || valueProblem === "") {
                alert("Domain and problem fields must have PDDL input.");
                return;
            }
            await executePddlPlanSolver();
            return;
        }

        if (isCheckedPddlPlanValidate) {
            if (valueDomain === "" || valueProblem === "" || valuePlan === "") {
                alert("Domain, problem and plan fields must have PDDL input.");
                return;
            }
            await executePddlPlanValidator();
            return;
        }

        if (isCheckedHddlPlanGenerate) {
            if (valueDomain === "" || valueProblem === "") {
                alert("Domain and problem fields must have HDDL input.");
                return;
            }
            await executeHddlPlanSolver();
            return;
        }

        alert("At least one 'generate'/'validate' option must be selected.");
    };

    logger.trace("Executing request to p3-pddl-domain-problem-modeler.");
    const executePddlDomainProblemModeler = async (valueModeler: string) => {
        try {
            setLoading(true);
            logger.info("p3-pddl-domain-problem-modeler: PUT request started.");

            // // TODO: delete GET test
            // const responseJson: Promise<PutResponsePddlDomainValidator> = HttpController.testGetRequest();
            // responseJson.then((json: PutResponsePddlDomainValidator) => {
            //     setValueDomain(json.domainValidation);
            //     setValueProblem(json.problemValidation);
            // }).catch((error: CustomHttpError) => {
            //     logger.error(error.message);
            //     alert(error.message);
            // });
            //
            // // TODO: delete PUT test
            // const request: PutRequestPddlDomainValidator = {domain: valueDomain, problem: valueProblem};
            // const responseJson: Promise<PutResponsePddlDomainValidator> = HttpController.testPutRequest(request);
            // responseJson.then((json: PutResponsePddlDomainValidator) => {
            //     setValueDomain(json.domainValidation);
            //     setValueProblem(json.problemValidation);
            // }).catch((error: CustomHttpError) => {
            //     logger.error(error.message);
            //     alert(error.message);
            // });

            logger.trace("Getting modeler script data.");
            const request: PutRequestPddlDomainProblemModeler = {modelerScript: valueModeler};

            logger.trace("Initialising PUT request controller.");
            const responseJson: Promise<PutResponsePddlDomainProblemModeler> = HttpController.putPddlDomainProblemModeler(request);

            logger.trace("Displaying PUT response data.");
            responseJson.then((json: PutResponsePddlDomainProblemModeler) => {
                setValueDomain(json.domain);
                setValueProblem(json.problem);
            }).catch((error: CustomHttpError) => {
                logger.error(error.message);
                alert(error.message);
            });

            logger.info("p3-pddl-domain-problem-modeler: PUT request done.");
            setLoading(false);
        } catch (error) {
            if (error instanceof Error) {
                logger.error(error.message);
            }

            setLoading(false);
            alert("ERROR: execution failed.");
        }
    };

    logger.trace("Executing request to p3-pddl-domain-problem-validator.");
    const executePddlDomainValidator = async () => {
        try {
            setLoading(true);
            logger.info("p3-pddl-domain-problem-validator: PUT request started.");

            logger.trace("Getting domain data.");
            const request: PutRequestPddlDomainValidator = {domain: valueDomain};

            logger.trace("Initialising PUT request controller.");
            const responseJson: Promise<PutResponsePddlDomainValidator> = HttpController.putPddlDomainValidator(request);

            logger.trace("Displaying PUT response data.");
            responseJson.then((json: PutResponsePddlDomainValidator) => {
                setValueDomain(json.domainValidation);
            }).catch((error: CustomHttpError) => {
                logger.error(error.message);
                alert(error.message);
            });

            logger.info("p3-pddl-domain-problem-validator: PUT request done.");
            setLoading(false);
        } catch (error) {
            if (error instanceof Error) {
                logger.error(error.message);
            }

            setLoading(false);
            alert("ERROR: execution failed.");
        }
    };

    logger.trace("Executing request to p3-pddl-domain-problem-validator.");
    const executePddlProblemValidator = async () => {
        try {
            setLoading(true);
            logger.info("p3-pddl-domain-problem-validator: PUT request started.");

            logger.trace("Getting problem data.");
            const request: PutRequestPddlProblemValidator = {problem: valueProblem};

            logger.trace("Initialising PUT request controller.");
            const responseJson: Promise<PutResponsePddlProblemValidator> = HttpController.putPddlProblemValidator(request);

            logger.trace("Displaying PUT response data.");
            responseJson.then((json: PutResponsePddlProblemValidator) => {
                setValueProblem(json.problemValidation);
            }).catch((error: CustomHttpError) => {
                logger.error(error.message);
                alert(error.message);
            });

            logger.info("p3-pddl-domain-problem-validator: PUT request done.");
            setLoading(false);
        } catch (error) {
            if (error instanceof Error) {
                logger.error(error.message);
            }

            setLoading(false);
            alert("ERROR: execution failed.");
        }
    };

    logger.trace("Executing request to p3-pddl-plan-solver.");
    const executePddlPlanSolver = async () => {
        try {
            setLoading(true);
            logger.info("p3-pddl-plan-solver: PUT request started.");

            logger.trace("Getting domain and problem data.");
            const request: PutRequestPddlPlanSolver = {domain: valueDomain, problem: valueProblem};

            logger.trace("Initialising PUT request controller.");
            const responseJson: Promise<PutResponsePddlPlanSolver> = HttpController.putPddlPlanSolver(request);

            logger.trace("Displaying PUT response data.");
            responseJson.then((json: PutResponsePddlPlanSolver) => {
                setValuePlan(json.plan);
            }).catch((error: CustomHttpError) => {
                logger.error(error.message);
                alert(error.message);
            });

            logger.info("p3-pddl-plan-solver: PUT request done.");
            setLoading(false);
        } catch (error) {
            if (error instanceof Error) {
                logger.error(error.message);
            }

            setLoading(false);
            alert("ERROR: execution failed.");
        }
    };

    logger.trace("Executing request to p3-pddl-plan-validator.");
    const executePddlPlanValidator = async () => {
        try {
            setLoading(true);
            logger.info("p3-pddl-plan-validator: PUT request started.");

            logger.trace("Getting domain, problem and plan data.");
            const request: PutRequestPddlPlanValidator = {domain: valueDomain, problem: valueProblem, plan: valuePlan};

            logger.trace("Initialising PUT request controller.");
            const responseJson: Promise<PutResponsePddlPlanValidator> = HttpController.putPddlPlanValidator(request);

            logger.trace("Displaying PUT response data.");
            responseJson.then((json: PutResponsePddlPlanValidator) => {
                setValuePlanValidation(json.planValidation);
            }).catch((error: CustomHttpError) => {
                logger.error(error.message);
                alert(error.message);
            });

            logger.info("p3-pddl-plan-validator: PUT request done.");
            setLoading(false);
        } catch (error) {
            if (error instanceof Error) {
                logger.error(error.message);
            }

            setLoading(false);
            alert("ERROR: execution failed.");
        }
    };

    logger.trace("Executing request to p3-hddl-plan-solver.");
    const executeHddlPlanSolver = async () => {
        try {
            setLoading(true);
            logger.info("p3-hddl-plan-solver: PUT request started.");

            logger.trace("Getting domain and problem data.");
            const request: PutRequestHddlPlanSolver = {domain: valueDomain, problem: valueProblem};

            logger.trace("Initialising PUT request controller.");
            const responseJson: Promise<PutResponseHddlPlanSolver> = HttpController.putHddlPlanSolver(request);

            logger.trace("Displaying PUT response data.");
            responseJson.then((json: PutResponseHddlPlanSolver) => {
                setValuePlan(json.plan);
            }).catch((error: CustomHttpError) => {
                logger.error(error.message);
                alert(error.message);
            });

            logger.info("p3-hddl-plan-solver: PUT request done.");
            setLoading(false);
        } catch (error) {
            if (error instanceof Error) {
                logger.error(error.message);
            }

            setLoading(false);
            alert("ERROR: execution failed.");
        }
    };

    return (
        <div className={"App"} style={appStyles.containerMain}>
            <div style={appStyles.separator}/>

            <h3>Project 3: Microservice Architecture</h3>
            <div style={appStyles.separator}/>

            <div style={appStyles.quadrupleGrid}>
                <Button variant="outline-primary"
                        size="sm"
                        onClick={showFilesExample}>
                    Demo: example PDDL
                </Button>
                <Button variant="outline-primary"
                        size="sm"
                        onClick={showFilesHanoi}>
                    Demo: Tower of Hanoi PDDL
                </Button>
                <Button variant="outline-primary"
                        size="sm"
                        onClick={showFilesRobot}>
                    Demo: Robot HDDL
                </Button>
                <Button variant="outline-primary"
                        size="sm"
                        onClick={clear}>
                    Clear
                </Button>
            </div>
            <div style={appStyles.separator}/>

            <>
                <label>Modeler Python script for PDDL domain/problem generation</label>
                <textarea ref={textareaModeler}
                          style={appStyles.textareaLarge}
                          value={valueModeler}
                          onChange={textareaModelerChange}/>
            </>
            <div style={appStyles.separator}/>

            <div style={appStyles.doubleGrid}>
                <div style={appStyles.centerStyle}>
                    <label>Domain</label>
                    <textarea ref={textareaDomain}
                              style={appStyles.textareaSmall}
                              value={valueDomain}
                              onChange={textareaDomainChange}/>
                </div>

                <div style={appStyles.centerStyle}>
                    <label>Problem</label>
                    <textarea ref={textareaProblem}
                              style={appStyles.textareaSmall}
                              value={valueProblem}
                              onChange={textareaProblemChange}/>
                </div>
            </div>
            <div style={appStyles.separator}/>

            <div style={appStyles.doubleGrid}>
                <div style={appStyles.centerStyle}>
                    <label>Plan</label>
                    <textarea ref={textareaPlan}
                              style={appStyles.textareaSmall}
                              value={valuePlan}
                              onChange={textareaPlanChange}/>
                </div>

                <div style={appStyles.centerStyle}>
                    <label>Plan validation</label>
                    <textarea ref={textareaPlanValidation}
                              style={appStyles.textareaSmall}
                              value={valuePlanValidation}
                              onChange={textareaPlanValidationChange}/>
                </div>
            </div>
            <div style={appStyles.separator}/>

            <ToggleButtonGroup type="radio" name="option">
                <ToggleButton id="radioButtonGeneratePddlDomainProblem"
                              type="checkbox"
                              variant="outline-primary"
                              checked={isCheckedPddlDomainProblemGenerate}
                              value={0}
                              onChange={checkPddlDomainProblemGenerate}>
                    Generate PDDL domain/problem
                </ToggleButton>
                <ToggleButton id="radioButtonValidatePddlDomain"
                              type="checkbox"
                              variant="outline-primary"
                              checked={isCheckedPddlDomainValidate}
                              value={1}
                              onChange={checkPddlDomainValidate}>
                    Validate PDDL domain
                </ToggleButton>
                <ToggleButton id="radioButtonValidatePddlProblem"
                              type="checkbox"
                              variant="outline-primary"
                              checked={isCheckedPddlProblemValidate}
                              value={2}
                              onChange={checkPddlProblemValidate}>
                    Validate PDDL problem
                </ToggleButton>
                <ToggleButton id="radioButtonGeneratePddlPlan"
                              type="checkbox"
                              variant="outline-primary"
                              checked={isCheckedPddlPlanGenerate}
                              value={3}
                              onChange={checkPddlPlanGenerate}>
                    Generate PDDL plan
                </ToggleButton>
                <ToggleButton id="radioButtonValidatePddlPlan"
                              type="checkbox"
                              variant="outline-primary"
                              checked={isCheckedPddlPlanValidate}
                              value={4}
                              onChange={checkPddlPlanValidate}>
                    Validate PDDL plan
                </ToggleButton>
                <ToggleButton id="radioButtonGenerateHddlPlan"
                              type="checkbox"
                              variant="outline-primary"
                              checked={isCheckedHddlPlanGenerate}
                              value={5}
                              onChange={checkHddlPlanGenerate}>
                    Generate HDDL plan
                </ToggleButton>
            </ToggleButtonGroup>
            <div style={appStyles.separator}/>

            <Button variant="outline-danger"
                    disabled={isLoading}
                    onClick={!isLoading ? initPlanning : undefined}>
                {isLoading ? "Executing..." : "Execute"}
            </Button>
            <div style={appStyles.separator}/>

            {isLoading ?
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                : <div/>
            }
        </div>
    );
}

export default App;
