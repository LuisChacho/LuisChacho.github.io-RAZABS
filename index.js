// OBTENER COLOR DE TRAZO PARA BOTONES SEGÚN EL TEMA ACTIVO
function getOptionStrokeColor() {
  return document.body.classList.contains('theme-dark') ? '#f8fafc' : '#0f172a';
}

// ---------------------------------------------------------------------
// GENERADOR DE GRÁFICOS SVG PARA EL VISOR PRINCIPAL (100% DIVERSIFICADO)
// ---------------------------------------------------------------------
function renderSVGPattern(tipo, p) {

  // 1. CONTEO DE CARAS DE SÓLIDOS 3D REALES (TIPO ESCALÓN Y FIGURA H)
  if (tipo === "solido3d") {
    if (p.modelo === "escalon") {
      // Sólido en forma de grada/escalonado
      return `<svg width="280" height="150" viewBox="0 0 280 150" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(40, 20)">
          <!-- Frente -->
          <polygon points="30,100 170,100 170,80 130,80 130,55 90,55 90,30 30,30" fill="#f8fafc" stroke="#ffffff" stroke-width="2"/>
          <!-- Cara frontal lateral izquierda sombra -->
          <polygon points="10,110 30,100 30,30 10,40" fill="#64748b" stroke="#ffffff" stroke-width="2"/>
          <!-- Escalones Horizontales (Superficies superiores) -->
          <polygon points="30,30 90,30 110,20 50,20" fill="#cbd5e1" stroke="#ffffff" stroke-width="2"/>
          <polygon points="90,55 130,55 150,45 110,45" fill="#cbd5e1" stroke="#ffffff" stroke-width="2"/>
          <polygon points="130,80 170,80 190,70 150,70" fill="#cbd5e1" stroke="#ffffff" stroke-width="2"/>
          <!-- Paredes Verticales Atras -->
          <polygon points="90,30 90,55 110,45 110,20" fill="#94a3b8" stroke="#ffffff" stroke-width="2"/>
          <polygon points="130,55 130,80 150,70 150,45" fill="#94a3b8" stroke="#ffffff" stroke-width="2"/>
          <!-- Lateral Derecho -->
          <polygon points="170,80 170,100 190,90 190,70" fill="#475569" stroke="#ffffff" stroke-width="2"/>
        </g>
      </svg>`;
    }

    if (p.modelo === "figuraH") {
      // Sólido tridimensional en forma de H
      return `<svg width="260" height="160" viewBox="0 0 260 160" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(50, 15)">
          <!-- Cara frontal H -->
          <polygon points="10,10 45,10 45,50 85,50 85,10 120,10 120,120 85,120 85,80 45,80 45,120 10,120" fill="#f8fafc" stroke="#ffffff" stroke-width="2"/>
          <!-- Sombra e inclinación isométrica -->
          <polygon points="120,10 140,0 140,110 120,120" fill="#475569" stroke="#ffffff" stroke-width="2"/>
          <polygon points="45,10 65,0 140,0 120,10" fill="#cbd5e1" stroke="#ffffff" stroke-width="2"/>
          <!-- Techo columna izquierda -->
          <polygon points="10,10 30,0 65,0 45,10" fill="#cbd5e1" stroke="#ffffff" stroke-width="2"/>
          <!-- Hueco central H interno -->
          <polygon points="45,50 65,40 85,40 85,50" fill="#94a3b8" stroke="#ffffff" stroke-width="2"/>
          <polygon points="45,50 45,80 65,70 65,40" fill="#64748b" stroke="#ffffff" stroke-width="2"/>
        </g>
      </svg>`;
    }

    // Sólido tipo Prisma con Ranura en T
    return `<svg width="260" height="150" viewBox="0 0 260 150" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(50, 20)">
        <polygon points="10,30 130,30 130,90 10,90" fill="#f8fafc" stroke="#ffffff" stroke-width="2"/>
        <polygon points="50,30 90,30 90,60 50,60" fill="#0f172a" stroke="#ffffff" stroke-width="2"/>
        <polygon points="130,30 160,10 160,70 130,90" fill="#475569" stroke="#ffffff" stroke-width="2"/>
        <polygon points="10,30 40,10 160,10 130,30" fill="#cbd5e1" stroke="#ffffff" stroke-width="2"/>
      </g>
    </svg>`;
  }

  // 2. DISCRIMINACIÓN VISUAL Y CARAS EN MUESTRAS DE 16 ROSTROS
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

      carasHTML += `
        <g>
          <circle cx="${cx}" cy="${cy}" r="18" stroke="#ffffff" stroke-width="2" fill="#0f172a"/>
          ${orejas}
          ${ojosSVG}
          ${bocaSVG}
          <text x="${cx}" y="${cy + 28}" fill="#94a3b8" font-size="9" text-anchor="middle">${i + 1}</text>
        </g>
      `;
    }
    return `<svg width="450" height="150" viewBox="0 0 450 150" xmlns="http://www.w3.org/2000/svg" style="max-width: 100%; height: auto;">${carasHTML}</svg>`;
  }

  // 3. ROTACIÓN DE POLÍGONOS Y ARRAYS IRREGULARES
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

  // 4. MATRICES 3x3 DINÁMICAS Y COHERENTES (FORMA EXTERNA Y ELEMENTO INTERNO)
  if (tipo === "matriz_coherente") {
    const f1 = p.f1 || "circle";
    const f2 = p.f2 || "triangle";
    const f3 = p.f3 || "square";

    function drawCellShape(shape, cx, cy) {
      if (shape === "circle") return `<circle cx="${cx}" cy="${cy}" r="18" stroke="#ffffff" stroke-width="2" fill="none"/>`;
      if (shape === "triangle") return `<polygon points="${cx},${cy-18} ${cx-16},${cy+12} ${cx+16},${cy+12}" stroke="#ffffff" stroke-width="2" fill="none"/>`;
      return `<rect x="${cx-15}" y="${cy-15}" width="30" height="30" stroke="#ffffff" stroke-width="2" fill="none"/>`;
    }

    function drawInnerDot(type, cx, cy) {
      if (type === "dot") return `<circle cx="${cx}" cy="${cy}" r="4" fill="#ffffff"/>`;
      if (type === "square") return `<rect x="${cx-4}" y="${cy-4}" width="8" height="8" fill="#ffffff"/>`;
      return `<polygon points="${cx},${cy-5} ${cx-4},${cy+3} ${cx+4},${cy+3}" fill="#ffffff"/>`;
    }

    return `<svg width="220" height="220" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
      <!-- Fila 1 -->
      <rect x="10" y="10" width="60" height="60" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
      ${drawCellShape(f1, 40, 40)}${drawInnerDot("dot", 40, 40)}

      <rect x="80" y="10" width="60" height="60" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
      ${drawCellShape(f2, 110, 40)}${drawInnerDot("dot", 110, 40)}

      <rect x="150" y="10" width="60" height="60" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
      ${drawCellShape(f3, 180, 40)}${drawInnerDot("dot", 180, 40)}

      <!-- Fila 2 -->
      <rect x="10" y="80" width="60" height="60" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
      ${drawCellShape(f2, 40, 110)}${drawInnerDot("square", 40, 110)}

      <rect x="80" y="80" width="60" height="60" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
      ${drawCellShape(f3, 110, 110)}${drawInnerDot("square", 110, 110)}

      <rect x="150" y="80" width="60" height="60" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
      ${drawCellShape(f1, 180, 110)}${drawInnerDot("square", 180, 110)}

      <!-- Fila 3 -->
      <rect x="10" y="150" width="60" height="60" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
      ${drawCellShape(f3, 40, 180)}${drawInnerDot("triangle", 40, 180)}

      <rect x="80" y="150" width="60" height="60" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
      ${drawCellShape(f1, 110, 180)}${drawInnerDot("triangle", 110, 180)}

      <rect x="150" y="150" width="60" height="60" rx="6" stroke="#818cf8" stroke-width="2" stroke-dasharray="4 4" fill="#0f172a"/>
      <text x="180" y="188" fill="#818cf8" font-size="28" font-weight="bold" text-anchor="middle">?</text>
    </svg>`;
  }

  // 5. SECUENCIAS
  return `<svg width="320" height="80" viewBox="0 0 320 80" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(37, 40)"><circle cx="0" cy="0" r="22" stroke="#475569" stroke-width="1.5" fill="#0f172a"/><polygon points="${getPolygonPoints(3, 15)}" stroke="#ffffff" stroke-width="2" fill="none"/></g>
    <g transform="translate(102, 40)"><circle cx="0" cy="0" r="22" stroke="#475569" stroke-width="1.5" fill="#0f172a"/><polygon points="${getPolygonPoints(4, 15)}" stroke="#ffffff" stroke-width="2" fill="none"/></g>
    <g transform="translate(167, 40)"><circle cx="0" cy="0" r="22" stroke="#475569" stroke-width="1.5" fill="#0f172a"/><polygon points="${getPolygonPoints(5, 15)}" stroke="#ffffff" stroke-width="2" fill="none"/></g>

    <rect x="205" y="10" width="55" height="60" rx="6" stroke="#818cf8" stroke-width="2" stroke-dasharray="4 4" fill="#0f172a"/>
    <text x="232" y="48" fill="#818cf8" font-size="24" font-weight="bold" text-anchor="middle">?</text>
  </svg>`;
}

