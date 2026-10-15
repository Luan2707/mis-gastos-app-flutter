# Asistente Inteligente para Búsqueda y Recomendación de Recursos Educativos

Aplicación web desarrollada en Flask con interfaz HTML/CSS/JS vanilla. Permite buscar recursos educativos, comparar algoritmos de búsqueda, identificar reglas de inferencia y generar rutas de estudio con fallback local si no hay API keys o internet.

## Requisitos previos

- Python 3.10+
- pip
- Git opcional
- Navegador web

## 1. Crear entorno virtual

### Windows

```powershell
cd C:\ruta\al\proyecto\proyecto_asistente
py -3 -m venv .venv
.\.venv\Scripts\Activate.ps1
```

### Linux/macOS

```bash
cd /ruta/al/proyecto/proyecto_asistente
python3 -m venv .venv
source .venv/bin/activate
```

## 2. Instalar dependencias

```bash
pip install -r requirements.txt
```

## 3. Configurar variables de entorno

Copia el archivo de ejemplo:

```bash
copy .env.example .env
```

En Linux/macOS:

```bash
cp .env.example .env
```

Edita `.env` y añade tus claves reales si las tienes. Si no existen, la aplicación seguirá funcionando usando fallback local.

## 4. Ejecutar la aplicación

```bash
python app.py
```

Luego abre en el navegador:

```text
http://127.0.0.1:5000
```

## 5. Modo contingencia / fallback

La aplicación está diseñada para no caerse si:

- no existe `.env`
- faltan `OPENROUTER_API_KEY` o `COHERE_API_KEY`
- la conexión a internet falla
- las APIs externas responden con error

Entonces:

- usa Jaccard para ordenación local
- genera una ruta pedagógica tipo plantilla
- mantiene la interfaz operativa sin romper la experiencia

## 6. Casos de prueba para la demostración

### Caso 1: Búsqueda lineal

Entrada:

- Algoritmo: Lineal
- Consulta: "búsqueda en IA"

Salida esperada:

- trazas con pasos y recursos revisados
- tiempo en milisegundos
- coincidencias relevantes

### Caso 2: Comparación de algoritmos

Entrada:

- Consulta: "programación con python"
- Botón: "Comparar 5 algoritmos"

Salida esperada:

- tabla con Lineal, Binaria, DFS, BFS y Heurística
- columnas de tiempo, pasos, revisados, coincidencias y complejidad

### Caso 3: Recomendación personalizada

Entrada:

- Nombre: Ana
- Tema: Inteligencia Artificial
- Nivel: Intermedio
- Horas: 6
- Modalidad: Práctica
- Objetivo: "Quiero aprender a programar con Python y desarrollar sistemas inteligentes con IA."

Salida esperada:

- reglas activadas
- recursos recomendados
- plan pedagógico generado
- origen: API Externa o Modo Fallback Local

## 7. Estructura de archivos

```text
proyecto_asistente/
├── app.py
├── ai_services.py
├── knowledge_base.py
├── search_engine.py
├── requirements.txt
├── .env.example
├── README.md
├── data/
│   └── recursos_educativos.json
├── static/
│   ├── css/
│   └── js/
├── templates/
│   └── index.html
└── .venv/   (opcional, generado localmente)
```

## 8. Importante

No se incluye ninguna clave real en el repositorio. Las credenciales deben mantenerse en un `.env` local y no se debe subir al ZIP ni al control de versiones.
