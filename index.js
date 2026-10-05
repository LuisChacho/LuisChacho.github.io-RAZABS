// HELPER COMPLETO PARA GENERAR DIBUJOS Y SECUENCIAS SVG REALES TIPO CENES
function renderSVGPattern(tipo, p) {
  // 1. MUESTRA COMPLETA DE CARAS (CONTEO DE CARAS - PÁGS. 39-41)
  if (tipo === "cara") {
    const totalFaces = p.total || 14;
    const targetCount = p.targetCount;
    let facesHTML = '';
    
    // Generamos dos filas de 7 u 8 caras cada una (muestra completa)
    const cols = Math.ceil(totalFaces / 2);
    let currentTarget = 0;

    for (let i = 0; i < totalFaces; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const cx = 35 + col * 55;
      const cy = 35 + row * 65;

      let esTarget = false;
      if (currentTarget < targetCount && (i % 2 === 0 || i === totalFaces - 1)) {
        esTarget = true;
        currentTarget++;
      }

      // Rasgos: ojos abiertos/cerrados, boca triste/alegre
      const ojos = esTarget 
        ? `<circle cx="${cx - 8}" cy="${cy - 7}" r="3" fill="white"/><circle cx="${cx + 8}" cy="${cy - 7}" r="3" fill="white"/>` 
        : (i % 3 === 0 
            ? `<line x1="${cx - 12}" y1="${cy - 7}" x2="${cx - 4}" y2="${cy - 7}" stroke="white" stroke-width="2"/><line x1="${cx + 4}" y1="${cy - 7}" x2="${cx + 12}" y2="${cy - 7}" stroke="white" stroke-width="2"/>`
            : `<circle cx="${cx - 8}" cy="${cy - 7}" r="1.5" fill="white"/><circle cx="${cx + 8}" cy="${cy - 7}" r="1.5" fill="white"/>`);
      
      const boca = esTarget 
        ? `<path d="M ${cx - 10} ${cy + 12} Q ${cx} ${cy + 2} ${cx + 10} ${cy + 12}" stroke="white" stroke-width="2" fill="none"/>` 
        : (i % 2 === 0 
            ? `<path d="M ${cx - 10} ${cy + 5} Q ${cx} ${cy + 15} ${cx + 10} ${cy + 5}" stroke="white" stroke-width="2" fill="none"/>` 
            : `<line x1="${cx - 10}" y1="${cy + 8}" x2="${cx + 10}" y2="${cy + 8}" stroke="white" stroke-width="2"/>`);

      const orejas = `<ellipse cx="${cx - 21}" cy="${cy}" rx="4" ry="7" stroke="white" stroke-width="1.5" fill="none"/><ellipse cx="${cx + 21}" cy="${cy}" rx="4" ry="7" stroke="white" stroke-width="1.5" fill="none"/>`;
      const pelo = `<path d="M ${cx - 5} ${cy - 20} Q ${cx - 10} ${cy - 28} ${cx - 5} ${cy - 30} M ${cx} ${cy - 20} Q ${cx} ${cy - 30} ${cx + 3} ${cy - 32} M ${cx + 5} ${cy - 20} Q ${cx + 10} ${cy - 28} ${cx + 8} ${cy - 30}" stroke="white" stroke-width="1.5" fill="none"/>`;

      facesHTML += `
        <g>
          <circle cx="${cx}" cy="${cy}" r="20" stroke="white" stroke-width="2" fill="#0f172a"/>
          ${orejas}
          ${pelo}
          ${ojos}
          ${boca}
          <text x="${cx}" y="${cy + 30}" fill="#64748b" font-size="10" text-anchor="middle">${i + 1}</text>
        </g>
      `;
    }

    const width = cols * 55 + 30;
    return `<svg width="${width}" height="150" viewBox="0 0 ${width} 150" xmlns="http://www.w3.org/2000/svg">${facesHTML}</svg>`;
  }

  // 2. FIGURA BASE DE ROTACIÓN CON FLECHA Y INDICADOR DE ÁNGULO (PÁGS. 43-47)
  if (tipo === "rotacion") {
    return `<svg width="220" height="120" viewBox="0 0 220 120" xmlns="http://www.w3.org/2000/svg">
      <!-- Figura Original (Izquierda) -->
      <g transform="translate(50, 60)">
        <circle cx="0" cy="0" r="35" stroke="#475569" stroke-width="2" fill="none"/>
        <line x1="0" y1="-30" x2="0" y2="30" stroke="white" stroke-width="3"/>
        <polygon points="0,-30 -8,-15 8,-15" fill="#818cf8"/>
        <circle cx="15" cy="0" r="5" fill="#38bdf8"/>
        <text x="0" y="50" fill="#94a3b8" font-size="11" text-anchor="middle">Figura Original</text>
      </g>
      
      <!-- Flecha de Rotación con Ángulo -->
      <path d="M 100 50 Q 110 30 120 50" stroke="#818cf8" stroke-width="3" fill="none" marker-end="url(#arrow)"/>
      <text x="110" y="25" fill="#818cf8" font-size="14" font-weight="bold" text-anchor="middle">Giro: ${p.deg}°</text>
      <text x="110" y="75" fill="#38bdf8" font-size="11" text-anchor="middle">Horario</text>

      <!-- Signo de Interrogación -->
      <rect x="150" y="25" width="50" height="70" rx="8" stroke="#818cf8" stroke-dasharray="4 4" fill="none"/>
      <text x="175" y="67" fill="#818cf8" font-size="28" font-weight="bold" text-anchor="middle">?</text>
    </svg>`;
  }

  // 3. SECUENCIAS HORIZONTALES (PÁGS. 48-50)
  if (tipo === "secuencia") {
    return `<svg width="320" height="80" viewBox="0 0 320 80" xmlns="http://www.w3.org/2000/svg">
      <!-- Casilla 1 -->
      <rect x="10" y="10" width="55" height="60" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
      <circle cx="37" cy="40" r="18" stroke="white" stroke-width="2" fill="none"/>
      <line x1="37" y1="22" x2="37" y2="58" stroke="white" stroke-width="2"/>
      
      <!-- Casilla 2 -->
      <rect x="75" y="10" width="55" height="60" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
      <circle cx="102" cy="40" r="18" stroke="white" stroke-width="2" fill="none"/>
      <line x1="102" y1="22" x2="102" y2="58" stroke="white" stroke-width="2"/>
      <line x1="84" y1="40" x2="120" y2="40" stroke="white" stroke-width="2"/>

      <!-- Casilla 3 -->
      <rect x="140" y="10" width="55" height="60" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
      <circle cx="167" cy="40" r="18" stroke="white" stroke-width="2" fill="none"/>
      <path d="M 167 22 L 167 58 M 149 40 L 185 40 M 154 27 L 180 53" stroke="white" stroke-width="2"/>

      <!-- Casilla ? -->
      <rect x="205" y="10" width="55" height="60" rx="6" stroke="#818cf8" stroke-width="2" stroke-dasharray="4 4" fill="#0f172a"/>
      <text x="232" y="48" fill="#818cf8" font-size="24" font-weight="bold" text-anchor="middle">?</text>
    </svg>`;
  }

  // 4. MATRIZ GRÁFICA 3x3 COMPLETA (PÁGS. 51-59)
  if (tipo === "matriz") {
    return `<svg width="220" height="220" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
      <!-- Fila 1 -->
      <rect x="10" y="10" width="60" height="60" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
      <circle cx="40" cy="40" r="18" stroke="white" stroke-width="2" fill="none"/>
      <circle cx="40" cy="40" r="5" fill="white"/>

      <rect x="80" y="10" width="60" height="60" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
      <polygon points="110,22 93,52 127,52" stroke="white" stroke-width="2" fill="none"/>
      <circle cx="110" cy="42" r="5" fill="white"/>

      <rect x="150" y="10" width="60" height="60" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
      <rect x="165" y="25" width="30" height="30" stroke="white" stroke-width="2" fill="none"/>
      <circle cx="180" cy="40" r="5" fill="white"/>

      <!-- Fila 2 -->
      <rect x="10" y="80" width="60" height="60" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
      <polygon points="40,92 23,122 57,122" stroke="white" stroke-width="2" fill="none"/>
      <rect x="33" y="103" width="14" height="14" fill="white"/>

      <rect x="80" y="80" width="60" height="60" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
      <rect x="95" y="95" width="30" height="30" stroke="white" stroke-width="2" fill="none"/>
      <rect x="103" y="103" width="14" height="14" fill="white"/>

      <rect x="150" y="80" width="60" height="60" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
      <circle cx="180" cy="110" r="18" stroke="white" stroke-width="2" fill="none"/>
      <rect x="173" y="103" width="14" height="14" fill="white"/>

      <!-- Fila 3 -->
      <rect x="10" y="150" width="60" height="60" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
      <rect x="25" y="165" width="30" height="30" stroke="white" stroke-width="2" fill="none"/>
      <polygon points="40,172 32,185 48,185" fill="white"/>

      <rect x="80" y="150" width="60" height="60" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
      <circle cx="110" cy="180" r="18" stroke="white" stroke-width="2" fill="none"/>
      <polygon points="110,172 102,185 118,185" fill="white"/>

      <!-- Casilla Incógnita ? -->
      <rect x="150" y="150" width="60" height="60" rx="6" stroke="#818cf8" stroke-width="2" stroke-dasharray="4 4" fill="#0f172a"/>
      <text x="180" y="188" fill="#818cf8" font-size="28" font-weight="bold" text-anchor="middle">?</text>
    </svg>`;
  }

  // 5. ANALOGÍA A : B :: C : ? COMPLETA (PÁGS. 64-67)
  return `<svg width="320" height="80" viewBox="0 0 320 80" xmlns="http://www.w3.org/2000/svg">
    <!-- A -->
    <rect x="10" y="15" width="50" height="50" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
    <circle cx="35" cy="40" r="16" stroke="white" stroke-width="2" fill="none"/>
    <text x="35" y="73" fill="#64748b" font-size="10" text-anchor="middle">A</text>

    <text x="72" y="44" fill="#94a3b8" font-size="11" font-weight="bold">ES A</text>

    <!-- B -->
    <rect x="100" y="15" width="50" height="50" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
    <circle cx="125" cy="40" r="16" stroke="white" stroke-width="2" fill="white"/>
    <text x="125" y="73" fill="#64748b" font-size="10" text-anchor="middle">B</text>

    <text x="162" y="44" fill="#818cf8" font-size="11" font-weight="bold">COMO</text>

    <!-- C -->
    <rect x="200" y="15" width="50" height="50" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
    <polygon points="225,23 209,55 241,55" stroke="white" stroke-width="2" fill="none"/>
    <text x="225" y="73" fill="#64748b" font-size="10" text-anchor="middle">C</text>

    <text x="262" y="44" fill="#94a3b8" font-size="11" font-weight="bold">ES A</text>

    <!-- Incógnita ? -->
    <rect x="290" y="15" width="25" height="50" rx="6" stroke="#818cf8" stroke-dasharray="3 3" fill="#0f172a"/>
    <text x="302" y="48" fill="#818cf8" font-size="20" font-weight="bold" text-anchor="middle">?</text>
  </svg>`;
}

