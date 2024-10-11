var printLoc = document.querySelector(".rowPrint")
var valuesList;

// Cheching if there's a data loaded in the Local Storage or no
if (localStorage.getItem("valuesList") == null){
    valuesList = [];
}
else{
    valuesList = JSON.parse(localStorage.getItem("valuesList"))
}

// Printing the data that exist in the Local Storage While Reloading
getValuesFromLocalStorage()

// Validate all Data is Written?
function validateData(){
    var pname = document.getElementById("pName").value;
    var pprice = document.getElementById("pPrice").value;
    var pCategory = document.getElementById("pCategory").value;
    var pDesc = document.getElementById("pDesc").value;

    if (pname == ""){
        alert("Name is Required");
        return false;
    }

    else if (pprice == ""){
        alert("Price is Required");
        return false;
    }

    else if (pCategory == ""){
        alert("Category is Required");
        return false;
    }

    else if (pDesc == ""){
        alert("Description is Required");
        return false;
    }

    return true;
}

// Add The Inputs to the List
function addProduct(){
    document.querySelector(".searchBar").value = '' // Inacase We're Adding new data while searching to empty the search bar after the adding it

    if (validateData() == true){
        addInputsToArray()
        // Empty The Inputs
        document.getElementById("pName").value = "";
        document.getElementById("pPrice").value = "";
        document.getElementById("pCategory").value = "";
        document.getElementById("pDesc").value = "";
    }
}

// Adding the Inputs To the Array
function addInputsToArray(){
    valuesList.push({
        name : document.getElementById("pName").value,
        price : document.getElementById("pPrice").value,
        category : document.getElementById("pCategory").value,
        Description : document.getElementById("pDesc").value,
    });
    showData(valuesList);
    addValuesToLocalStorage(valuesList)
}

// Printing Data on Browser
function showData(valuesList){
    printLoc.innerHTML = ""; // Empty the Location of the Printing

    // Creating The Tags and Adding The Inputs Values in These Tags For Each Click
    valuesList.forEach((value) => {

        // Inside The tbody --> tr
        var tr = document.createElement("tr");
        tr.className = "input";
        
        // Inside The tr --> td1
        var td1 = document.createElement("td"); // Creating the td
        td1.className = "table2UnderLineValue"; // Creating the Class of the td
        td1.appendChild(document.createTextNode(value.name)); // Append The Text from The Input to the td
        tr.appendChild(td1); // Appedn the td in the tr

        // Inside The tr --> td2
        var td2 = document.createElement("td"); // Creating the td
        td2.className = "table2UnderLineValue"; // Creating the Class of the td
        td2.appendChild(document.createTextNode(value.price)); // Append The Text from The Input to the td
        tr.appendChild(td2); // Appedn the td in the tr

        // Inside The tr --> td3
        var td3 = document.createElement("td"); // Creating the td
        td3.className = "table2UnderLineValue"; // Creating the Class of the td
        td3.appendChild(document.createTextNode(value.category)); // Append The Text from The Input to the td
        tr.appendChild(td3); // Appedn the td in the tr

        // Inside The tr --> td4
        var td4 = document.createElement("td"); // Creating the td
        td4.className = "table2UnderLineValue"; // Creating the Class of the td
        td4.appendChild(document.createTextNode(value.Description)); // Append The Text from The Input to the td
        tr.appendChild(td4); // Appedn the td in the tr

        tr.innerHTML += `<td class = "del-Up" >
                            <button onclick="deleteData(` + valuesList.indexOf(value)  + `)" class = "deleteButton"> Delete </button>
                            <button onclick="updateData(` + valuesList.indexOf(value)  + `)" class = "UpdateButton"> Update </button>
                        </td>`

        printLoc.appendChild(tr);  // Append the tr in the tbody
    })
}

// Adding The New Data To the Local Storage
function addValuesToLocalStorage(valuesList){
    localStorage.setItem("valuesList", JSON.stringify(valuesList));
}

// Getting the data from the local storage if exist,
    /*
        Thats why we add the getting items to a variable then make an if condition to check if the data exist or no because if no nothing happens
    */
function getValuesFromLocalStorage(){
    var data = localStorage.getItem("valuesList");
    if (data){
        var valuesList = JSON.parse(data);
        showData(valuesList);
    };
};

// Deleteing Function Onclick button
function deleteData(valueIndex){
    valuesList.splice(valueIndex,1); // Splice to remove the button by its object using the object index
    localStorage.setItem("valuesList", JSON.stringify(valuesList)); // Adding the new list to the local storage instead of the old
    showData(valuesList) // printing the new list data

    document.querySelector(".searchBar").value = '' // Inacase We're deleting while searching to empty the search bar after the deleteing
}
;

// Edit Function Onclick button
function updateData(valueIndex){
    
    // 1- Clicking Edit Prints the vlaues in the inputs by index
    document.getElementById("pName").value = valuesList[valueIndex].name ;
    document.getElementById("pPrice").value = valuesList[valueIndex].price ;
    document.getElementById("pCategory").value = valuesList[valueIndex].category ;
    document.getElementById("pDesc").value = valuesList[valueIndex].Description ;

    // 2- When Click Edit the new values will be replaced with the old for the same Index
    document.getElementById("edit").onclick = function(){
        valuesList[valueIndex].name = document.getElementById("pName").value
        valuesList[valueIndex].price = document.getElementById("pPrice").value
        valuesList[valueIndex].category = document.getElementById("pCategory").value
        valuesList[valueIndex].Description = document.getElementById("pDesc").value
        
        localStorage.setItem("valuesList", JSON.stringify(valuesList));
        
        showData(valuesList)

        // Clearing the Input Bars
        document.getElementById("pName").value = "";
        document.getElementById("pPrice").value = "";
        document.getElementById("pCategory").value = "";
        document.getElementById("pDesc").value = "";

        document.getElementById("edit").onclick = null; // Making The Edit Button Disapled for the same use
    }
};

// Creating The search bar
function searchBar(SearchVal){
    var tbody = ''
    for(var i = 0; i < valuesList.length; i++){
        if (valuesList[i].name.includes(SearchVal) || valuesList[i].price.includes(SearchVal) || valuesList[i].category.includes(SearchVal) || valuesList[i].Description.includes(SearchVal)){
            
            tbody +=   `<tr>
                            <td class = "table2UnderLineValue" >
                            ${valuesList[i].name}
                            </td>
                            <td class = "table2UnderLineValue" >
                            ${valuesList[i].price}
                            </td>
                            <td class = "table2UnderLineValue" >
                            ${valuesList[i].category}
                            </td>
                            <td class = "table2UnderLineValue" >
                            ${valuesList[i].Description}
                            </td>
                            <td class = "del-Up" >
                                <button onclick="deleteData(` + i + `)" class = "deleteButton"> Delete </button>
                                <button onclick="updateData(` + i + `)" class = "UpdateButton"> Update </button>
                            </td>
                        </tr>
            `
        }
    }
    document.getElementById("rowPrint").innerHTML = tbody;

}



