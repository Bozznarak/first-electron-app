// #################################################### IMPORTANT GLOBALS #############################################
const sections = document.querySelectorAll("body section");

// #################################################### NAVIGATION ####################################################
const hideAllElements = () => {
    return new Promise((resolve, reject) => {
        sections.forEach(element => element.style.display = "none")
        resolve();
    });
}

document.querySelector(".click-house-section").addEventListener("click", async (e) => {
    await hideAllElements();
    document.querySelector(".create-house-section").style.display = "block";
});

document.querySelector(".click-start-section").addEventListener("click", async (e) => {
    await hideAllElements();
    document.querySelector(".starting-section").style.display = "block";
})

// #################################################### NAMES TESTING AREA ############################################
const submitBtn = document.getElementById("nameBtn");
const nameInput = document.getElementById("name");
submitBtn.addEventListener("click", () => {
    if(nameInput.value == "") return;
    window.api.insertName(nameInput.value);
    nameInput.value = "";
    updateNamesDiv();
});

const updateNamesDiv = async () => {
    const namesDiv = document.getElementById("allNames");
    namesDiv.innerHTML = "";
    try {
        const names = await window.api.getAllNames();
        if(names[0].length < 1){
            namesDiv.innerHTML = "Momentan sind keine Namen verfügbar";
            return;
        }
        names.map(item => {
            const div = document.createElement("div");
            div.classList.add("singleNameDiv")
            const nameSpan = document.createElement("span");
            nameSpan.innerHTML = item.name || "kein Name verfügbar";
            const delSpan = document.createElement("span");
            delSpan.innerHTML = "Entfernen";
            delSpan.addEventListener("click", (e) => {
                console.log(item);
                deleteName(item.id);
            });
            div.append(nameSpan, delSpan);
            namesDiv.append(div);
        });
    } catch (e) {
        console.log(e);
    }
}
const deleteName = (id) => {
    window.api.deleteName(id);
    updateNamesDiv();
}

// #################################################### HOUSE SECTION #################################################
const showHouseSection = () => {
    document.querySelector(".")
}


