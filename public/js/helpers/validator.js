/* globals $ toastr */
import {CONSTANTS as CONSTANTS} from 'constants';

export const VALIDATOR = {
    checkIfValidCollectionType: function(value) {
        if (value !== 'song' && value !== 'book' && value !== 'movie') {
            toastr.error(CONSTANTS.INVALID_COLLECTION_TYPE);
            throw Error('');
        }
    },
    checkIfValidCollectionDescription: function(value) {
        if (value.length < 6) {
            toastr.error(CONSTANTS.INVALID_COLLECTION_DESCRIPTION);
            throw Error('');
        }
    },
    checkIfValidItemName: function(value) {
        if (value.length < 1) {
            toastr.error(CONSTANTS.INVALID_ITEM_LENGTH);
            throw Error('');
        }
    },
    validateJsonObject: function(value) {
        if (typeof value !== 'object' && typeof value !== 'function') {
            toastr.error('Invalid item title');
            throw Error('');
        }
    },
};
