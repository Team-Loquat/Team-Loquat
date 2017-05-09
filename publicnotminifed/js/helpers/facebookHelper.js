import Handlebars from 'handlebars';

window.fbAsyncInit = function() {
    FB.init({
        appId      : '300218950413883',
        xfbml      : true,
        version    : 'v2.9'
    });
    FB.AppEvents.logPageView();
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

Handlebars.registerHelper('facebook-btn', function(options) {
    let html = '<script>' +
    'function shareToFacebook() {\n' +
    '    FB.ui( {\n' +
    '            method: "share",\n' +
    '            href: "' + options.fn(this) + '"\n' +
    '        },\n' +
    '        function(response){});\n' +
    '}\n' +
    '</script>\n' +
    '<button class="btn btn-primary item-btn-share" onclick="shareToFacebook()">Facebook</button>';
    return new Handlebars.SafeString( html );
});