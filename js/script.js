//JSON.parse() es para parsear o convertir algo a un objeto JSON usable por JavaScript.
//JSON.stringify() es para crear un JSON string de un objeto o un array.

//click en el botón "Obtener Chiste" desde la API
const fetchJokeBtn = document.getElementById('fetchJoke');
const jokeList = document.getElementById('jokeList');
// Función para obtener un chiste aleatorio de la API (usando promesas)
function fetchJoke() {
  fetch('https://api.chucknorris.io/jokes/random')
  .then(response => response.json())
  .then(data => {
    const joke = data.value;
    
    // Crear un nuevo elemento de lista y agregar el chiste
    const li = document.createElement("li");
    li.textContent = joke;
    jokeList.appendChild(li);

    // Almacenar el chiste en localStorage
    const currentJokes = JSON.parse(localStorage.getItem("chuckNorrisJokes")) || [];
    currentJokes.push(joke);
    localStorage.setItem("chuckNorrisJokes", JSON.stringify(currentJokes));
  })
  .catch(error => {
    console.error("Error al obtener el chiste:", error);
  });
}

fetchJokeBtn.addEventListener("click", fetchJoke);

// Cargar los chistes almacenados en localStorage al cargar la página
const storedJokes = JSON.parse(localStorage.getItem("chuckNorrisJokes"));
if (storedJokes) {
  storedJokes.forEach(joke => {
    const li = document.createElement('li');
    li.textContent = joke;
    jokeList.appendChild(li);

    const btnEliminar=document.createElement("button");//creo boton eliminar chiste
    btnEliminar.classList.add ("btnEliminar")
    btnEliminar.innerText= "Eliminar" //añado el nombre "eliminar" en el botón

    li.appendChild(btnEliminar)//li padre de boton

  });
}

//eliminar un sólo chiste 

btnEliminar.addEventListener("click",() =>{
   localStorage.removeItem("joke")
});

//botón eliminar todos los chistes
const botonEliminarChistes=document.getElementById("eliminarTodos");
botonEliminarChistes.addEventListener("click",() =>{
    localStorage.clear()
});

