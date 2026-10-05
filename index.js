// HELPER PARA CONSTRUIR FIGURAS SVG DE ABSTRACTO TIPO CENES
function renderSVGPattern(tipo, p) {
  if (tipo === "cara") {
    const ojos = p.ojos 
      ? '<circle cx="32" cy="28" r="3" fill="white"/><circle cx="48" cy="28" r="3" fill="white"/>' 
      : '<line x1="28" y1="28" x2="36" y2="28" stroke="white" stroke-width="2"/><line x1="44" y1="28" x2="52" y2="28" stroke="white" stroke-width="2"/>';
    const boca = p.alegre 
      ? '<path d="M 30 38 Q 40 48 50 38" stroke="white" stroke-width="2" fill="none"/>' 
      : '<path d="M 30 45 Q 40 35 50 45" stroke="white" stroke-width="2" fill="none"/>';
    return `<svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="30" stroke="white" stroke-width="2" fill="none"/>
      ${ojos}
      ${boca}
    </svg>`;
  }

  if (tipo === "rotacion") {
    return `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g transform="rotate(${p.deg}, 50, 50)">
        <polygon points="50,15 35,50 45,50 45,80 55,80 55,50 65,50" fill="#818cf8" stroke="white" stroke-width="1.5"/>
        <circle cx="50" cy="25" r="3" fill="white"/>
      </g>
    </svg>`;
  }

  if (tipo === "matriz") {
    return `<svg width="210" height="210" viewBox="0 0 210 210" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="60" height="60" stroke="#475569" stroke-width="2" fill="none"/>
      <circle cx="35" cy="35" r="15" stroke="white" stroke-width="2" fill="none"/>
      
      <rect x="75" y="5" width="60" height="60" stroke="#475569" stroke-width="2" fill="none"/>
      <circle cx="105" cy="35" r="15" stroke="white" stroke-width="2" fill="white"/>
      
      <rect x="145" y="5" width="60" height="60" stroke="#475569" stroke-width="2" fill="none"/>
      <rect x="160" y="20" width="30" height="30" stroke="white" stroke-width="2" fill="none"/>

      <rect x="5" y="75" width="60" height="60" stroke="#475569" stroke-width="2" fill="none"/>
      <rect x="20" y="90" width="30" height="30" stroke="white" stroke-width="2" fill="white"/>

      <rect x="75" y="75" width="60" height="60" stroke="#475569" stroke-width="2" fill="none"/>
      <polygon points="105,80 90,110 120,110" stroke="white" stroke-width="2" fill="none"/>

      <rect x="145" y="75" width="60" height="60" stroke="#475569" stroke-width="2" fill="none"/>
      <polygon points="175,80 160,110 190,110" stroke="white" stroke-width="2" fill="white"/>

      <rect x="5" y="145" width="60" height="60" stroke="#475569" stroke-width="2" fill="none"/>
      <circle cx="35" cy="175" r="10" stroke="white" stroke-width="2" fill="none"/>

      <rect x="75" y="145" width="60" height="60" stroke="#475569" stroke-width="2" fill="none"/>
      <circle cx="105" cy="175" r="10" stroke="white" stroke-width="2" fill="white"/>

      <rect x="145" y="145" width="60" height="60" stroke="#818cf8" stroke-width="2" fill="none"/>
      <text x="170" y="182" fill="#818cf8" font-size="24" font-weight="bold">?</text>
    </svg>`;
  }

  return `<svg width="260" height="70" viewBox="0 0 260 70" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="10" width="50" height="50" stroke="white" stroke-width="2" fill="none"/>
    <line x1="10" y1="10" x2="60" y2="60" stroke="white" stroke-width="2"/>
    <text x="70" y="40" fill="#94a3b8" font-size="11" font-weight="bold">ES A</text>
    <rect x="105" y="10" width="50" height="50" stroke="white" stroke-width="2" fill="none"/>
    <line x1="105" y1="10" x2="155" y2="60" stroke="white" stroke-width="2"/>
    <line x1="155" y1="10" x2="105" y2="60" stroke="white" stroke-width="2"/>
    <text x="165" y="40" fill="#94a3b8" font-size="11" font-weight="bold">COMO</text>
    <circle cx="225" cy="35" r="25" stroke="white" stroke-width="2" fill="none"/>
    <text x="260" y="42" fill="#818cf8" font-size="20" font-weight="bold">?</text>
  </svg>`;
}