// RENDERIZADOR DE OPCIONES VECTORIALES SVG PARA ROTACIONES
function renderOptionSVG(angle) {
  const normalized = ((angle % 360) + 360) % 360;
  return `<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(30, 30) rotate(${normalized})">
      <circle cx="0" cy="0" r="22" stroke="#475569" stroke-width="1.5" fill="none"/>
      <line x1="0" y1="-18" x2="0" y2="18" stroke="white" stroke-width="2.5"/>
      <polygon points="0,-18 -6,-8 6,-8" fill="#818cf8"/>
      <circle cx="10" cy="0" r="3.5" fill="#38bdf8"/>
    </g>
  </svg>`;
}

// CONSTRUCCIÓN DEL BANCO DE 100 PREGUNTAS
const preguntas = [];

// MÓDULO 1: CONTEO DE CARAS (1 al 15)
for (let i = 1; i <= 15; i++) {
  const target = (i % 4) + 4; // Ej. 4, 5, 6, 7 caras
  preguntas.push({
    id: i,
    categoria: "Conteo de Caras y Patrones",
    enunciado: `¿Cuántos rostros tristes con ojos abiertos se encuentran en la muestra #${i}?`,
    svg: renderSVGPattern("cara", { total: 14, targetCount: target }),
    opciones: [
      { html: `<strong>${target - 1}</strong> rostros` },
      { html: `<strong>${target}</strong> rostros` },
      { html: `<strong>${target + 1}</strong> rostros` },
      { html: `<strong>${target + 2}</strong> rostros` }
    ],
    correcta: 1,
    explicacion: `Observando detenidamente la muestra completa de 14 rostros (pág. 39), se contabilizan exactamente ${target} rostros con cejas caídas, boca triste y ambos ojos abiertos[cite: 1, 3].`
  });
}

