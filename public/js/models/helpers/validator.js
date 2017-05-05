export const VALIDATOR = {
    validateString: function(value){
        if(typeof value !== 'string' || value.length < 1){
            throw Error('Invalid item name!');
        }
    },
    validateImageLink: function(value){
        if(!/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value)){
            throw Error('Invalid image link!');
        }
    },
    validateUpdateData: function( key, values ) {
        if (!key || ( typeof key !== 'string') || key === '' ) {
            throw new Error('Invalid key!');
        }
        if (!values || !values.dataType) {
            throw new Error('Data type not specified!');
        }
        if ( !(values.dataType === 'item' || values.dataType === 'collection') ) {
            throw new Error('Wrong data type!')
        }
    }
}