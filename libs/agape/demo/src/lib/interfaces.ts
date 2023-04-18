export interface TestSuiteParams {
    focus?: boolean;
    skip?: boolean;
    interactive?: boolean;
}

export interface TestCaseParams {
    focus?: boolean;
    skip?: boolean;
    interactive?: boolean;
    instructions?: string;
}