// MÓDULO 2: ROTACIONES CON OPCIONES GRÁFICAS VECTORIALES (16 al 35)
const angulosGiro = [45, 90, 135, 180, 225, 270, 315, 540, 1125];
for (let i = 16; i <= 35; i++) {
  const deg = angulosGiro[i % angulosGiro.length];
  const anguloCorrecto = deg;
  const anguloIncor1 = deg + 90;
  const anguloIncor2 = deg - 90;
  const anguloIncor3 = deg + 180;

  preguntas.push({
    id: i,
    categoria: "Rotaciones Gráficas",
    enunciado: `Identifique la figura resultante al aplicar una rotación de ${deg}° en sentido horario.`,
    svg: renderSVGPattern("rotacion", { deg: deg }),
    opciones: [
      { html: renderOptionSVG(anguloCorrecto) },
      { html: renderOptionSVG(anguloIncor1) },
      { html: renderOptionSVG(anguloIncor2) },
      { html: renderOptionSVG(anguloIncor3) }
    ],
    correcta: 0,
    explicacion: `Al aplicar un giro horario de ${deg}° (${deg % 360}° equivalentes), la flecha superior se desplaza exactamente a la posición mostrada en la opción A[cite: 5, 8].`
  });
}

// MÓDULO 3: SECUENCIAS HORIZONTALES (36 al 50)
for (let i = 36; i <= 50; i++) {
  preguntas.push({
    id: i,
    categoria: "Secuencias Horizontales",
    enunciado: `Escoja la figura que completa la secuencia gráfica horizontal en el lugar de '?' (Ejercicio ${i}).`,
    svg: renderSVGPattern("secuencia", {}),
    opciones: [
      { html: `<svg width="50" height="50" viewBox="0 0 50 50"><circle cx="25" cy="25" r="16" stroke="white" stroke-width="2" fill="none"/><path d="M 25 9 L 25 41 M 9 25 L 41 25 M 14 14 L 36 36 M 14 36 L 36 14" stroke="white" stroke-width="2"/></svg>` },
      { html: `<svg width="50" height="50" viewBox="0 0 50 50"><circle cx="25" cy="25" r="16" stroke="white" stroke-width="2" fill="white"/></svg>` },
      { html: `<svg width="50" height="50" viewBox="0 0 50 50"><circle cx="25" cy="25" r="16" stroke="white" stroke-width="2" fill="none"/><line x1="25" y1="9" x2="25" y2="41" stroke="white" stroke-width="2"/></svg>` },
      { html: `<svg width="50" height="50" viewBox="0 0 50 50"><rect x="10" y="10" width="30" height="30" stroke="white" stroke-width="2" fill="none"/></svg>` }
    ],
    correcta: 0,
    explicacion: "En esta secuencia horizontal (págs. 48-50), en cada paso se agrega una nueva línea de eje. La figura 4 debe tener la estrella completa de 8 puntas internas[cite: 10, 11]."
  });
}

