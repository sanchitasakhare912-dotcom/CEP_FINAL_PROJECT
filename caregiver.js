function getCaregiverData() {
    const allData = JSON.parse(localStorage.getItem("caregiverData")) || {};
    const currentUser = localStorage.getItem("currentUser");

    if (!currentUser) return {};

    if (!allData[currentUser]) {
        allData[currentUser] = {
            medicines: [],
            meals: [],
            rests: [],
            people: [],
            waterLastDone: null,
            logs: []
        };
        localStorage.setItem("caregiverData", JSON.stringify(allData));
    }

    return allData[currentUser];
}

function saveCaregiverData(data) {
    const allData = JSON.parse(localStorage.getItem("caregiverData")) || {};
    const currentUser = localStorage.getItem("currentUser");

    if (!currentUser) return;

    allData[currentUser] = data;
    localStorage.setItem("caregiverData", JSON.stringify(allData));
}

function goMedicine() {
   window.location.href = "set-medicine.html";
}
function goRoutine() {
    window.location.href = "edit-routine.html";
}
function goPeople() {
    window.location.href = "people.html";  // CAREGIVER ADD PAGE
}

function goPatientPeople() {
    window.location.href = "patient-people.html";  // VIEW ONLY PAGE
}
function goCaregiverPeople() {
    window.location.href = "people.html";
}
function addPerson() {
    const name = document.getElementById("personName").value;
    const relation = document.getElementById("personRelation").value;
    const phone = document.getElementById("personPhone").value;

    if (!name || !relation || !phone) {
        alert("Please fill all fields");
        return;
    }

    let data = getCaregiverData();

    if (!data.people) {
        data.people = [];
    }

    data.people.push({
        name: name,
        relation: relation,
        phone: phone
    });

    saveCaregiverData(data);

    document.getElementById("personName").value = "";
    document.getElementById("personRelation").value = "";
    document.getElementById("personPhone").value = "";

    loadPeople();
}

function loadPeople() {
    let data = getCaregiverData();
    const list = document.getElementById("peopleList");

    if (!list) return;

    list.innerHTML = "";

    if (!data.people) return;

    data.people.forEach((person, index) => {
        const div = document.createElement("div");

        div.innerHTML = `
            <p><strong>${person.name}</strong></p>
            <p>${person.relation}</p>
            <p>${person.phone}</p>
            <button onclick="deletePerson(${index})">Delete</button>
            <hr>
        `;

        list.appendChild(div);
    });
}
function deletePerson(index) {
    let data = getCaregiverData();

    data.people.splice(index, 1);

    saveCaregiverData(data);
    loadPeople();
}

window.onload = function() {
    loadPeople();
};
function goManageReminders() {
    window.location.href = "manage-reminders.html";
}
function savePatient(){
    const name = document.getElementById("patientName").value;
    const age = document.getElementById("patientAge").value;
    const condition = document.getElementById("patientCondition").value;
    const contact = document.getElementById("patientContact").value;

    const patient = {
        name,
        age,
        condition,
        contact
    };

    localStorage.setItem("patientInfo", JSON.stringify(patient));

    alert("Patient info saved");
}
function savePreferences() {

const language = document.getElementById("defaultLanguage").value;
const textSize = document.getElementById("textSize").value;

const preferences = {
language: language,
textSize: textSize
};

localStorage.setItem("preferences", JSON.stringify(preferences));

alert("Preferences saved successfully");

}
function openPreferences(){
    window.location.href = "preferences.html";
}

function openPatientOverview(){
    window.location.href = "patient-overview.html";
}
function savePreferences(){

const lang = document.getElementById("languageSelect").value;

localStorage.setItem("patientLanguage", lang);

alert("Language saved successfully");

}
function savePatientOverview(){

const name = document.getElementById("patientName").value;
const age = document.getElementById("patientAge").value;
const condition = document.getElementById("patientCondition").value;
const contact = document.getElementById("patientContact").value;

const patient = {
name,
age,
condition,
contact
};

localStorage.setItem("patientInfo", JSON.stringify(patient));

alert("Patient information saved successfully");

}