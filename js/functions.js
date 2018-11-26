// refreshAfterSave is used as an http callback
var refreshAfterSave = function (dataAfterSave) {
    window.location = "/modulesEdit.html";
}

// used in the saveEditModule function to prevent identical active positions to be set
var isValidPosition = function (position) {
    var isValid = true;
    modulesDB.modulesList.forEach(function (module) {
        if (module.position === position) {
            if (module.active === "1") {
                if (currentModule.position !== position) {
                    isValid = false;
                }

            }
        }
    });
    return isValid;
}

// Used to save new module
function saveNewModule() {
    var selectActive = "1";
    var modulesList = [];

    // create new module
    var tempModulesDB = new Module();
    tempModulesDB.credits = document.getElementById("textCredits").value;
    tempModulesDB.title = document.getElementById("textTitle").value;
    tempModulesDB.href = document.getElementById("textHref").value;
    tempModulesDB.description = document.getElementById("textDescription").value;
    tempModulesDB.faculty = document.getElementById("textFaculty").value;
    tempModulesDB.expiration = document.getElementById("textExpiration").value;
    tempModulesDB.position = "1";
    tempModulesDB.active = selectActive;

    // add new module to new module list
    modulesList.push(tempModulesDB);

    // add existing modules afer new module
    for (var i = 0; i < modulesDB.modulesList.length; i++) {
        newPosition = i + 1;
        modulesDB.modulesList.forEach(function (tempModule) {

            // maintain same ordering of existing modules prior to adding new
            var increment = (i + 1);
            if (tempModule.position == increment) {
                var tempModulesDBNew = new Module();
                tempModulesDBNew.credits = modulesDB.modulesList[i].credits;
                tempModulesDBNew.title = modulesDB.modulesList[i].title;
                tempModulesDBNew.href = modulesDB.modulesList[i].href;
                tempModulesDBNew.description = modulesDB.modulesList[i].description;
                tempModulesDBNew.faculty = modulesDB.modulesList[i].faculty;
                tempModulesDBNew.expiration = modulesDB.modulesList[i].expiration;
                tempModulesDBNew.position = i + 2;
                tempModulesDBNew.active = modulesDB.modulesList[i].active;

                // add existing module to new modules list
                modulesList.push(tempModulesDBNew);
            }
        });
    }

    // create JSON object containing the temp modulesList array, then Post the HTTP request using JSON object as body
    var jsonModulesList = JSON.parse("{\"modulesList\":" + JSON.stringify(modulesList) + "}");
    httpRequest("Post", "http://oncologyconsults.com/api/HemaModule", "application/json", jsonModulesList, refreshAfterSave);
}

