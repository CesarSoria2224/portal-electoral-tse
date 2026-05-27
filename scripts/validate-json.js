const fs = require("fs");

function leerJSON(ruta) {
  return JSON.parse(fs.readFileSync(ruta, "utf8"));
}

function error(msg) {
  console.error(msg);
  process.exit(1);
}

/* =========================
   candidatos.json
========================= */
const candidatos = leerJSON("data/candidatos.json");

if (!Array.isArray(candidatos)) {
  error("candidatos.json debe ser un arreglo");
}

candidatos.forEach((c, i) => {
  if (typeof c.id !== "number") {
    error(`id inválido en candidatos[${i}]`);
  }

  if (typeof c.nombre !== "string") {
    error(`nombre inválido en candidatos[${i}]`);
  }

  if (typeof c.partido !== "string") {
    error(`partido inválido en candidatos[${i}]`);
  }

  if (typeof c.sigla !== "string") {
    error(`sigla inválida en candidatos[${i}]`);
  }

  if (typeof c.color !== "string") {
    error(`color inválido en candidatos[${i}]`);
  }

  if (typeof c.imagen !== "string") {
    error(`imagen inválida en candidatos[${i}]`);
  }
});

/* =========================
   resultados.json
========================= */
const resultados = leerJSON("data/resultados.json");

if (typeof resultados.eleccion !== "string") {
  error("eleccion inválido en resultados.json");
}

if (typeof resultados.estado !== "string") {
  error("estado inválido en resultados.json");
}

if (typeof resultados.participacion !== "number") {
  error("participacion inválido en resultados.json");
}

if (typeof resultados.actas_procesadas !== "number") {
  error("actas_procesadas inválido en resultados.json");
}

if (typeof resultados.total_votos !== "number") {
  error("total_votos inválido en resultados.json");
}

if (typeof resultados.ultima_actualizacion !== "string") {
  error("ultima_actualizacion inválido en resultados.json");
}

if (!Array.isArray(resultados.resultados)) {
  error("resultados.resultados debe ser un arreglo");
}

resultados.resultados.forEach((r, i) => {
  if (typeof r.candidato_id !== "number") {
    error(`candidato_id inválido en resultados[${i}]`);
  }

  if (typeof r.votos !== "number") {
    error(`votos inválido en resultados[${i}]`);
  }

  if (typeof r.porcentaje !== "number") {
    error(`porcentaje inválido en resultados[${i}]`);
  }
});

/* =========================
   departamentos.json
========================= */
const departamentos = leerJSON("data/departamentos.json");

if (!Array.isArray(departamentos)) {
  error("departamentos.json debe ser un arreglo");
}

departamentos.forEach((d, i) => {
  if (typeof d.nombre !== "string") {
    error(`nombre inválido en departamentos[${i}]`);
  }

  if (typeof d.participacion !== "number") {
    error(`participacion inválido en departamentos[${i}]`);
  }

  if (typeof d.votos !== "number") {
    error(`votos inválido en departamentos[${i}]`);
  }

  if (typeof d.ganador !== "string") {
    error(`ganador inválido en departamentos[${i}]`);
  }

  if (typeof d.porcentaje_ganador !== "number") {
    error(`porcentaje_ganador inválido en departamentos[${i}]`);
  }
});

/* =========================
   reportes.json
========================= */
const reportes = leerJSON("data/reportes.json");

if (!Array.isArray(reportes)) {
  error("reportes.json debe ser un arreglo");
}

reportes.forEach((r, i) => {
  if (typeof r.titulo !== "string") {
    error(`titulo inválido en reportes[${i}]`);
  }

  if (typeof r.fecha !== "string") {
    error(`fecha inválida en reportes[${i}]`);
  }

  if (typeof r.archivo !== "string") {
    error(`archivo inválido en reportes[${i}]`);
  }
});

console.log("Validación JSON completada correctamente");