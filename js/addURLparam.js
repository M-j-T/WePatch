var addUrlParam = function(path, key, value, save) {
    var result = '';
 
    if (path && key && value) {
 
        var addParam      = key + '=' + value,
            paths         = path.split('/'),
            fullFileName  = paths.pop(),
            fileName      = fullFileName.replace(/[\?#].+$/g, ''),
            dirName       = path.replace(fullFileName, ''),
            hashMatches   = fullFileName.match(/#([^#]+)$/),
            paramMatches  = fullFileName.match(/\?([^\?]+)$/),
            hash          = '',
            param         = '',
            params        = [],
            fullPath      = '',
            hitParamIndex = -1;
 
        if (hashMatches && hashMatches[1]) {
            hash = hashMatches[1];
        }
 
        if (paramMatches && paramMatches[1]) {
            param = paramMatches[1].replace(/#[^#]+$/g, '').replace('&', '&');
        }
 
        fullPath = dirName + fileName;
 
        if (param === '') {
            param = addParam;
        } else if (save) {
            params = param.split('&');
 
            for (var i = 0, len = params.length; i < len; i++) {
                if (params[i].match(new RegExp('^' + key + '='))) {
                    hitParamIndex = i;
                    break;
                }
            }
 
            if (hitParamIndex > -1) {
                params[hitParamIndex] = addParam;
                param = params.join('&');
            } else {
                param += '&' + addParam;
            }
        } else {
            param += '&' + addParam;
        }
 
        fullPath += '?' + param;
 
        if (hash !== '') {
            fullPath += '#' + hash;
        }
 
        result = fullPath;
 
    }
 
    return result;
};