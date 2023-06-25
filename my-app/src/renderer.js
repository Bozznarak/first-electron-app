const information = document.getElementById('info');
const div = document.querySelector(".test-div");
const span = document.querySelector(".test-d-span");


const text = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

information.addEventListener("click", (event) => {
    console.log(event)
    div.innerHTML = text;
    div.style.display = "block";
})

const submitBtn = document.getElementById("nameBtn");
const nameInput = document.getElementById("name")
submitBtn.addEventListener("click", () => {
    if(nameInput.value == "") return;
    window.api.insertName(nameInput.value);
    nameInput.value = "";
    updateNamesDiv();
});


const updateNamesDiv = async () => {
    const namesDiv = document.getElementById("allNames");
    try {
        const names = await window.api.getAllNames();
        if(names[0].length < 1){
            namesDiv.innerHTML = "Momentan sind keine Namen verfügbar";
            return;
        }
        const htmlArr = names.map(item => {
            return `<span>${item.name || "kein Name verfügbar"}</span>`
        });

        const htmlString = htmlArr.join("<br>");

        namesDiv.innerHTML = htmlString;

    } catch (e) {
        console.log(e);
    }

}


