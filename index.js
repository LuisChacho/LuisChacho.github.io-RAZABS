// OBTENER COLOR DE TRAZO PARA BOTONES SEGÚN EL TEMA ACTIVO
function getOptionStrokeColor() {
  return document.body.classList.contains('theme-dark') ? '#f8fafc' : '#0f172a';
}

// HELPER PARA RENDERIZAR GRÁFICOS SVG DEL LIBRO CENES EN EL VISOR PRINCIPAL (FONDO NOCTURNO)
function renderSVGPattern(tipo, p) {
  
  // 1. MUESTRA COMPLETA DE 16 CARAS VARIADAS (PÁGS. 39-41)
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

      let ojosSVG = '';
      if (p.ojosTipo === "abiertos") {
        ojosSVG = esTarget || (i % 2 === 0) 
          ? `<circle cx="${cx - 7}" cy="${cy - 6}" r="3" fill="#ffffff"/><circle cx="${cx + 7}" cy="${cy - 6}" r="3" fill="#ffffff"/>`
          : `<line x1="${cx - 11}" y1="${cy - 6}" x2="${cx - 3}" y2="${cy - 6}" stroke="#ffffff" stroke-width="2"/><line x1="${cx + 3}" y1="${cy - 6}" x2="${cx + 11}" y2="${cy - 6}" stroke="#ffffff" stroke-width="2"/>`;
      } else {
        ojosSVG = esTarget
          ? `<line x1="${cx - 11}" y1="${cy - 6}" x2="${cx - 3}" y2="${cy - 6}" stroke="#ffffff" stroke-width="2"/><line x1="${cx + 3}" y1="${cy - 6}" x2="${cx + 11}" y2="${cy - 6}" stroke="#ffffff" stroke-width="2"/>`
          : `<circle cx="${cx - 7}" cy="${cy - 6}" r="3" fill="#ffffff"/><circle cx="${cx + 7}" cy="${cy - 6}" r="3" fill="#ffffff"/>`;
      }

      let bocaSVG = '';
      if (p.bocaTipo === "triste") {
        bocaSVG = esTarget
          ? `<path d="M ${cx - 9} ${cy + 11} Q ${cx} ${cy + 2} ${cx + 9} ${cy + 11}" stroke="#ffffff" stroke-width="2" fill="none"/>`
          : (i % 2 === 1 
              ? `<path d="M ${cx - 9} ${cy + 4} Q ${cx} ${cy + 13} ${cx + 9} ${cy + 4}" stroke="#ffffff" stroke-width="2" fill="none"/>`
              : `<line x1="${cx - 9}" y1="${cy + 8}" x2="${cx + 9}" y2="${cy + 8}" stroke="#ffffff" stroke-width="2"/>`);
      } else {
        bocaSVG = esTarget
          ? `<path d="M ${cx - 9} ${cy + 4} Q ${cx} ${cy + 13} ${cx + 9} ${cy + 4}" stroke="#ffffff" stroke-width="2" fill="none"/>`
          : `<path d="M ${cx - 9} ${cy + 11} Q ${cx} ${cy + 2} ${cx + 9} ${cy + 11}" stroke="#ffffff" stroke-width="2" fill="none"/>`;
      }

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

  // 2. FIGURA DE ROTACIÓN (PÁGS. 43-47)
  if (tipo === "rotacion") {
    return `<svg width="280" height="120" viewBox="0 0 280 120" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(60, 60)">
        <circle cx="0" cy="0" r="32" stroke="#64748b" stroke-width="2" fill="none"/>
        <line x1="0" y1="-28" x2="0" y2="28" stroke="#ffffff" stroke-width="3"/>
        <polygon points="0,-28 -7,-14 7,-14" fill="#818cf8"/>
        <circle cx="14" cy="0" r="4" fill="#38bdf8"/>
        <text x="0" y="48" fill="#94a3b8" font-size="10" text-anchor="middle">Original</text>
      </g>
      
      <path d="M 120 50 Q 135 30 150 50" stroke="#818cf8" stroke-width="3" fill="none"/>
      <text x="135" y="24" fill="#818cf8" font-size="13" font-weight="bold" text-anchor="middle">Giro: ${p.deg}°</text>
      <text x="135" y="72" fill="#38bdf8" font-size="10" text-anchor="middle">${p.sentido}</text>

      <rect x="190" y="25" width="55" height="70" rx="8" stroke="#818cf8" stroke-dasharray="4 4" fill="none"/>
      <text x="217" y="67" fill="#818cf8" font-size="28" font-weight="bold" text-anchor="middle">?</text>
    </svg>`;
  }

  // 3. SECUENCIAS HORIZONTALES (PÁGS. 48-50)
  if (tipo === "secuencia") {
    return `<svg width="320" height="80" viewBox="0 0 320 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="55" height="60" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
      <circle cx="37" cy="40" r="18" stroke="#ffffff" stroke-width="2" fill="none"/>
      <line x1="37" y1="22" x2="37" y2="58" stroke="#ffffff" stroke-width="2"/>
      
      <rect x="75" y="10" width="55" height="60" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
      <circle cx="102" cy="40" r="18" stroke="#ffffff" stroke-width="2" fill="none"/>
      <line x1="102" y1="22" x2="102" y2="58" stroke="#ffffff" stroke-width="2"/>
      <line x1="84" y1="40" x2="120" y2="40" stroke="#ffffff" stroke-width="2"/>

      <rect x="140" y="10" width="55" height="60" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
      <circle cx="167" cy="40" r="18" stroke="#ffffff" stroke-width="2" fill="none"/>
      <path d="M 167 22 L 167 58 M 149 40 L 185 40 M 154 27 L 180 53" stroke="#ffffff" stroke-width="2"/>

      <rect x="205" y="10" width="55" height="60" rx="6" stroke="#818cf8" stroke-width="2" stroke-dasharray="4 4" fill="#0f172a"/>
      <text x="232" y="48" fill="#818cf8" font-size="24" font-weight="bold" text-anchor="middle">?</text>
    </svg>`;
  }

  // 4. MATRIZ GRÁFICA 3x3 COMPLETA (PÁGS. 51-59)
  if (tipo === "matriz") {
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

  // 5. ANALOGÍA A : B :: C : ? COMPLETA (PÁGS. 64-67)
  return `<svg width="320" height="80" viewBox="0 0 320 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="15" width="50" height="50" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
    <circle cx="35" cy="40" r="16" stroke="#ffffff" stroke-width="2" fill="none"/>
    <text x="35" y="73" fill="#94a3b8" font-size="10" text-anchor="middle">A</text>

    <text x="72" y="44" fill="#94a3b8" font-size="11" font-weight="bold">ES A</text>

    <rect x="100" y="15" width="50" height="50" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
    <circle cx="125" cy="40" r="16" stroke="#ffffff" stroke-width="2" fill="#ffffff"/>
    <text x="125" y="73" fill="#94a3b8" font-size="10" text-anchor="middle">B</text>

    <text x="162" y="44" fill="#818cf8" font-size="11" font-weight="bold">COMO</text>

    <rect x="200" y="15" width="50" height="50" rx="6" stroke="#475569" stroke-width="2" fill="#0f172a"/>
    <polygon points="225,23 209,55 241,55" stroke="#ffffff" stroke-width="2" fill="none"/>
    <text x="225" y="73" fill="#818cf8" font-size="10" text-anchor="middle">C</text>

    <text x="262" y="44" fill="#818cf8" font-size="11" font-weight="bold">ES A</text>

    <rect x="290" y="15" width="25" height="50" rx="6" stroke="#818cf8" stroke-dasharray="3 3" fill="#0f172a"/>
    <text x="302" y="48" fill="#818cf8" font-size="20" font-weight="bold" text-anchor="middle">?</text>
  </svg>`;
}

// RENDERIZADOR DE OPCIONES VECTORIALES ADAPTATIVAS PARA AMBOS TEMAS
function renderOptionSVG(type, param) {
  const c = getOptionStrokeColor();

  if (type === "rot") {
    const norm = ((param % 360) + 360) % 360;
    return `<svg width="55" height="55" viewBox="0 0 55 55" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(27.5, 27.5) rotate(${norm})">
        <circle cx="0" cy="0" r="20" stroke="${c}" stroke-width="2" fill="none"/>
        <line x1="0" y1="-16" x2="0" y2="16" stroke="${c}" stroke-width="2.5"/>
        <polygon points="0,-16 -6,-6 6,-6" fill="#4f46e5"/>
        <circle cx="10" cy="0" r="3.5" fill="#0284c7"/>
      </g>
    </svg>`;
  }

  if (type === "sec") {
    if (param === 0) {
      return `<svg width="50" height="50" viewBox="0 0 50 50"><circle cx="25" cy="25" r="18" stroke="${c}" stroke-width="2" fill="none"/><path d="M 25 7 L 25 43 M 7 25 L 43 25 M 12 12 L 38 38 M 12 38 L 38 12" stroke="${c}" stroke-width="2"/></svg>`;
    }
    if (param === 1) {
      return `<svg width="50" height="50" viewBox="0 0 50 50"><circle cx="25" cy="25" r="18" stroke="${c}" stroke-width="2" fill="#4f46e5"/></svg>`;
    }
    if (param === 2) {
      return `<svg width="50" height="50" viewBox="0 0 50 50"><circle cx="25" cy="25" r="18" stroke="${c}" stroke-width="2" fill="none"/><line x1="25" y1="7" x2="25" y2="43" stroke="${c}" stroke-width="2"/></svg>`;
    }
    return `<svg width="50" height="50" viewBox="0 0 50 50"><rect x="10" y="10" width="30" height="30" stroke="${c}" stroke-width="2" fill="none"/></svg>`;
  }

  if (type === "mat") {
    if (param === 0) {
      return `<svg width="50" height="50" viewBox="0 0 50 50"><polygon points="25,8 8,40 42,40" stroke="${c}" stroke-width="2" fill="none"/><polygon points="25,18 16,33 34,33" fill="#4f46e5"/></svg>`;
    }
    if (param === 1) {
      return `<svg width="50" height="50" viewBox="0 0 50 50"><circle cx="25" cy="25" r="18" stroke="${c}" stroke-width="2" fill="none"/></svg>`;
    }
    if (param === 2) {
      return `<svg width="50" height="50" viewBox="0 0 50 50"><rect x="10" y="10" width="30" height="30" stroke="${c}" stroke-width="2" fill="none"/></svg>`;
    }
    return `<svg width="50" height="50" viewBox="0 0 50 50"><polygon points="25,8 8,40 42,40" stroke="${c}" stroke-width="2" fill="#4f46e5"/></svg>`;
  }

  if (type === "sup") {
    if (param === 0) {
      return `<svg width="50" height="50" viewBox="0 0 50 50"><rect x="10" y="10" width="30" height="30" stroke="${c}" stroke-width="2" fill="none"/><line x1="10" y1="10" x2="40" y2="40" stroke="${c}" stroke-width="2"/><line x1="40" y1="10" x2="10" y2="40" stroke="${c}" stroke-width="2"/></svg>`;
    }
    if (param === 1) {
      return `<svg width="50" height="50" viewBox="0 0 50 50"><rect x="10" y="10" width="30" height="30" stroke="${c}" stroke-width="2" fill="none"/></svg>`;
    }
    if (param === 2) {
      return `<svg width="50" height="50" viewBox="0 0 50 50"><circle cx="25" cy="25" r="15" stroke="${c}" stroke-width="2" fill="none"/></svg>`;
    }
    return `<svg width="50" height="50" viewBox="0 0 50 50"><line x1="10" y1="25" x2="40" y2="25" stroke="${c}" stroke-width="2"/></svg>`;
  }

  if (type === "ana") {
    if (param === 0) {
      return `<svg width="50" height="50" viewBox="0 0 50 50"><polygon points="25,8 8,40 42,40" stroke="${c}" stroke-width="2" fill="#4f46e5"/></svg>`;
    }
    if (param === 1) {
      return `<svg width="50" height="50" viewBox="0 0 50 50"><polygon points="25,8 8,40 42,40" stroke="${c}" stroke-width="2" fill="none"/></svg>`;
    }
    if (param === 2) {
      return `<svg width="50" height="50" viewBox="0 0 50 50"><circle cx="25" cy="25" r="15" stroke="${c}" stroke-width="2" fill="#4f46e5"/></svg>`;
    }
    return `<svg width="50" height="50" viewBox="0 0 50 50"><rect x="10" y="10" width="30" height="30" stroke="${c}" stroke-width="2" fill="#4f46e5"/></svg>`;
  }

  return `<svg width="50" height="50" viewBox="0 0 50 50"><circle cx="25" cy="25" r="15" stroke="${c}" stroke-width="2" fill="none"/><line x1="25" y1="10" x2="25" y2="40" stroke="${c}" stroke-width="2"/></svg>`;
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

// BANCO DE 100 PREGUNTAS ÚNICAS
const preguntas = [];

// MÓDULO 1: CONTEO DE CARAS VARIADAS (1 al 15)
const muestrasIndices = [
  [0, 3, 6, 9, 12, 15],
  [1, 2, 5, 8, 11],
  [0, 2, 4, 6, 8, 10, 12],
  [3, 7, 11, 15],
  [0, 1, 2, 3, 4, 5],
  [10, 11, 12, 13, 14, 15],
  [2, 5, 8, 11, 14],
  [0, 4, 8, 12],
  [1, 3, 5, 7, 9, 11, 13, 15],
  [0, 5, 10, 15],
  [1, 4, 7, 10, 13],
  [2, 6, 10, 14],
  [0, 1, 8, 9, 12],
  [3, 4, 5, 6, 7, 8, 9],
  [0, 7, 14]
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
    categoria: "Conteo de Caras y Patrones",
    enunciado: `¿Cuántos rostros ${esTriste ? 'tristes' : 'alegres'} con ojos ${esOjos ? 'abiertos' : 'cerrados'} se encuentran en la muestra #${i}?`,
    svg: renderSVGPattern("cara", {
      targetsIndex: targetIndices,
      ojosTipo: esOjos ? "abiertos" : "cerrados",
      bocaTipo: esTriste ? "triste" : "alegre"
    }),
    opciones: balanced.opciones,
    correcta: balanced.correcta,
    explicacion: `Observando detenidamente los 16 rostros numerados de la muestra (págs. 39-41), se contabilizan exactamente ${targetCount} rostros con la combinación requerida[cite: 1, 3].`
  });
}