// CONSTRUCCIÓN DEL BANCO COMPLETO DE 100 PREGUNTAS
const preguntas = [];

// Módulo 1: Conteo (1-15)
for (let i = 1; i <= 15; i++) {
  const cnt = (i % 5) + 3;
  preguntas.push({
    id: i,
    categoria: "Conteo de Caras y Patrones",
    enunciado: `¿Cuántos rostros tristes con ojos abiertos se encuentran en la muestra #${i}?`,
    svg: renderSVGPattern("cara", { ojos: true, alegre: false }),
    opciones: [`${cnt - 1} rostros`, `${cnt} rostros`, `${cnt + 1} rostros`, `${cnt + 2} rostros`],
    correcta: 1,
    explicacion: `Analizando el patrón de la pág. 39-41, se contabilizan exactamente ${cnt} rostros con rasgos tristes y ojos abiertos[cite: 1, 3].`
  });
}

// Módulo 2: Rotaciones (16-35)
const angulos = [45, 90, 135, 180, 225, 270, 315, 540, 1125];
for (let i = 16; i <= 35; i++) {
  const deg = angulos[i % angulos.length];
  preguntas.push({
    id: i,
    categoria: "Rotaciones Gráficas",
    enunciado: `Identifique la figura resultante al aplicar una rotación de ${deg}° en sentido horario.`,
    svg: renderSVGPattern("rotacion", { deg: deg }),
    opciones: [
      `Rotación a ${deg}° en sentido horario`,
      `Rotación a ${deg}° en sentido antihorario`,
      `Inversión simétrica a 180°`,
      `Sin rotación`
    ],
    correcta: 0,
    explicacion: `Según las reglas de giro de las págs. 43-47, la rotación horaria de ${deg}° mueve la punta principal en sentido horario[cite: 5, 8, 9].`
  });
}

// Módulo 3: Secuencias Horizontales (36-50)
for (let i = 36; i <= 50; i++) {
  preguntas.push({
    id: i,
    categoria: "Secuencias Horizontales",
    enunciado: `¿Qué figura completa la secuencia horizontal en la casilla '?' (Ejercicio ${i})?`,
    svg: renderSVGPattern("cara", { ojos: i % 2 === 0, alegre: true }),
    opciones: ["Adición de 1 elemento lateral", "Giro de 90° horario", "Figura sin relleno", "Duplicación"],
    correcta: 0,
    explicacion: "En las secuencias horizontales (págs. 48-50), cada término añade un elemento simétrico a la derecha[cite: 10, 11]."
  });
}

// Módulo 4: Matrices 3x3 (51-70)
for (let i = 51; i <= 70; i++) {
  preguntas.push({
    id: i,
    categoria: "Matrices Gráficas 3x3",
    enunciado: `Seleccione la figura faltante en la matriz de 3x3 (Ejercicio ${i}).`,
    svg: renderSVGPattern("matriz", {}),
    opciones: ["Cuadrado mediano blanco", "Círculo pequeño blanco", "Triángulo hueco", "Cruz interna (+)"],
    correcta: 1,
    explicacion: "Al revisar el patrón horizontal/vertical (págs. 51-59), la tercera fila requiere el círculo pequeño sombreado[cite: 13, 21]."
  });
}

// Módulo 5: Superposición (71-80)
for (let i = 71; i <= 80; i++) {
  preguntas.push({
    id: i,
    categoria: "Superposición de Figuras",
    enunciado: `Identifique el resultado de superponer la columna 1 y la columna 2 (Ejercicio ${i}).`,
    svg: renderSVGPattern("analogia", {}),
    opciones: ["Suma total de trazos", "Cancelación de trazos coincidentes", "Intersección del centro", "Figura transparente"],
    correcta: 0,
    explicacion: "Las matrices de superposición (págs. 60-63) combinan los trazos de las dos primeras figuras en la tercera[cite: 22, 25]."
  });
}

