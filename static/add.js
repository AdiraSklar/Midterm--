$(document).ready(function() {
    aboutInputTracker(); 

// Add an event listener for the keydown event on all input fields
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('keydown', function(event) {
        // Check if the pressed key is Enter (key code 13)
        if (event.keyCode === 13) {
            // Prevent the default form submission behavior
            event.preventDefault();

            // Find the index of the current input field in the form
            const currentIndex = Array.from(this.form.elements).indexOf(this);

            // Find the next input field in the form
            const nextInput = this.form.elements[currentIndex + 1];

            // Move focus to the next input field if it exists
            if (nextInput) {
                nextInput.focus();
            }
        }
    });
});

// Event listener for form submission
$('#info_form').on('submit', function(event) {
    
    event.preventDefault();
    // Call the inputChecks function to perform validation
    if (!inputChecks()) {
        event.preventDefault(); // Prevent form submission if there are validation errors
    }
});

$('#submit_button').click(function() {
    console.log("clicked!!")
    resetErrors(); // Reset errors when the submit button is clicked
});


// Hide the view item button initially
$('#viewItemButton').hide();

$('#viewItemButton').click(function() {
    // Retrieve the stored item ID from the data attribute
    var itemId = $(this).data('itemId');
    // Redirect to view page for the new item
    window.location.href = '/view/' + itemId;
});
// Handler for view item button



});
// Function to perform input validation
function inputChecks() {
    console.log("got here");
    // Reset previous error messages
    resetErrors();

    // Get input values
    let name = $('#name').val().trim();
    let stars = $('#stars').val().trim();
    let pic = $('#pic').val().trim();
    let hours = constructHoursObject();
    let phone = $('#phone').val().trim();
    let location = $('#location').val()
    let address = $('#address').val().trim();
    let about = $('#about').val().trim();
    let dishes = constructDishesArray(); 
    //let additional_locations = [$('#additional_locations').val().trim()]

    // Error handling
    let isValid = true;


    // Validate opening and closing hours
    if (!validateOpeningHours(hours)) {
       
            isValid = false;

        }
    if (!validatePhone(phone)) {
        $('#phone').addClass('redborder');
        $('#phone').focus();
        isValid = false;
    }

    // Phone number validation
    // if (!isValidPhoneNumber(phone)) {
    //     $('#phone').focus();
    //     showError('Invalid phone number.');
    //     isValid = false;
    // }
    if (isValid){
    let restaurant = {
                "name": name,
                "stars": stars,
                "pic": pic, 
                "hours": hours,
                "phone": formatPhoneNumber(phone), 
                "location": location,
                "address": address,
                "about": about,
                "dishes": dishes,
                //"additional_locations": additional_locations,
              };
  
     console.log("Hours object:", hours);  // Log the hours object
     console.log("Restaurant object:", restaurant);  
     add_or_save_sale(restaurant); 
            }
     return isValid;
            }
            
    // Add more validation checks for other fields if needed

    // Return true if all validation passes, otherwise return false
   
        



// Function to validate phone number
// function isValidPhoneNumber(phone) {
//     // Regular expression for validating phone numbers
//     const phoneRegex = /^\d{10}$/;
//     return phoneRegex.test(phone);
// }

function validateOpeningHours(hours) {
    let isValid = true;
    for (const day in hours) {
        console.log("checks");
        if (hours.hasOwnProperty(day)) {
            const hoursRange = hours[day].split(' - ');
            const openingHours = hoursRange[0].trim();
            const closingHours = hoursRange[1].trim();
            
            if (openingHours && !closingHours) {
                console.log("got to error");
                console.log(day);
                
                isValid = false;
                $('#'+day.toLowerCase()+'_closing_hours').addClass('redborder');
                $('#'+day.toLowerCase()+'_closing_hours').focus();
                showError('Closing hours are required if opening hours are provided for ' + day + '.');
                console.log(isValid);

                return isValid
               
            }
            else if(closingHours && !openingHours){
                showError('Opening hours are required if closing hours are provided for ' + day + '.');
                isValid = false;
                console.log(isValid);

                return isValid

            }

            
        }
    }
    return isValid;
}

