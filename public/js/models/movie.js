import Validator from 'validator';
import Item from 'item';

export class Movie extends Item {
    constructor(id, name, runtime, imageLink, description){
        super(id, name);
        this._runtime = runtime;
        this._imageLink = imageLink;
        this._description = description;
    }

    get runtime(){
        return this._runtime;
    }

    set runtime(value){
        Validator.validateString(value);
        this._runtime = value;
    }

    get imageLink(){
        return this._imageLink;
    }

    set imageLink(value){
        Validator.validateString(value);
        Validator.validateImageLink(value);
        this._imageLink = value;
    }

    get description(){
        return this._description;
    }
    
    set description(value){
        Validator.validateString(value);
        this._description = value;
    }
}