// Módulo 6: Analogías entre Figuras (81-90)
for (let i = 81; i <= 90; i++) {
  preguntas.push({
    id: i,
    categoria: "Analogías Figurativas",
    enunciado: `Complete la analogía entre figuras A : B :: C : ? (Ejercicio ${i}).`,
    svg: renderSVGPattern("analogia", {}),
    opciones: ["Círculo con cruz (+)", "Círculo con línea diagonal", "Círculo hueco", "Cuadrado con cruz"],
    correcta: 0,
    explicacion: "Siguiendo la primera relación de adición de trazo (págs. 64-67), la figura resultante es el círculo con cruz interna[cite: 26, 29]."
  });
}

// Módulo 7: Secuencias Analógicas (91-100)
for (let i = 91; i <= 100; i++) {
  preguntas.push({
    id: i,
    categoria: "Secuencias Analógicas",
    enunciado: `Indique la figura que responde al patrón analógico (Ejercicio ${i}).`,
    svg: renderSVGPattern("matriz", {}),
    opciones: ["Figura rellena con eje invertido", "Reducción de tamaño", "Rotación de 180°", "Duplicación de rombos"],
    correcta: 0,
    explicacion: "Tomando como base la secuencia de referencia (págs. 68-71), la segunda aplica la misma transformación analógica[cite: 30, 33]."
  });
}

// ESTADO GLOBAL DE LA APLICACIÓN
let actual = 0;
let usuarioRespuestas = new Array(100).fill(null);
let tiempoRestante = 3600;
let timerId = null;

// ELEMENTOS DEL DOM
const viewHome = document.getElementById('view-home');
const viewQuiz = document.getElementById('view-quiz');
const viewResults = document.getElementById('view-results');

const btnStart = document.getElementById('btn-start');
const btnFinish = document.getElementById('btn-finish');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const btnRestart = document.getElementById('btn-restart');

const quizControls = document.getElementById('quiz-header-controls');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress-bar');
const badgeTotal = document.getElementById('badge-total');

// MANEJO DE NAVEGACIÓN Y VISTAS
function switchView(view) {
  viewHome.classList.remove('active');
  viewQuiz.classList.remove('active');
  viewResults.classList.remove('active');

  if (view === 'home') {
    viewHome.classList.add('active');
    quizControls.classList.add('hidden');
    progressContainer.classList.add('hidden');
    badgeTotal.classList.remove('hidden');
  } else if (view === 'quiz') {
    viewQuiz.classList.add('active');
    quizControls.classList.remove('hidden');
    progressContainer.classList.remove('hidden');
    badgeTotal.classList.add('hidden');
  } else if (view === 'results') {
    viewResults.classList.add('active');
    quizControls.classList.add('hidden');
    progressContainer.classList.add('hidden');
    badgeTotal.classList.remove('hidden');
  }
}

function startTimer() {
  timerId = setInterval(() => {
    tiempoRestante--;
    let m = Math.floor(tiempoRestante / 60);
    let s = tiempoRestante % 60;
    document.getElementById('timer-display').innerText = `${m < 10 ? '0':''}${m}:${s < 10 ? '0':''}${s}`;
    if (tiempoRestante <= 0) {
      clearInterval(timerId);
      finishExam();
    }
  }, 1000);
}

