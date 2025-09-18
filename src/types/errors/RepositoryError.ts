export enum RepositoryErrorKind {
    Conflict,
    UndefinedData,
}

export class RepositoryError {
    public error: RepositoryErrorKind;

    constructor(err: RepositoryErrorKind) {
        this.error = err;
    }
}