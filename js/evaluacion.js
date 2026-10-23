// Renderiza las preguntas y calcula el resultado de la evaluación.
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
  const resetButton = document.getElementById("reiniciar-evaluacion");
  const result = document.getElementById("resultado-evaluacion");

  if (!container || !(form instanceof HTMLFormElement) || !resetButton || !result) return;

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

    const feedback = document.createElement("p");
    feedback.className = "feedback";
    feedback.id = `retroalimentacion-${questionIndex}`;
    feedback.hidden = true;
    fieldset.append(options, feedback);
    container.append(fieldset);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let score = 0;

    preguntas.forEach((item, questionIndex) => {
      const fieldset = document.getElementById(`pregunta-${questionIndex}`);
      const feedback = document.getElementById(`retroalimentacion-${questionIndex}`);
      const selected = form.querySelector(`input[name="pregunta-${questionIndex}"]:checked`);
      const selectedIndex = selected instanceof HTMLInputElement ? Number(selected.value) : -1;
      const isCorrect = selectedIndex === item.correcta;

      if (isCorrect) score += 1;
      fieldset?.classList.toggle("is-correct", isCorrect);
      fieldset?.classList.toggle("is-incorrect", !isCorrect);

      fieldset?.querySelectorAll(".answer-option").forEach((label, optionIndex) => {
        label.classList.toggle("option-correct", optionIndex === item.correcta);
        label.classList.toggle("option-incorrect", optionIndex === selectedIndex && !isCorrect);
      });

      if (feedback) {
        feedback.textContent = `${isCorrect ? "Correcto." : "Incorrecto."} ${item.retroalimentacion}`;
        feedback.classList.toggle("correct", isCorrect);
        feedback.classList.toggle("incorrect", !isCorrect);
        feedback.hidden = false;
      }
    });

    const assessment = score >= 8 ? "¡Excelente!" : score >= 5 ? "Regular." : "Es momento de repasar el artículo.";
    result.textContent = `Obtuviste ${score}/10. ${assessment}`;
    result.hidden = false;
    result.focus();
  });

  resetButton.addEventListener("click", () => {
    form.reset();
    container.querySelectorAll(".question-card").forEach((fieldset) => {
      fieldset.classList.remove("is-correct", "is-incorrect");
      fieldset.querySelectorAll(".answer-option").forEach((label) => {
        label.classList.remove("option-correct", "option-incorrect");
      });
      const feedback = fieldset.querySelector(".feedback");
      if (feedback) {
        feedback.hidden = true;
        feedback.textContent = "";
        feedback.classList.remove("correct", "incorrect");
      }
    });
    result.hidden = true;
    result.textContent = "";
    document.getElementById("form-evaluacion")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
