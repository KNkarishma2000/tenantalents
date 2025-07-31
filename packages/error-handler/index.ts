/* eslint-disable @typescript-eslint/no-explicit-any */
export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;
    public readonly details?: any;


    constructor(message:string, statusCode:number, isOperational=true, details?: any) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.details = details;

        // Set the prototype explicitly to maintain the correct prototype chain
        Object.setPrototypeOf(this, new.target.prototype);

        // Capture the stack trace for debugging
        Error.captureStackTrace(this);
    }
}

//not found error
// This error is thrown when a requested resource is not found.
export class NotFoundError extends AppError {
    constructor(message='Resource not found', details?: any) {
        super(message, 404, details);
        // this.name = 'NotFoundError';
    }
}

//validation error
// This error is thrown when validation fails.
export class ValidationError extends AppError {
    constructor(message='Invalid Request Data, Validation failed', details?: any) {
        super(message, 400, true, details);
        // this.name = 'ValidationError';
    }
}

//Authentication Errors
// This error is thrown when authentication fails.
export class AuthenticationError extends AppError {
    constructor(message='Authentication failed, Please Try Again', details?: any) {
        super(message, 401, true, details);
        // this.name = 'AuthenticationError';
    }
}

//Forbidden Error
// This error is thrown when a user does not have permission to access a resource.
export class ForbiddenError extends AppError {
    constructor(message='Forbidden, You do not have permission to access this resource') {
        super(message, 403);
        // this.name = 'ForbiddenError';
    }
}

//Database Error
// This error is thrown when there is a database-related issue.
export class DatabaseError extends AppError {
    constructor(message='Database Error, Please Try Again Later', details?: any) {
        super(message, 500,  true , details);
        // this.name = 'DatabaseError';
    }
}

//Rate Limit Error
// This error is thrown when a user exceeds the allowed number of requests.
export class RateLimitError extends AppError {
    constructor(message='Too many requests, please try again later.') {
        super(message, 429);
        // this.name = 'RateLimitError';
    }
}