
/* =========================================
   PEQUEÑOS EN MOVIMIENTO
   FUNCIONES INTERACTIVAS
========================================= */


/* =========================================
   1. MENÚ DE NAVEGACIÓN
========================================= */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

    });

    // Cerrar menú al seleccionar una sección

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';

        });

    });

}


/* =========================================
   2. ACTIVIDAD INTERACTIVA
========================================= */

const startActivity = document.getElementById("start-activity");
const activityContainer = document.getElementById("activity-container");

const activityQuestions = [

    {
        question: "¿Qué parte del cuerpo utilizamos principalmente para escuchar?",
        options: ["Los ojos", "Los oídos", "Las manos"],
        correct: 1,
        explanation: "¡Muy bien! Los oídos nos permiten escuchar los sonidos."
    },

    {
        question: "¿Qué habilidad motriz utilizamos al caminar y correr?",
        options: ["Desplazamiento", "Equilibrio", "Manipulación"],
        correct: 0,
        explanation: "¡Excelente! Caminar y correr son movimientos de desplazamiento."
    },

    {
        question: "¿Qué movimiento nos ayuda a mantenernos estables sobre un pie?",
        options: ["Lanzamiento", "Equilibrio", "Carrera"],
        correct: 1,
        explanation: "¡Correcto! El equilibrio nos permite mantener una posición estable."
    },

    {
        question: "¿Qué utilizamos para lanzar y atrapar una pelota?",
        options: ["Las manos", "Los oídos", "La cabeza"],
        correct: 0,
        explanation: "¡Así es! Las manos nos ayudan a manipular diferentes objetos."
    },

    {
        question: "¿Qué habilidad nos permite organizar nuestros movimientos?",
        options: ["Coordinación", "Descanso", "Respiración"],
        correct: 0,
        explanation: "¡Muy bien! La coordinación organiza nuestros movimientos."
    }

];

let currentActivityQuestion = 0;
let activityScore = 0;


function showActivityQuestion() {

    const question = activityQuestions[currentActivityQuestion];

    activityContainer.classList.remove("hidden");

    activityContainer.innerHTML = `

        <div class="activity-progress">
            Pregunta ${currentActivityQuestion + 1} de ${activityQuestions.length}
        </div>

        <h3 class="activity-question">${question.question}</h3>

        <div class="activity-options">

            ${question.options.map((option, index) => `

                <button
                    type="button"
                    class="activity-option"
                    data-index="${index}">

                    ${option}

                </button>

            `).join("")}

        </div>

        <div id="activity-feedback" class="activity-feedback" aria-live="polite"></div>

    `;

    activityContainer.querySelectorAll(".activity-option").forEach(button => {

        button.addEventListener("click", () => {

            checkActivityAnswer(Number(button.dataset.index));

        });

    });

}


function checkActivityAnswer(selected) {

    const question = activityQuestions[currentActivityQuestion];

    const buttons = activityContainer.querySelectorAll(".activity-option");

    buttons.forEach(button => button.disabled = true);

    const feedback = document.getElementById("activity-feedback");

    if (selected === question.correct) {

        activityScore++;

        buttons[selected].classList.add("correct");

        feedback.innerHTML = `
            <div class="feedback-success">
                <i class="fa-solid fa-circle-check"></i>
                <strong>¡Excelente respuesta!</strong>
                <p>${question.explanation}</p>
            </div>
        `;

    } else {

        buttons[selected].classList.add("incorrect");
        buttons[question.correct].classList.add("correct");

        feedback.innerHTML = `
            <div class="feedback-error">
                <i class="fa-solid fa-lightbulb"></i>
                <strong>¡Sigue aprendiendo!</strong>
                <p>${question.explanation}</p>
            </div>
        `;

    }

    const nextButton = document.createElement("button");

    nextButton.type = "button";
    nextButton.className = "btn btn-primary next-activity";

    nextButton.textContent =
        currentActivityQuestion === activityQuestions.length - 1
            ? "Ver resultado"
            : "Siguiente pregunta";

    nextButton.addEventListener("click", () => {

        currentActivityQuestion++;

        if (currentActivityQuestion < activityQuestions.length) {

            showActivityQuestion();

        } else {

            showActivityResult();

        }

    });

    activityContainer.appendChild(nextButton);

}


function showActivityResult() {

    const percentage = Math.round(
        (activityScore / activityQuestions.length) * 100
    );

    activityContainer.innerHTML = `

        <div class="activity-result">

            <i class="fa-solid fa-trophy"></i>

            <h3>¡Terminaste la actividad!</h3>

            <p>Obtuviste ${activityScore} de ${activityQuestions.length} respuestas correctas.</p>

            <div class="activity-score">
                ${percentage}%
            </div>

            <p>
                ${
                    percentage === 100
                        ? "¡Increíble! Eres un experto en movimiento."
                        : percentage >= 60
                            ? "¡Muy bien! Sigue aprendiendo y practicando."
                            : "¡No te rindas! Puedes intentarlo nuevamente."
                }
            </p>

            <button type="button" class="btn btn-primary" id="restart-activity">
                <i class="fa-solid fa-rotate-right"></i>
                Volver a jugar
            </button>

        </div>

    `;

    document.getElementById("restart-activity").addEventListener("click", () => {

        currentActivityQuestion = 0;
        activityScore = 0;

        showActivityQuestion();

    });

}


