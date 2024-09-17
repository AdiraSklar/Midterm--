

$(document).ready(function() {
    console.log("hello");
    // Function to find 3, aka ones with 5 stars !!
    
    function findPopularItems(data) {
        console.log(data);
        const popularItems = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].stars === 5) {
                popularItems.push(data[i]);
                
                if (popularItems.length === 3) {
                    break; // Stop looping if three popular items are found
                }
            }
        }
        return popularItems;
    }


// Function to generate HTML for popular items
function generatePopularItems(popularItems) {
    popularItems.forEach(function(item, index) {
        // Create a container for the item
        const itemContainer = $('<div>').addClass('popular-item');
        
        // Create an image container for the item's picture
        const imageContainer = $('<div>').addClass('image-container');
        
        // Create an image element for the item's picture
        const imageElement = $('<img>').attr('src', item.pic).attr('alt', 'Photo of food from '+  item.name).addClass('pop_image');
        
        // Create a title element for the item
        const titleElement = $('<h3>').text(item.name);
        
        // Append the image element to the image container
        imageContainer.append(imageElement);
        
        // Append the image container, title, and stars elements to the item container
        itemContainer.append(imageContainer, titleElement);
        
        // Set the data-id attribute of the item container
        itemContainer.attr('data-id', item.id);
        
        // Distribute items evenly among the three containers
        if (index % 3 === 0) {
            $('#popularItemsContainer1').append(itemContainer);
        } else if (index % 3 === 1) {
            $('#popularItemsContainer2').append(itemContainer);
        } else {
            $('#popularItemsContainer3').append(itemContainer);
        }
    });
}


  

    // Fetch data from the server
    $.ajax({
        url: '/get_all_items', // Update the URL accordingly
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            const allItems = response.data;
            // Find popular items with 5 stars
            const popularItems = findPopularItems(allItems);
            // Generate HTML for popular items
            generatePopularItems(popularItems);
        },
        error: function(error) {
            console.error(error);
        }
    });
    $('#popularItemsContainer1').on('click', '.popular-item', function() {
        const id = $(this).data('id');
        // Redirect the user to the view page with the item ID in the URL
        window.location.href = '/view/' + id;
    });
    
    // Event delegation to handle click events on popular items in container 2
    $('#popularItemsContainer2').on('click', '.popular-item', function() {
        const id = $(this).data('id');
        // Redirect the user to the view page with the item ID in the URL
        window.location.href = '/view/' + id;
    });
    
    // Event delegation to handle click events on popular items in container 3
    $('#popularItemsContainer3').on('click', '.popular-item', function() {
        const id = $(this).data('id');
        // Redirect the user to the view page with the item ID in the URL
        window.location.href = '/view/' + id;
    });
});
//   