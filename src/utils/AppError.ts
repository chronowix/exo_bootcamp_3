export default class AppError extends Error {
    statusCode: number;
    code: string;

    constructor(message: string, statusCode: 500, code = 'INTERNAL_ERROR') {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
    }
}