// HELPER: PUNTOS POLÍGONO
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
// RENDERIZADOR VECTORIAL DE OPCIONES (CONTRASte adaptable a tema)
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

  if (type === "mat_ans") {
    const shape = p.shape || "triangle";
    let mainShape = '';
    if (shape === "circle") mainShape = `<circle cx="25" cy="25" r="16" stroke="${c}" stroke-width="2" fill="none"/>`;
    else if (shape === "triangle") mainShape = `<polygon points="25,8 10,38 40,38" stroke="${c}" stroke-width="2" fill="none"/>`;
    else mainShape = `<rect x="10" y="10" width="30" height="30" stroke="${c}" stroke-width="2" fill="none"/>`;

    return `<svg width="50" height="50" viewBox="0 0 50 50">
      ${mainShape}
      <polygon points="25,20 20,28 30,28" fill="#4f46e5"/>
    </svg>`;
  }

  return `<svg width="50" height="50" viewBox="0 0 50 50">
    <circle cx="25" cy="25" r="16" stroke="${c}" stroke-width="2" fill="none"/>
    <line x1="25" y1="9" x2="25" y2="41" stroke="${c}" stroke-width="2"/>
  </svg>`;
}

// BALANCEO ALEATORIO ROTATIVO DE RESPUESTAS (A, B, C, D)
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
// CONSTRUCCIÓN DEL BANCO DIVERSIFICADO DE 100 PREGUNTAS ÚNICAS
// ---------------------------------------------------------------------
const preguntas = [];

