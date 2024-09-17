
$(document).ready(function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchTerm = urlParams.get('term');
    
    if (searchTerm) {
        search(searchTerm);
    }
});




function populateSearchResults(results, num, searchTerm) {
    $('#searchResults').text(num)
    
    $('#searchResultsContainer').empty();
    results.forEach(function(restaurant) {
        const resultElement = $('<div>').addClass('result');
        const nameHighlighted = highlightSearchTerm(restaurant.name, searchTerm);
        const locationHighlighted = highlightSearchTerm(restaurant.location, searchTerm);
        const dishesHighlighted = highlightSearchTerm(restaurant.dishes, searchTerm);

        // Create a separate div for the name
        const nameDiv = $('<div>').addClass('NAME').html(nameHighlighted);
        
        // Append the name div and other information to the result element
        resultElement.append(nameDiv).attr('data-id', restaurant.id);
        resultElement.append($('<div>').addClass('locs').html(`<span class="label">Location:</span> ${locationHighlighted}`));
        resultElement.append($('<div>').addClass('Dishes').html(`<span class="label">Popular Dishes:</span> ${dishesHighlighted}`));
        
        

        const resultCard = $('<div>').addClass('result-card').append(resultElement);
        
        $('#searchResultsContainer').append(resultCard);
    });
}





function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    const regex = new RegExp('(' + searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}



function search(term) {
    term = term.trim();
    $.ajax({
        url: '/search',
        method: 'POST',
        data: { term: term },
        dataType: 'json',
        success: function(response) {
            // Redirect to the results page only if not already redirected
            if (!window.location.pathname.includes('/results')) {
                window.location.href = '/results?term=' + encodeURIComponent(term) + '&results=' + encodeURIComponent(JSON.stringify(response.results));
            }
            num=response.results.length
            if (num> 0) {
                populateSearchResults(response.results, num,term);
            } else {
                $('#results_header').hide();
                $('#searchResultsContainer').text("No results found").addClass('noResults');

            }
            $('#searchInput').val('');
        },
        error: function(error) {
            console.error(error);
        }
    });
}
