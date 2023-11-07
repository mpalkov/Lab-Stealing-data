fetch("https://rickandmortyapi.com/api/character")
    .then((data) => data.json())
    // jsonData.results[]
    .then((jsonData) => console.log(jsonData));