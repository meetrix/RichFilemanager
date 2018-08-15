$('.fm-container').richFilemanager({
    // options for the plugin initialization step and callback functions, see:
    // https://github.com/servocoder/RichFilemanager/wiki/Configuration-options#plugin-parameters
    baseUrl: '.',
    callbacks: {
        beforeCreateImageUrl: function (resourceObject, url) {
            return url += 'modified=ImageUrl';
        },
        beforeCreatePreviewUrl: function (resourceObject, url) {
            return url += '&modified=previewUrl';
        },
        beforeSelectItem: function (resourceObject, url) {
            return url += '&modified=selectItem';
        },
        afterSelectItem: function (resourceObject, url) {
            // example on how to set url into target input and close bootstrap modal window
            // assumes that filemanager is opened via iframe, which is at the same domain as parent
            // https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
            $('#target-input', parent.document).val(url);
            $('#modal', parent.document).find('.close').click();
        },
        beforeSetRequestParams: function (requestMethod, requestParams) {
            console.log('beforeSetRequestParams');
            // add "jwt" parameter with "your_token" value to all POST requests
            //if (requestMethod === 'POST') {
            const url_string = window.location.href
            const url = new URL(url_string);
            const token = url.searchParams.get("jwt");
            console.log(token);
            requestParams.jwt = token;
            //}
            console.log(requestParams);
            console.log(requestMethod);
            return requestParams;
        },
        beforeSendRequest: function (requestMethod, requestParams) {
            console.log('beforeSendRequest');
            // prevent all POST requests that lack "jwt" request parameter
            if (requestMethod === 'POST' && requestParams.jwt === undefined) {
                return false;
            }
            return true;
        }
    }
});