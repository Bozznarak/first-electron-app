// #################################################### IMPORTANT GLOBALS #############################################
const sections = document.querySelectorAll("body section");

document.addEventListener("keypress", (e) => {
    if(e.key === "Enter" && document.querySelector('.house-table td input') && document.activeElement === document.querySelector('.house-table td input')){
        document.activeElement.blur();
    }
});

// #################################################### NAVIGATION ####################################################
const hideAllElements = () => {
    return new Promise((resolve, reject) => {
        sections.forEach(element => element.style.display = "none")
        resolve();
    });
}

document.querySelector(".click-house-section").addEventListener("click", async (e) => {
    await hideAllElements();
    loadAllHousesIntoDiv();
    document.querySelector(".create-house-section").style.display = "block";
});

document.querySelector(".click-start-section").addEventListener("click", async (e) => {
    await hideAllElements();
    document.querySelector(".starting-section").style.display = "block";
})

document.querySelector(".click-apartment-section").addEventListener("click", async (e) => {
    await hideAllElements();
    await showHousesSelection();
    document.querySelector(".create-apartment-section").style.display = "block";
})

// #################################################### HOUSE SECTION #################################################
const createHouse = () => {
    const input = document.querySelector("#houseDesignation");
    const designation = input.value;
    if(designation.length > 0){
        window.houseApi.createHouse(designation);
        input.value = "";
        loadAllHousesIntoDiv();
    } else {
        alert("Bezeichnung vom Haus ist leer, bitte trage etwas ein");
    }
}
document.querySelector("#houseSubmit").addEventListener("click", createHouse);

const loadAllHousesIntoDiv = async () => {
    const div = document.querySelector(".all-houses-div");
    try {
        const houses = await window.houseApi.allHouses();
        // TABLE
        if(houses && houses.length > 0)
        {
            div.innerHTML = `<table class="house-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Bezeichnung</th>
                                        <th>löschen</th>
                                        <th>bearbeiten</th>
                                    </tr>
                                </thead>
                            </table>`;
            const tBody = document.createElement("tbody");
            houses.map(house => {
                const {id, designation} = house
                const newRow = document.createElement("tr");
                const idTd = document.createElement("td")
                idTd.innerHTML = id;
                const designationTd = document.createElement("td");
                designationTd.innerHTML = designation;
                const deleteTd = document.createElement("td");
                deleteTd.innerHTML = "&#128465";
                deleteTd.addEventListener("click", () => {
                    window.houseApi.deleteHouse(id);
                    loadAllHousesIntoDiv(); //reload
                });
                const editTd = document.createElement("td");
                editTd.innerHTML = "&#9998;";
                editTd.addEventListener("click", (e) => {
                    designationTd.innerHTML = `<input type="text" value="${designationTd.innerHTML}"/>`;
                    document.querySelector(".house-table td input").focus();
                    document.querySelector(".house-table td input").addEventListener("blur", (e) => {
                        designationTd.innerHTML = document.querySelector(".house-table td input").value;
                        const houseObj = {
                            id: id,
                            designation: designationTd.innerHTML
                        };
                        window.houseApi.updateHouse(houseObj);
                    });
                })
                newRow.append(idTd, designationTd, deleteTd, editTd);
                tBody.insertAdjacentElement("beforeend", newRow);
            });
            document.querySelector(".house-table").insertAdjacentElement("beforeend", tBody)
        } else {
            div.innerHTML = "Keine Häuser verfügbar";
        }
    } catch (error) {
        console.log(error); 
        throw new Error(error);
    }
    
}

// #################################################### APARTMENT SECTION #############################################
const showHousesSelection = () => {
    return new Promise(async (resolve, reject) => {
       const houses = await window.houseApi.allHouses();
       if(houses && houses.length > 0){
            const selector = document.querySelector("#house-selector");
            selector.innerHTML = "";
            houses.map(house => {
                selector.insertAdjacentHTML("beforeend", `<option house-id="${house.id}">${house.designation}</option>`);
            });  
       } else {
        reject();
       }
       showApartmentsFromSelectedHouse();
       resolve();
    });
}

const createApartment = () => {
    const apartDesignation = document.querySelector("#apartDesignation").value;
    if(apartDesignation !== "")
    {
        const selector = document.querySelector("#house-selector");
        const houseId = selector.options[selector.selectedIndex].getAttribute("house-id");

        const apartObj = {
            houseId: houseId,
            designation: apartDesignation
        };
        window.apartmentApi.createApartment(apartObj);

        apartDesignation.value = "";
        showApartmentsFromSelectedHouse();
    }
}
document.querySelector("#apartSubmit").addEventListener("click", createApartment)

const showApartmentsFromSelectedHouse = async () => {
    const selector = document.querySelector("#house-selector");
    const houseId = selector.options[selector.selectedIndex].getAttribute("house-id");

    const apartments = await window.apartmentApi.showApartmentsFromHouse(houseId);
    
    console.log(apartments);

    const div = document.querySelector("#apartments-for-house");
    div.innerHTML = "";
    div.innerHTML = `   <table id="apartmentTable">
                            <thead>
                                <th>Hausbezeichnung</th>
                                <th>Wohnungesbezeichnung</th>
                            </thead>
                        </table>`;
    const table = document.querySelector("#apartmentTable");
    const tbody = document.createElement("tbody");

    apartments.forEach(apartment => {
        const {houseDes, apartDes, id} = apartment;
        tbody.insertAdjacentHTML("beforeend",`  <tr>
                                                    <td>${houseDes}</td>
                                                    <td>${apartDes}</td>
                                                </tr>`)
    });
    table.insertAdjacentElement("beforeend", tbody);
}
document.querySelector("#house-selector").addEventListener("change", showApartmentsFromSelectedHouse);

// #################################################### NAMES TESTING AREA ############################################
// const submitBtn = document.getElementById("nameBtn");
// const nameInput = document.getElementById("name");
// submitBtn.addEventListener("click", () => {
//     if(nameInput.value == "") return;
//     window.api.insertName(nameInput.value);
//     nameInput.value = "";
//     updateNamesDiv();
// });

// const updateNamesDiv = async () => {
//     const namesDiv = document.getElementById("allNames");
//     namesDiv.innerHTML = "";
//     try {
//         const names = await window.api.getAllNames();
//         if(names[0].length < 1){
//             namesDiv.innerHTML = "Momentan sind keine Namen verfügbar";
//             return;
//         }
//         names.map(item => {
//             const div = document.createElement("div");
//             div.classList.add("singleNameDiv")
//             const nameSpan = document.createElement("span");
//             nameSpan.innerHTML = item.name || "kein Name verfügbar";
//             const delSpan = document.createElement("span");
//             delSpan.innerHTML = "Entfernen";
//             delSpan.addEventListener("click", (e) => {
//                 console.log(item);
//                 deleteName(item.id);
//             });
//             div.append(nameSpan, delSpan);
//             namesDiv.append(div);
//         });
//     } catch (e) {
//         console.log(e);
//     }
// }
// const deleteName = (id) => {
//     window.api.deleteName(id);
//     updateNamesDiv();
// }