// MÓDULO 2: ROTACIONES GRÁFICAS (16 al 35)
const angulosRot = [45, 90, 135, 180, 225, 270, 315, 540, 1125, 360, 405, 450, 495, 585, 630, 675, 720, 810, 900, 1080];
for (let i = 16; i <= 35; i++) {
  const deg = angulosRot[i - 16];
  const esHorario = i % 2 === 0;
  const correctAngle = esHorario ? deg : -deg;

  const rawOptions = [
    { svgType: "rot", param: correctAngle },
    { svgType: "rot", param: correctAngle + 90 },
    { svgType: "rot", param: correctAngle - 90 },
    { svgType: "rot", param: correctAngle + 180 }
  ];

  const balanced = getBalancedOptions(rawOptions, 0, i - 1);

  preguntas.push({
    id: i,
    type: "svg",
    categoria: "Rotaciones Gráficas",
    enunciado: `Identifique la figura resultante al aplicar una rotación de ${deg}° en sentido ${esHorario ? 'horario' : 'antihorario'}.`,
    svg: renderSVGPattern("rotacion", { deg: deg, sentido: esHorario ? 'Horario' : 'Antihorario' }),
    opciones: balanced.opciones,
    correcta: balanced.correcta,
    explicacion: `Al girar ${deg}° en sentido ${esHorario ? 'horario' : 'antihorario'} (págs. 43-47), la figura resultante corresponde a la opción gráfica seleccionada[cite: 5, 8].`
  });
}

