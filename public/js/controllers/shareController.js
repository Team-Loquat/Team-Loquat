import Handlebars from 'handlebars';

//facebook plugin
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/bg_BG/sdk.js#xfbml=1&version=v2.9";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//twitter widget
window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function(f) {
        t._e.push(f);
    };

    return t;
}(document, "script", "twitter-wjs"));

//Handlebars helpers
Handlebars.registerHelper('facebook-btn', function(options) {
    return new Handlebars.SafeString(
        `<div class="fb-share-button"
             data-href="${options.fn(this)}"
             data-layout="button_count"
             data-size="large">
         </div>`);
});

Handlebars.registerHelper('tweeter-btn', function(options) {
    return new Handlebars.SafeString(
        `<a class="twitter-share-button"
            href="https://twitter.com/intent/tweet?url=${options.fn(this)}"
            data-size="large">
            Tweet</a>`);
});

// How to use
/*
    const template = '{{#facebook-btn}}{{url}}{{/facebook-btn}}
                      {{#tweeter-btn}}{{url}}{{/tweeter-btn}}';

    const compiled = Handlebars.compile( template );
    const container = document.getElementById('container');
    var html = compiled({url:'http://www.mysite.com'});
    console.log(html);
    container.innerHTML += html;
*/