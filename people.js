function getCaregiverData() {
    const allData = JSON.parse(localStorage.getItem("caregiverData")) || {};
    const currentUser = localStorage.getItem("currentUser");

    if (!allData[currentUser]) {
        allData[currentUser] = {
            medicines: [],
            meals: [],
            rests: [],
            waterLastDone: null,
            people: [],
            logs: []
        };
        localStorage.setItem("caregiverData", JSON.stringify(allData));
    }

    return allData[currentUser];
}

function saveCaregiverData(data) {
    const allData = JSON.parse(localStorage.getItem("caregiverData")) || {};
    const currentUser = localStorage.getItem("currentUser");

    allData[currentUser] = data;
    localStorage.setItem("caregiverData", JSON.stringify(allData));
}

function addPerson() {
    const name = document.getElementById("personName").value;
    const relation = document.getElementById("personRelation").value;
    const photoInput = document.getElementById("personPhoto");

    if (!name || !relation || photoInput.files.length === 0) {
        alert("Please fill all fields");
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {

        let data = getCaregiverData();

        if (!data.people) {
            data.people = [];
        }

        data.people.push({
            name: name,
            relation: relation,
            photo: event.target.result
        });

        saveCaregiverData(data);

        document.getElementById("personName").value = "";
        document.getElementById("personRelation").value = "";
        photoInput.value = "";

        loadPeople();
    };

    reader.readAsDataURL(photoInput.files[0]);
}

function loadPeople() {
    const container = document.getElementById("peopleList");
    container.innerHTML = "";

    let data = getCaregiverData();

    if (!data.people) return;

    data.people.forEach((person, index) => {

        const card = document.createElement("div");
        card.className = "person-card";

        card.innerHTML = `
            <div class="person-info">
                <img src="${person.photo}">
                <div>
                    <strong>${person.name}</strong><br>
                    ${person.relation}
                </div>
            </div>
            <button class="delete-btn" onclick="deletePerson(${index})">Delete</button>
        `;

        container.appendChild(card);
    });
}

function deletePerson(index) {
    let data = getCaregiverData();
    data.people.splice(index, 1);
    saveCaregiverData(data);
    loadPeople();
}

function goBack() {
    window.location.href = "caregiver-dashboard.html";
}

window.onload = loadPeople;