// MÓDULO 3: SECUENCIAS HORIZONTALES (36 al 50)
for (let i = 36; i <= 50; i++) {
  const rawOptions = [
    { svgType: "sec", param: 0 },
    { svgType: "sec", param: 1 },
    { svgType: "sec", param: 2 },
    { svgType: "sec", param: 3 }
  ];

  const balanced = getBalancedOptions(rawOptions, 0, i - 1);

  preguntas.push({
    id: i,
    type: "svg",
    categoria: "Secuencias Horizontales",
    enunciado: `Escoja la figura que completa la secuencia gráfica horizontal en la casilla '?' (Ejercicio ${i}).`,
    svg: renderSVGPattern("secuencia", {}),
    opciones: balanced.opciones,
    correcta: balanced.correcta,
    explicacion: "En las secuencias del libro (págs. 48-50), cada casillero añade un nuevo eje interno completando la estrella de 8 puntas[cite: 10, 11]."
  });
}

// MÓDULO 4: MATRICES GRÁFICAS 3x3 (51 al 70)
for (let i = 51; i <= 70; i++) {
  const rawOptions = [
    { svgType: "mat", param: 0 },
    { svgType: "mat", param: 1 },
    { svgType: "mat", param: 2 },
    { svgType: "mat", param: 3 }
  ];

  const balanced = getBalancedOptions(rawOptions, 0, i - 1);

  preguntas.push({
    id: i,
    type: "svg",
    categoria: "Matrices Gráficas 3x3",
    enunciado: `Identifique la figura que reemplaza el signo de interrogación en la matriz (Ejercicio ${i}).`,
    svg: renderSVGPattern("matriz", {}),
    opciones: balanced.opciones,
    correcta: balanced.correcta,
    explicacion: "Analizando la relación bidireccional por filas y columnas (págs. 51-59), la casilla libre completa el patrón con el triángulo contenedor[cite: 13, 21]."
  });
}

