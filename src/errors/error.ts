const ERRORS = {
    409 : "Already exist",
    404 : "Not found",
    403 : "No access to the shop",
    500 : "Internal error",
    422 : "Validation error"
}

export const responseError = (statusOrErrorText : string | number) : {text : string, status : number} => {
    if(typeof statusOrErrorText === 'string') return {text : statusOrErrorText, status : 420}
    return { text : ERRORS[statusOrErrorText] || 'no text', status : +statusOrErrorText }
}