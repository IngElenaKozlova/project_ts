import { v4 as uuidv4 } from 'uuid';
// const { v4: uuidv4 } = require('uuid')


export const age : number = 10;
export const haha = 'hello'

export default [1,2,3,4,5];


interface todoI {
    text : string
    is : boolean
    _id : string
}

const t : todoI =  {
    "text": "hello",
    "is": false,
    "_id": "5b8f57cd-010c-4184-80d2-f82b405881f9"
}


const todos : todoI[] = [
    {
        "text": "hello",
        "is": false,
        "_id": "5b8f57cd-010c-4184-80d2-f82b405881f9"
    },
    {
        "text": "hello",
        "is": false,
        "_id": "81a7bffd-2728-4baf-bc8d-e90ba734a854"
    },
    {
        "text": "hello",
        "is": false,
        "_id": "6a931300-8613-4e2d-9547-aca733aee67b"
    },
    {
        "text": "hello",
        "is": false,
        "_id": "93f56c90-c1e1-4643-b987-9789427213a1"
    },
    {
        "text": "h----------------------------------dsfsfdsgfs",
        "is": true,
        "_id": "5b8f57cd-010c-4184-80d2-f82b405881f9"
    }
]


const createTodo = (text : string) : void => {
    const newTodo : todoI = {
        text,
        is: false,
        _id: uuidv4()
    }
    todos.push(newTodo)
}

interface removeTodoReturnI {
    text ? : string
    ok: boolean
}

const removeTodo = (_id : string) : removeTodoReturnI => {
    const index : number = todos.findIndex(elem => elem._id === _id);
    if ( index === -1) return {text : "_id not found", ok : false}
    todos.splice(index, 1)
    return {ok : true}
};



//createTodo("blablabla")












const name : string = 'Arnold';
const age1 : number = 1;
let is : boolean = false;

// const datas : Array<number | string> = [1,4,6,12,9,123,31, 'sada'];
const datas : number[] = [1,4,6,12,9,123,31];

const dataFilter = (array : number[], limit : number) : number[] => {
    return array.filter(elem => elem > limit)
}

const newDatas = dataFilter(datas, 10);

console.log(newDatas)