// MÓDULO 4: MATRICES GRÁFICAS 3x3 (51 al 70)
for (let i = 51; i <= 70; i++) {
  preguntas.push({
    id: i,
    categoria: "Matrices Gráficas 3x3",
    enunciado: `Identifique la figura que reemplaza el signo de interrogación en la matriz (Ejercicio ${i}).`,
    svg: renderSVGPattern("matriz", {}),
    opciones: [
      { html: `<svg width="50" height="50" viewBox="0 0 50 50"><polygon points="25,10 9,40 41,40" stroke="white" stroke-width="2" fill="none"/><polygon points="25,20 17,33 33,33" fill="white"/></svg>` },
      { html: `<svg width="50" height="50" viewBox="0 0 50 50"><circle cx="25" cy="25" r="16" stroke="white" stroke-width="2" fill="none"/></svg>` },
      { html: `<svg width="50" height="50" viewBox="0 0 50 50"><rect x="10" y="10" width="30" height="30" stroke="white" stroke-width="2" fill="none"/></svg>` },
      { html: `<svg width="50" height="50" viewBox="0 0 50 50"><polygon points="25,10 9,40 41,40" stroke="white" stroke-width="2" fill="white"/></svg>` }
    ],
    correcta: 0,
    explicacion: "Analizando la matriz por filas (págs. 51-59), la tercera fila combina un triángulo contenedor con un elemento interior blanco rellenado[cite: 13, 21]."
  });
}

