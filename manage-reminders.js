function loadReminderSettings() {
    let data = getCaregiverData();

    document.getElementById("medicineReminder").checked =
        data.reminderSettings.medicine;

    document.getElementById("mealReminder").checked =
        data.reminderSettings.meal;

    document.getElementById("restReminder").checked =
        data.reminderSettings.rest;
}

function saveReminderSettings() {
    let data = getCaregiverData();

    data.reminderSettings.medicine =
        document.getElementById("medicineReminder").checked;

    data.reminderSettings.meal =
        document.getElementById("mealReminder").checked;

    data.reminderSettings.rest =
        document.getElementById("restReminder").checked;

    saveCaregiverData(data);

    alert("Reminder settings saved ✅");
}

window.onload = loadReminderSettings;

function testReminder() {
    const sound = new Audio("alarm.mp3");
    sound.play();
}

function goBack() {
    window.location.href = "caregiver-dashboard.html";
}

window.onload = loadReminderSettings;
function saveReminderSettings() {

const medicine = document.getElementById("medicineReminder").checked;
const meal = document.getElementById("mealReminder").checked;
const rest = document.getElementById("restReminder").checked;
const water = document.getElementById("waterReminder").checked;
const interval = document.getElementById("waterInterval").value;

const reminderSettings = {
medicine,
meal,
rest,
water,
interval
};

localStorage.setItem("reminderSettings", JSON.stringify(reminderSettings));

alert("Reminder settings saved");

}