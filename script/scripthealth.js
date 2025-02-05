// document.getElementById("btnLogout").addEventListener("click", () => {
//     logout()
// })

// function logout() {
//     localStorage.setItem("isLogin", false)
//     localStorage.removeItem("user")
//     window.location.href = 'login.html'
// }


//======= Burn Calories DOM ========//

// Get references to DOM elements
const workoutForm = document.getElementById('workout-form');
const workoutNameInput = document.getElementById('workout-name');
const caloriesBurnedInput = document.getElementById('calories-burned');
const workoutsList = document.getElementById('workouts');
const totalCaloriesDisplay = document.getElementById('total-calories');

let workouts = []; // Array to store workout data
let totalCalories = 0; // Variable for total calories burned

// Chart.js chart instance for displaying calories burned data
let caloriesChart;

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadWorkouts(); // Load any previously saved workouts
    initChart(); // Initialize the chart
    updateTotalCalories(); // Update the total calories display
});

// Event listener for form submission
workoutForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission
    addWorkout(); // Add the new workout to the list
    workoutForm.reset(); // Clear the form inputs after submission
});

// Load workouts from local storage
function loadWorkouts() {
    const storedWorkouts = localStorage.getItem('workouts'); // Get workouts from storage
    if (storedWorkouts) {
        workouts = JSON.parse(storedWorkouts); // Parse saved workouts
        workouts.forEach(workout => displayWorkout(workout)); // Display each workout
        updateTotalCalories(); // Update total calories
    }
}

// Save workouts to local storage
function saveWorkouts() {
    localStorage.setItem('workouts', JSON.stringify(workouts)); // Store workouts array
}

// Add a workout to the list
function addWorkout() {
    const workoutName = workoutNameInput.value.trim(); // Get workout name
    const caloriesBurned = parseInt(caloriesBurnedInput.value.trim()); // Get calories burned

    // Validation: Check if inputs are valid
    if (workoutName === '' || isNaN(caloriesBurned) || caloriesBurned <= 0) {
        alert('Please enter valid workout details.');
        return; // Stop execution if invalid
    }

    // Create a new workout object
    const workout = {
        id: Date.now(), // Unique identifier
        name: workoutName, // Workout name
        calories: caloriesBurned // Calories burned
    };

    workouts.push(workout); // Add to workouts array
    displayWorkout(workout); // Display workout in the list
    updateTotalCalories(); // Update total calories
    saveWorkouts(); // Save to local storage
    updateChart(); // Update the chart
}

// Display the workout in the list
function displayWorkout(workout) {
    const li = document.createElement('li'); // Create a list item element
    li.dataset.id = workout.id; // Add unique ID to the element

    // Populate the list item with workout details and a delete button
    li.innerHTML = `
        <span>${workout.name}</span>
        <span>${workout.calories} Calories</span>
        <button class="delete-btn">&times;</button>
    `;

    // Event listener for delete button
    li.querySelector('.delete-btn').addEventListener('click', function () {
        deleteWorkout(workout.id); // Delete the workout on click
    });

    workoutsList.appendChild(li); // Add the list item to the workouts list
}

// Delete a workout by its ID
function deleteWorkout(id) {
    workouts = workouts.filter(workout => workout.id !== id); // Remove from array
    const workoutItem = workoutsList.querySelector(`[data-id='${id}']`); // Get the DOM element
    if (workoutItem) {
        workoutsList.removeChild(workoutItem); // Remove from DOM
    }
    updateTotalCalories(); // Update total calories
    saveWorkouts(); // Save updated list to local storage
    updateChart(); // Update chart with new data
}

// Update the total calories burned display
function updateTotalCalories() {
    totalCalories = workouts.reduce((total, workout) => total + workout.calories, 0); // Sum calories
    totalCaloriesDisplay.textContent = totalCalories; // Update DOM
}

// Initialize the chart using Chart.js
function initChart() {
    const ctx = document.getElementById('caloriesChart').getContext('2d');
    caloriesChart = new Chart(ctx, {
        type: 'bar', // Bar chart type
        data: {
            labels: workouts.map(workout => workout.name), // Workout names as labels
            datasets: [{
                label: 'Calories Burned',
                data: workouts.map(workout => workout.calories), // Calories burned as data
                backgroundColor: 'rgba(2, 109, 145, 0.6)', // Bar color
                borderColor: 'rgba(2, 109, 145, 0.6)', // Bar border color
                borderWidth: 1
            }]
        },
        options: {
            responsive: true, // Responsive for different screen sizes
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Workout' // X-axis label
                    }
                },
                y: {
                    beginAtZero: true, // Y-axis starts at zero
                    title: {
                        display: true,
                        text: 'Calories Burned' // Y-axis label
                    }
                }
            }
        }
    });
}

