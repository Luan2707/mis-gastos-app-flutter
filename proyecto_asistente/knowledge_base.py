from typing import Any, Dict, List


class KnowledgeBase:
    def __init__(self):
        self.rules = [
            {
                "id": "R1",
                "nombre": "Nivel básico prioriza fundamentos",
                "condicion": "nivel == 'Básico'",
                "accion": "Priorizar recursos introductorios y fundamentos (+15 pts)",
            },
            {
                "id": "R2",
                "nombre": "Horas limitadas prioriza cursos cortos",
                "condicion": "horas_disponibles < 5",
                "accion": "Priorizar recursos con duracion_horas <= 4",
            },
            {
                "id": "R3",
                "nombre": "Modalidad práctica o proyecto",
                "condicion": "modalidad in ['Práctica', 'Proyecto']",
                "accion": "Priorizar talleres, laboratorios y proyectos aplicados (+10 pts)",
            },
            {
                "id": "R4",
                "nombre": "Objetivo de programación",
                "condicion": "objetivo menciona programar, código, desarrollo o software",
                "accion": "Priorizar recursos de Programación y Python",
            },
            {
                "id": "R5",
                "nombre": "Tema de Inteligencia Artificial",
                "condicion": "tema == 'Inteligencia Artificial'",
                "accion": "Añadir temas de búsqueda, reglas y LLMs",
            },
        ]

    @staticmethod
    def _normalize(value: str) -> str:
        return " ".join(str(value or "").lower().replace("-", " ").split())

    def evaluate(self, profile: Dict[str, Any], resources: List[Dict[str, Any]]) -> Dict[str, Any]:
        profile_copy = profile or {}
        objetivo = self._normalize(profile_copy.get("objetivo", ""))
        nivel = (profile_copy.get("nivel") or "").strip()
        horas = float(profile_copy.get("horas", 0) or 0)
        modalidad = (profile_copy.get("modalidad") or "").strip()
        tema = self._normalize(profile_copy.get("tema", ""))

        reglas_activadas = []
        for regla in self.rules:
            trigger = False
            if regla["id"] == "R1" and nivel.lower() == "básico":
                trigger = True
            elif regla["id"] == "R2" and horas < 5:
                trigger = True
            elif regla["id"] == "R3" and modalidad.lower() in {"práctica", "proyecto", "practica"}:
                trigger = True
            elif regla["id"] == "R4" and any(word in objetivo for word in ["programar", "codigo", "código", "desarrollo", "software"]):
                trigger = True
            elif regla["id"] == "R5" and "inteligencia artificial" in tema:
                trigger = True

            if trigger:
                reglas_activadas.append({
                    "id": regla["id"],
                    "nombre": regla["nombre"],
                    "condicion": regla["condicion"],
                    "accion": regla["accion"],
                })

        rankings = []
        for recurso in resources:
            score = 0
            titulo = self._normalize(recurso.get("titulo", ""))
            categoria = self._normalize(recurso.get("categoria", ""))
            palabras = " ".join(recurso.get("palabras_clave", [])).lower()

            if nivel.lower() == "básico" and ("fundamento" in titulo or "intro" in titulo or "python" in palabras or "bases" in titulo):
                score += 15
            if horas < 5 and float(recurso.get("duracion_horas", 0)) <= 4:
                score += 10
            if modalidad.lower() in {"práctica", "proyecto", "practica"} and recurso.get("modalidad", "").lower() in {"práctica", "proyecto"}:
                score += 10
            if any(word in objetivo for word in ["programar", "codigo", "código", "desarrollo", "software"]) and ("python" in palabras or "programación" in categoria or "desarrollo" in categoria):
                score += 15
            if "inteligencia artificial" in tema and any(word in palabras for word in ["search", "búsqueda", "sistemas basados en reglas", "llm", "ia", "python"]):
                score += 10

            if recurso.get("nivel") == nivel:
                score += 8
            rankings.append({**recurso, "score": score})

        ranked = sorted(rankings, key=lambda item: item["score"], reverse=True)
        return {
            "reglas_activadas": reglas_activadas,
            "recommended_resources": ranked[:6],
            "ranking": ranked,
        }
