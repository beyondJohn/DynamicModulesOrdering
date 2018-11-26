var displayModal = false;
var modalClick = function () {
    displayModal = !displayModal;
    displayModal ? document.getElementById('divModalContainer').style.top = "10%"
        : document.getElementById('divModalContainer').style.top = "-150%";
    var index = activeIndex;
    console.log('btnType: ', btnType);
    if (btnType === "Edit") {
        modulesDB.modulesList.forEach(function (module) {
            if (module.position == activeIndex) {
                currentModule = module;
            }
        });
        document.getElementById("textTitle").value = currentModule.title;
        document.getElementById("textHref").value = currentModule.href;
        document.getElementById("textDescription").value = currentModule.description;
        document.getElementById("textCredits").value = currentModule.credits;
        document.getElementById("textFaculty").value = currentModule.faculty;
        document.getElementById("textExpiration").value = currentModule.expiration;
        document.getElementById("selectPosition").value = currentModule.position;
        
        if(currentModule.active === "0"){
            document.getElementById("inactive").checked = true;
        }
        else{ 
            document.getElementById("active").checked = true;
        } 
        
    }
    else if(btnType === "Save"){
        console.log("Save");
    }
    else if(btnType === "New"){
        document.getElementById("textTitle").value = "";
        document.getElementById("textHref").value = "";
        document.getElementById("textDescription").value = "";
        document.getElementById("textCredits").value = "";
        document.getElementById("textFaculty").value = "";
        document.getElementById("textExpiration").value = "";
        document.getElementById("selectPosition").value = "";
        document.getElementById("selectPosition").value = "1";
        document.getElementById("active").checked = true;
        console.log("Do Something");
    }

}
var enableModal = function () {

    var divModalContainer = document.createElement("DIV");
    divModalContainer.id = "divModalContainer";
    divModalContainer.style.position = "absolute";
    divModalContainer.className = 'div-modal-container';


    var divModal = document.createElement("DIV");
    divModal.id = "divModal";
    divModal.classList = "div-modal";

    // Add Module
    // //
    // AddModule Button
    var btnAddModule = document.createElement('button');
    btnAddModule.id = "btnAddModule";
    btnAddModule.className = 'btn-info';
    btnAddModule.setAttribute('type', 'button');
    btnAddModule.innerHTML = "New";
    btnAddModule.style.borderRadius = "5px";
    btnAddModule.style.padding = "10px";
    btnAddModule.style.minWidth = "68px";
    btnAddModule.style.position = "fixed";
    btnAddModule.style.top = "0";
    btnAddModule.style.marginLeft = "7px";
    btnAddModule.style.marginTop = "7px";
    btnAddModule.addEventListener('click', function () { btnType = "New"; maskClick(btnType); });
    document.body.appendChild(btnAddModule);
    // //

    // Edit Form
    // //

    // Form Container
    var formContainer = document.createElement('DIV');
    formContainer.id = "formContainer";
    formContainer.className = 'form-container';

    // Title Label
    var labelTitle = document.createElement('label');
    labelTitle.id = 'labelTitle';
    labelTitle.innerHTML = 'Title:';
    labelTitle.style.marginLeft = '15px';
    labelTitle.style.marginTop = '15px';

    // Title TextArea
    var textTitle = document.createElement("TEXTAREA");
    textTitle.id = "textTitle";
    textTitle.className = "text-title";

    // Href Label
    var labelHref = document.createElement('label');
    labelHref.id = 'labelHref';
    labelHref.innerHTML = 'Href:';
    labelHref.style.marginLeft = '15px';
    labelHref.style.marginTop = '15px';

    // Href TextArea
    var textHref = document.createElement("TEXTAREA");
    textHref.id = "textHref";
    textHref.className = "text-href";


    // Description Label
    var labelDescription = document.createElement('label');
    labelDescription.id = 'labelDescription';
    labelDescription.innerHTML = 'Description:';
    labelDescription.style.marginLeft = '15px';
    labelDescription.style.marginTop = '15px';

    // Description TextArea
    var textDescription = document.createElement("TEXTAREA");
    textDescription.id = "textDescription";
    textDescription.className = "text-description";

    // Credits Label
    var labelCredits = document.createElement('label');
    labelCredits.id = 'labelCredits';
    labelCredits.innerHTML = 'Credits:';
    labelCredits.style.marginLeft = '15px';
    labelCredits.style.marginTop = '15px';

    // Credits Input
    var textCredits = document.createElement("INPUT");
    textCredits.id = "textCredits";
    textCredits.className = "text-credits";

    // Faculty Label
    var labelFaculty = document.createElement('label');
    labelFaculty.id = 'labelFaculty';
    labelFaculty.innerHTML = 'Faculty:';
    labelFaculty.style.marginLeft = '15px';
    labelFaculty.style.marginTop = '15px';

    // Faculty TextArea
    var textFaculty = document.createElement("TEXTAREA");
    textFaculty.id = "textFaculty";
    textFaculty.className = "text-faculty";

    // Expiration Label
    var labelExpiration = document.createElement('label');
    labelExpiration.id = 'labelExpiration';
    labelExpiration.innerHTML = 'Expiration:';
    labelExpiration.style.marginLeft = '15px';
    labelExpiration.style.marginTop = '15px';

    // Expiration Input
    var textExpiration = document.createElement("INPUT");
    textExpiration.id = "textExpiration";
    textExpiration.className = "text-expiration";

    // Position Label
    var labelPosition = document.createElement('label');
    labelPosition.id = 'labelPosition';
    labelPosition.innerHTML = 'Position:';
    labelPosition.style.marginLeft = '15px';
    labelPosition.style.marginTop = '15px';

    // Position Input
    var textPosition = document.createElement("select");
    textPosition.id = "selectPosition";
    textPosition.className = "text-position";
    var countOptions = 1;
    modulesDB.modulesList.forEach(function (module) {
        var option = document.createElement("option");
        option.value = countOptions;
        option.text = countOptions;
        textPosition.appendChild(option);
        countOptions++;
    });

    // Active Label
    var labelActive = document.createElement('label');
    labelActive.id = 'labelActive';
    labelActive.innerHTML = 'Active:';
    labelActive.style.marginLeft = '15px';
    labelActive.style.marginTop = '15px';
    // ActiveOn Label
    var labelActiveOn = document.createElement('label');
    labelActiveOn.id = 'labelActiveOn';
    labelActiveOn.innerHTML = 'Show';
    labelActiveOn.style.marginLeft = '15px';
    labelActiveOn.style.marginTop = '15px';
    // ActiveOff Label
    var labelActiveOff = document.createElement('label');
    labelActiveOff.id = 'labelActiveOff';
    labelActiveOff.innerHTML = 'Hide';
    labelActiveOff.style.marginLeft = '15px';
    labelActiveOff.style.marginTop = '15px';

    // Active Radio Button
    var radioInputActive = document.createElement('input');
    radioInputActive.setAttribute('type', 'radio');
    radioInputActive.setAttribute('name', 'active');
    radioInputActive.id = 'active';
    radioInputActive.value = 'active';
    var radioInputInactive = document.createElement('input');
    radioInputInactive.setAttribute('type', 'radio');
    radioInputInactive.setAttribute('name', 'active');
    radioInputInactive.id = 'inactive';
    radioInputInactive.value = 'inactive';

    formContainer.appendChild(labelTitle);
    formContainer.appendChild(document.createElement("BR"));
    formContainer.appendChild(textTitle);
    formContainer.appendChild(document.createElement("BR"));
    formContainer.appendChild(labelHref);
    formContainer.appendChild(document.createElement("BR"));
    formContainer.appendChild(textHref);
    formContainer.appendChild(document.createElement("BR"));
    formContainer.appendChild(labelDescription);
    formContainer.appendChild(document.createElement("BR"));
    formContainer.appendChild(textDescription);
    formContainer.appendChild(document.createElement("BR"));
    formContainer.appendChild(labelCredits);
    formContainer.appendChild(document.createElement("BR"));
    formContainer.appendChild(textCredits);
    formContainer.appendChild(document.createElement("BR"));
    formContainer.appendChild(labelFaculty);
    formContainer.appendChild(document.createElement("BR"));
    formContainer.appendChild(textFaculty);
    formContainer.appendChild(document.createElement("BR"));
    formContainer.appendChild(labelExpiration);
    formContainer.appendChild(document.createElement("BR"));
    formContainer.appendChild(textExpiration);
    formContainer.appendChild(document.createElement("BR"));
    formContainer.appendChild(labelPosition);
    formContainer.appendChild(document.createElement("BR"));
    formContainer.appendChild(textPosition);
    formContainer.appendChild(document.createElement("BR"));
    formContainer.appendChild(labelActive);
    
    formContainer.appendChild(labelActiveOn);
    formContainer.appendChild(radioInputActive);
    
    formContainer.appendChild(labelActiveOff);
    formContainer.appendChild(radioInputInactive);

    divModal.appendChild(formContainer);
    // //

    // //
    // Footer Div
    var divFooter = document.createElement("DIV");
    divFooter.id = "divFooter";
    divFooter.className = 'div-footer';
    divFooter.style.bottom = "0px";
    divFooter.style.textAlign = "right";

    // Submit Edit Button
    var btnSubmitEdit = document.createElement('button');
    btnSubmitEdit.id = "btnSubmitEdit";
    btnSubmitEdit.className = 'btn-success';
    btnSubmitEdit.setAttribute('type', 'button');
    btnSubmitEdit.innerHTML = "Save";
    btnSubmitEdit.style.borderRadius = "5px";
    btnSubmitEdit.style.padding = "10px";
    btnSubmitEdit.style.minWidth = "68px";
    btnSubmitEdit.addEventListener('click', function () { saveClick(this); });

    // Cancel Button
    var btnCancel = document.createElement('button');
    btnCancel.id = "btnCancel";
    btnCancel.className = 'btn-warning';
    btnCancel.setAttribute('type', 'button');
    btnCancel.innerHTML = "Cancel";
    btnCancel.style.borderRadius = "5px";
    btnCancel.style.padding = "10px";
    btnCancel.style.minWidth = "68px";
    btnCancel.addEventListener('click', function () { maskClick(); });
    // //

    divFooter.appendChild(btnSubmitEdit);
    divFooter.appendChild(btnCancel);

    divModal.appendChild(divFooter);

    divModalContainer.appendChild(divModal);

    document.body.appendChild(divModalContainer);

};