async function cargarReportes() {
  try {
    const response = await fetch('data/reportes.json');
    const reportes = await response.json();

    const container = document.getElementById('reportes-container');

    container.innerHTML = '';

    reportes.forEach(reporte => {
      const card = document.createElement('div');
      card.className = 'candidate-card';

      card.innerHTML = `
        <h3>${reporte.titulo}</h3>
        <p><strong>Fecha:</strong> ${reporte.fecha}</p>
        <p>Documento oficial en formato PDF</p>
        <a href="${reporte.archivo}" target="_blank" class="download-btn">
          Descargar PDF
        </a>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error('Error cargando reportes:', error);
  }
}

cargarReportes();