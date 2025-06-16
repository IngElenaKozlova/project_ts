const ADMINROOLS = {
    100 : "create client",
    101 : "delete client",
    102 : "edit client",
    103 : "create product",
    104 : "delete product",
    105 : "edit product",
    106 : "create history",
    107 : "delete history",
    108 : "edit history"
}

// export const responseError = (statusOrErrorText : string | number) : {text : string, status : number} => {
//     if(typeof statusOrErrorText === 'string') return {text : statusOrErrorText, status : 420}
//     return { text : ADMINROOLS[statusOrErrorText] || 'no text', status : +statusOrErrorText }
// }