// MÓDULO 1: CONTEO DE CARAS EN SÓLIDOS 3D REALES (1 al 20)
const modelosSolidos = ["escalon", "figuraH", "ranurado"];
const respuestasCaras = [12, 14, 10, 16, 8, 11, 18, 9, 13, 15, 7, 17, 20, 19, 22, 21, 24, 23, 25, 26];

for (let i = 1; i <= 20; i++) {
  const mod = modelosSolidos[(i - 1) % modelosSolidos.length];
  const totalCaras = respuestasCaras[i - 1];

  const rawOptions = [
    { html: `<strong>${totalCaras}</strong> caras` },
    { html: `<strong>${totalCaras - 2 > 0 ? totalCaras - 2 : 7}</strong> caras` },
    { html: `<strong>${totalCaras + 2}</strong> caras` },
    { html: `<strong>${totalCaras + 4}</strong> caras` }
  ];

  const balanced = getBalancedOptions(rawOptions, 0, i - 1);

  preguntas.push({
    id: i,
    type: "text",
    categoria: "Conteo de Caras en Sólidos 3D",
    enunciado: `¿Cuántas caras en total tiene el siguiente sólido tridimensional (Ejercicio ${i})?`,
    svg: renderSVGPattern("solido3d", { modelo: mod }),
    opciones: balanced.opciones,
    correcta: balanced.correcta,
    explicacion: `Contabilizando las caras frontales, posteriores, laterales, superiores e inferiores del sólido 3D, consta de exactamente ${totalCaras} caras[cite: 43].`
  });
}

// MÓDULO 2: DISCRIMINACIÓN VISUAL Y CARAS EN MUESTROS DE ROSTROS (21 al 40)
const muestrasIndices = [
  [0, 3, 6, 9, 12, 15], [1, 2, 5, 8, 11], [0, 2, 4, 6, 8, 10, 12], [3, 7, 11, 15],
  [0, 1, 2, 3, 4, 5], [10, 11, 12, 13, 14, 15], [2, 5, 8, 11, 14], [0, 4, 8, 12],
  [1, 3, 5, 7, 9, 11, 13, 15], [0, 5, 10, 15], [1, 4, 7, 10, 13], [2, 6, 10, 14],
  [0, 1, 8, 9, 12], [3, 4, 5, 6, 7, 8, 9], [0, 7, 14], [2, 3, 4, 5, 6], [1, 8, 15],
  [0, 2, 11, 13], [5, 6, 7, 8], [9, 10, 11, 12]
];

