var siteName = document.getElementById("siteName"),
siteUrl = document.getElementById("siteUrl"),
table = document.getElementById("tableBody"),
      updateBtn = document.getElementById("updateBtn"),
      addBtn = document.getElementById("addBtn"),
      alertName = document.getElementById("alertName"),
      alertUrl = document.getElementById("alertUrl"),
      closeBtn = document.getElementById("closeBtn"),
      undodelete = document.getElementById("deleteBtn"),
      searchInput=document.getElementById("searchInput"),
      delet = document.getElementById("delete"),
      curent=document.getElementById("Current-Btn"),
    //   currentHref=document.getElementById("Current-Btn"),
      siteNameRegex = /^[A-z-\s0-9]{3,50}$/,
      siteUrlRegex = /^(ftp|http|https)?:?\/\/[^ "]+$/
      
      var webSiteList =JSON.parse(localStorage.getItem("sites"))??[];
      var indexUpdate;
      displayData()
      //Start **************validationName*********************
      function validationName() {
          var text=siteName.value
          if (siteNameRegex.test(text)===true) {
              siteName.classList.add("is-valid");
              siteName.classList.remove("is-invalid");
              alertName.classList.add("d-none");
              return true
            }else{
                siteName.classList.add("is-invalid");
                siteName.classList.remove("is-valid");
                alertName.classList.remove("d-none");
                return false
            }
        }
        siteName.addEventListener('input',validationName)
        // End**********validationName************
//Start **************validationUrl*********************
function validationUrl() {
    var text=siteUrl.value;
    if (siteUrlRegex.test(text)===true) {
        siteUrl.classList.add("is-valid");           //* add class valid  ###
        siteUrl.classList.remove("is-invalid");      //* remove class invalid ###
        alertUrl.classList.add("d-none");            //* add class none to remove alert ###
        return true;
    }else{
        siteUrl.classList.add("is-invalid");
    siteUrl.classList.remove("is-valid");
    alertUrl.classList.remove("d-none");
    return false
}
}
siteUrl.addEventListener('input',validationUrl)
// End**********validationUrl************
//start****************DisplayData***************
var only;
function displayData() {
    var data = ""  // *  box of html element #######
    for (only=0; only < webSiteList.length; only++) {
          data += `    <tr>
          <td class="fw-bold">${(only + 1)}</td>
          <td class="fw-bold">${webSiteList[only].name}</td>
          <td>
          <button class="btn btn-success" data-index="${only}"">update</button>
          </td>
          <td>
          <button class="btn btn-warning">
          <a href="${webSiteList[only].url}" target="_blank">Visit</a>
          </button>
          </td>
          <td>
          <button class="btn btn-danger textbl delete" id="delete${only}" data-index="${only}" >
          Delete
          </button>
          </td>
          </tr>                   `
        }
        table.innerHTML = data; //* ### add element to html page ###
}

/*look>>>>>>>>>>> Here i use data index because the privacy of the chrome in the exetention 
not alowed the inline events handler so i convert all evevnt by using addEventListener*/


//End****************DisplayData***************
//start****************ClearData***************
function clear() {
    siteName.value="";
    siteUrl.value="";
    siteName.classList.remove("is-invalid");
    siteName.classList.remove("is-valid");
    siteUrl.classList.remove("is-invalid");
    siteUrl.classList.remove("is-valid");
}
//End****************ClearData***************
//start****************AddData***************
function AddData(){
    if (validationName()===true && validationUrl()===true) {
        var siteAndName={
            name:siteName.value,
            url:siteUrl.value
        };
        webSiteList.push(siteAndName);
        localStorage.setItem("sites",JSON.stringify(webSiteList));
        displayData();
        clear();
    }else{
        document.getElementById("boxAlert").classList.remove("d-none");
    }
}
addBtn.addEventListener("click",AddData)

//End****************AddData***************
closeBtn.onclick=function () {
    document.getElementById("boxAlert").classList.add("d-none");
}
// ***************Start Deleted*****************
var deletedItem;
function DeletSite(index) {
    deletedItem=webSiteList.splice(index,1);//remove from list 
    localStorage.setItem("sites",JSON.stringify(webSiteList)); //remove from local storage
    displayData();
    undodelete.classList.remove("d-none")
    return deletedItem;
}
table.addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-danger")) {
      var index = parseInt(event.target.dataset.index);
      DeletSite(index);
    }
  });
// ***************End Deleted*****************
//****************Start Undooo****************
function UndoDelete() {
    let x=deletedItem[0];
    webSiteList.push(x);
    localStorage.setItem("sites",JSON.stringify(webSiteList));
    displayData();
    undodelete.classList.add("d-none");
}
undodelete.addEventListener('click',UndoDelete)
//****************End Undooo****************
// ****************Start Update************

function sitUpdates(index) {
    indexUpdate=index;
    siteName.value=webSiteList[index].name;
    siteUrl.value=webSiteList[index].url;
    let x=document.getElementById("delete"+index);
    x.classList.add("disabled");
    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none")
}
table.addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-success")) {
      var index = parseInt(event.target.dataset.index);
      sitUpdates(index);
    }
  });
// ****************End Update*************
//*****************Start DoneUpdate*******/
function DoneUpdate(){
    if (validationName()===true && validationUrl()===true) {
        var siteAndName={
            name:siteName.value,
            url:siteUrl.value
        };
        webSiteList.splice(indexUpdate,1,siteAndName);
        localStorage.setItem("sites",JSON.stringify(webSiteList));
        displayData();
        clear();
        addBtn.classList.remove("d-none");
        updateBtn.classList.add("d-none");
    }else{  
        document.getElementById("boxAlert").classList.remove("d-none");
    }
}
updateBtn.addEventListener('click',DoneUpdate)
//*****************End DoneUpdate*******/
/*****************Start Search*********/
function SearchWebsite(){
    let Search=searchInput.value;
    let box="";
    for (let i = 0; i < webSiteList.length; i++) {
        let x=webSiteList[i].name;
        let resault=x.replaceAll(Search,"<span>"+Search+"</span>")
        if(webSiteList[i].name.toLowerCase().includes(Search.toLowerCase())){
            box+=`
            <tr>
            <td class="fw-bold">${i+1}</td>
            <td class="fw-bold">${resault}</td>
            <td>    
            <button class="btn btn-success px-4" onclick="sitUpdates(${i})" >update</button>
            </td>
            <td>
            <button class="btn btn-warning px-4">
            <a href="${webSiteList[i].url}" target="_blank">Visit</a>
            </button>
            </td>
            <td>
            <button class="btn btn-danger textbl" id="delete${i}" onclick="DeletSite(${i})" >
            Delete
            </button>
        </td>
        </tr>
        `
    }   
    table.innerHTML=box
}
}
searchInput.addEventListener("input",SearchWebsite)
/*****************End Search*********/


//Thanks For Watch