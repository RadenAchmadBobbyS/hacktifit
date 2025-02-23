$(document).ready(function(){
    // Add smooth scrolling to all links in navbar + footer link
    $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
  
        // Store hash
        var hash = this.hash;
  
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 900, function(){
     
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });
    
    $(window).scroll(function() {
      $(".slideanim").each(function(){
        var pos = $(this).offset().top;
  
        var winTop = $(window).scrollTop();
          if (pos < winTop + 600) {
            $(this).addClass("slide");
          }
      });
    });
  })

//   WORKOUT

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
    li.querySelector('.delete-btn').addEventListener('click', function() {
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
                backgroundColor: 'rgba(51, 166, 242, 0.6)', // Bar color
                borderColor: 'rgba(51, 166, 242, 0.6)', // Bar border color
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

/// ======================== Health tracker ================================== //

// script.js

const editIcon = `<i class="fas fa-edit"></i>`

const deleteIcon = `<i class="fas fa-trash"></i>`

function clearInputs() {
    wInput.value = ""
    eInput.value = ""
    bInput.value = ""
}

function addToLocalStorage(){
    localStorage.setItem("date", JSON.stringify(date))
    localStorage.setItem("water", JSON.stringify(water))
    localStorage.setItem("exercise", JSON.stringify(exercise))
    localStorage.setItem("bloodsugar", JSON.stringify(bloodsugar))
}


function fillTable(){
    const tbody = document.getElementById("output")
    const rows = 
        Math.max(water.length, exercise.length, bloodsugar.length)
    let html = ""

    for(let i=0; i<rows; i++){
        let w = water[i] || "N/A"
        let e = exercise[i] || "N/A"
        let b = bloodsugar[i] || "N/A"
        let d = date[i] || "N/A"
        html+=`<tr>
            <td>${d}</td>
            <td>${w}</td>
            <td>${e}</td>
            <td>${b}</td>
              </tr>`        
    }
    tbody.innerHTML = html;
}

const spanResult = document.getElementById("result")
const total = document.getElementById("total-calories")


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


function showInformation() {
    let user = JSON.parse(localStorage.getItem('user'))
    const users = document.getElementById('users')
    const userss = document.getElementById('userss')
    users.innerHTML = `${user['nama_lengkap']}`
    userss.innerHTML = `${user['nama_lengkap']}`
}
showInformation()


function showTotalCalories() {
    let workouts = JSON.parse(localStorage.getItem('workouts'))
    const result = document.getElementById('result')
    let totalCalories = 0
    for (let workout of workouts) {
        totalCalories += workout['calories']
    }
    let msg = ''

    if (totalCalories < 1000) {
        msg = `Anda disarankan untuk mengurangi kalori sebesar 1.000 kkal per hari untuk menurunkan berat badan sebesar 0,5 – 1 kilogram dalam seminggu. Anda sudah membakar kalori sebanyak ${totalCalories} kalori.`
    } else if (totalCalories > 1000) {
        msg = `Anda sudah mengurangi kalori sebesar ${totalCalories} kkal, anda hebat`
    }
    result.innerHTML = `${msg}`
}
showTotalCalories()

function showTotalWater() {
    let waters = JSON.parse(localStorage.getItem('water')) 
    const result2 = document.getElementById('result2')
    let totalWater = 0
    for (let water of waters) {
        totalWater += Number(water)
    }
    let msg = ''
    let min = 1840 // mililiter

    if (totalWater < min) {
        msg = `Konsumsi air putih yang disarankan yaitu sekitar delapan gelas berukuran 230 ml per hari atau total 2 liter. Hari ini anda baru meminum ${totalWater} ml, Anda perlu meminum ${totalWater - min} ml lagi untuk mencukupi kebutuhan air perhari`
    } else if (totalWater > min) {
        msg = `Hari ini anda sudah mencukupi konsumsi air putih yang disarankan, yaitu sebanyak ${totalWater}`
    }
    result2.innerHTML = `${msg}`
}

showTotalWater()