if (startActivity && activityContainer) {

    startActivity.addEventListener("click", () => {

        currentActivityQuestion = 0;
        activityScore = 0;

        startActivity.classList.add("hidden");

        showActivityQuestion();

    });

}


/* =========================================
   3. EVALUACIÓN FINAL
========================================= */

const evaluationQuestions = [

    {
        question: "¿Cuál es la función principal de los ojos?",
        options: [
            "Escuchar sonidos",
            "Observar nuestro entorno",
            "Caminar"
        ],
        correct: 1,
        explanation: "Los ojos nos permiten observar nuestro entorno."
    },

    {
        question: "¿Qué partes del cuerpo utilizamos para caminar?",
        options: [
            "Las piernas y los pies",
            "Los oídos",
            "Los dedos de las manos"
        ],
        correct: 0,
        explanation: "Las piernas y los pies nos permiten desplazarnos."
    },

    {
        question: "¿Qué habilidad utilizamos para mantenernos estables?",
        options: [
            "Manipulación",
            "Equilibrio",
            "Lanzamiento"
        ],
        correct: 1,
        explanation: "El equilibrio nos permite mantener la estabilidad."
    },

    {
        question: "¿Qué habilidad utilizamos al lanzar una pelota?",
        options: [
            "Manipulación",
            "Descanso",
            "Audición"
        ],
        correct: 0,
        explanation: "Lanzar una pelota es una habilidad de manipulación."
    },

    {
        question: "¿Por qué es importante realizar actividad física?",
        options: [
            "Porque evita que aprendamos",
            "Porque nos ayuda a cuidar nuestro cuerpo",
            "Porque debemos permanecer quietos"
        ],
        correct: 1,
        explanation: "La actividad física contribuye a nuestra salud y bienestar."
    }

];


const questionsContainer = document.getElementById("questions-container");
const evaluationForm = document.getElementById("evaluation-form");
const evaluationResult = document.getElementById("evaluation-result");


/* Crear preguntas automáticamente */

function renderEvaluation() {

    if (!questionsContainer) return;

    questionsContainer.innerHTML = evaluationQuestions.map((question, index) => `

        <div class="question">

            <h4>
                ${index + 1}. ${question.question}
            </h4>

            ${question.options.map((option, optionIndex) => `

                <label class="answer-option">

                    <input
                        type="radio"
                        name="question-${index}"
                        value="${optionIndex}"
                        required>

                    <span>${option}</span>

                </label>

            `).join("")}

        </div>

    `).join("");

}

renderEvaluation();


/* Calificar evaluación */

if (evaluationForm) {

    evaluationForm.addEventListener("submit", event => {

        event.preventDefault();

        if (!evaluationForm.reportValidity()) return;

        let score = 0;

        let feedbackHTML = "";

        evaluationQuestions.forEach((question, index) => {

            const selected = evaluationForm.querySelector(
                `input[name="question-${index}"]:checked`
            );

            const answer = Number(selected.value);

            const isCorrect = answer === question.correct;

            if (isCorrect) {
                score++;
            }

            feedbackHTML += `

                <p class="${isCorrect ? "result-correct" : "result-incorrect"}">

                    <strong>
                        Pregunta ${index + 1}:
                        ${isCorrect ? "¡Correcto!" : "Respuesta incorrecta"}
                    </strong>

                    <br>

                    ${question.explanation}

                </p>

            `;

        });

        const percentage = Math.round(
            (score / evaluationQuestions.length) * 100
        );

        evaluationResult.innerHTML = `

            <h3>
                <i class="fa-solid fa-trophy"></i>
                ¡Evaluación terminada!
            </h3>

            <div class="evaluation-percentage">
                ${percentage}%
            </div>

            <p>
                Obtuviste ${score} respuestas correctas de 5.
            </p>

            <p>
                ${
                    percentage === 100
                        ? "¡Excelente! Has aprendido muchísimo."
                        : percentage >= 60
                            ? "¡Muy bien! Continúa practicando."
                            : "¡Sigue intentándolo! Cada día puedes aprender algo nuevo."
                }
            </p>

            <div class="detailed-feedback">
                ${feedbackHTML}
            </div>

            <button type="button" class="btn btn-primary" id="retry-evaluation">
                <i class="fa-solid fa-rotate-right"></i>
                Repetir evaluación
            </button>

        `;

        evaluationResult.classList.remove("hidden");

        evaluationForm.classList.add("hidden");

        evaluationResult.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        document.getElementById("retry-evaluation").addEventListener("click", () => {

            evaluationForm.reset();

            evaluationForm.classList.remove("hidden");

            evaluationResult.classList.add("hidden");

            evaluationResult.innerHTML = "";

            evaluationForm.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

}


/* =========================================
   4. AÑO AUTOMÁTICO EN EL PIE DE PÁGINA
========================================= */

const copyright = document.querySelector(".copyright");

if (copyright) {

    copyright.textContent =
        `© ${new Date().getFullYear()} Pequeños en Movimiento. Proyecto educativo.`;

}

console.log("Pequeños en Movimiento está funcionando correctamente.");
