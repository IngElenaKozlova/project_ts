import validator from 'validator';

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
    number : [VALIDATION.NUMBER], //! NaN   1000 - NaN = NaN
    boolean: [VALIDATION.BOOLEAN]
}

export const isHasErrorCheckData = (data: any, rool: string[], {min} : configValidationI = {}): boolean => {
    const isError = rool.some((elem) => {
        switch (elem) {
            case VALIDATION.EMPTY : return data?.trim() === '';
            case VALIDATION.STRING : return typeof data !== 'string';   
            case VALIDATION.LENGTH_MIN : return data?.length < min;  
            case VALIDATION.ISEMAIL : return !validator.isEmail(data);
            case VALIDATION.ISPASSWORD : return !validator.isStrongPassword(data, {
                minLength: min,         // Минимальная длина пароля
                minLowercase: 1,      // Минимум 1 строчная буква
                minUppercase: 1,      // Минимум 0 заглавных букв
                minNumbers: 1,        // Минимум 0 цифр
                minSymbols: 1,        // Минимум 0 символов
                returnScore: false,   // Возвращать булевый результат, а не оценку
              });
            case VALIDATION.MIN : return data <= 0;
            case VALIDATION.NUMBER : return typeof data !== 'number';
            case VALIDATION.BOOLEAN : return typeof data !== 'boolean'
        }
    })

    return isError;
}


export const isAllValidation = (data : any, keys : any) : {ok : boolean, text ? : string, status ? : number} => { //example name : Alex
    // data : {shopName, email, password}, 
    // keys : {
        //shopName: { rools: ROOLS.text }, 
        //email: { rools: ROOLS.email}, 
        //password: { rools : ROOLS.password}}
    for (const key in keys) { //key = name  
        const value = keys[key]; //keys[key] = name : {rools : ROOLS.text}  | 
        const isErr = isHasErrorCheckData(data[key], value.rools, value?.data); //data[key] = name ---> Alex   ///  'name', 
        if (isErr) return {text : `error is in this key ${key} `, ok : true, status : 420}
    }
    return {ok : false}
}

