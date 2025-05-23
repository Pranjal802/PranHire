class ApiResponse{
    constructor(statusCode = 200, message = "Success"){
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = statusCode < 400;
        this.errors = null;
        this.stack = null;

    }
}

export {ApiResponse}