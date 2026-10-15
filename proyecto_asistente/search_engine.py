import math
import time
from collections import deque
from typing import Any, Dict, List


class SearchEngine:
    def __init__(self, resources: List[Dict[str, Any]]):
        self.resources = resources
        self.tree = self.build_hierarchy(resources)

    @staticmethod
    def _remove_accents(value: str) -> str:
        replacements = {
            "á": "a", "é": "e", "í": "i", "ó": "o", "ú": "u",
            "ü": "u", "ñ": "n",
            "Á": "A", "É": "E", "Í": "I", "Ó": "O", "Ú": "U",
            "Ü": "U", "Ñ": "N",
        }
        texto = str(value)
        for original, replacement in replacements.items():
            texto = texto.replace(original, replacement)
        return texto

    def build_hierarchy(self, resources: List[Dict[str, Any]]) -> Dict[str, Dict[str, List[Dict[str, Any]]]]:
        tree: Dict[str, Dict[str, List[Dict[str, Any]]]] = {}
        for item in resources:
            categoria = item.get("categoria", "General")
            subcategoria = item.get("subcategoria", "General")
            tree.setdefault(categoria, {})
            tree[categoria].setdefault(subcategoria, [])
            tree[categoria][subcategoria].append(item)
        return tree

    @staticmethod
    def _normalize(value: str) -> str:
        return " ".join(SearchEngine._remove_accents(str(value)).lower().replace("-", " ").split())

    @staticmethod
    def _to_text(resource: Dict[str, Any]) -> str:
        return " ".join([
            str(resource.get("titulo", "")),
            str(resource.get("categoria", "")),
            str(resource.get("subcategoria", "")),
            " ".join(resource.get("palabras_clave", [])),
            str(resource.get("descripcion", "")),
        ]).lower()

    def _matches_query(self, resource: Dict[str, Any], query: str) -> bool:
        if not query:
            return True
        text = self._to_text(resource)
        q = self._normalize(query)
        return q in text

    def linear_search(self, query: str) -> Dict[str, Any]:
        start = time.perf_counter()
        pasos = []
        revisados = []
        matches = []
        for index, resource in enumerate(self.resources):
            pasos.append({
                "paso": index + 1,
                "titulo": resource.get("titulo"),
                "comparacion": f"Buscar '{query}' en titulo/categoria/keywords",
                "resultado": "coincide" if self._matches_query(resource, query) else "no coincide",
            })
            revisados.append(resource.get("codigo"))
            if self._matches_query(resource, query):
                matches.append(resource)
        elapsed = (time.perf_counter() - start) * 1000
        return {
            "algoritmo": "Lineal",
            "tiempo_ms": round(elapsed, 3),
            "pasos": len(pasos),
            "elementos_revisados": revisados,
            "coincidencias": matches,
            "traza": pasos,
            "complejidad": "O(n)",
        }

    def binary_search(self, query: str) -> Dict[str, Any]:
        ordered = sorted(self.resources, key=lambda r: r.get("titulo", "").lower())
        inicio, fin = 0, len(ordered) - 1
        pasos = []
        revisados = []
        matches = []
        start = time.perf_counter()

        while inicio <= fin:
            medio = (inicio + fin) // 2
            pivot = ordered[medio]
            revisados.append(pivot.get("codigo"))
            rango = f"[{inicio}..{fin}]"
            punto_medio = medio
            valor = pivot.get("titulo", "").lower()
            pasos.append({
                "rango": rango,
                "indice_medio": punto_medio,
                "pivot": valor,
                "comparacion": f"Comparar '{query}' con '{valor}'",
            })

            q = self._normalize(query)
            pv = self._normalize(valor)
            if q in pv:
                matches.append(pivot)
                break
            if q < pv:
                fin = medio - 1
            else:
                inicio = medio + 1

        elapsed = (time.perf_counter() - start) * 1000
        return {
            "algoritmo": "Binaria",
            "tiempo_ms": round(elapsed, 3),
            "pasos": len(pasos),
            "elementos_revisados": revisados,
            "coincidencias": matches,
            "traza": pasos,
            "complejidad": "O(log n)",
        }

    def dfs_tree_search(self, query: str) -> Dict[str, Any]:
        start = time.perf_counter()
        traza = []
        matches = []

        def recorrer(node: Dict[str, Any], path: str = ""):
            for key, value in node.items():
                if isinstance(value, list):
                    traza.append({"nodo": f"{path}/{key}", "tipo": "recurso", "valor": key})
                    for item in value:
                        if self._matches_query(item, query):
                            matches.append(item)
                        traza.append({
                            "nodo": f"{path}/{key}/{item.get('codigo', '')}",
                            "tipo": "recurso_inspeccionado",
                            "titulo": item.get("titulo", ""),
                        })
                elif isinstance(value, dict):
                    traza.append({"nodo": f"{path}/{key}", "tipo": "subcategoria", "valor": key})
                    recorrer(value, f"{path}/{key}")

        recorrer(self.tree)
        elapsed = (time.perf_counter() - start) * 1000
        return {
            "algoritmo": "DFS",
            "tiempo_ms": round(elapsed, 3),
            "pasos": len(traza),
            "elementos_revisados": [item.get("nodo") for item in traza if item.get("tipo") == "recurso_inspeccionado"],
            "coincidencias": matches,
            "traza": traza,
            "complejidad": "O(n)",
        }

    def bfs_tree_search(self, query: str) -> Dict[str, Any]:
        start = time.perf_counter()
        cola = deque()
        traza = []
        matches = []
        for categoria, subcats in self.tree.items():
            cola.append((categoria, "categoria"))
            traza.append({"nodo": categoria, "tipo": "categoria", "valor": categoria})
            for subcategoria, recursos in subcats.items():
                cola.append((subcategoria, "subcategoria"))
                traza.append({"nodo": f"{categoria}/{subcategoria}", "tipo": "subcategoria", "valor": subcategoria})
                for recurso in recursos:
                    cola.append((recurso, "recurso"))
                    traza.append({"nodo": f"{categoria}/{subcategoria}/{recurso.get('codigo', '')}", "tipo": "recurso", "titulo": recurso.get("titulo", "")})
                    if self._matches_query(recurso, query):
                        matches.append(recurso)

        elapsed = (time.perf_counter() - start) * 1000
        return {
            "algoritmo": "BFS",
            "tiempo_ms": round(elapsed, 3),
            "pasos": len(traza),
            "elementos_revisados": [item.get("nodo") for item in traza if item.get("tipo") == "recurso"],
            "coincidencias": matches,
            "traza": traza,
            "complejidad": "O(n)",
        }

    def heuristic_search(self, profile: Dict[str, Any], query: str) -> Dict[str, Any]:
        start = time.perf_counter()
        resultado = []
        for recurso in self.resources:
            score = 0
            tema = self._normalize(profile.get("tema", ""))
            objetivo = self._normalize(profile.get("objetivo", ""))
            nivel = profile.get("nivel", "")
            modalidad = profile.get("modalidad", "")
            horas = float(profile.get("horas", 0) or 0)

            if tema and tema in self._normalize(recurso.get("categoria", "")):
                score += 35
            if nivel and recurso.get("nivel") == nivel:
                score += 20
            if modalidad and recurso.get("modalidad") == modalidad:
                score += 15
            if recurso.get("duracion_horas", 0) <= horas:
                score += 15

            palabras_objetivo = set(self._normalize(objetivo).split())
            palabras_recurso = set(self._normalize(" ".join(recurso.get("palabras_clave", []))).split())
            overlap = len(palabras_objetivo.intersection(palabras_recurso))
            score += min(15, overlap * 15)

            resultado.append({**recurso, "score": score})

        ranking = sorted(resultado, key=lambda r: r["score"], reverse=True)
        elapsed = (time.perf_counter() - start) * 1000
        return {
            "algoritmo": "Heurística",
            "tiempo_ms": round(elapsed, 3),
            "pasos": len(ranking),
            "elementos_revisados": [r.get("codigo") for r in ranking],
            "coincidencias": ranking[:10],
            "traza": [{"recurso": r.get("codigo"), "score": r.get("score")} for r in ranking[:10]],
            "complejidad": "O(n)",
        }

    def execute_algorithm(self, algorithm: str, query: str, profile: Dict[str, Any] | None = None) -> Dict[str, Any]:
        algo = self._remove_accents((algorithm or "Lineal").strip()).lower().replace(" ", "")
        if algo in {"lineal", "linear"}:
            return self.linear_search(query)
        if algo in {"binaria", "binary"}:
            return self.binary_search(query)
        if algo in {"dfs", "depthfirst", "profundidad"}:
            return self.dfs_tree_search(query)
        if algo in {"bfs", "breadthfirst", "anchura"}:
            return self.bfs_tree_search(query)
        if algo in {"heuristica", "heuristic"}:
            return self.heuristic_search(profile or {}, query)
        return self.linear_search(query)

    def compare_algorithms(self, query: str, profile: Dict[str, Any] | None = None) -> Dict[str, Any]:
        algorithms = ["Lineal", "Binaria", "DFS", "BFS", "Heurística"]
        resultados = []
        for nombre in algorithms:
            resultado = self.execute_algorithm(nombre, query, profile or {})
            resultados.append({
                "Algoritmo": resultado["algoritmo"],
                "Tiempo (ms)": resultado["tiempo_ms"],
                "Pasos ejecutados": resultado["pasos"],
                "Elementos revisados": len(resultado["elementos_revisados"]),
                "Coincidencias encontradas": len(resultado["coincidencias"]),
                "Complejidad temporal": resultado["complejidad"],
            })
        return {"algoritmos": resultados, "consulta": query}
