# Guia Operativa Admin

## Cargar resultados

1. Ingresar con usuario admin.
2. Ir a `/admin`.
3. Elegir partido.
4. Cargar goles local y visitante.
5. Guardar resultado.

El sistema recalcula automaticamente las predicciones de ese partido y luego el ranking general.

## Corregir resultados

1. Volver a elegir el mismo partido.
2. Reingresar el resultado correcto.
3. Guardar nuevamente.

La correccion vuelve a recalcular predicciones y total de puntos.

## Cargar standings

1. Ir a la seccion `Standings de grupos`.
2. Pegar JSON con posiciones, puntos y clasificacion.
3. Ejecutar `Calcular grupos`.

Validaciones importantes:

- no repetir equipos;
- no repetir posiciones dentro del mismo grupo;
- cargar exactamente 8 mejores terceros.

## Confirmar cruces

1. Ir a `Confirmar cruce`.
2. Elegir partido con placeholders.
3. Escribir equipo local y visitante reales.
4. Confirmar partido.

Esto limpia placeholders y habilita predicciones si el partido queda confirmado.

## Recalculo de ranking

El ranking se recalcula automaticamente en:

- carga o correccion de resultados reales;
- carga de standings de grupos.

## Recomendaciones operativas

- Verificar `/health` antes de operar.
- Confirmar zona horaria de los `kickoff` en UTC.
- Evitar tocar fixture una vez que haya predicciones cargadas, salvo correcciones necesarias.