// MÓDULO 5: SUPERPOSICIÓN DE FIGURAS (71 al 80)
for (let i = 71; i <= 80; i++) {
  preguntas.push({
    id: i,
    categoria: "Superposición de Figuras",
    enunciado: `Seleccione la figura resultante de superponer la fila 1 y fila 2 (Ejercicio ${i}).`,
    svg: renderSVGPattern("matriz", {}),
    opciones: [
      { html: `<svg width="50" height="50" viewBox="0 0 50 50"><rect x="10" y="10" width="30" height="30" stroke="white" stroke-width="2" fill="none"/><line x1="10" y1="10" x2="40" y2="40" stroke="white" stroke-width="2"/><line x1="40" y1="10" x2="10" y2="40" stroke="white" stroke-width="2"/></svg>` },
      { html: `<svg width="50" height="50" viewBox="0 0 50 50"><rect x="10" y="10" width="30" height="30" stroke="white" stroke-width="2" fill="none"/></svg>` },
      { html: `<svg width="50" height="50" viewBox="0 0 50 50"><circle cx="25" cy="25" r="15" stroke="white" stroke-width="2" fill="none"/></svg>` },
      { html: `<svg width="50" height="50" viewBox="0 0 50 50"><line x1="10" y1="25" x2="40" y2="25" stroke="white" stroke-width="2"/></svg>` }
    ],
    correcta: 0,
    explicacion: "Al sumar gráficamente los trazos (págs. 60-63), las diagonales internas se superponen formando una 'X' completa dentro del marco cuadrado[cite: 22, 25]."
  });
}

// MÓDULO 6: ANALOGÍAS ENTRE FIGURAS (81 al 90)
for (let i = 81; i <= 90; i++) {
  preguntas.push({
    id: i,
    categoria: "Analogías Figurativas",
    enunciado: `Indique la figura que completa la analogía A : B :: C : ? (Ejercicio ${i}).`,
    svg: renderSVGPattern("analogia", {}),
    opciones: [
      { html: `<svg width="50" height="50" viewBox="0 0 50 50"><polygon points="25,10 9,40 41,40" stroke="white" stroke-width="2" fill="white"/></svg>` },
      { html: `<svg width="50" height="50" viewBox="0 0 50 50"><polygon points="25,10 9,40 41,40" stroke="white" stroke-width="2" fill="none"/></svg>` },
      { html: `<svg width="50" height="50" viewBox="0 0 50 50"><circle cx="25" cy="25" r="15" stroke="white" stroke-width="2" fill="white"/></svg>` },
      { html: `<svg width="50" height="50" viewBox="0 0 50 50"><rect x="10" y="10" width="30" height="30" stroke="white" stroke-width="2" fill="white"/></svg>` }
    ],
    correcta: 0,
    explicacion: "La relación entre A y B es rellenar por completo la figura transparente. Al aplicar la misma regla a C (triángulo), resulta el triángulo completamente blanco[cite: 26, 29]."
  });
}

// MÓDULO 7: SECUENCIAS ANALÓGICAS (91 al 100)
for (let i = 91; i <= 100; i++) {
  preguntas.push({
    id: i,
    categoria: "Secuencias Analógicas",
    enunciado: `Determine la figura que responde a la secuencia analógica de referencia (Ejercicio ${i}).`,
    svg: renderSVGPattern("secuencia", {}),
    opciones: [
      { html: `<svg width="50" height="50" viewBox="0 0 50 50"><circle cx="25" cy="25" r="15" stroke="white" stroke-width="2" fill="none"/><line x1="25" y1="10" x2="25" y2="40" stroke="white" stroke-width="2"/></svg>` },
      { html: `<svg width="50" height="50" viewBox="0 0 50 50"><rect x="10" y="10" width="30" height="30" stroke="white" stroke-width="2" fill="none"/></svg>` },
      { html: `<svg width="50" height="50" viewBox="0 0 50 50"><circle cx="25" cy="25" r="15" stroke="white" stroke-width="2" fill="white"/></svg>` },
      { html: `<svg width="50" height="50" viewBox="0 0 50 50"><polygon points="25,10 9,40 41,40" stroke="white" stroke-width="2" fill="none"/></svg>` }
    ],
    correcta: 0,
    explicacion: "Basándonos en el patrón analógico (págs. 68-71), se debe mantener la simetría vertical dividida por una línea central[cite: 30, 33]."
  });
}

// ESTADO GLOBAL
let actual = 0;
let usuarioRespuestas = new Array(100).fill(null);
let tiempoRestante = 3600;
let timerId = null;

// DOM
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
      <div style="font-size: 0.95rem; font-weight: 500; display: flex; align-items: center;">${op.html}</div>
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

// LISTENERS
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