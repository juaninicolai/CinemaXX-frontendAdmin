console.log("script init");
export default () => {
  const content = document.querySelector(".content");

  return fetch("./pages/movies/movies.html")
    .then((response) => response.text())
    .then((moviesHtml) => {
      content.innerHTML = moviesHtml;

      const form = document.querySelector("form");

      form.addEventListener("submit", (event) => {
        event.preventDefault();
      const movieUrl = `${window.apiUrl}/api/movie`;
      fetch(movieUrl, {
        method: "POST",
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          title: document.querySelector("#movieTitle").value,
          description: document.querySelector("#movie-desc").value,
          ageRestriction: Number(document.querySelector("#age").value),
          startdate: document.querySelector("#movie-start-date").value,
          endDate: document.querySelector("#movie-end-date").value,
          rating: Number(document.querySelector("#movie-rating").value),
          poster: document.querySelector("#movie-poster").value,
        }),  
      }).then((response) => response.json())
      .then((response) => {
        console.log(response);
      });
     
    });

    fetch(`${window.apiUrl}/api/movie?startRange=2021-10-01&endRange=2021-12-31`)
        .then((response) => response.json())
        .then((movies) => {
          const movieContainer = document.querySelector(".movie-container");

          // Build DOM
          movies.forEach((movie) => {
            // Add title
            const movieList = document.createElement('ul');
            content.appendChild(movieList);
            const movieRow = document.createElement("li");
            movieRow.innerText = movie.title;
            content.appendChild(movieRow);
            
            // Add edit button
            const editButton = document.createElement('button');
            editButton.textContent = 'edit'
            movieRow.appendChild(editButton);
            editButton.addEventListener ("click", function() {
              alert('edit title')
            });
            
            // Add delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = "delete"
            movieRow.appendChild(deleteButton)
            deleteButton.addEventListener ("click", function() {
              alert('delete title')
            });
          });
        });
      })}
