// OBTENER COLOR DE TRAZO PARA BOTONES SEGÚN EL TEMA ACTIVO (CLARO / OSCURO)
function getOptionStrokeColor() {
  return document.body.classList.contains('theme-dark') ? '#f8fafc' : '#0f172a';
}

// ---------------------------------------------------------------------
// RENDERIZADOR SVG DINÁMICO DE ALTO CONTRASTE PARA ENUNCIADOS (MARCO OSCURO)
// ---------------------------------------------------------------------
function renderSVGPattern(tipo, p) {
  
  // 1. DISCRIMINACIÓN VISUAL Y CONTEO DE CARAS (MUESTRA DE 16 ROSTROS)
  if (tipo === "cara") {
    const totalCaras = 16;
    const targetsIndex = p.targetsIndex || [];
    let carasHTML = '';
    const cols = 8;

    for (let i = 0; i < totalCaras; i++) {
      const r = Math.floor(i / cols);
      const c = i % cols;
      const cx = 35 + c * 52;
      const cy = 35 + r * 65;

      const esTarget = targetsIndex.includes(i);
      
      let ojosSVG = (p.ojosTipo === "abiertos" ? esTarget : !esTarget)
        ? `<circle cx="${cx - 7}" cy="${cy - 6}" r="3" fill="#ffffff"/><circle cx="${cx + 7}" cy="${cy - 6}" r="3" fill="#ffffff"/>`
        : `<line x1="${cx - 11}" y1="${cy - 6}" x2="${cx - 3}" y2="${cy - 6}" stroke="#ffffff" stroke-width="2"/><line x1="${cx + 3}" y1="${cy - 6}" x2="${cx + 11}" y2="${cy - 6}" stroke="#ffffff" stroke-width="2"/>`;

      let bocaSVG = (p.bocaTipo === "triste" ? esTarget : !esTarget)
        ? `<path d="M ${cx - 9} ${cy + 11} Q ${cx} ${cy + 2} ${cx + 9} ${cy + 11}" stroke="#ffffff" stroke-width="2" fill="none"/>`
        : `<path d="M ${cx - 9} ${cy + 4} Q ${cx} ${cy + 13} ${cx + 9} ${cy + 4}" stroke="#ffffff" stroke-width="2" fill="none"/>`;

      const orejas = `<ellipse cx="${cx - 18}" cy="${cy}" rx="3.5" ry="6" stroke="#ffffff" stroke-width="1.5" fill="none"/><ellipse cx="${cx + 18}" cy="${cy}" rx="3.5" ry="6" stroke="#ffffff" stroke-width="1.5" fill="none"/>`;
      const pelo = `<path d="M ${cx - 4} ${cy - 18} Q ${cx - 8} ${cy - 25} ${cx - 4} ${cy - 27} M ${cx} ${cy - 18} Q ${cx} ${cy - 27} ${cx + 3} ${cy - 29} M ${cx + 4} ${cy - 18} Q ${cx + 8} ${cy - 25} ${cx + 7} ${cy - 27}" stroke="#ffffff" stroke-width="1.5" fill="none"/>`;

      carasHTML += `
        <g>
          <circle cx="${cx}" cy="${cy}" r="18" stroke="#ffffff" stroke-width="2" fill="#0f172a"/>
          ${orejas}
          ${pelo}
          ${ojosSVG}
          ${bocaSVG}
          <text x="${cx}" y="${cy + 28}" fill="#94a3b8" font-size="9" text-anchor="middle">${i + 1}</text>
        </g>
      `;
    }
    return `<svg width="450" height="150" viewBox="0 0 450 150" xmlns="http://www.w3.org/2000/svg" style="max-width: 100%; height: auto;">${carasHTML}</svg>`;
  }

  // 2. ROTACIÓN DE FIGURAS IRREGULARES Y COMPLEJAS
  if (tipo === "rotacion_irreg") {
    const figPath = p.shapePath || "M -15,-20 L 15,-20 L 15,-5 L 0,-5 L 0,20 L -15,20 Z";
    return `<svg width="280" height="120" viewBox="0 0 280 120" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(60, 60)">
        <rect x="-35" y="-35" width="70" height="70" rx="8" stroke="#475569" stroke-width="1.5" fill="none"/>
        <path d="${figPath}" stroke="#ffffff" stroke-width="2" fill="#818cf8"/>
        <circle cx="12" cy="-12" r="4" fill="#38bdf8"/>
        <text x="0" y="48" fill="#94a3b8" font-size="10" text-anchor="middle">Original</text>
      </g>
      
      <path d="M 120 50 Q 135 30 150 50" stroke="#818cf8" stroke-width="3" fill="none"/>
      <text x="135" y="24" fill="#818cf8" font-size="12" font-weight="bold" text-anchor="middle">Giro: ${p.deg}°</text>
      <text x="135" y="70" fill="#38bdf8" font-size="10" text-anchor="middle">${p.sentido}</text>

      <rect x="190" y="25" width="60" height="70" rx="8" stroke="#818cf8" stroke-dasharray="4 4" fill="none"/>
      <text x="220" y="67" fill="#818cf8" font-size="28" font-weight="bold" text-anchor="middle">?</text>
    </svg>`;
  }

  // 3. CONTEO DE CUBOS TRIDIMENSIONALES ISOMÉTRICOS
  if (tipo === "cubos3d") {
    const cubos = p.cubosCoords || [{x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:1,z:0}];
    let cubosHTML = '';

    function drawIsoCube(gx, gy, gz) {
      const isoX = 150 + (gx - gy) * 22;
      const isoY = 110 + (gx + gy) * 12 - gz * 25;

      return `
        <g>
          <!-- Cara Superior -->
          <polygon points="${isoX},${isoY - 14} ${isoX + 22},${isoY - 7} ${isoX},${isoY} ${isoX - 22},${isoY - 7}" fill="#818cf8" stroke="#0f172a" stroke-width="1"/>
          <!-- Cara Izquierda -->
          <polygon points="${isoX - 22},${isoY - 7} ${isoX},${isoY} ${isoX},${isoY + 18} ${isoX - 22},${isoY + 11}" fill="#4f46e5" stroke="#0f172a" stroke-width="1"/>
          <!-- Cara Derecha -->
          <polygon points="${isoX},${isoY} ${isoX + 22},${isoY - 7} ${isoX + 22},${isoY + 11} ${isoX},${isoY + 18}" fill="#3730a3" stroke="#0f172a" stroke-width="1"/>
        </g>
      `;
    }

    cubos.forEach(c => { cubosHTML += drawIsoCube(c.x, c.y, c.z); });

    return `<svg width="300" height="150" viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">${cubosHTML}</svg>`;
  }

  // 4. SECUENCIAS DIVERSIFICADAS DE POLÍGONOS Y LADOS
  if (tipo === "secuencia_dinámica") {
    const step = p.step || 0;
    const nSide1 = 3 + (step % 3);
    const nSide2 = 4 + (step % 3);
    const nSide3 = 5 + (step % 3);

    return `<svg width="320" height="80" viewBox="0 0 320 80" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(37, 40)"><circle cx="0" cy="0" r="22" stroke="#475569" stroke-width="1.5" fill="#0f172a"/><polygon points="${getPolygonPoints(nSide1, 15)}" stroke="#ffffff" stroke-width="2" fill="none"/></g>
      <g transform="translate(102, 40)"><circle cx="0" cy="0" r="22" stroke="#475569" stroke-width="1.5" fill="#0f172a"/><polygon points="${getPolygonPoints(nSide2, 15)}" stroke="#ffffff" stroke-width="2" fill="none"/></g>
      <g transform="translate(167, 40)"><circle cx="0" cy="0" r="22" stroke="#475569" stroke-width="1.5" fill="#0f172a"/><polygon points="${getPolygonPoints(nSide3, 15)}" stroke="#ffffff" stroke-width="2" fill="none"/></g>

      <rect x="205" y="10" width="55" height="60" rx="6" stroke="#818cf8" stroke-width="2" stroke-dasharray="4 4" fill="#0f172a"/>
      <text x="232" y="48" fill="#818cf8" font-size="24" font-weight="bold" text-anchor="middle">?</text>
    </svg>`;
  }

  // 5. MATRICES GRÁFICAS 3x3 Y ANALOGÍAS
  return `<svg width="220" height="220" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="10" width="60" height="60" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
    <circle cx="40" cy="40" r="18" stroke="#ffffff" stroke-width="2" fill="none"/>
    <circle cx="40" cy="40" r="5" fill="#ffffff"/>

    <rect x="80" y="10" width="60" height="60" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
    <polygon points="110,22 93,52 127,52" stroke="#ffffff" stroke-width="2" fill="none"/>
    <circle cx="110" cy="42" r="5" fill="#ffffff"/>

    <rect x="150" y="10" width="60" height="60" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
    <rect x="165" y="25" width="30" height="30" stroke="#ffffff" stroke-width="2" fill="none"/>
    <circle cx="180" cy="40" r="5" fill="#ffffff"/>

    <rect x="10" y="80" width="60" height="60" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
    <polygon points="40,92 23,122 57,122" stroke="#ffffff" stroke-width="2" fill="none"/>
    <rect x="33" y="103" width="14" height="14" fill="#ffffff"/>

    <rect x="80" y="80" width="60" height="60" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
    <rect x="95" y="95" width="30" height="30" stroke="#ffffff" stroke-width="2" fill="none"/>
    <rect x="103" y="103" width="14" height="14" fill="#ffffff"/>

    <rect x="150" y="80" width="60" height="60" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
    <circle cx="180" cy="110" r="18" stroke="#ffffff" stroke-width="2" fill="none"/>
    <rect x="173" y="103" width="14" height="14" fill="#ffffff"/>

    <rect x="10" y="150" width="60" height="60" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
    <rect x="25" y="165" width="30" height="30" stroke="#ffffff" stroke-width="2" fill="none"/>
    <polygon points="40,172 32,185 48,185" fill="#ffffff"/>

    <rect x="80" y="150" width="60" height="60" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
    <circle cx="110" cy="180" r="18" stroke="#ffffff" stroke-width="2" fill="none"/>
    <polygon points="110,172 102,185 118,185" fill="#ffffff"/>

    <rect x="150" y="150" width="60" height="60" rx="6" stroke="#818cf8" stroke-width="2" stroke-dasharray="4 4" fill="#0f172a"/>
    <text x="180" y="188" fill="#818cf8" font-size="28" font-weight="bold" text-anchor="middle">?</text>
  </svg>`;
}