// Update the chart with new data
function updateChart() {
    caloriesChart.data.labels = workouts.map(workout => workout.name); // Update labels
    caloriesChart.data.datasets[0].data = workouts.map(workout => workout.calories); // Update data
    caloriesChart.update(); // Refresh the chart
}

//////////////////////////////////////////////////////////////////////////////////////////
//============== fitnes DOM =====================//
/////////////////////////////////////////////////////////////////////////////////////////

// script.js

const editIcon = `<i class="fas fa-edit"></i>`

const deleteIcon = `<i class="fas fa-trash"></i>`

function clearInputs() {
    wInput.value = ""
    eInput.value = ""
    bInput.value = ""
}

function addToLocalStorage() {
    localStorage.setItem("date", JSON.stringify(date))
    localStorage.setItem("water", JSON.stringify(water))
    localStorage.setItem("exercise", JSON.stringify(exercise))
    localStorage.setItem("bloodsugar", JSON.stringify(bloodsugar))
}

function activateEdit(i) {
    wInput.value = water[i]
    eInput.value = exercise[i]
    bInput.value = bloodsugar[i]
    editIndex = i
    submitButton.classList.add("hidden")
    editSection.classList.remove("hidden")
}

function cancelEdit() {
    clearInputs()
    editIndex = -1
    submitButton.classList.remove("hidden")
    editSection.classList.add("hidden")
}

function editRow() {
    if (editIndex == -1) return
    water[editIndex] = wInput.value
    exercise[editIndex] = eInput.value
    bloodsugar[editIndex] = bInput.value
    fillTable()
    addToLocalStorage()
    cancelEdit()
}

function deleteRow(i) {
    if (!confirm(
        `Confirm that you want to delete the entry: 
    \n ${date[i]}: ${water[i]}ml, ${exercise[i]}min, 
${bloodsugar[i]}mg/dL`))
        return
    date.splice(i, 1)
    water.splice(i, 1)
    exercise.splice(i, 1)
    bloodsugar.splice(i, 1)
    document.querySelector(`#output > tr:nth-child(${i + 1})`)
        .classList.add("delete-animation")
    addToLocalStorage()
    setTimeout(fillTable, 500)
}

function fillTable() {
    const tbody = document.getElementById("output")
    const rows =
        Math.max(water.length, exercise.length, bloodsugar.length)
    let html = ""
    for (let i = 0; i < rows; i++) {
        let w = water[i] || "N/A"
        let e = exercise[i] || "N/A"
        let b = bloodsugar[i] || "N/A"
        let d = date[i] || "N/A"
        html += `<tr>
            <td>${d}</td>
            <td>${w}</td>
            <td>${e}</td>
            <td>${b}</td>
            <td>
                <button onclick="activateEdit(${i})" 
                        class="edit">${editIcon}
                </button>
            </td>
            <td>
                <button 
                    onclick="deleteRow(${i})" 
                    class="delete">${deleteIcon}
                </button>
            </td>
        </tr>`
    }
    tbody.innerHTML = html;
}

let editIndex = -1;

let date =
    JSON.parse(localStorage.getItem("date")) || []
let water =
    JSON.parse(localStorage.getItem("water")) || []
let exercise =
    JSON.parse(localStorage.getItem("exercise")) || []
let bloodsugar =
    JSON.parse(localStorage.getItem("bloodsugar")) || []

const wInput = document.getElementById("water")
const eInput = document.getElementById("exercise")
const bInput = document.getElementById("bloodsugerlevel")

const submitButton = document.getElementById("submit")
const editSection = document.getElementById("editSection")

fillTable()

submitButton.addEventListener("click", () => {
    const w = wInput.value || null;
    const e = eInput.value || null;
    const b = bInput.value || null;
    if (w === null || e === null || b === null) {
        alert("Please enter all the fields.")
        return
    }
    const d = new Date().toLocaleDateString()
    date = [d, ...date]
    water = [w, ...water]
    exercise = [e, ...exercise]
    bloodsugar = [b, ...bloodsugar]
    // date.push(d)
    // water.push(w)
    // exercise.push(e)
    // bloodsugar.push(b)
    clearInputs()
    fillTable()
    addToLocalStorage()
})
