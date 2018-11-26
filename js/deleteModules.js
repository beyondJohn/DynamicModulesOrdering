var deleteModule = function (ev) {
    if (window.confirm("Please confirm delete.")) {

        // get position value from button id
        var adjustedIndex = ev.id.split('_')[1];
        
        // create myModulesDB to store new array from modulesDB with deleted module removed
        var myModulesDB = modulesDB.modulesList.filter(module => module.position != adjustedIndex);

        // used to rename position of modules remaining after deletion
        var positionArray = [];
        myModulesDB.forEach(function (module) {
            positionArray.push(module.position);
        });
        positionArray = positionArray.sort();

        // newPosition seeds and updates ordering for .position properties
        var newPosition = 1;

        // rename the .position property in numeric consecutive asc
        for (var i = 0; i < positionArray.length; i++) {

            var updatePosition = function (modulePosition) {
                myModulesDB.forEach(function (module) {
                    // find lowest unhandled .position value and replace value consecutively 
                    if (module.position == positionArray[i]) {
                        module.position = newPosition;
                    }
                })
            }

            updatePosition(i);
            // increment the .position value for next iteration
            newPosition++;
        }

        // create JSON object containing the temp myModulesDB array, then Post the HTTP request using JSON object as body
        var jsonModulesList = JSON.parse("{\"modulesList\":" + JSON.stringify(myModulesDB) + "}");
        httpRequest("Post", "http://oncologyconsults.com/api/HemaModule", "application/json", jsonModulesList, refreshAfterSave);
    }
}