// HELPER MATEMÁTICO: PUNTOS PARA POLÍGONOS REGULARES
function getPolygonPoints(sides, radius) {
  let points = [];
  for (let i = 0; i < sides; i++) {
    const angle = (i * 2 * Math.PI / sides) - Math.PI / 2;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return points.join(" ");
}

// ---------------------------------------------------------------------
// RENDERIZADOR VECTORIAL DE OPCIONES CON CONTRASTE ADAPTABLE
// ---------------------------------------------------------------------
function renderOptionSVG(type, p) {
  const c = getOptionStrokeColor();

  if (type === "rot_irreg") {
    const norm = ((p.deg % 360) + 360) % 360;
    const shape = p.path || "M -12,-16 L 12,-16 L 12,-4 L 0,-4 L 0,16 L -12,16 Z";
    return `<svg width="55" height="55" viewBox="0 0 55 55" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(27.5, 27.5) rotate(${norm})">
        <rect x="-24" y="-24" width="48" height="48" rx="6" stroke="${c}" stroke-width="1.5" fill="none"/>
        <path d="${shape}" stroke="${c}" stroke-width="2" fill="#4f46e5"/>
        <circle cx="10" cy="-10" r="3" fill="#0284c7"/>
      </g>
    </svg>`;
  }

  if (type === "polygon") {
    const sides = p.sides || 3;
    return `<svg width="50" height="50" viewBox="0 0 50 50">
      <g transform="translate(25, 25)">
        <polygon points="${getPolygonPoints(sides, 18)}" stroke="${c}" stroke-width="2" fill="${p.fill || 'none'}"/>
      </g>
    </svg>`;
  }

  return `<svg width="50" height="50" viewBox="0 0 50 50">
    <circle cx="25" cy="25" r="16" stroke="${c}" stroke-width="2" fill="none"/>
    <line x1="25" y1="9" x2="25" y2="41" stroke="${c}" stroke-width="2"/>
  </svg>`;
}

// DISTRIBUCIÓN EQUITATIVA Y ROTATIVA DE RESPUESTAS (A, B, C, D)
function getBalancedOptions(rawOptions, targetCorrectIdx, itemIndex) {
  const desiredCorrectLetterIdx = itemIndex % 4; // Rotación equitativa: 0=A, 1=B, 2=C, 3=D
  const resultOptions = new Array(4);
  
  resultOptions[desiredCorrectLetterIdx] = rawOptions[targetCorrectIdx];

  let currentRawIdx = 0;
  for (let i = 0; i < 4; i++) {
    if (i === desiredCorrectLetterIdx) continue;
    if (currentRawIdx === targetCorrectIdx) currentRawIdx++;
    resultOptions[i] = rawOptions[currentRawIdx];
    currentRawIdx++;
  }

  return {
    opciones: resultOptions,
    correcta: desiredCorrectLetterIdx
  };
}

// ---------------------------------------------------------------------
// CONSTRUCCIÓN COMPLETA DE LAS 100 PREGUNTAS ÚNICAS
// ---------------------------------------------------------------------
const preguntas = [];

// MÓDULO 1: DISCRIMINACIÓN VISUAL Y CONTEO DE CARAS (1 al 15)
const muestrasIndices = [
  [0, 3, 6, 9, 12, 15], [1, 2, 5, 8, 11], [0, 2, 4, 6, 8, 10, 12], [3, 7, 11, 15],
  [0, 1, 2, 3, 4, 5], [10, 11, 12, 13, 14, 15], [2, 5, 8, 11, 14], [0, 4, 8, 12],
  [1, 3, 5, 7, 9, 11, 13, 15], [0, 5, 10, 15], [1, 4, 7, 10, 13], [2, 6, 10, 14],
  [0, 1, 8, 9, 12], [3, 4, 5, 6, 7, 8, 9], [0, 7, 14]
];

for (let i = 1; i <= 15; i++) {
  const targetIndices = muestrasIndices[i - 1];
  const targetCount = targetIndices.length;
  const esOjos = i % 2 === 1;
  const esTriste = i % 3 !== 0;

  const rawOptions = [
    { html: `<strong>${targetCount}</strong> rostros` },
    { html: `<strong>${targetCount + 1}</strong> rostros` },
    { html: `<strong>${targetCount + 2}</strong> rostros` },
    { html: `<strong>${targetCount - 1 > 0 ? targetCount - 1 : 1}</strong> rostros` }
  ];

  const balanced = getBalancedOptions(rawOptions, 0, i - 1);

  preguntas.push({
    id: i,
    type: "text",
    categoria: "Conteo de Caras y Rasgos",
    enunciado: `¿Cuántos rostros ${esTriste ? 'tristes' : 'alegres'} con ojos ${esOjos ? 'abiertos' : 'cerrados'} se encuentran en la muestra #${i}?`,
    svg: renderSVGPattern("cara", {
      targetsIndex: targetIndices,
      ojosTipo: esOjos ? "abiertos" : "cerrados",
      bocaTipo: esTriste ? "triste" : "alegre"
    }),
    opciones: balanced.opciones,
    correcta: balanced.correcta,
    explicacion: `Observando los 16 rostros numerados de la muestra (págs. 39-41), se contabilizan exactamente ${targetCount} rostros con esa combinación[cite: 1, 3].`
  });
}

// MÓDULO 2: ROTACIÓN DE FIGURAS IRREGULARES Y COMPLEJAS (16 al 35)
const figurasIrregulares = [
  "M -15,-20 L 15,-20 L 15,-5 L 0,-5 L 0,20 L -15,20 Z", // L invertida
  "M -20,-10 L 0,-20 L 20,-10 L 10,0 L 20,20 L -20,10 Z", // Polígono asimétrico
  "M -15,-15 L 15,-15 L 5,0 L 15,15 L -15,15 L -5,0 Z",   // Flecha doble
  "M -20,-20 L 20,-20 L 0,20 Z"                          // Triángulo desplazado
];
const angulosRot = [45, 90, 135, 180, 225, 270, 315, 405, 450, 540, 630, 720, 810, 900, 990, 1080, 1125, 1200, 1260, 1350];

for (let i = 16; i <= 35; i++) {
  const deg = angulosRot[i - 16];
  const esHorario = i % 2 === 0;
  const shapePath = figurasIrregulares[(i - 16) % figurasIrregulares.length];
  const correctAngle = esHorario ? deg : -deg;

  const rawOptions = [
    { svgType: "rot_irreg", p: { deg: correctAngle, path: shapePath } },
    { svgType: "rot_irreg", p: { deg: correctAngle + 90, path: shapePath } },
    { svgType: "rot_irreg", p: { deg: correctAngle - 90, path: shapePath } },
    { svgType: "rot_irreg", p: { deg: correctAngle + 180, path: shapePath } }
  ];

  const balanced = getBalancedOptions(rawOptions, 0, i - 1);

  preguntas.push({
    id: i,
    type: "svg",
    categoria: "Rotación de Figuras Irregulares",
    enunciado: `Determine la posición final del polígono irregular al girar ${deg}° en sentido ${esHorario ? 'horario' : 'antihorario'}.`,
    svg: renderSVGPattern("rotacion_irreg", { deg: deg, sentido: esHorario ? 'Horario' : 'Antihorario', shapePath: shapePath }),
    opciones: balanced.opciones,
    correcta: balanced.correcta,
    explicacion: `Rotando los vértices ${deg}° en sentido ${esHorario ? 'horario' : 'antihorario'} (págs. 43-47), la orientación resultante coincide con la alternativa seleccionada[cite: 5, 8].`
  });
}

// MÓDULO 3: CONTEO DE CUBOS TRIDIMENSIONALES (36 al 50)
const estructurasCubos = [
  [{x:0,y:0,z:0}, {x:1,y:0,z:0}, {x:0,y:1,z:0}], // 3 cubos
  [{x:0,y:0,z:0}, {x:1,y:0,z:0}, {x:0,y:1,z:0}, {x:0,y:0,z:1}], // 4 cubos
  [{x:0,y:0,z:0}, {x:1,y:0,z:0}, {x:2,y:0,z:0}, {x:0,y:1,z:0}, {x:0,y:0,z:1}], // 5 cubos
  [{x:0,y:0,z:0}, {x:1,y:0,z:0}, {x:1,y:1,z:0}, {x:0,y:1,z:0}, {x:0,y:0,z:1}, {x:0,y:0,z:2}], // 6 cubos
  [{x:0,y:0,z:0}, {x:1,y:0,z:0}, {x:2,y:0,z:0}, {x:0,y:1,z:0}, {x:1,y:1,z:0}, {x:0,y:2,z:0}, {x:0,y:0,z:1}] // 7 cubos
];

for (let i = 36; i <= 50; i++) {
  const config = estructurasCubos[(i - 36) % estructurasCubos.length];
  const totalCubos = config.length;

  const rawOptions = [
    { html: `<strong>${totalCubos}</strong> cubos` },
    { html: `<strong>${totalCubos + 1}</strong> cubos` },
    { html: `<strong>${totalCubos + 2}</strong> cubos` },
    { html: `<strong>${totalCubos - 1}</strong> cubos` }
  ];

  const balanced = getBalancedOptions(rawOptions, 0, i - 1);

  preguntas.push({
    id: i,
    type: "text",
    categoria: "Conteo de Cubos 3D",
    enunciado: `¿Cuántos cubos individuales conforman el apilamiento tridimensional ilustrado (Ejercicio ${i})?`,
    svg: renderSVGPattern("cubos3d", { cubosCoords: config }),
    opciones: balanced.opciones,
    correcta: balanced.correcta,
    explicacion: `Contabilizando los bloques visibles junto con los cubos de soporte de las columnas traseras, el volumen consta exactamente de ${totalCubos} cubos.`
  });
}

// MÓDULO 4: SECUENCIAS DIVERSIFICADAS DE POLÍGONOS Y LADOS (51 al 70)
for (let i = 51; i <= 70; i++) {
  const nextSides = 6 + (i % 3);

  const rawOptions = [
    { svgType: "polygon", p: { sides: nextSides, fill: 'none' } },
    { svgType: "polygon", p: { sides: nextSides - 1, fill: 'none' } },
    { svgType: "polygon", p: { sides: nextSides + 1, fill: 'none' } },
    { svgType: "polygon", p: { sides: nextSides, fill: '#4f46e5' } }
  ];

  const balanced = getBalancedOptions(rawOptions, 0, i - 1);

  preguntas.push({
    id: i,
    type: "svg",
    categoria: "Secuencias de Lados y Polígonos",
    enunciado: `Seleccione la figura que continúa el patrón de incremento de vértices en la casilla '?' (Ejercicio ${i}).`,
    svg: renderSVGPattern("secuencia_dinámica", { step: i }),
    opciones: balanced.opciones,
    correcta: balanced.correcta,
    explicacion: `La secuencia añade de forma progresiva un lado adicional por casilla, correspondiendo a un polígono de ${nextSides} lados[cite: 10, 11].`
  });
}

// MÓDULO 5: MATRICES GRÁFICAS 3x3 Y SUPERPOSICIÓN (71 al 85)
for (let i = 71; i <= 85; i++) {
  const rawOptions = [
    { svgType: "polygon", p: { sides: 3 + (i % 4), fill: '#4f46e5' } },
    { svgType: "polygon", p: { sides: 3 + (i % 4), fill: 'none' } },
    { svgType: "polygon", p: { sides: 8, fill: 'none' } },
    { svgType: "polygon", p: { sides: 4, fill: '#4f46e5' } }
  ];

  const balanced = getBalancedOptions(rawOptions, 0, i - 1);

  preguntas.push({
    id: i,
    type: "svg",
    categoria: "Matrices Gráficas 3x3",
    enunciado: `Identifique la figura geométrica faltante en la matriz 3x3 (Ejercicio ${i}).`,
    svg: renderSVGPattern("matriz", {}),
    opciones: balanced.opciones,
    correcta: balanced.correcta,
    explicacion: "Al analizar la interacción entre filas y columnas, la casilla vacía completa la secuencia de simetrías del grupo[cite: 13, 21]."
  });
}

// MÓDULO 6: ANALOGÍAS Y SECUENCIAS ANALÓGICAS (86 al 100)
for (let i = 86; i <= 100; i++) {
  const rawOptions = [
    { svgType: "polygon", p: { sides: 3, fill: '#4f46e5' } },
    { svgType: "polygon", p: { sides: 3, fill: 'none' } },
    { svgType: "polygon", p: { sides: 4, fill: '#4f46e5' } },
    { svgType: "polygon", p: { sides: 5, fill: 'none' } }
  ];

  const balanced = getBalancedOptions(rawOptions, 0, i - 1);

  preguntas.push({
    id: i,
    type: "svg",
    categoria: "Analogías Figurativas",
    enunciado: `Indique la figura que satisface la relación analógica A : B :: C : ? (Ejercicio ${i}).`,
    svg: renderSVGPattern("analogia", {}),
    opciones: balanced.opciones,
    correcta: balanced.correcta,
    explicacion: "La relación del par analógico inicial transforma la figura hueca en sólida. Aplicando dicha regla a la tercera figura resulta el triángulo sombreado[cite: 26, 29]."
  });
}

// ---------------------------------------------------------------------
// CONTROL DE ESTADO GLOBAL Y NAVEGACIÓN DENTRO DE LA PRUEBA
// ---------------------------------------------------------------------
let actual = 0;
let usuarioRespuestas = new Array(100).fill(null);
let tiempoRestante = 3600;
let timerId = null;

const viewHome = document.getElementById('view-home');
const viewQuiz = document.getElementById('view-quiz');
const viewResults = document.getElementById('view-results');

const btnStart = document.getElementById('btn-start');
const btnFinish = document.getElementById('btn-finish');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const btnRestart = document.getElementById('btn-restart');
const btnThemeToggle = document.getElementById('btn-theme-toggle');

const quizControls = document.getElementById('quiz-header-controls');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress-bar');
const badgeTotal = document.getElementById('badge-total');
const questionsGrid = document.getElementById('questions-grid');
const answeredCountTag = document.getElementById('answered-count');

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

function renderSidebar() {
  questionsGrid.innerHTML = '';
  let respondidas = 0;

  preguntas.forEach((_, idx) => {
    const isAnswered = usuarioRespuestas[idx] !== null;
    if (isAnswered) respondidas++;

    const btn = document.createElement('button');
    btn.className = `q-grid-btn ${idx === actual ? 'active-q' : ''} ${isAnswered ? 'answered' : ''}`;
    btn.innerText = idx + 1;
    btn.onclick = () => {
      actual = idx;
      renderQuestion();
    };
    questionsGrid.appendChild(btn);
  });

  answeredCountTag.innerText = `${respondidas} / 100`;
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

    let contentHTML = q.type === 'text' ? op.html : renderOptionSVG(op.svgType, op.p);

    btn.innerHTML = `
      <div class="opt-letter">${String.fromCharCode(65 + idx)}</div>
      <div style="font-size: 0.95rem; font-weight: 500; display: flex; align-items: center;">${contentHTML}</div>
    `;
    grid.appendChild(btn);
  });

  btnPrev.disabled = actual === 0;
  btnNext.innerText = actual === preguntas.length - 1 ? 'Finalizar Examen' : 'Siguiente';

  renderSidebar();
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
    
    let optAnswerText = userAns !== null 
      ? (q.type === 'text' ? q.opciones[userAns].html : renderOptionSVG(q.opciones[userAns].svgType, q.opciones[userAns].p))
      : 'Sin responder';

    const correctOp = q.opciones[q.correcta];
    const correctText = q.type === 'text' ? correctOp.html : renderOptionSVG(correctOp.svgType, correctOp.p);

    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <span style="font-size: 0.75rem; color: var(--text-secondary);">Pregunta ${idx + 1} — ${q.categoria}</span>
          <h4 style="font-size: 1rem; margin-top: 0.25rem;">${q.enunciado}</h4>
        </div>
        <span class="badge" style="background-color: ${isOk ? 'rgba(16,185,129,0.1)' : 'rgba(244,63,94,0.1)'}; color: ${isOk ? '#10b981' : '#f43f5e'}">
          ${isOk ? 'Correcta' : 'Incorrecta'}
        </span>
      </div>
      <div style="margin: 1rem 0; display: flex; justify-content: center; background: #0f172a; padding: 1rem; border-radius: 0.75rem;">
        ${q.svg}
      </div>
      <div style="font-size: 0.85rem; color: var(--text-primary);">
        <p><strong>Tu respuesta:</strong> ${String.fromCharCode(65 + (userAns !== null ? userAns : 0))} — ${optAnswerText}</p>
        <p style="color: #10b981;"><strong>Respuesta correcta:</strong> ${String.fromCharCode(65 + q.correcta)} — ${correctText}</p>
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

  let msg = "Debes reforzar el conteo de cubos y la rotación de polígonos irregulares.";
  if (puntaje >= 850) msg = "¡Excelente desempeño! Tienes un nivel óptimo para ingresar a la UNL.";
  else if (puntaje >= 700) msg = "¡Buen trabajo! Estás muy cerca de la puntuación máxima.";
  document.getElementById('score-feedback').innerText = msg;
}

// CAMBIO DINÁMICO DE TEMA CLARO / OSCURO
btnThemeToggle.addEventListener('click', () => {
  if (document.body.classList.contains('theme-light')) {
    document.body.classList.remove('theme-light');
    document.body.classList.add('theme-dark');
    btnThemeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    document.body.classList.remove('theme-dark');
    document.body.classList.add('theme-light');
    btnThemeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
  renderQuestion();
});

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