import Handlebars from 'handlebars';

import { get } from 'requester';

const cacheObj = {};

export function load(templateName) {
    if (cacheObj.hasOwnProperty(templateName)) {
        return Promise.resolve(cacheObj[templateName]);
    }

    return get(`templates/${templateName}.handlebars`)
        .then(template => {
            const compiledTemplate = Handlebars.compile(template);
            cacheObj[templateName] = compiledTemplate;
            return Promise.resolve(compiledTemplate);
        });
};