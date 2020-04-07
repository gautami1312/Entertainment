$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        if(searchText.length == 0) {
            alert( "Please enter the show name first" );
        } else {
            search(searchText);
        }
        //console.log(searchText);
        //getMovies(searchText);
        //e.preventDefault();
    });
    $( "#searchButton" ).click(function() {
        let searchText = $('#searchText').val();
        if(searchText.length == 0) {
            alert( "Please enter the show name first" );
        } else {
            search(searchText);
        }
        //alert( "Handler for .click() called." );
    });
});

function search(searchQuery) {
    
    var myElement = document.getElementById("searchResultsMany");


    fetch(`https://www.omdbapi.com/?s=${encodeURI(searchQuery)}&apikey=8bfd0af4`)
        .then((movies) => { movies.json().then(data => {
            
            let counter = 0;
            console.log(data);
            if(data.Response == "False") {
                let html = `<section id="searchResults" class="searchResults">
                    <div class="container">
            
                    <div class="section-title" data-aos="fade-up">
                        <h2>Search Results</h2>
                        <p>Ooops... Sorry, nothing was found</p>
                    </div>
                    `;
                html += `</div>
                    </section>`;
                myElement.innerHTML = html;
            } else {
                let html = `<section id="searchResults" class="searchResults">
                    <div class="container">
            
                    <div class="section-title" data-aos="fade-up">
                        <h2>Search Results</h2>
                        <p>Click on the show you need</p>
                    </div>
            
                    <div class="row searchResults-container" data-aos="fade-up" data-aos-delay="200">   
            
                    `;

                data.Search.forEach(element => {
                    let show = `
                    <div class="col-lg-4 col-md-6 searchResults-item" onclick="searchOne('${element.imdbID}')">
                        <div class="searchResults-wrap">
                            <img src="${element.Poster}" alt="" height="100%" width="100%">
                            <div class="searchResults-info">
                                <h4>${element.Title} (${element.Year})</h4>
                                <p>${element.Type}</p>
                            </div>
                        </div>
                    </div>`;
    
                    if(counter < 9){
                        html += show;
                        counter++;
                    }
                        
                });
                html += `</div>
                    </div>
                    </section>`;
                myElement.innerHTML = html;
            }

            

        }) } )
        .catch((error)=>{ console.log(error)});
}

function searchOne(searchQuery) {
    
    var myElement = document.getElementById("searchResultsMany");

    console.log(searchQuery);

    fetch(`https://www.omdbapi.com/?i=${encodeURI(searchQuery)}&apikey=8bfd0af4`)
        .then((movies) => { movies.json().then(data => {

            let html = `<section id="search-result" class="about">
                <div class="container">

                <div class="section-title" data-aos="fade-up">
                    <h2>Search Result</h2>
                    <p>Here is your show</p>
                </div>

                <div class="row">
                    <div class="col-lg-4">
                    <div class="info d-flex flex-column justify-content-center" data-aos="fade-right">
                        <img src="${data.Poster}" class="img-fluid" alt="" height="380" width="280">
                    </div>
                    </div>
                    <div class="col-lg-8 mt-5 mt-lg-0">
                    <div class="content pt-4 pt-lg-0 pl-0 pl-lg-3 ">
                        <h3>${data.Title} (${data.Year})</h3>
                        <p class="font-italic">
                        ${data.Type}
                        </p>
                        <p><h6 id="pRating">IMDB Rating: ${data.imdbRating}/10</h6></p>
                        <p id="pGenre">Genre: ${data.Genre}</p>
                        <p id="pRelease">Release Date: ${data.Released}</p>
                        <p id="pDirector">Director: ${data.Director}</p>
                        <p id="pWriters">Writers: ${data.Writer}</p>
                        <p id="pStars">Stars: ${data.Actors} </p>
                        <p id="pDescription">Plot: ${data.Plot}</p>
                    </div>
                    </div>
                
                </div>

                </div>
                </section>`
                myElement.innerHTML = html;

        }) } )
        .catch((error)=>{ console.log(error)});
}