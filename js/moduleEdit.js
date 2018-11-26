var editModules = function () {
    httpRequest("Post", "http://oncologyconsults.com/api/HemaModule", "application/json", data, makeModules);
}
