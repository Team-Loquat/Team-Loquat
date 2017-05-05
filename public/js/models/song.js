// import Validator from 'validator';
// import Item from 'item';

// export class Book extends Item {
//     constructor(id, name, authorName, imageLink, description){
//         super(id, name);
//         this._authorName = authorName;
//         this._imageLink = imageLink;
//         this._description = description;
//     }

//     get authorName(){
//         return this._authorName;
//     }

//     set authorName(value){
//         Validator.validateString(value);
//         this._authorName = value;
//     }

//     get imageLink(){
//         return this._imageLink;
//     }

//     set imageLink(value){
//         Validator.validateString(value);
//         Validator.validateImageLink(value);
//         this._imageLink = value;
//     }

//     get description(){
//         return this._description;
//     }
    
//     set description(value){
//         Validator.validateString(value);
//         this._description = value;
//     }
// }
//TODO later