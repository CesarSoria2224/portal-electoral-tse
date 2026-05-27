const fs = require('fs');

function loadJSON(path) {
    try {
        return JSON.parse(fs.readFileSync(path, 'utf8'));
    } catch (err) {
        throw new Error(`JSON inválido en ${path}: ${err.message}`);
    }
}

function validateResultados(data) {
    const required = [
        'eleccion',
        'estado',
        'participacion',
        'actas_procesadas',
        'total_votos',
        'ultima_actualizacion',
        'resultados'
    ];

    required.forEach(field => {
        if (!(field in data)) {
            throw new Error(`Falta campo obligatorio en resultados.json: ${field}`);
        }
    });

    if (typeof data.participacion !== 'number' || data.participacion < 0 || data.participacion > 100) {
        throw new Error('participacion inválida en resultados.json');
    }

    if (typeof data.actas_procesadas !== 'number' || data.actas_procesadas < 0 || data.actas_procesadas > 100) {
        throw new Error('actas_procesadas inválida en resultados.json');
    }

    if (typeof data.total_votos !== 'number' || data.total_votos < 0) {
        throw new Error('total_votos inválido en resultados.json');
    }

    if (!Array.isArray(data.resultados)) {
        throw new Error('resultados debe ser un array');
    }

    data.resultados.forEach((item, index) => {
        if (typeof item.candidato_id !== 'number') {
            throw new Error(`candidato_id inválido en resultados[${index}]`);
        }

        if (typeof item.votos !== 'number' || item.votos < 0) {
            throw new Error(`votos inválidos en resultados[${index}]`);
        }

        if (typeof item.porcentaje !== 'number' || item.porcentaje < 0 || item.porcentaje > 100) {
            throw new Error(`porcentaje inválido en resultados[${index}]`);
        }
    });
}

function validateCandidatos(data) {
    if (!Array.isArray(data)) {
        throw new Error('candidatos.json debe ser un array');
    }

    data.forEach((item, index) => {
        if (typeof item.id !== 'number') {
            throw new Error(`id inválido en candidatos[${index}]`);
        }

        if (typeof item.nombre !== 'string' || !item.nombre.trim()) {
            throw new Error(`nombre inválido en candidatos[${index}]`);
        }

        if (typeof item.partido !== 'string' || !item.partido.trim()) {
            throw new Error(`partido inválido en candidatos[${index}]`);
        }

        if (typeof item.sigla !== 'string' || !item.sigla.trim()) {
            throw new Error(`sigla inválida en candidatos[${index}]`);
        }

        if (typeof item.imagen !== 'string' || !item.imagen.trim()) {
            throw new Error(`imagen inválida en candidatos[${index}]`);
        }
    });
}

function validateDepartamentos(data) {
    if (!Array.isArray(data)) {
        throw new Error('departamentos.json debe ser un array');
    }

    data.forEach((item, index) => {
        if (typeof item.nombre !== 'string' || !item.nombre.trim()) {
            throw new Error(`nombre inválido en departamentos[${index}]`);
        }

        if (typeof item.participacion !== 'number' || item.participacion < 0 || item.participacion > 100) {
            throw new Error(`participacion inválida en departamentos[${index}]`);
        }

        if (typeof item.ganador_id !== 'number') {
            throw new Error(`ganador_id inválido en departamentos[${index}]`);
        }
    });
}

function validateReportes(data) {
    if (!Array.isArray(data)) {
        throw new Error('reportes.json debe ser un array');
    }

    data.forEach((item, index) => {
        if (typeof item.titulo !== 'string' || !item.titulo.trim()) {
            throw new Error(`titulo inválido en reportes[${index}]`);
        }

        if (typeof item.archivo !== 'string' || !item.archivo.trim()) {
            throw new Error(`archivo inválido en reportes[${index}]`);
        }

        if (typeof item.fecha !== 'string' || !item.fecha.trim()) {
            throw new Error(`fecha inválida en reportes[${index}]`);
        }
    });
}

try {
    validateResultados(loadJSON('data/resultados.json'));
    validateCandidatos(loadJSON('data/candidatos.json'));
    validateDepartamentos(loadJSON('data/departamentos.json'));
    validateReportes(loadJSON('data/reportes.json'));

    console.log('Validación JSON completada correctamente');
} catch (err) {
    console.error(err.message);
    process.exit(1);
}