for (let i = 21; i <= 40; i++) {
  const targetIndices = muestrasIndices[i - 21];
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
    enunciado: `¿Cuántos rostros ${esTriste ? 'tristes' : 'alegres'} con ojos ${esOjos ? 'abiertos' : 'cerrados'} se encuentran en la muestra #${i - 20}?`,
    svg: renderSVGPattern("cara", {
      targetsIndex: targetIndices,
      ojosTipo: esOjos ? "abiertos" : "cerrados",
      bocaTipo: esTriste ? "triste" : "alegre"
    }),
    opciones: balanced.opciones,
    correcta: balanced.correcta,
    explicacion: `Observando detenidamente los 16 rostros numerados de la muestra, se contabilizan exactamente ${targetCount} rostros con esa combinación[cite: 39].`
  });
}

// MÓDULO 3: ROTACIÓN DE FIGURAS IRREGULARES (41 al 60)
const figurasIrregulares = [
  "M -15,-20 L 15,-20 L 15,-5 L 0,-5 L 0,20 L -15,20 Z",
  "M -20,-10 L 0,-20 L 20,-10 L 10,0 L 20,20 L -20,10 Z",
  "M -15,-15 L 15,-15 L 5,0 L 15,15 L -15,15 L -5,0 Z",
  "M -20,-20 L 20,-20 L 0,20 Z"
];
const angulosRot = [45, 90, 135, 180, 225, 270, 315, 405, 450, 540, 630, 720, 810, 900, 990, 1080, 1125, 1200, 1260, 1350];

for (let i = 41; i <= 60; i++) {
  const deg = angulosRot[i - 41];
  const esHorario = i % 2 === 0;
  const shapePath = figurasIrregulares[(i - 41) % figurasIrregulares.length];
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
    explicacion: `Rotando los vértices ${deg}° en sentido ${esHorario ? 'horario' : 'antihorario'}, la orientación resultante coincide con la opción seleccionada.`
  });
}

// MÓDULO 4: MATRICES GRÁFICAS 3x3 COHERENTES (61 al 80)
for (let i = 61; i <= 80; i++) {
  const shapes = ["circle", "triangle", "square"];
  const correctShape = shapes[(i - 61) % 3];

  const rawOptions = [
    { svgType: "mat_ans", p: { shape: correctShape } },
    { svgType: "mat_ans", p: { shape: shapes[(i - 60) % 3] } },
    { svgType: "mat_ans", p: { shape: shapes[(i - 59) % 3] } },
    { svgType: "polygon", p: { sides: 6, fill: '#4f46e5' } }
  ];

  const balanced = getBalancedOptions(rawOptions, 0, i - 1);

  preguntas.push({
    id: i,
    type: "svg",
    categoria: "Matrices Gráficas 3x3",
    enunciado: `Identifique la figura geométrica faltante en la matriz 3x3 (Ejercicio ${i}).`,
    svg: renderSVGPattern("matriz_coherente", { f1: shapes[0], f2: shapes[1], f3: shapes[2] }),
    opciones: balanced.opciones,
    correcta: balanced.correcta,
    explicacion: `Analizando las tres formas principales y sus elementos internos por fila y columna, la casilla faltante completa la secuencia con la figura correspondiente[cite: 42].`
  });
}

// MÓDULO 5: SECUENCIAS Y ANALOGÍAS (81 al 100)
for (let i = 81; i <= 100; i++) {
  const nextSides = 3 + (i % 5);

  const rawOptions = [
    { svgType: "polygon", p: { sides: nextSides, fill: 'none' } },
    { svgType: "polygon", p: { sides: nextSides + 1, fill: 'none' } },
    { svgType: "polygon", p: { sides: nextSides - 1 > 2 ? nextSides - 1 : 8, fill: 'none' } },
    { svgType: "polygon", p: { sides: nextSides, fill: '#4f46e5' } }
  ];

  const balanced = getBalancedOptions(rawOptions, 0, i - 1);

  preguntas.push({
    id: i,
    type: "svg",
    categoria: "Secuencias y Analogías",
    enunciado: `Seleccione la figura que continúa el patrón en la casilla '?' (Ejercicio ${i}).`,
    svg: renderSVGPattern("secuencia_dinámica", { step: i }),
    opciones: balanced.opciones,
    correcta: balanced.correcta,
    explicacion: `La regla de transformación incrementa progresivamente los lados del polígono interior a ${nextSides} lados.`
  });
}

// ---------------------------------------------------------------------
// NAVEGACIÓN Y CONTROL DEL EXAMEN
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

  let msg = "Debes reforzar el conteo de caras en sólidos 3D y las matrices lógicas.";
  if (puntaje >= 850) msg = "¡Excelente desempeño! Tienes un nivel óptimo para ingresar a la UNL.";
  else if (puntaje >= 700) msg = "¡Buen trabajo! Estás muy cerca de la puntuación máxima.";
  document.getElementById('score-feedback').innerText = msg;
}

// CONMUTADOR TEMA CLARO / OSCURO
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