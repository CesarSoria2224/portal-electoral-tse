async function cargarDepartamentos() {
  try {
    const response = await fetch('data/departamentos.json');
    const departamentos = await response.json();

    const container = document.getElementById('departamentos-container');

    container.innerHTML = '';

    departamentos.forEach(dep => {
      const card = document.createElement('div');
      card.className = 'candidate-card';

      card.innerHTML = `
        <h3>${dep.nombre}</h3>
        <p><strong>Participación:</strong> ${dep.participacion}%</p>
        <p><strong>Total votos:</strong> ${dep.votos.toLocaleString()}</p>
        <p><strong>Ganador:</strong> ${dep.ganador}</p>
        <p class="percentage">${dep.porcentaje_ganador}%</p>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error('Error cargando departamentos:', error);
  }
}

cargarDepartamentos();