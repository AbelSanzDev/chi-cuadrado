## Flujo del Código

### Importaciones de Librerías

- Importación de librerías necesarias como React, XLSX, componentes de NextUI, y otras utilidades.

### Interfaces

- Definición de interfaces como `DatoHoja`, `TablaContigencia`, `CoberturaConfianzaDatos`, y `FactorDeDependenciaDatos` para estructurar tipos de datos específicos.

### Componente Principal: ReadExcelFile

1. **useState**
   - Se inicializan varios estados para manejar los datos del archivo, selección de ítems, validaciones, tablas de contingencia, cobertura y confianza, factor de dependencia, y valores de chi-cuadrado.
2. **useEffect**

   - **useEffect 1:** Se llama a `tablaContigencia` cuando cambian los `datosTablaContigencia`.
   - **useEffect 2:** Se llama a `coberturaConfianzaFn`, `factorDeDependenciaFn`, y `chiCuadradoFn` cuando cambia `tablaDeContigencia`.

3. **manejarCargaArchivo**

   - Maneja la carga de un archivo Excel, lee los datos y los almacena en el estado `datosHoja`.

4. **handleItemsSelected**

   - Gestiona la selección de ítems por parte del usuario, mostrando un mensaje de error si se seleccionan más de dos ítems.

5. **tablaContigencia**

   - Crea una tabla de contingencia basada en los ítems seleccionados y los datos del archivo.

6. **coberturaConfianzaFn**

   - Calcula la cobertura y la confianza basándose en la tabla de contingencia generada.

7. **factorDeDependenciaFn**

   - Calcula el factor de dependencia utilizando los valores de la tabla de contingencia.

8. **chiCuadradoFn**

   - Calcula el valor de chi-cuadrado basado en la tabla de contingencia y sus valores esperados.

9. **confianzaFn**

   - Actualiza el valor de confianza basado en el valor seleccionado por el usuario.

10. **handleSelectItemsSubmit**

    - Gestiona la selección de ítems por parte del usuario, mostrando un mensaje de error si no se seleccionan exactamente dos ítems.

11. **clearData**
    - Limpia todos los datos almacenados en los estados para reiniciar el proceso.

### Renderizado

- Renderiza el componente principal con la estructura de la página, incluyendo botones para cargar archivos, selección de ítems, visualización de tablas de contingencia, cobertura y confianza, factor de dependencia y chi-cuadrado.

# Flujo del Código: PutDataManually

# Flujo de Trabajo General

## Inicialización

### Definición de Interfaces y Estados

- Se definen interfaces para el tipado de datos.
- Se inicializan estados con useState para almacenar datos, resultados y configuraciones.

## Entrada de Datos

### Manejo de Entrada de Datos

- `handleOnChangeItem`: Actualiza el nombre de un ítem.
- `handleOnChangeItemValues`: Valida la entrada de datos (solo 1s, 0s y espacios), actualiza `items` y `datosArray`, y muestra un mensaje de error si los datos no son válidos.
- `handleLlenadoDeDatosAleatorios`: Llena un ítem con datos aleatorios (1s y 0s).

## Almacenamiento y Transformación de Datos

### Gestión y Transformación de Datos

- `handleGenerarCalculos`: Realiza validaciones (al menos dos columnas con datos, misma longitud), crea `objetosConDatos` con los ítems que tienen datos y actualiza `nuevosDatosUsados`.
- `arregloObjetos`: Valida la existencia de al menos dos columnas con datos, transforma los datos en un nuevo formato (`nuevoFormato`) y actualiza `datosHoja`.

## Selección de Ítems

### Gestión de Selección de Ítems

- `handleItemsSelected`: Valida si se seleccionaron más de dos ítems y actualiza `itemsSeleccionados`.
- `handleSelectItemsSubmit`: Valida la selección de ítems, filtra los datos para los ítems seleccionados y actualiza `datosTablaContingencia`.

## Cálculos

### Realización de Cálculos

- `tablaContigencia`: Calcula los valores de la tabla de contingencia.
- `coberturaConfianzaFn`: Calcula cobertura y confianza.
- `factorDeDependenciaFn`: Calcula el factor de dependencia.
- `chiCuadradoFn`: Calcula los valores de chi-cuadrado.
- `confianzaFn`: Actualiza el nivel de confianza.

## Visualización

### Interfaz de Usuario y Visualización

- Se renderiza la interfaz de usuario con tablas y elementos que muestran:
  - Los datos ingresados.
  - La tabla de contingencia (si se seleccionaron dos ítems).
  - Cobertura y confianza.
  - Factor de dependencia.
  - Chi-cuadrado.
  - Selector de nivel de confianza.

## Funciones Clave

### Funciones Clave

- `handleOnChangeItemValues`: Valida y procesa los datos ingresados por el usuario.
- `handleGenerarCalculos`, `arregloObjetos`: Transforman los datos en un formato adecuado para los cálculos.
- `handleItemsSelected`, `handleSelectItemsSubmit`: Gestionan la selección de ítems para los cálculos.
- `tablaContigencia`, `coberturaConfianzaFn`, `factorDeDependenciaFn`, `chiCuadradoFn`: Realizan los cálculos estadísticos.
