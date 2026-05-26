async function cargarResultados() {
  try {
    const resultadosResponse = await fetch('data/resultados.json');
    const candidatosResponse = await fetch('data/candidatos.json');

    const resultadosData = await resultadosResponse.json();
    const candidatosData = await candidatosResponse.json();

    const container = document.getElementById('resultados-container');

    container.innerHTML = '';

    resultadosData.resultados.forEach(resultado => {
      const candidato = candidatosData.find(
        c => c.id === resultado.candidato_id
      );

      const card = document.createElement('div');
      card.className = 'candidate-card';

      card.innerHTML = `
        <img src="${candidato.imagen}" alt="${candidato.nombre}">
        <h3>${candidato.nombre}</h3>
        <p><strong>Partido:</strong> ${candidato.partido}</p>
        <p><strong>Sigla:</strong> ${candidato.sigla}</p>
        <p><strong>Votos:</strong> ${resultado.votos.toLocaleString()}</p>
        <p class="percentage" style="color:${candidato.color}">
          ${resultado.porcentaje}%
        </p>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error('Error cargando resultados:', error);
  }
}

cargarResultados();