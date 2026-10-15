const API_BASE = '/api';

function setStatus(message, type = 'muted') {
  const status = document.getElementById('search-status');
  status.className = `status ${type}`;
  status.textContent = message;
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  return response.json();
}

function renderTrace(data) {
  const box = document.getElementById('search-trace');
  if (!data || !data.traza) {
    box.textContent = 'Sin trazas.';
    return;
  }

  const lines = data.traza.map((item) => {
    if (item.rango) {
      return `- Rango: ${item.rango} | Medio: ${item.indice_medio} | Pivot: ${item.pivot}`;
    }
    if (item.nodo) {
      return `- Nodo: ${item.nodo} | Tipo: ${item.tipo} | Título: ${item.titulo || item.valor || ''}`;
    }
    return `- Recurso: ${item.recurso || item.titulo || item.valor || ''} | Score: ${item.score ?? ''}`;
  });

  box.textContent = [
    `Algoritmo: ${data.algoritmo}`,
    `Tiempo: ${data.tiempo_ms} ms`,
    `Pasos: ${data.pasos}`,
    `Coincidencias: ${data.coincidencias?.length ?? 0}`,
    '',
    ...lines,
  ].join('\n');
}

function renderComparison(rows) {
  const tbody = document.querySelector('#comparacion-table tbody');
  tbody.innerHTML = '';
  rows.forEach((row) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row['Algoritmo']}</td>
      <td>${row['Tiempo (ms)']}</td>
      <td>${row['Pasos ejecutados']}</td>
      <td>${row['Elementos revisados']}</td>
      <td>${row['Coincidencias encontradas']}</td>
      <td>${row['Complejidad temporal']}</td>
    `;
    tbody.appendChild(tr);
  });
}

function renderRules(rules) {
  const panel = document.getElementById('rules-panel');
  panel.innerHTML = '';
  if (!rules || !rules.length) {
    panel.innerHTML = '<span class="badge">Sin reglas activadas.</span>';
    return;
  }

  rules.forEach((rule) => {
    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = `${rule.id}: ${rule.nombre}`;
    panel.appendChild(badge);
  });
}

function renderResources(resources) {
  const container = document.getElementById('resource-cards');
  container.innerHTML = '';
  if (!resources || !resources.length) {
    container.innerHTML = '<p>No se encontraron recursos.</p>';
    return;
  }

  resources.forEach((resource) => {
    const card = document.createElement('article');
    card.className = 'resource-card';
    card.innerHTML = `
      <h4>${resource.titulo}</h4>
      <p>${resource.descripcion}</p>
      <div class="meta">
        <span>${resource.categoria}</span>
        <span>${resource.subcategoria}</span>
        <span>${resource.nivel}</span>
        <span>${resource.modalidad}</span>
        <span>${resource.duracion_horas}h</span>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderPlan(planText) {
  const panel = document.getElementById('plan-panel');
  panel.textContent = planText || 'Sin plan generado.';
}

async function buscar() {
  const algoritmo = document.getElementById('algoritmo').value;
  const consulta = document.getElementById('consulta').value.trim();

  if (!consulta) {
    setStatus('Debes ingresar una consulta.', 'error');
    return;
  }

  setStatus('Ejecutando búsqueda...', 'success');
  const data = await fetchJson(`${API_BASE}/buscar`, {
    method: 'POST',
    body: JSON.stringify({ algoritmo, consulta, perfil: {} }),
  });

  renderTrace(data);
  setStatus(`Búsqueda finalizada con ${data.coincidencias?.length ?? 0} coincidencias.`, 'success');
}

async function comparar() {
  const consulta = document.getElementById('consulta').value.trim() || 'inteligencia artificial';
  const data = await fetchJson(`${API_BASE}/comparar`, {
    method: 'POST',
    body: JSON.stringify({ consulta, perfil: {} }),
  });
  renderComparison(data.algoritmos || []);
  setStatus('Comparativa ejecutada correctamente.', 'success');
}

async function recomendar() {
  const perfil = {
    nombre: document.getElementById('nombre').value || 'Estudiante',
    tema: document.getElementById('tema').value || 'Inteligencia Artificial',
    nivel: document.getElementById('nivel').value || 'Básico',
    horas: Number(document.getElementById('horas').value || 5),
    modalidad: document.getElementById('modalidad').value || 'Práctica',
    objetivo: document.getElementById('objetivo').value || 'Aprender con práctica y recursos claros.',
  };

  setStatus('Generando recomendación y plan de estudio...', 'success');
  const data = await fetchJson(`${API_BASE}/recomendar`, {
    method: 'POST',
    body: JSON.stringify(perfil),
  });

  renderRules(data.reglas_activadas || []);
  renderResources(data.ranking_final || []);
  renderPlan(data.plan || 'Sin plan disponible.');
  setStatus(`${data.origen_plan || 'Fallback'} y ${data.origen_semantica || 'Fallback'} aplicados.`, 'success');
}

document.getElementById('buscar-btn').addEventListener('click', buscar);
document.getElementById('comparar-btn').addEventListener('click', comparar);
document.getElementById('perfil-form').addEventListener('submit', (event) => {
  event.preventDefault();
  recomendar();
});
