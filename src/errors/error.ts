const ERRORS = {
    409 : "Email already exist",
    404 : "Email not found",
    403 : "No access to the shop"
}

export const responseError = (statusOrErrorText : string | number) : {text : string, status : number} => {
    if(typeof statusOrErrorText === 'string') return {text : statusOrErrorText, status : 420}
    return { text : ERRORS[statusOrErrorText] || 'no text', status : +statusOrErrorText }
}