import Handlebars from 'handlebars';

import { get } from 'requester';

const cacheObj = {};

export function load(templateName, data) {
    // if (cacheObj.hasOwnProperty(templateName)) {
    //     return Promise.resolve(cacheObj[templateName]);
    // }

    return $.get(`templates/${templateName}.handlebars`)
        .then(function(src) {
            const compiledTemplate = Handlebars.compile(src)(data);
            //cacheObj[templateName] = compiledTemplate;
            
            return Promise.resolve(compiledTemplate);
        });
};