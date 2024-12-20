// Get the elements
const menuButton = document.querySelector('.menu-icon');
const sidebar = document.querySelector('.sidebar');
const contentContainer = document.querySelector('.content-container');
const topbar = document.querySelector('.topbar');

// Add click event listener on menu button
menuButton.addEventListener('click', function() {
    // Toggle the 'active' class on the sidebar to show/hide it
    sidebar.classList.toggle('active');
    
    // Toggle the 'sidebar-active' class on content and topbar to move them
    contentContainer.classList.toggle('sidebar-active');
    topbar.classList.toggle('sidebar-active');
});


// Get modal element
const modal = document.getElementById('booking-modal');

// Function to open the modal
function openModal() {
    modal.classList.add('show'); // Add the 'show' class to make the modal visible
}

// Function to close the modal
function closeModal() {
    modal.classList.remove('show'); // Remove the 'show' class to hide the modal
}

// Open the modal only when "Book Now" buttons are clicked
document.querySelector('.book-now-btn').addEventListener('click', openModal);
document.querySelector('.book-now-secondary-btn').addEventListener('click', openModal);

// Close the modal when clicking on the close button or cancel
document.querySelector('.modal-close-btn').addEventListener('click', closeModal);
document.querySelector('.cancel-btn').addEventListener('click', closeModal);


function saveBooking() {
    // Collect the selected option's text (not the value)
    const course = document.getElementById('course').options[document.getElementById('course').selectedIndex].text;
    const trainee = document.getElementById('trainee').options[document.getElementById('trainee').selectedIndex].text;
    const date = document.getElementById('date').value;
    const slot = document.getElementById('slot').options[document.getElementById('slot').selectedIndex].text;

    // Update the "My Special Classes" section with the selected values
    document.getElementById('selected-course').innerText = `${course}`;
    document.getElementById('selected-trainee').innerText = `Trainee: ${trainee}`;
    document.getElementById('selected-date-text').innerText = date;
    document.getElementById('selected-slot-text').innerText = slot;

    // Hide "no booking" message and show booking details
    document.querySelector('.no-booking').classList.add('hidden');
    document.getElementById('class-booking-details').classList.remove('hidden');

    // Close the modal
    closeModal();
}


function editBooking() {
    // Get the current values from the "My Special Classes" section
    const course = document.getElementById('selected-course').innerText.replace('Course: ', '');
    const trainee = document.getElementById('selected-trainee').innerText.replace('Trainee: ', '');
    const dateTime = document.getElementById('selected-date-text').innerText;
    const slot = document.getElementById('selected-slot-text').innerText;

    // Set the values in the modal's form fields
    document.getElementById('course').value = course;
    document.getElementById('trainee').value = trainee;
    document.getElementById('date').value = dateTime;
    
    // Set slot value in the modal (you can match the slot text if necessary)
    const slotSelect = document.getElementById('slot');
    for (let i = 0; i < slotSelect.options.length; i++) {
        if (slotSelect.options[i].text === slot) {
            slotSelect.selectedIndex = i;
            break;
        }
    }

    // Open the modal for editing
    openModal();
}




