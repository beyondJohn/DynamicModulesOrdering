
// written for Post & Get methods with code from example: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/onreadystatechange
var httpRequest = function (method, url, contentType, myJSON, callback) {
    var xhr = new XMLHttpRequest(), method = method, url = url;        
    xhr.open(method, url, true); // true is (default)async parameter and can be excluded when true https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/open#Parameters   
    xhr.setRequestHeader("Content-type", contentType);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(xhr.responseText);
            if(callback){
                    callback(xhr.responseText);
            };
        }
    };
    myJSON && method === 'Post' ? xhr.send(JSON.stringify(myJSON)) : xhr.send();
}
// --example request--
// httpRequest("Get","http://awesomesite.com/api/MyModules","application/json", '', makeModules);
// httpRequest("Post","http://awesomesite.com/api/MyModules","application/json", data, makeModules);