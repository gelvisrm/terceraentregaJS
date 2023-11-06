
// Elementos del DOM
const playerNameInput = document.getElementById("nombre-jugador");
const startButton = document.getElementById("start-button");
const questionContainer = document.getElementById("question-container");
const nameError = document.getElementById("name-error");


// Evento al hacer clic en "Comenzar Juego"
startButton.addEventListener("click", () => {
    const playerName = playerNameInput.value.trim();

    if (playerName === "") {
        nameError.style.display = "block"; // Mostrar mensaje de error
    } else {
        nameError.style.display = "none"; // Ocultar mensaje de error
        // Ocultar la sección de ingreso de nombre
        document.getElementById("player-input").style.display = "none";

        // Mostrar la sección de selección de categoría
        questionContainer.style.display = "block";
        
    }
});


// Preguntas y respuestas en un array de objetos
const questions = [
  {
    question: "¿Cuál es la capital de Venezuela?",
    options: ["Caracas", "Bogotá", "Lima", "Buenos Aires"],
    answer: "Caracas"
  },
  {
    question: "¿En qué año se firmó la independencia de Venezuela?",
    options: ["1810", "1821", "1830", "1845"],
    answer: "1821"
  },
  {
    question: "¿Quién es el libertador de Venezuela?",
    options: ["Simón Bolívar", "Hugo Chávez", "Fidel Castro", "Juan Guaidó"],
    answer: "Simón Bolívar"
  },
  {
    question: "¿Cuál es el baile típico de Venezuela?",
    options: ["Salsa", "Mambo", "Joropo", "Tango"],
    answer: "Joropo"
  },
  {
    question: "¿Cuál es el plato típico de Venezuela?",
    options: ["Pizza", "Arepa", "Sushi", "Spaghetti"],
    answer: "Arepa"
  },
  {
    question: "¿Qué famosa catarata se encuentra en Venezuela?",
    options: ["Niágara Falls", "Cataratas del Iguazú", "Salto Ángel", "Victoria Falls"],
    answer: "Salto Ángel"
  }
];


// Inicializar variables
let currentQuestionIndex = 0;
let score = 0;

// Función para mostrar una pregunta
function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  document.getElementById("question").textContent = currentQuestion.question;
  for (let i = 0; i < currentQuestion.options.length; i++) {
    const optionButton = document.getElementById(`option${i + 1}`);
    optionButton.textContent = currentQuestion.options[i];
    optionButton.addEventListener("click", checkAnswer);
  }
}

// Función para comprobar la respuesta
function checkAnswer(event) {
  const selectedAnswer = event.target.textContent;
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedAnswer === currentQuestion.answer) {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    endGame();
  }
}


// Comenzar el juego mostrando la primera pregunta
displayQuestion();

// Inicializar la tabla de posiciones desde el Local Storage 
const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

// Función para actualizar la tabla de posiciones
function updateLeaderboard(playerName, playerScore) {
    // Agrega al jugador actual a la tabla de posiciones
    leaderboard.push({ name: playerName, score: playerScore });

    // Ordena la tabla de posiciones por puntuación (de mayor a menor)
    leaderboard.sort((a, b) => b.score - a.score);

    // Limita la tabla de posiciones a, por ejemplo, los 10 mejores jugadores
    const maxLeaderboardSize = 10;
    leaderboard.splice(maxLeaderboardSize);

    // Actualiza la tabla de posiciones en el Local Storage
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

// Función para mostrar la tabla de posiciones
function displayLeaderboard() {
    // Muestra la sección de la tabla de posiciones
    const leaderboardSection = document.getElementById("leaderboard");
    leaderboardSection.style.display = "block";

    // Obtiene el elemento de la tabla donde se mostrarán los datos
    const leaderboardTable = leaderboardSection.querySelector("table");
    leaderboardTable.innerHTML = `<tr><th>Nombre</th><th>Puntuación</th></tr>`;

    // Agrega los 10 mejores jugadores 
    leaderboard.forEach((player, index) => {
        leaderboardTable.innerHTML += `<tr><td>${player.name}</td><td>${player.score}</td></tr>`;
    });
}

// Función para terminar el juego
function endGame(playerName) {
  document.getElementById("question-container").style.display = "none";
  const resultElement = document.createElement("p");
  resultElement.textContent = `Juego terminado. Puntaje: ${score} de ${questions.length}`;
  document.body.appendChild(resultElement);
  // Agregar el jugador actual a la tabla de posiciones y actualizarla
  updateLeaderboard(playerName, score);

  // Mostrar la tabla de posiciones
  displayLeaderboard();
}


restartButton.addEventListener("click", () => {

      // mostrar la sección de ingreso de nombre
      document.getElementById("player-input").style.display = "block";

      // ocultar la sección de selección de categoría
      questionContainer.style.display = "none";
  
});

