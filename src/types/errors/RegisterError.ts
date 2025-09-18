export enum RegisterErrorKind {
    ArgumentNotFound,
}

export class RegisterError {
    public error: RegisterErrorKind;

    constructor(err: RegisterErrorKind) {
        this.error = err;
    }
}