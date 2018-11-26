function initModules(){
    httpRequest("Get","http://oncologyconsults.com/api/HemaModule","application/json", "", makeModules);
}
(function(){initModules();})();
