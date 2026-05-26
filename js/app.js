async function cargarDashboard() {
  try {
    const resultadosResponse = await fetch('data/resultados.json');
    const candidatosResponse = await fetch('data/candidatos.json');

    const resultadosData = await resultadosResponse.json();
    const candidatosData = await candidatosResponse.json();

    // HERO
    document.getElementById('eleccion-title').textContent =
      resultadosData.eleccion;

    document.getElementById('estado-eleccion').textContent =
      resultadosData.estado;

    // STATS
    document.getElementById('participacion').textContent =
      resultadosData.participacion + '%';

    document.getElementById('actas').textContent =
      resultadosData.actas_procesadas + '%';

    document.getElementById('votos').textContent =
      resultadosData.total_votos.toLocaleString();

    document.getElementById('actualizacion').textContent =
      resultadosData.ultima_actualizacion;

    // CANDIDATOS
    const container = document.getElementById('candidatos-container');

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
        <p>${candidato.partido} (${candidato.sigla})</p>
        <p>${resultado.votos.toLocaleString()} votos</p>
        <p class="percentage" style="color:${candidato.color}">
          ${resultado.porcentaje}%
        </p>
      `;

      container.appendChild(card);
    });

    // CHART
    const ctx = document.getElementById('resultsChart').getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: candidatosData.map(c => c.nombre),
        datasets: [
          {
            label: 'Porcentaje de votos',
            data: resultadosData.resultados.map(r => r.porcentaje),
            backgroundColor: candidatosData.map(c => c.color)
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });

  } catch (error) {
    console.error('Error cargando dashboard:', error);
  }
}

cargarDashboard();