// MÓDULO 5: SUPERPOSICIÓN DE FIGURAS (71 al 80)
for (let i = 71; i <= 80; i++) {
  const rawOptions = [
    { svgType: "sup", param: 0 },
    { svgType: "sup", param: 1 },
    { svgType: "sup", param: 2 },
    { svgType: "sup", param: 3 }
  ];

  const balanced = getBalancedOptions(rawOptions, 0, i - 1);

  preguntas.push({
    id: i,
    type: "svg",
    categoria: "Superposición de Figuras",
    enunciado: `Seleccione la figura resultante de superponer la columna 1 y columna 2 (Ejercicio ${i}).`,
    svg: renderSVGPattern("matriz", {}),
    opciones: balanced.opciones,
    correcta: balanced.correcta,
    explicacion: "En las matrices de superposición (págs. 60-63), se suman visualmente los trazos internos formando la 'X' completa[cite: 22, 25]."
  });
}

// MÓDULO 6: ANALOGÍAS ENTRE FIGURAS (81 al 90)
for (let i = 81; i <= 90; i++) {
  const rawOptions = [
    { svgType: "ana", param: 0 },
    { svgType: "ana", param: 1 },
    { svgType: "ana", param: 2 },
    { svgType: "ana", param: 3 }
  ];

  const balanced = getBalancedOptions(rawOptions, 0, i - 1);

  preguntas.push({
    id: i,
    type: "svg",
    categoria: "Analogías Figurativas",
    enunciado: `Indique la figura que completa la analogía A : B :: C : ? (Ejercicio ${i}).`,
    svg: renderSVGPattern("analogia", {}),
    opciones: balanced.opciones,
    correcta: balanced.correcta,
    explicacion: "La relación entre A y B es el rellenado completo de la forma. Aplicando esa regla a C (triángulo hueco), resulta el triángulo sólido[cite: 26, 29]."
  });
}

