export enum TestType {
    question = 'question',
    code = 'code'
}

export interface ITest {
    _id: string;
    name: string;
    question: string;
    solution: string;
    type: TestType,
    tags: string[];
    createdAt: Date;
}