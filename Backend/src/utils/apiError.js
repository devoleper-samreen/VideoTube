export class ApiError extends Error {
    constructor(
        stausCode,
        message,
        errors = [],
        stack = ""

    ) {
        super(message);
        this.stausCode = stausCode;
        this.message = message;
        this.errors = errors;
        this.success = false;


        if (stack) {
            this.stack = stack;

        } else {
            Error.captureStackTrace(this, this.constructor);
        }

    }
}