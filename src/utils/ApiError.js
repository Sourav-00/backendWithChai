class ApiError extends Error{
    constructor(
        statusCode,
        message = "somthing went wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.success = false
        this.errors = errors
    }
}


export {ApiError}