const information = document.getElementById('info');
const div = document.querySelector(".test-div");
const span = document.querySelector(".test-d-span");


const text = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

information.addEventListener("click", (event) => {
    console.log(event)
    div.innerHTML = text;
    div.style.display = "block";
})


