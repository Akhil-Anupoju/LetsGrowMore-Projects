//Java Script Code
var students = [];
var editIndex = -1;

// Load saved students from localStorage on page load
function loadStudents() {
    var savedStudents = localStorage.getItem('students');
    if (savedStudents) {
        // Parse saved students from localStorage
        students = JSON.parse(savedStudents);
        // Display the saved students in the output box
        displaySavedStudents();
    }
}

// Call loadStudents on window.onload
window.onload = function () {
    loadStudents();
};

// Function to handle form submission
function submitForm() {
    // Retrieve form input values
    var name = document.getElementById('name').value;
    var usn = document.getElementById('usn').value;
    var number = document.getElementById('number').value;
    var course = document.getElementById('course').value;
    var email = document.getElementById('email').value;
    var age = document.getElementById('age').value;
    var gender = document.querySelector('input[name="gender"]:checked');
    var dob = document.getElementById('dob').value;
    var imageInput = document.getElementById('image');

    // Simple validation to ensure all fields are filled
    if (name === '' || usn === '' || number === '' || course === '' || email === '' || age === '' || !gender || dob === '') {
        alert('All fields are required!');
        return;
    }

    // Check if a student with the same USN already exists
    var existingStudentIndex = students.findIndex(function(student) {
        return student.usn === usn;
    });

    // Handle the image input
    var imageSrc = '';
    
    if (imageInput.files.length > 0) {
        var reader = new FileReader();
        reader.onload = function (e) {
            // Get the image source data
            imageSrc = e.target.result;

            if (existingStudentIndex !== -1) {
                // If a student with the same USN exists, update their details instead of creating a new entry
                students[existingStudentIndex] = {
                    name: name,
                    usn: usn,
                    number: number,
                    course: course,
                    email: email,
                    age: age,
                    gender: gender.value,
                    dob: dob,
                    image: imageSrc
                };
            } else {
                // If no existing student found, create a new entry
                students.push({
                    name: name,
                    usn: usn,
                    number: number,
                    course: course,
                    email: email,
                    age: age,
                    gender: gender.value,
                    dob: dob,
                    image: imageSrc
                });
            }

            // Save students to localStorage
            saveStudents();

            // Clear the form
            clearForm();

            // Reload the student details in the output box
            displaySavedStudents();
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        alert('Please select an image!');
    }
}

// Display the saved students in the output box
function displaySavedStudents() {
    var output = document.getElementById('output');
    // Clear the existing content and add a title
    output.innerHTML = '<h3>Student Details</h3>';

    students.forEach(function (student) {
        // Create a new student card for each student
        var studentCard = document.createElement('div');
        studentCard.classList.add('student-card');

        // Populate the student card with details and buttons
        studentCard.innerHTML = `
            <img src="${student.image}" alt="Student Image">
            <p><strong>Name:</strong> ${student.name}</p>
            <p><strong>USN:</strong> ${student.usn}</p>
            <p><strong>Number:</strong> ${student.number}</p>
            <p><strong>Course:</strong> ${student.course}</p>
            <p><strong>Email:</strong> ${student.email}</p>
            <p><strong>Age:</strong> ${student.age}</p>
            <p><strong>Gender:</strong> ${student.gender}</p>
            <p><strong>Date of Birth:</strong> ${student.dob}</p>
            <button class="edit-button" onclick="editStudent(${students.indexOf(student)})">Edit</button>
            <button class="delete-button" onclick="deleteStudent(${students.indexOf(student)})">Delete</button>
        `;

        // Append the student card to the output box
        output.appendChild(studentCard);
    });
}

// Display student details in the output box after manual entry
function displayStudentDetails(name, usn, number, course, email, age, gender, dob, imageSrc) {
    var output = document.getElementById('output');

    // Create a new student card
    var studentCard = document.createElement('div');
    studentCard.classList.add('student-card');

    // Populate the student card with details and buttons
    studentCard.innerHTML = `
        <img src="${imageSrc}" alt="Student Image">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>USN:</strong> ${usn}</p>
        <p><strong>Number:</strong> ${number}</p>
        <p><strong>Course:</strong> ${course}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Age:</strong> ${age}</p>
        <p><strong>Gender:</strong> ${gender}</p>
        <p><strong>Date of Birth:</strong> ${dob}</p>
        <button class="edit-button" onclick="editStudent(${students.length - 1})">Edit</button>
        <button class="delete-button" onclick="deleteStudent(${students.length - 1})">Delete</button>
    `;

    // Append the student card to the output box
    output.appendChild(studentCard);
}

// Clear the form input fields
function clearForm() {
    var genderRadios = document.querySelectorAll('input[name="gender"]');
    genderRadios.forEach(function (radio) {
        radio.checked = false;
    });

    document.getElementById('name').value = '';
    document.getElementById('usn').value = '';
    document.getElementById('number').value = '';
    document.getElementById('course').value = '';
    document.getElementById('email').value = '';
    document.getElementById('age').value = '';
    document.getElementById('dob').value = '';
    document.getElementById('image').value = '';
}

// Edit a student's details
function editStudent(index) {
    // Set the editIndex to the current index
    editIndex = index;

    // Retrieve the student details from the array
    var student = students[index];

    // Populate the form with the student details for editing
    document.getElementById('name').value = student.name;
    document.getElementById('usn').value = student.usn;
    document.getElementById('number').value = student.number;
    document.getElementById('course').value = student.course;
    document.getElementById('email').value = student.email;
    document.getElementById('age').value = student.age;

    // Check the appropriate radio button for gender
    var genderRadios = document.querySelectorAll('input[name="gender"]');
    for (var i = 0; i < genderRadios.length; i++) {
        if (genderRadios[i].value === student.gender) {
            genderRadios[i].checked = true;
            break;
        }
    }

    document.getElementById('dob').value = student.dob;

    // Remove only the selected student card from the details box
    var output = document.getElementById('output');
    
    // Get all existing student cards
    var existingCards = output.getElementsByClassName('student-card');
    
    // Find and remove only the selected card by index
    if (existingCards.length > index) {
        existingCards[index].remove();
    }
}

// Delete a student's details
function deleteStudent(index) {
    // Remove the student from the array
    students.splice(index, 1);
    
    // Save updated students to localStorage
    saveStudents();
    
    // Reload students in the output box
    loadStudents();
}

// Save students to localStorage
function saveStudents() {
    localStorage.setItem('students', JSON.stringify(students));
}
