export class Chart {
    id: String;
    age: number;
    gender: String;
    identifier: string;
    localization: String;
    result: String;
    userID: String;
}

export class Result{
    identifier: String;
    start_date: String;
    end_date: String;
    results: Results;
}

export class Results{
    question: String;
}