import Validator from 'validator';

const getNextId = (function(){
    let counter = -1;

    return function(){
        counter+=1;
        
        return counter;
    }
}());

export class Item{
    constructor(id, name){
        this._id = getNextId();
        this._name = name;
    }

    get id(){
        return this._id;
    }

    get name(){
        return this._name;
    }

    set name(){
        Validator.validateString(value);
        this._name = value;
    }
}