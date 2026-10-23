// Renderiza las preguntas y calcula el resultado de la evaluación.
const claveIntentoEvaluacion = "componentesia.evaluacion.intento.v1";

const preguntas = [
  {
    pregunta: "¿Qué es la Inteligencia de Negocios según el artículo?",
    opciones: [
      "Un sistema de contabilidad exclusivo para microempresas",
      "Un conjunto de estrategias, procedimientos y herramientas centradas en la gobernanza y creación de conocimiento a través del análisis de datos",
      "Una red social empresarial",
      "Un software reservado solo a grandes empresas"
    ],
    correcta: 1,
    retroalimentacion: "Es la definición de la sección 1 del artículo."
  },
  {
    pregunta: "¿Cuál es el orden correcto del flujo mostrado en la Figura 1?",
    opciones: [
      "Conocimiento → Información → Datos",
      "Datos → Información → Conocimiento",
      "Información → Datos → Conocimiento",
      "Conocimiento → Datos → Información"
    ],
    correcta: 1,
    retroalimentacion: "El artículo muestra que los datos se transforman en información y esta en conocimiento."
  },
  {
    pregunta: "¿Cuántos componentes o modelos conforman la Inteligencia de Negocios según el artículo?",
    opciones: ["Tres", "Cuatro", "Cinco", "Seis"],
    correcta: 2,
    retroalimentacion: "La sección 1 menciona cinco componentes: fuentes, ETL, datawarehouse, herramientas y visualización."
  },
  {
    pregunta: "¿Qué es un Data Mart?",
    opciones: [
      "Un almacén de datos de un área específica de la empresa",
      "Un tipo de red social corporativa",
      "Un software de diseño gráfico",
      "Una base de datos exclusiva de clientes"
    ],
    correcta: 0,
    retroalimentacion: "Definido en Resultados y Discusión."
  },
  {
    pregunta: "¿Cuáles son las cuatro perspectivas del Cuadro de Mando Integral (Figura 3)?",
    opciones: [
      "Financiera, del Cliente, Interna y de Aprendizaje",
      "Ventas, Marketing, Producción y RRHH",
      "Estratégica, Táctica, Operativa y Legal",
      "Datos, Información, Conocimiento y Sabiduría"
    ],
    correcta: 0,
    retroalimentacion: "La Figura 3 del artículo muestra estas cuatro perspectivas alrededor de la Visión Estratégica."
  },
  {
    pregunta: "¿Qué significa la sigla KPI?",
    opciones: [
      "Key Performance Indicator (Indicador Clave de Rendimiento)",
      "Key Process Integration",
      "Knowledge Production Index",
      "Key Public Information"
    ],
    correcta: 0,
    retroalimentacion: 'El artículo lo llama "Indicadores Clave de Rendimiento (KPI)".'
  },
  {
    pregunta: "¿Qué es un ERP?",
    opciones: [
      "Un sistema informático que permite controlar todos los flujos de información de las áreas de la organización",
      "Un programa de diseño 3D",
      "Un motor de bases de datos NoSQL",
      "Un protocolo de red"
    ],
    correcta: 0,
    retroalimentacion: "Definido en la sección 3 del artículo."
  },
  {
    pregunta: "Según la Tabla 1, ¿cuál es una limitación principal de Excel?",
    opciones: [
      "Requiere suscripción mensual",
      "Solo se puede trabajar con 15.000 registros",
      "No permite hacer gráficas",
      "No tiene versión gratuita"
    ],
    correcta: 1,
    retroalimentacion: 'La Tabla 1 lo indica en la fila "Limitaciones".'
  },
  {
    pregunta: "¿Cuál de las tres herramientas comparadas requiere suscripción de pago prácticamente desde el inicio?",
    opciones: ["Excel", "Power BI", "Qlik Sense", "Ninguna"],
    correcta: 2,
    retroalimentacion: "La Tabla 1 indica que Qlik Sense necesita suscripción de paga."
  },
  {
    pregunta: "Según las conclusiones, ¿cuál es el beneficio principal de aplicar BI en una microempresa?",
    opciones: [
      "Reducir el número de empleados",
      "Identificar ventajas y falencias para ganar ventaja competitiva y generar valor",
      "Eliminar la necesidad de contabilidad",
      "Automatizar todas las tareas sin personal"
    ],
    correcta: 1,
    retroalimentacion: "Las conclusiones lo indican como el aporte central del BI."
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("contenedor-evaluacion");
  const form = document.getElementById("form-evaluacion");
  const result = document.getElementById("resultado-evaluacion");

  if (!container || !(form instanceof HTMLFormElement) || !result) return;

  preguntas.forEach((item, questionIndex) => {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "question-card";
    fieldset.id = `pregunta-${questionIndex}`;

    const legend = document.createElement("legend");
    legend.textContent = `${questionIndex + 1}. ${item.pregunta}`;
    fieldset.append(legend);

    const options = document.createElement("div");
    options.className = "question-options";

    item.opciones.forEach((option, optionIndex) => {
      const label = document.createElement("label");
      label.className = "answer-option";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `pregunta-${questionIndex}`;
      input.value = String(optionIndex);
      input.setAttribute("aria-label", option);
      const text = document.createElement("span");
      text.textContent = option;
      label.append(input, text);
      options.append(label);
    });

    fieldset.append(options);
    container.append(fieldset);
  });

  const displayAttempt = (answers) => {
    let score = 0;
    const feedbackList = document.createElement("ol");
    feedbackList.className = "assessment-feedback";

    preguntas.forEach((item, questionIndex) => {
      const selectedIndex = answers[questionIndex];
      const isCorrect = selectedIndex === item.correcta;
      const fieldset = document.getElementById(`pregunta-${questionIndex}`);

      if (isCorrect) score += 1;
      if (fieldset) {
        fieldset.classList.toggle("is-correct", isCorrect);
        fieldset.classList.toggle("is-incorrect", !isCorrect);
        fieldset.querySelectorAll(".answer-option").forEach((label, optionIndex) => {
          const input = label.querySelector("input");
          if (input instanceof HTMLInputElement) {
            input.checked = optionIndex === selectedIndex;
            input.disabled = true;
          }
          label.classList.toggle("option-correct", optionIndex === item.correcta);
          label.classList.toggle("option-incorrect", optionIndex === selectedIndex && !isCorrect);
        });
      }

      const feedback = document.createElement("li");
      const status = document.createElement("strong");
      status.textContent = `${questionIndex + 1}. ${isCorrect ? "Correcta." : "Incorrecta."} `;
      feedback.append(status, document.createTextNode(item.retroalimentacion));
      if (!isCorrect) {
        const correctAnswer = document.createElement("p");
        correctAnswer.textContent = `Respuesta correcta: ${item.opciones[item.correcta]}`;
        feedback.append(correctAnswer);
      }
      feedbackList.append(feedback);
    });

    const assessment = score >= 8 ? "¡Excelente!" : score >= 5 ? "Regular." : "Es momento de repasar el artículo.";
    result.replaceChildren();
    const scoreHeading = document.createElement("h2");
    scoreHeading.textContent = `Obtuviste ${score}/10. ${assessment}`;
    const feedbackHeading = document.createElement("h3");
    feedbackHeading.textContent = "Retroalimentación";
    result.append(scoreHeading, feedbackHeading, feedbackList);
    result.hidden = false;
    result.focus();
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton instanceof HTMLButtonElement) submitButton.disabled = true;
  };

  let savedAttempt;
  try {
    const storedAttempt = window.localStorage.getItem(claveIntentoEvaluacion);
    if (storedAttempt !== null) {
      savedAttempt = JSON.parse(storedAttempt);
      if (
        !savedAttempt ||
        !Array.isArray(savedAttempt.answers) ||
        savedAttempt.answers.length !== preguntas.length ||
        savedAttempt.answers.some((answer) => !Number.isInteger(answer) || answer < -1 || answer > 3)
      ) {
        throw new Error("El intento guardado no tiene un formato válido.");
      }
    }
  } catch (error) {
    result.textContent = "No se pudo comprobar el intento previo en este navegador. Habilita el almacenamiento del sitio para realizar la evaluación.";
    result.hidden = false;
    form.querySelectorAll("input, button[type='submit']").forEach((control) => {
      control.disabled = true;
    });
    console.error("No se pudo leer el intento de evaluación guardado.", error);
    return;
  }

  if (savedAttempt) {
    displayAttempt(savedAttempt.answers);
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const answers = preguntas.map((_, questionIndex) => {
      const selected = form.querySelector(`input[name="pregunta-${questionIndex}"]:checked`);
      return selected instanceof HTMLInputElement ? Number(selected.value) : -1;
    });

    try {
      if (window.localStorage.getItem(claveIntentoEvaluacion) !== null) {
        result.textContent = "La evaluación ya fue realizada en este navegador y no se puede repetir.";
        result.hidden = false;
        form.querySelectorAll("input, button[type='submit']").forEach((control) => {
          control.disabled = true;
        });
        return;
      }
      window.localStorage.setItem(claveIntentoEvaluacion, JSON.stringify({ answers }));
    } catch (error) {
      result.textContent = "No se pudo guardar tu intento. Habilita el almacenamiento del sitio e inténtalo de nuevo; tus respuestas todavía no se han calificado.";
      result.hidden = false;
      console.error("No se pudo guardar el intento de evaluación.", error);
      return;
    }

    displayAttempt(answers);
  });
});
