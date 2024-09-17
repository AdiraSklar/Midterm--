

$(document).ready(function() {
    
    $('#searchResultsContainer').on('click', 'div.result .NAME', function() {
        // Get the ID of the clicked search result
        const id = $(this).closest('.result').data('id');


        //console.log(hello);
        // Handle the click event
        handleSearchResultClick(id);
    });

    // Event listener for new search button
    $('#newSearchButton').on('click', function() {
        const newSearchTerm = $('#newSearchInput').val().trim();
        if (newSearchTerm !== '') {
            // Perform new search
            window.location.href = '/results?term=' + encodeURIComponent(newSearchTerm);
        }
    });

    // Event listener for new search submissions from the search form
    $('#searchForm').submit(function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get the search term from the input field
        const newSearchTerm = $('#searchInput').val().trim();
        if (newSearchTerm !== '') {
            // Perform new search
            window.location.href = '/results?term=' + encodeURIComponent(newSearchTerm);
        }
    });
});

// Function to handle search result click event
function handleSearchResultClick(id) {
    // Redirect the user to the view page with the item ID in the URL
    window.location.href = '/view/' + id;
}
