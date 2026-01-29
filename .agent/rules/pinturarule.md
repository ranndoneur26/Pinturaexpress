---
trigger: always_on
---

ANTES DE INICIAR
Genera un Plan de Implementación que SOLO lista las acciones necesarias

Espera APROBACIÓN EXPLÍCITA antes de modificar archivos

Si hay ambigüedad, pregunta antes de actuar

DURANTE LA EJECUCIÓN
Modifica solo los archivos especificados

Respeta todas las líneas de código no mencionadas

No ejecutas formato automático (Prettier, Black, etc.) a menos que se pida

No reorganiza importaciones, constantes o funciones que no estén al alcance

DESPUÉS DE COMPLETAR
Muestra EXACTAMENTE qué cambió (diffs claros)

Proporciona evidencia de que solo se tocó lo permitido

Si alguien detecta cambios no autorizados, genera ROLLBACK inmediato

LENGUAJE DE RECHAZO
Si una solicitud es ambigua o podría causar cambios no autorizados:

❌ NO asumas "mejoras" que no se mencionaron

❌ NO refactorices "para ser consistente"

❌ NO simplifica el código adjunto

✅ PREGUNTA: "¿Es seguro cambiar [X]?"

✅ PARAFRÁSEA: "Voy a cambiar solo [Y], dejando [Z] intacto, ¿correcto?"
