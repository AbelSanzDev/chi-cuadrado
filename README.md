# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

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

### Conclusion

- El código utiliza efectivamente React con TypeScript para manejar la carga de datos desde un archivo Excel, realizar cálculos estadísticos como la tabla de contingencia, cobertura y confianza, factor de dependencia y chi-cuadrado, y presentar los resultados de manera estructurada en la interfaz de usuario.