function constructHoursObject() {
    let hours = {
        "Mon": $('#mon_opening_hours').val().trim() + ' - ' + $('#mon_closing_hours').val().trim(),
        "Tue": $('#tue_opening_hours').val().trim() + ' - ' + $('#tue_closing_hours').val().trim(),
        "Wed": $('#wed_opening_hours').val().trim() + ' - ' + $('#wed_closing_hours').val().trim(),
        "Thu": $('#thu_opening_hours').val().trim() + ' - ' + $('#thu_closing_hours').val().trim(),
        "Fri": $('#fri_opening_hours').val().trim() + ' - ' + $('#fri_closing_hours').val().trim(),
        "Sat": $('#sat_opening_hours').val().trim() + ' - ' + $('#sat_closing_hours').val().trim(),
        "Sun": $('#sun_opening_hours').val().trim() + ' - ' + $('#sun_closing_hours').val().trim()
    };
    return hours;
}

function constructDishesArray() {
    let dishes = [];
    dishes.push($('#dish1').val().trim())
    dishes.push($('#dish2').val().trim())
    dishes.push($('#dish3').val().trim())
    
    return dishes;
}

function validatePhone(phone) {
    let isValid = true;
    // Remove all non-digit characters from the phone number string
    const cleaned = ('' + phone).replace(/\D/g, '');
    
    // Check if the cleaned phone number has exactly 10 digits
    if( cleaned.length != 10){
        isValid = false;
        showError('Please enter a valid 10 digit phone number')
        

        return isValid

    }
    return isValid
}

function aboutInputTracker() {
    let maxChars = 200;

    // Access the input in JS by assigning it to a variable
    let input = $('#about');

    // Set the initial value for the counter to the maximum allowed characters
    $('#count').text(maxChars);

    // Attach input event to the input element
    input.on('input', function() {
        // Get the current value of the input
        let text = $(this).val();

        // Limit the input to the maximum number of characters
        if (text.length > maxChars) {
            // If the input exceeds the maximum characters, truncate it
            text = text.substring(0, maxChars);
            $(this).val(text);
           
        }
        // Update the character count
        let remaining = maxChars - text.length;
        $('#count').text(remaining);
       

      
    });
}

// Function to reset error messages
function resetErrors() {
    $('.error').empty(); // Clear error messages
    $('.error').hide();
    $('#phone').removeClass('redborder');
    


    
// Loop through each day of the week
[      'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].forEach(day => {
    // Reset the opening hours input
    
    $('#'+ day + '_closing_hours').removeClass('redborder');
    
    
            
        });
    }
    
  
// Function to display error message
function showError(message) {
    // $('#message').text("Error:")
    const errorElement = $('<div>').addClass('error').text("* "+ message);
    $('#message').append(errorElement);
    $('.error').show();
}
// gets the hours and puts them into a dictionary 




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

function add_or_save_sale(restaurant) {
    console.log("Restaurant object to send:", restaurant);
    $.ajax({
        type: 'POST',
        url: '/add',
        contentType: 'application/json',
        data: JSON.stringify(restaurant),
        success: function(response) {

            console.log('Restaurant added successfully with ID:', response.id);
            // Display success message
            $('#successMessage'). show();
            
            // Show button to view the item
            $('#viewItemButton').show();

            

            // Clear input fields
            clearInputFields();
            // Set focus on the first text box
            $('#name').focus();

            $('#viewItemButton').data('itemId', response.id)

            
        },
        error: function (error) {
            console.error('Failed to save entry', error);
        }
    });
}

// Function to clear input fields
// Function to clear input fields
function clearInputFields() {
    $('#name').val('');
    $('#stars').val('');
    $('#pic').val('');
    $('#mon_opening_hours').val('');
    $('#mon_closing_hours').val('');
    $('#tue_opening_hours').val('');
    $('#tue_closing_hours').val('');
    $('#wed_opening_hours').val('');
    $('#wed_closing_hours').val('');
    $('#thu_opening_hours').val('');
    $('#thu_closing_hours').val('');
    $('#fri_opening_hours').val('');
    $('#fri_closing_hours').val('');
    $('#sat_opening_hours').val('');
    $('#sat_closing_hours').val('');
    $('#sun_opening_hours').val('');
    $('#sun_closing_hours').val('');
    $('#phone').val('');
    $('#location').val('');
    $('#address').val('');
    $('#about').val('');
    $('#dish1').val('');
    $('#dish2').val('');
    $('#dish3').val('');
    //$('#additional_locations').val('');
}