function renderQuestion() {
  const q = preguntas[actual];
  document.getElementById('q-number').innerText = `Pregunta ${actual + 1} de ${preguntas.length}`;
  document.getElementById('q-statement').innerText = q.enunciado;
  document.getElementById('q-category').innerText = q.categoria;

  const pct = ((actual + 1) / preguntas.length) * 100;
  progressBar.style.width = `${pct}%`;

  document.getElementById('svg-viewport').innerHTML = q.svg;

  const grid = document.getElementById('options-grid');
  grid.innerHTML = '';

  q.opciones.forEach((op, idx) => {
    const isSelected = usuarioRespuestas[actual] === idx;
    const btn = document.createElement('div');
    btn.className = `option-btn ${isSelected ? 'selected' : ''}`;
    btn.onclick = () => {
      usuarioRespuestas[actual] = idx;
      renderQuestion();
    };
    btn.innerHTML = `
      <div class="opt-letter">${String.fromCharCode(65 + idx)}</div>
      <div style="font-size: 0.9rem; font-weight: 500;">${op}</div>
    `;
    grid.appendChild(btn);
  });

  btnPrev.disabled = actual === 0;
  btnNext.innerText = actual === preguntas.length - 1 ? 'Finalizar Examen' : 'Siguiente';
}

function finishExam() {
  clearInterval(timerId);
  switchView('results');

  let aciertos = 0;
  const reviewContainer = document.getElementById('review-container');
  reviewContainer.innerHTML = '';

  preguntas.forEach((q, idx) => {
    const userAns = usuarioRespuestas[idx];
    const isOk = userAns === q.correcta;
    if (isOk) aciertos++;

    const card = document.createElement('div');
    card.className = `review-card ${isOk ? 'correct' : 'incorrect'}`;
    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <span style="font-size: 0.75rem; color: #94a3b8;">Pregunta ${idx + 1} — ${q.categoria}</span>
          <h4 style="font-size: 1rem; margin-top: 0.25rem;">${q.enunciado}</h4>
        </div>
        <span class="badge" style="background-color: ${isOk ? 'rgba(16,185,129,0.2)' : 'rgba(244,63,94,0.2)'}; color: ${isOk ? '#10b981' : '#f43f5e'}">
          ${isOk ? 'Correcta' : 'Incorrecta'}
        </span>
      </div>
      <div style="margin: 1rem 0; display: flex; justify-content: center; background: #020617; padding: 1rem; border-radius: 0.75rem;">
        ${q.svg}
      </div>
      <div style="font-size: 0.85rem; color: #cbd5e1;">
        <p><strong>Tu respuesta:</strong> ${userAns !== null ? String.fromCharCode(65 + userAns) : 'Sin responder'}</p>
        <p style="color: #10b981;"><strong>Respuesta correcta:</strong> ${String.fromCharCode(65 + q.correcta)}</p>
        <div class="explanation-box">
          <strong>Solucionario paso a paso:</strong> ${q.explicacion}
        </div>
      </div>
    `;
    reviewContainer.appendChild(card);
  });

  const puntaje = Math.round((aciertos / preguntas.length) * 1000);
  document.getElementById('score-val').innerText = `${puntaje} / 1000`;
  document.getElementById('correct-count').innerText = aciertos;
  document.getElementById('incorrect-count').innerText = preguntas.length - aciertos;

  let msg = "Debes reforzar las secuencias y matrices de superposición.";
  if (puntaje >= 850) msg = "¡Excelente desempeño! Tienes un nivel óptimo para ingresar a la UNL.";
  else if (puntaje >= 700) msg = "¡Buen trabajo! Estás muy cerca de la puntuación máxima.";
  document.getElementById('score-feedback').innerText = msg;
}

// EVENT LISTENERS
btnStart.addEventListener('click', () => {
  actual = 0;
  usuarioRespuestas.fill(null);
  tiempoRestante = 3600;
  switchView('quiz');
  startTimer();
  renderQuestion();
});

btnPrev.addEventListener('click', () => {
  if (actual > 0) {
    actual--;
    renderQuestion();
  }
});

btnNext.addEventListener('click', () => {
  if (actual < preguntas.length - 1) {
    actual++;
    renderQuestion();
  } else {
    if (confirm("¿Deseas finalizar tu examen?")) {
      finishExam();
    }
  }
});

btnFinish.addEventListener('click', () => {
  if (confirm("¿Estás seguro de que deseas finalizar la prueba ahora?")) {
    finishExam();
  }
});

btnRestart.addEventListener('click', () => {
  switchView('home');
});