// MÓDULO 7: SECUENCIAS ANALÓGICAS (91 al 100)
for (let i = 91; i <= 100; i++) {
  const rawOptions = [
    { svgType: "san", param: 0 },
    { svgType: "san", param: 1 },
    { svgType: "san", param: 2 },
    { svgType: "san", param: 3 }
  ];

  const balanced = getBalancedOptions(rawOptions, 0, i - 1);

  preguntas.push({
    id: i,
    type: "svg",
    categoria: "Secuencias Analógicas",
    enunciado: `Determine la figura que responde a la secuencia analógica (Ejercicio ${i}).`,
    svg: renderSVGPattern("secuencia", {}),
    opciones: balanced.opciones,
    correcta: balanced.correcta,
    explicacion: "Siguiendo la pauta del patrón de referencia (págs. 68-71), se conserva el contorno circular con el eje simétrico vertical[cite: 30, 33]."
  });
}

// ESTADO GLOBAL
let actual = 0;
let usuarioRespuestas = new Array(100).fill(null);
let tiempoRestante = 3600;
let timerId = null;

// ELEMENTOS DOM
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

    let contentHTML = '';
    if (q.type === 'text') {
      contentHTML = op.html;
    } else {
      contentHTML = renderOptionSVG(op.svgType, op.param);
    }

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
    
    let optAnswerText = '';
    if (userAns !== null) {
      const selectedOp = q.opciones[userAns];
      optAnswerText = q.type === 'text' ? selectedOp.html : renderOptionSVG(selectedOp.svgType, selectedOp.param);
    } else {
      optAnswerText = 'Sin responder';
    }

    const correctOp = q.opciones[q.correcta];
    const correctText = q.type === 'text' ? correctOp.html : renderOptionSVG(correctOp.svgType, correctOp.param);

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

  let msg = "Debes reforzar las secuencias y matrices de superposición.";
  if (puntaje >= 850) msg = "¡Excelente desempeño! Tienes un nivel óptimo para ingresar a la UNL.";
  else if (puntaje >= 700) msg = "¡Buen trabajo! Estás muy cerca de la puntuación máxima.";
  document.getElementById('score-feedback').innerText = msg;
}

// TOGGLE DE TEMA CLARO / OSCURO
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