// Used to save edited module
function saveEditModule() {

    // copy modules db
    var tempModulesBaseDB = modulesDB;

    var count = 0;

    // get selected .position value
    var selectList = document.getElementById("selectPosition");
    var optionValue = selectList[selectList.options.selectedIndex].value;

    // check if selected psition is already used in other active module
    if (isValidPosition(optionValue)) { 

        // check if position drop down value has changed. if so
        // and rename edit buttons and reorder modules  
        if (optionValue !== activeIndex) {
            var btnFromId = "btnEdit" + activeIndex;
            var btnRenameFrom = document.getElementById(btnFromId);
            var btnToId = "btnEdit" + optionValue;
            var btnRenameTo = document.getElementById(btnToId);

            
            // **THE FOLLOWING RENAMES BUTTONS TO KEEP BUTTONS AND THEIR ASSOCAITED MODULES IN SYNC AFTER RELOCATIONS**
            // **VERY IMPORTANT TO NOTE THAT EDIT AND SAVE FUNCTIONS DEPEND HEAVILY ON THE IDS OF THE BUTTONS USED **
            // if there is a hidden button with the same position number give it a temp value which can be found later
            // this is a little tricky and can likely be simplified/modified, but it works
            if (btnRenameTo) { 
                btnRenameFrom.id = "btnEditTemp" + optionValue;
                btnRenameTo.id = "btnEdit" + activeIndex;
                var btnRenameFromTempId = "btnEditTemp" + optionValue;
                var btnRenameFromTemp = document.getElementById(btnRenameFromTempId);
                btnRenameFromTemp.id = "btnEdit" + activeIndex;
                modulesDB.modulesList.forEach(function (positionModule) {
                    if (positionModule.position === activeIndex) {
                        positionModule.position = optionValue + ".1";
                    }
                    if (positionModule.position === optionValue) {
                        positionModule.position = activeIndex;
                    }
                });
                modulesDB.modulesList.forEach(function (module) {
                    if (module.position === optionValue + ".1") {
                        tempModulesBaseDB.modulesList[count].credits = document.getElementById("textCredits").value;
                        tempModulesBaseDB.modulesList[count].title = document.getElementById("textTitle").value;
                        tempModulesBaseDB.modulesList[count].href = document.getElementById("textHref").value;
                        tempModulesBaseDB.modulesList[count].description = document.getElementById("textDescription").value;
                        tempModulesBaseDB.modulesList[count].faculty = document.getElementById("textFaculty").value;
                        tempModulesBaseDB.modulesList[count].expiration = document.getElementById("textExpiration").value;
                        tempModulesBaseDB.modulesList[count].position = document.getElementById("selectPosition").value;
                        var selectActive;
                        document.querySelector('input[name = "active"]:checked').value === "active" ? selectActive = "1" : selectActive = "0";
                        tempModulesBaseDB.modulesList[count].active = selectActive;
                    }
                    count++
                });
                tempModulesBaseDB.modulesList.forEach(function (tempModule) {
                    if (tempModule.position == optionValue + ".1") {
                        tempModule.position = activeIndex;
                    }
                });
            }
            else {
                modulesDB.modulesList.forEach(function (module) {
                    if (module.position != activeIndex) {
                        tempModulesBaseDB.modulesList[count].credits = document.getElementById("textCredits").value;
                        tempModulesBaseDB.modulesList[count].title = document.getElementById("textTitle").value;
                        tempModulesBaseDB.modulesList[count].href = document.getElementById("textHref").value;
                        tempModulesBaseDB.modulesList[count].description = document.getElementById("textDescription").value;
                        tempModulesBaseDB.modulesList[count].faculty = document.getElementById("textFaculty").value;
                        tempModulesBaseDB.modulesList[count].expiration = document.getElementById("textExpiration").value;
                        tempModulesBaseDB.modulesList[count].position = document.getElementById("selectPosition").value;
                        var selectActive;
                        document.querySelector('input[name = "active"]:checked').value === "active" ? selectActive = "1" : selectActive = "0";
                        tempModulesBaseDB.modulesList[count].active = selectActive;
                    }
                    count++
                });
            }
            // Post HTTP request using tempModulesBaseDB as body
            httpRequest("Post", "http://oncologyconsults.com/api/HemaModule", "application/json", tempModulesBaseDB, refreshAfterSave);
        }
        // perorm simple edit, update contents of edited module, no reordering required
        else {
            tempModulesBaseDB.modulesList.forEach(function (module) {
                if (module.position === optionValue) {
                    var myindex = (activeIndex - 1);
                    var existingModule = modulesDB.modulesList[activeIndex];
                    
                    module.credits = document.getElementById("textCredits").value;
                    module.title = document.getElementById("textTitle").value;
                    module.href = document.getElementById("textHref").value;
                    module.description = document.getElementById("textDescription").value;
                    module.faculty = document.getElementById("textFaculty").value;
                    module.expiration = document.getElementById("textExpiration").value;
                    module.position = document.getElementById("selectPosition").value;
                    
                    var selectActive;
                    document.querySelector('input[name = "active"]:checked').value === "active" ? selectActive = "1" : selectActive = "0";
                    module.active = selectActive;
                    httpRequest("Post", "http://oncologyconsults.com/api/HemaModule", "application/json", tempModulesBaseDB, refreshAfterSave);
                }
            });
        }
    }
    else {
        if (activeIndex !== optionValue) {
            document.getElementById("selectPosition").value = currentModule.position;
            alert("Position: " + optionValue + " is already active. Deactivate the module using Position " + optionValue + " and retry.")
        }

    }
}