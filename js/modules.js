
var isEdit = false;
// //

var buildModules = function(myModule){
    var currentModule = myModule;
// //
        // Container Div
        var divContainer = document.createElement("DIV");
        divContainer.id = "divContainer";
        divContainer.style.margin = ContainerStyles.margin;
        divContainer.style.marginTop = ContainerStyles.marginTop;
        divContainer.style.borderColor = ContainerStyles.borderColor;
        divContainer.style.minWidth = "425px";

        if (isEdit) {
            // //
            // Tool Bar
            var divToolBar = document.createElement("DIV");
            divToolBar.id = "divToolBar";
            divToolBar.style.padding = "5px";
            divToolBar.style.textAlign = "right";
            divToolBar.style.paddingBottom = "0";

            //Edit Button
            var btnEdit = document.createElement("button");
            btnEdit.id = "btnEdit" + (currentModule.position) ;
            btnEdit.className = 'btn-primary';
            btnEdit.setAttribute('type', 'button');
            btnEdit.innerHTML = "Edit";
            btnEdit.style.borderRadius = "5px";
            btnEdit.style.padding = "10px";
            btnEdit.style.minWidth = "68px";
            btnEdit.addEventListener('click', function () { editModuleClick(this); });

            //Delete Button
            var btnDelete = document.createElement("button");
            btnDelete.id = "btnDelete_" + (currentModule.position);
            btnDelete.className = 'btn-danger';
            btnDelete.setAttribute('type', 'button');
            btnDelete.innerHTML = "Delete";
            btnDelete.style.borderRadius = "5px";
            btnDelete.style.padding = "10px";
            btnDelete.addEventListener('click', function () { deleteModule(this); });

            divToolBar.appendChild(btnEdit);
            divToolBar.appendChild(btnDelete);
            // //
        }

        // Header
        var divHeader = document.createElement("DIV");
        divHeader.id = "divHeader";
        for (var style in HeaderStyles) {
            divHeader.style[style] = HeaderStyles[style];
        }
        // //

        // Title
        var divTitle = document.createElement("DIV");
        divTitle.id = "divTitle";
        divTitle.style.padding = TitleStyles.padding;
        divTitle.style.position = "relative";

        divHeader.appendChild(divTitle);

        // Href Div
        var divHref = document.createElement("DIV");
        divHref.id = "divHref";
        divHref.style.width = "60%";

        // Href
        var hrefTitle = document.createElement("a");
        hrefTitle.setAttribute("href", currentModule.href);
        hrefTitle.innerHTML = currentModule.title;

        // CME Credits
        var divCredits = document.createElement("DIV");
        divCredits.id = "divCredits";
        divCredits.style.position = "absolute"
        divCredits.style.top = "15px";
        divCredits.style.right = "15px";
        divCredits.innerHTML = currentModule.credits;

        divHref.appendChild(hrefTitle);
        divTitle.appendChild(divHref);
        divTitle.appendChild(divCredits);
        // //

        // Description
        var divDescription = document.createElement("DIV");
        divDescription.id = "divDescription";
        divDescription.innerHTML = currentModule.description;
        divDescription.style.border = borderStyle;
        divDescription.style.padding = "25px";
        divDescription.style.borderRadius = "10px";
        // //

        // Footer
        var divFooter = document.createElement("DIV");
        divFooter.id = "divFooter";
        divFooter.style.border = borderStyle;
        divFooter.style.borderTop = "none";
        divFooter.style.padding = "5px";
        divFooter.style.padding = "20px";
        divFooter.style.borderRadius = "10px";
        divFooter.style.backgroundColor = "rgb(247, 245, 245)"

        //Faculty
        var divFaculty = document.createElement("DIV");
        divFaculty.id = "divFaculty";
        divFaculty.style.width = "50%";
        divFaculty.style.textAlign = "left";
        divFaculty.style.display = "table-cell";
        divFaculty.style.cssFloat = "left";
        divFaculty.innerHTML = currentModule.faculty;

        // Expiration
        var divExpiration = document.createElement("DIV");
        divExpiration.id = "divExpiration";
        divExpiration.style.width = "21%";
        divExpiration.style.textAlign = "right";
        divExpiration.style.display = "table-cell";
        divExpiration.innerHTML = currentModule.expiration;

        divFooter.appendChild(divFaculty);
        divFooter.appendChild(divExpiration);
        // //

        // Add Content To Body
        if (isEdit) {
            divContainer.appendChild(divToolBar);
        }
        divContainer.appendChild(divHeader);
        divContainer.appendChild(divDescription);
        divContainer.appendChild(divFooter);
        document.body.appendChild(divContainer);
        //countModules++;
        // //
}

// // 
var makeModules = function (data) { // data:JSON dependency injecti
    var myData = JSON.parse(data);
    modulesDB = myData;
    //var countModules = 0;

    for (var i = 0; i < myData.modulesList.length; i++) {
        var currentModule;
        if(!isEdit){
            myData.modulesList.forEach(function (module) {
                if (module.position == i + 1) {
                    currentModule = module;
                    if(currentModule.active === "1"){
                        buildModules(currentModule);
                    }
                    
                }
            });
        }
        else{
            currentModule = myData.modulesList[i];
            buildModules(currentModule);
        }
        

        //myData.modulesList.forEach(function (data) 
        if (isEdit) { console.log('is edit'); }

        
    };
    if (isEdit) {
        enableMask();
        enableModal();
    }
    //Footer Padding For Mobile
    var divPadding = document.createElement("DIV");
    divPadding.id = "divPadding";
    divPadding.style.marginBottom = "70px";
    document.body.appendChild(divPadding);
}

