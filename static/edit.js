

$(document).ready(function() {

    var restaurantId = parseInt($('#restaurant_id').val());

    // Event listener for form submission
    $('#edit_form').on('submit', function(event) {
        event.preventDefault();
        // Call the editRestaurant function to handle the submission
        editRestaurant();
    });

    // Event listener for discard changes button
    $('#discardChanges').on('click', function() {
        if (confirm('Are you sure you want to discard changes?')) {
            // Redirect to view page without saving changes
            window.location.href = '/view/'+ restaurantId;
        }
    });


// Function to edit restaurant data
function editRestaurant() {
    // Reset previous error messages
    console.log("I got here");

    // Get edited values from input fields
    let name = $('#name').val().trim();
    let stars = $('#stars').val().trim();
    let pic = $('#pic').val().trim();
    let hours = constructHoursObject();
    let phone = formatPhoneNumber($('#phone').val().trim());
    let location = $('#location').val()
    let address = $('#address').val().trim();
    let about = $('#about').val().trim();
    let dishes = constructDishesArray();
    //let additionalLocations = [$('#additional_locations').val().trim()];

    // Validate input fields
    if (!inputChecks()) {
        // Prevent form submission if there are validation errors
        return;
    }



    // Construct edited restaurant object
    let editedRestaurant = {
        "name": name,
        "stars": stars,
        "pic": pic,
        "hours": hours,
        "phone": phone,
        "location": location,
        "address": address,
        "about": about,
        "dishes": dishes,
        //"additional_locations": additionalLocations
    };
   

    // Send edited data to server
   

    $.ajax({
        type: 'POST',
        url: '/edit/'+ restaurantId,
        contentType: 'application/json',
        data: JSON.stringify(editedRestaurant),
        success: function(response) {
            console.log("I got here!!");
            // Redirect to view page to see changes
            window.location.href = '/view/'+restaurantId;
        },
        error: function (error) {
            console.error('Failed to edit restaurant', error);
        }
    });
}

// Function to perform input validation
function inputChecks() {
    // Get input values
    let name = $('#name').val().trim();
    let stars = $('#stars').val().trim();
    let pic = $('#pic').val().trim();
    let hours = constructHoursObject();
    let phone = formatPhoneNumber($('#phone').val().trim());
    let location = $('#location').val();
    let address = $('#address').val().trim();
    let about = $('#about').val().trim();
    let dishes = constructDishesArray();
    //let additionalLocations = [$('#additional_locations').val().trim()];

    // Error handling
    let isValid = true;

    // Add validation checks for input fields (similar to add.js)

    // Return true if all validation passes, otherwise return false
    return isValid;
}

// Function to reset error messages
function resetErrors() {
    $('.error').empty(); // Clear error messages
}

// Function to display error message
function showError(message) {
    const errorElement = $('<div>').addClass('error').text(message);
    $('#message').append(errorElement);
    $('#message').show();
    
}

// Function to validate phone number
function formatPhoneNumber(phoneNumber) {
   // Remove all non-digit characters from the phone number string
   const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    
   // Check if the cleaned phone number has 10 digits
   if (cleaned.length === 10) {
       // Format the phone number into (XXX) XXX-XXXX
       return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
   } else {
       // If the phone number does not have 10 digits, return it unchanged
       return phoneNumber;
   }
}

// Function to construct hours object
function constructHoursObject() {
    let hours = {
        "Mon": $('#edit_Mon_opening_hours').val().trim() + ' - ' + $('#edit_Mon_closing_hours').val().trim(),
        "Tue": $('#edit_Tue_opening_hours').val().trim() + ' - ' + $('#edit_Tue_closing_hours').val().trim(),
        "Wed": $('#edit_Wed_opening_hours').val().trim() + ' - ' + $('#edit_Wed_closing_hours').val().trim(),
        "Thu": $('#edit_Thu_opening_hours').val().trim() + ' - ' + $('#edit_Thu_closing_hours').val().trim(),
        "Fri": $('#edit_Fri_opening_hours').val().trim() + ' - ' + $('#edit_Fri_closing_hours').val().trim(),
        "Sat": $('#edit_Sat_opening_hours').val().trim() + ' - ' + $('#edit_Sat_closing_hours').val().trim(),
        "Sun": $('#edit_Sun_opening_hours').val().trim() + ' - ' + $('#edit_Sun_closing_hours').val().trim()
    };
    return hours;
}



// Function to construct dishes array
function constructDishesArray() {
    let dishes = [];
    dishes.push($('#dish1').val().trim())
    dishes.push($('#dish2').val().trim())
    dishes.push($('#dish3').val().trim())
    
    return dishes;
}
});