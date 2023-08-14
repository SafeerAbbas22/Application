export class ExampleFileReader {
    // Example PDDL -----------------------------------------------------------------------------
    public readModelerExample(): Promise<string> {
        const file: RequestInfo = require("../example_files/example_modeler.py");
        return this._read(file);
    }

    public readDomainExample(): Promise<string> {
        const file: RequestInfo = require("../example_files/example_domain.pddl");
        return this._read(file);
    }

    public readProblemExample(): Promise<string> {
        const file: RequestInfo = require("../example_files/example_problem.pddl");
        return this._read(file);
    }

    public readPlanExample(): Promise<string> {
        const file: RequestInfo = require("../example_files/example_plan");
        return this._read(file);
    }

    public readPlanValidationExample(): Promise<string> {
        const file: RequestInfo = require("../example_files/example_plan_validation.txt");
        return this._read(file);
    }

    // Tower of Hanoi PDDL -----------------------------------------------------------------------------
    public readModelerHanoi(): Promise<string> {
        const file: RequestInfo = require("../example_files/hanoi_modeler.py");
        return this._read(file);
    }

    public readDomainHanoi(): Promise<string> {
        const file: RequestInfo = require("../example_files/hanoi_domain.pddl");
        return this._read(file);
    }

    public readProblemHanoi(): Promise<string> {
        const file: RequestInfo = require("../example_files/hanoi_problem.pddl");
        return this._read(file);
    }

    public readPlanHanoi(): Promise<string> {
        const file: RequestInfo = require("../example_files/hanoi_plan");
        return this._read(file);
    }

    public readPlanValidationHanoi(): Promise<string> {
        const file: RequestInfo = require("../example_files/hanoi_plan_validation.txt");
        return this._read(file);
    }

    // Robot HDDL -----------------------------------------------------------------------------
    public readDomainRobot(): Promise<string> {
        const file: RequestInfo = require("../example_files/robot_domain.hddl");
        return this._read(file);
    }

    public readProblemRobot(): Promise<string> {
        const file: RequestInfo = require("../example_files/robot_problem.hddl");
        return this._read(file);
    }

    public readPlanRobot(): Promise<string> {
        const file: RequestInfo = require("../example_files/robot_plan");
        return this._read(file);
    }

    // TODO: delete
    // Passing file path as argument doesn't work for some reason. @SP
    // public readFile(path: string): Promise<string> {
    //     const file: RequestInfo = require(path);
    //     const response: Promise<Response> = fetch(file);
    //
    //     return response.then((response: Response) => {
    //         return response.text();
    //     });
    // }

    private _read(file: RequestInfo): Promise<string> {
        const response: Promise<Response> = fetch(file);

        return response.then((response: Response) => {
            return response.text();
        });
    }
}
