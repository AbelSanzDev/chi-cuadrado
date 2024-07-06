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

## 1. Inicialización y Estado

### Componentes Importados

Se importan componentes de NextUI, hooks de React y datos de la tabla Chi-cuadrado.

### Interfaces Definidas

Se definen interfaces para tipado de datos:

- ChangeEventOrObject: Maneja eventos de cambio o objetos similares.
- DatoHoja: Estructura para datos transformados.
- ItemFormat: Formato para cada ítem (nombre y datos).
- ItemArrayFormat: Formato para arreglos de datos numéricos.
- ItemArray: Colección de ItemArrayFormat.
- ItemArrayObjetos: Versión opcional de ItemArray.
- ItemsData: Estructura para los 8 ítems permitidos.
- TablaContigencia: Datos de la tabla de contingencia.
- CoberturaConfianzaDatos: Datos de cobertura y confianza.
- FactorDeDependeciaDatos: Datos del factor de dependencia.

### useState Inicializados

Se inicializan useState para:

- items: Almacena nombres e información binaria de los ítems.
- state: Indica si items tiene valores.
- datosArray: Arreglos de datos numéricos de cada ítem.
- nuevosDatosUsados: Ítems con datos que se mostrarán.
- datosHoja: Datos transformados para visualización.
- isValid: Valida si se seleccionaron más de dos ítems.
- itemsSeleccionados: Ítems elegidos por el usuario.
- datosTablaContigencia: Datos para la tabla de contingencia.
- tablaDeContigencia: Estructura de la tabla de contingencia.
- coberturaConfianzaValores: Valores de cobertura y confianza.
- factorDeDependenciaValores: Valores del factor de dependencia.
- chiCuadradoValores: Valores de Chi-cuadrado.
- confianza: Nivel de confianza (inicialmente 95%).

## 2. Efectos Secundarios (useEffect)

### Primer useEffect

- Se ejecuta cuando datosTablaContingencia cambia.
- Llama a tablaContigencia() para crear la tabla.

### Segundo useEffect

- Se ejecuta cuando tablaDeContingencia cambia.
- Llama a coberturaConfianzaFn(), factorDeDependenciaFn() y chiCuadradoFn() para calcular valores relacionados.

### Tercer useEffect

- Se ejecuta cuando items cambia.
- Actualiza state si algún ítem tiene nombre.

### Cuarto useEffect

- Se ejecuta cuando nuevosDatosUsados cambia.
- Llama a arregloObjetos() para transformar los datos.

## 3. Manejo de Eventos y Funciones

- `handleOnChangeItem`: Actualiza el nombre de un ítem.
- `clearData`: Reinicia todos los estados y valores.
- `handleOnChangeItemValues`: Valida y actualiza datos de ítems.
- `handleGenerarCalculos`: Realiza validaciones y genera cálculos.
- `arregloObjetos`: Transforma datos y actualiza datosHoja.
- `handleItemsSelected`: Valida selección de ítems.
- `tablaContigencia`, `coberturaConfianzaFn`, `factorDeDependenciaFn`, `chiCuadradoFn`: Funciones de cálculo específicas.
- `confianzaFn`: Actualiza el nivel de confianza.
- `handleLlenadoDeDatosAleatorios`: Llena ítems con datos aleatorios.
- `handleSelectItemsSubmit`: Filtra y actualiza datos para los ítems seleccionados.

## 4. Renderizado (JSX)

La interfaz de usuario incluye:

- Inputs para nombres de ítems.
- Inputs para datos de cada ítem (con botones "Random").
- Botón "Almacenar datos".
- CheckboxGroup para seleccionar ítems (si hay datos).
- Botón "Seleccionar".
- Tablas para mostrar resultados y datos ingresados.
