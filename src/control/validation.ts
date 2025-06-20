import validator from 'validator'

interface configValidationI {
    min ? : number
    max ? : number
}

const VALIDATION = {
    MIN: 'MIN',
    MAX: 'MAX',
    EMPTY: "EMPTY",
    STRING: "STRING",
    NUMBER: "NUMBER",
    BOOLEAN: "BOOLEAN",
    LENGTH_MIN: "LENGTH_MIN",
    ISEMAIL: "ISEMAIL",
    ISPASSWORD: "ISPASSWORD"
}


export const ROOLS = {
    text: [VALIDATION.EMPTY, VALIDATION.STRING],
    email: [VALIDATION.EMPTY, VALIDATION.STRING, VALIDATION.LENGTH_MIN, VALIDATION.ISEMAIL],
    password: [VALIDATION.EMPTY, VALIDATION.STRING, VALIDATION.ISPASSWORD],
    price : [VALIDATION.NUMBER, VALIDATION.MIN],
    number : [VALIDATION.NUMBER], 
    boolean: [VALIDATION.BOOLEAN]
}

export const isHasErrorCheckData = (data: any, rool: string[], {min} : configValidationI = {}): boolean => {
    const isError = rool.some((elem) => {
        switch (elem) {
            case VALIDATION.EMPTY : return data?.trim() === ''
            case VALIDATION.STRING : return typeof data !== 'string'  
            case VALIDATION.LENGTH_MIN : return data?.length < min 
            case VALIDATION.ISEMAIL : return !validator.isEmail(data);
            case VALIDATION.ISPASSWORD : return !validator.isStrongPassword(data, {
                minLength: min,       // Min password lenght
                minLowercase: 1,      // Мin 1 small letter
                minUppercase: 1,      // Мin 0 big letter
                minNumbers: 1,        // Мin 0 number
                minSymbols: 1,        // Мin 0 symbol
                returnScore: false,   // Return boolean not score
              });
            case VALIDATION.MIN : return data <= 0
            case VALIDATION.NUMBER : return typeof data !== 'number'
            case VALIDATION.BOOLEAN : return typeof data !== 'boolean'
        }
    })

    return isError
}


export const isAllValidation = (data : any, keys : any) : {ok : boolean, text ? : string, status ? : number} => {
    for (const key in keys) {
        const value = keys[key]
        const isErr = isHasErrorCheckData(data[key], value.rools, value?.data)
        if (isErr) return {text : `error is in this key ${key} `, ok : true, status : 420}
    }
    return {ok : false}
}

