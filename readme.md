# CHALLENGE API

### URL
- https://challengegabi.herokuapp.com/

### HEARTBEAT
- https://challengegabi.herokuapp.com/heartbeat


En el siguiente repositorio se expone una API para el desafío, exponiendo los endpoints necesarios
para que el frontend, realice las tareas necesarias.

Además se guarda un registro histórico de todas las consultas válidas realizadas,
pudiendo haber registros repetidos en el tiempo.

La georieferenciación de una dirección se obtiene consultando la api Nominatim con un string de formato libre

Para calcular la distancia entre dos direcciones, primero se obtiene las coordenadas (lat, lon) de la respuesta de Nominatim, y luego utilizando la librería haversine se calcula la distancia entre ambos.


Algunas medidas que se tomaron,
- No se aceptan direcciones con largo mayor a 100
- La distancia se calcula con más de 4 posiciones decimales


Las respuestas a la parte 1 se pueden obtener en el archivo Desafío aplicación delivery de este repositorio
