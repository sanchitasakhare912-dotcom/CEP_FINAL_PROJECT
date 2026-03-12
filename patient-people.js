function getCaregiverData() {
    const allData = JSON.parse(localStorage.getItem("caregiverData")) || {};
    const currentUser = localStorage.getItem("currentUser");
    return allData[currentUser] || {};
}

function loadPeople() {

    const container = document.getElementById("peopleContainer");
    container.innerHTML = "";

    const data = getCaregiverData();

    if (!data.people || data.people.length === 0) {
        container.innerHTML = "<p>No family members added yet.</p>";
        return;
    }

    data.people.forEach(person => {

        const div = document.createElement("div");

        div.innerHTML = `
            <img src="${person.photo}" width="120"><br>
            <strong>${person.name}</strong><br>
            <p>${person.relation}</p>
            <hr>
        `;

        container.appendChild(div);
    });
}

function goBack() {
    window.location.href = "patient-dashboard.html";
}

window.onload = loadPeople;
