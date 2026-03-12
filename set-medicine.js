/* ================= GET CAREGIVER DATA ================= */

function getCaregiverData() {

    const currentUser = localStorage.getItem("currentUser");

    if (!currentUser) {
        console.log("No current user found");
        return null;
    }

    const allData = JSON.parse(localStorage.getItem("caregiverData")) || {};

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

/* ================= SAVE CAREGIVER DATA ================= */

function saveCaregiverData(data) {
    const allData = JSON.parse(localStorage.getItem("caregiverData")) || {};
    const currentUser = localStorage.getItem("currentUser");

    if (!currentUser) return;

    allData[currentUser] = data;
    localStorage.setItem("caregiverData", JSON.stringify(allData));
}

/* ================= ADD MEDICINE ================= */

function addMedicine() {
    const name = document.getElementById("medName").value.trim();
    const time = document.getElementById("medTime").value;

    if (!name || !time) {
        alert("Please fill all fields");
        return;
    }

    let data = getCaregiverData();

    data.medicines.push({
        name: name,
        time: time,
        done: false
    });

    saveCaregiverData(data);

    // Clear inputs
    document.getElementById("medName").value = "";
    document.getElementById("medTime").value = "";

    loadMedicines();
}

/* ================= DISPLAY LIST ================= */

function loadMedicines() {
    let data = getCaregiverData();

    if (!data) return;  // ✅ important

    const list = document.getElementById("medicineList");
    list.innerHTML = "";


    if (!data.medicines || data.medicines.length === 0) {
        list.innerHTML = "<p>No medicines added yet</p>";
        return;
    }

    data.medicines.forEach((med, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${med.name}</strong> - ${med.time}
            <button onclick="deleteMedicine(${index})">Delete</button>
        `;

        list.appendChild(li);
    });
}

/* ================= DELETE ================= */

function deleteMedicine(index) {
    let data = getCaregiverData();

    if (!data.medicines) return;

    data.medicines.splice(index, 1);
    saveCaregiverData(data);
    loadMedicines();
}

/* ================= BACK ================= */

function goBack() {
    window.location.href = "caregiver-dashboard.html";
}

/* ================= ON LOAD ================= */

window.onload = function () {
    loadMedicines();
};
