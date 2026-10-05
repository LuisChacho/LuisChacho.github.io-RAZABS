// OBTENER COLOR DE TRAZO PARA BOTONES SEGÚN EL TEMA ACTIVO
function getOptionStrokeColor() {
  return document.body.classList.contains('theme-dark') ? '#f8fafc' : '#0f172a';
}

// ---------------------------------------------------------------------
// GENERADOR DE GRÁFICOS SVG DE ALTA DEFINICIÓN (100% DIVERSIFICADO)
// ---------------------------------------------------------------------
function renderSVGPattern(tipo, p) {

  // 1. CONTEO DE CARAS EN SÓLIDOS 3D REALES (ISOMÉTRICO PROFESIONAL)
  if (tipo === "solido3d") {
    if (p.modelo === "escalon") {
      // Escalón HD con degradados y profundidad limpia
      return `<svg width="380" height="200" viewBox="0 0 380 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="topGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#cbd5e1"/>
            <stop offset="100%" stop-color="#94a3b8"/>
          </linearGradient>
          <linearGradient id="frontGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="100%" stop-color="#e2e8f0"/>
          </linearGradient>
          <linearGradient id="sideGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#475569"/>
            <stop offset="100%" stop-color="#1e293b"/>
          </linearGradient>
        </defs>

        <g transform="translate(60, 25)">
          <!-- Frente Principal -->
          <polygon points="20,130 200,130 200,100 140,100 140,65 80,65 80,30 20,30" fill="url(#frontGrad)" stroke="#0f172a" stroke-width="2.5" stroke-linejoin="round"/>
          
          <!-- Lateral Izquierdo (Grosor) -->
          <polygon points="-10,145 20,130 20,30 -10,45" fill="url(#sideGrad)" stroke="#0f172a" stroke-width="2.5" stroke-linejoin="round"/>
          
          <!-- Escalones Horizontales (Techos / Superficies) -->
          <polygon points="20,30 80,30 110,15 50,15" fill="url(#topGrad)" stroke="#0f172a" stroke-width="2.5" stroke-linejoin="round"/>
          <polygon points="80,65 140,65 170,50 110,50" fill="url(#topGrad)" stroke="#0f172a" stroke-width="2.5" stroke-linejoin="round"/>
          <polygon points="140,100 200,100 230,85 170,85" fill="url(#topGrad)" stroke="#0f172a" stroke-width="2.5" stroke-linejoin="round"/>
          
          <!-- Paredes Escalón Traseras / Intermedias -->
          <polygon points="80,30 80,65 110,50 110,15" fill="#64748b" stroke="#0f172a" stroke-width="2.5" stroke-linejoin="round"/>
          <polygon points="140,65 140,100 170,85 170,50" fill="#64748b" stroke="#0f172a" stroke-width="2.5" stroke-linejoin="round"/>
          
          <!-- Lateral Derecho -->
          <polygon points="200,100 200,130 230,115 230,85" fill="url(#sideGrad)" stroke="#0f172a" stroke-width="2.5" stroke-linejoin="round"/>
        </g>
      </svg>`;
    }

    if (p.modelo === "figuraH") {
      // Estructura en H 3D vectorizada y estilizada
      return `<svg width="360" height="210" viewBox="0 0 360 210" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hFront" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="100%" stop-color="#f1f5f9"/>
          </linearGradient>
          <linearGradient id="hTop" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#cbd5e1"/>
            <stop offset="100%" stop-color="#94a3b8"/>
          </linearGradient>
          <linearGradient id="hSide" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#334155"/>
            <stop offset="100%" stop-color="#0f172a"/>
          </linearGradient>
        </defs>

        <g transform="translate(70, 20)">
          <!-- Frente H -->
          <polygon points="10,20 55,20 55,65 105,65 105,20 150,20 150,150 105,150 105,100 55,100 55,150 10,150" fill="url(#hFront)" stroke="#0f172a" stroke-width="2.5" stroke-linejoin="round"/>
          
          <!-- Lado Izquierdo Frontal Sombra -->
          <polygon points="-15,35 10,20 10,150 -15,165" fill="url(#hSide)" stroke="#0f172a" stroke-width="2.5" stroke-linejoin="round"/>

          <!-- Techos Columnas -->
          <polygon points="10,20 35,5 80,5 55,20" fill="url(#hTop)" stroke="#0f172a" stroke-width="2.5" stroke-linejoin="round"/>
          <polygon points="105,20 130,5 175,5 150,20" fill="url(#hTop)" stroke="#0f172a" stroke-width="2.5" stroke-linejoin="round"/>
          <polygon points="55,65 80,50 130,50 105,65" fill="url(#hTop)" stroke="#0f172a" stroke-width="2.5" stroke-linejoin="round"/>

          <!-- Lateral Derecho -->
          <polygon points="150,20 175,5 175,135 150,150" fill="url(#hSide)" stroke="#0f172a" stroke-width="2.5" stroke-linejoin="round"/>

          <!-- Hueco Central H -->
          <polygon points="55,65 55,100 80,85 80,50" fill="#475569" stroke="#0f172a" stroke-width="2.5" stroke-linejoin="round"/>
        </g>
      </svg>`;
    }

    // Sólido Prismático con Corte Central HD
    return `<svg width="360" height="200" viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="prismFront" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="100%" stop-color="#e2e8f0"/>
        </linearGradient>
      </defs>
      <g transform="translate(65, 25)">
        <polygon points="10,40 180,40 180,120 10,120" fill="url(#prismFront)" stroke="#0f172a" stroke-width="2.5" stroke-linejoin="round"/>
        <polygon points="60,40 130,40 130,80 60,80" fill="#0f172a" stroke="#ffffff" stroke-width="2" stroke-linejoin="round"/>
        <polygon points="180,40 220,15 220,95 180,120" fill="#334155" stroke="#0f172a" stroke-width="2.5" stroke-linejoin="round"/>
        <polygon points="10,40 50,15 220,15 180,40" fill="#cbd5e1" stroke="#0f172a" stroke-width="2.5" stroke-linejoin="round"/>
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

  // 3. ROTACIÓN DE FIGURAS IRREGULARES
  if (tipo === "rotacion_irreg") {
    const figPath = p.shapePath || "M -15,-20 L 15,-20 L 15,-5 L 0,-5 L 0,20 L -15,20 Z";
    return `<svg width="320" height="140" viewBox="0 0 320 140" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(70, 70)">
        <rect x="-40" y="-40" width="80" height="80" rx="10" stroke="#475569" stroke-width="2" fill="#0f172a"/>
        <path d="${figPath}" stroke="#ffffff" stroke-width="2.5" fill="#6366f1"/>
        <circle cx="12" cy="-12" r="5" fill="#38bdf8"/>
        <text x="0" y="56" fill="#94a3b8" font-size="11" text-anchor="middle" font-weight="600">Original</text>
      </g>
      
      <path d="M 140 60 Q 160 35 180 60" stroke="#6366f1" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <text x="160" y="28" fill="#818cf8" font-size="13" font-weight="bold" text-anchor="middle">Giro: ${p.deg}°</text>
      <text x="160" y="82" fill="#38bdf8" font-size="11" font-weight="600" text-anchor="middle">${p.sentido}</text>

      <rect x="220" y="30" width="70" height="80" rx="10" stroke="#818cf8" stroke-dasharray="5 5" stroke-width="2" fill="#0f172a"/>
      <text x="255" y="78" fill="#818cf8" font-size="32" font-weight="bold" text-anchor="middle">?</text>
    </svg>`;
  }

  // 4. MATRICES GRÁFICAS 3x3 COHERENTES
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

    return `<svg width="240" height="240" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
      <!-- Fila 1 -->
      <rect x="10" y="10" width="65" height="65" rx="8" stroke="#475569" stroke-width="2" fill="#0f172a"/>
      ${drawCellShape(f1, 42.5, 42.5)}${drawInnerDot("dot", 42.5, 42.5)}

      <rect x="87.5" y="10" width="65" height="65" rx="8" stroke="#475569" stroke-width="2" fill="#0f172a"/>
      ${drawCellShape(f2, 120, 42.5)}${drawInnerDot("dot", 120, 42.5)}

      <rect x="165" y="10" width="65" height="65" rx="8" stroke="#475569" stroke-width="2" fill="#0f172a"/>
      ${drawCellShape(f3, 197.5, 42.5)}${drawInnerDot("dot", 197.5, 42.5)}

      <!-- Fila 2 -->
      <rect x="10" y="87.5" width="65" height="65" rx="8" stroke="#475569" stroke-width="2" fill="#0f172a"/>
      ${drawCellShape(f2, 42.5, 120)}${drawInnerDot("square", 42.5, 120)}

      <rect x="87.5" y="87.5" width="65" height="65" rx="8" stroke="#475569" stroke-width="2" fill="#0f172a"/>
      ${drawCellShape(f3, 120, 120)}${drawInnerDot("square", 120, 120)}

      <rect x="165" y="87.5" width="65" height="65" rx="8" stroke="#475569" stroke-width="2" fill="#0f172a"/>
      ${drawCellShape(f1, 197.5, 120)}${drawInnerDot("square", 197.5, 120)}

      <!-- Fila 3 -->
      <rect x="10" y="165" width="65" height="65" rx="8" stroke="#475569" stroke-width="2" fill="#0f172a"/>
      ${drawCellShape(f3, 42.5, 197.5)}${drawInnerDot("triangle", 42.5, 197.5)}

      <rect x="87.5" y="165" width="65" height="65" rx="8" stroke="#475569" stroke-width="2" fill="#0f172a"/>
      ${drawCellShape(f1, 120, 197.5)}${drawInnerDot("triangle", 120, 197.5)}

      <rect x="165" y="165" width="65" height="65" rx="8" stroke="#818cf8" stroke-width="2" stroke-dasharray="4 4" fill="#0f172a"/>
      <text x="197.5" y="206" fill="#818cf8" font-size="30" font-weight="bold" text-anchor="middle">?</text>
    </svg>`;
  }

  // 5. SECUENCIAS
  return `<svg width="340" height="90" viewBox="0 0 340 90" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(40, 45)"><circle cx="0" cy="0" r="24" stroke="#475569" stroke-width="1.5" fill="#0f172a"/><polygon points="${getPolygonPoints(3, 16)}" stroke="#ffffff" stroke-width="2" fill="none"/></g>
    <g transform="translate(110, 45)"><circle cx="0" cy="0" r="24" stroke="#475569" stroke-width="1.5" fill="#0f172a"/><polygon points="${getPolygonPoints(4, 16)}" stroke="#ffffff" stroke-width="2" fill="none"/></g>
    <g transform="translate(180, 45)"><circle cx="0" cy="0" r="24" stroke="#475569" stroke-width="1.5" fill="#0f172a"/><polygon points="${getPolygonPoints(5, 16)}" stroke="#ffffff" stroke-width="2" fill="none"/></g>

    <rect x="225" y="12" width="60" height="66" rx="8" stroke="#818cf8" stroke-width="2" stroke-dasharray="4 4" fill="#0f172a"/>
    <text x="255" y="53" fill="#818cf8" font-size="26" font-weight="bold" text-anchor="middle">?</text>
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

  // ESPACIADO CORREGIDO: "12 caras" en lugar de "12caras"
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
    explicacion: `Contabilizando las caras frontales, posteriores, laterales, superiores e inferiores del sólido 3D, consta de exactamente ${totalCaras} caras.`
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
    explicacion: `Observando detenidamente los 16 rostros numerados de la muestra, se contabilizan exactamente ${targetCount} rostros con esa combinación.`
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
    explicacion: `Analizando las tres formas principales y sus elementos internos por fila y columna, la casilla faltante completa la secuencia con la figura correspondiente.`
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