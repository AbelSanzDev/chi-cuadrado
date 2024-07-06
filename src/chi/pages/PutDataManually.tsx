import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Radio,
  RadioGroup,
  Tooltip,
} from "@nextui-org/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { chiSquareTable } from "../helpers/chiCuadradoDatosTabla";

//*Esta interfaz es para que los eventos puedan recibir tanto como un changeEven asi como un objeto que sea igual a este junto con su tipado { target: { name: string; value: string } }
type ChangeEventOrObject =
  | ChangeEvent<HTMLInputElement>
  | { target: { name: string; value: string } };
//*Interfaz de los datos que puede recibir los datos transformados, puede recibir un objeto d llave tipo string con datos tipo string | number | boolean | null;
interface DatoHoja {
  [key: string]: string | number | boolean | null;
}
//*Iterfaz de como tiene que ser los datos de cada item
interface ItemFormat {
  nombre: string;
  datos: string;
}
//*Interfaz para el formato del array de los valores
interface ItemArrayFormat {
  datosArray: number[];
}
interface ItemArray {
  item1: ItemArrayFormat;
  item2: ItemArrayFormat;
  item3: ItemArrayFormat;
  item4: ItemArrayFormat;
  item5: ItemArrayFormat;
  item6: ItemArrayFormat;
  item7: ItemArrayFormat;
  item8: ItemArrayFormat;
}
interface ItemArrayObjetos {
  item1?: ItemArrayFormat;
  item2?: ItemArrayFormat;
  item3?: ItemArrayFormat;
  item4?: ItemArrayFormat;
  item5?: ItemArrayFormat;
  item6?: ItemArrayFormat;
  item7?: ItemArrayFormat;
  item8?: ItemArrayFormat;
}
//*Interfaz para darle el formato a los 8 items permitidos
interface ItemsData {
  item1: ItemFormat;
  item2: ItemFormat;
  item3: ItemFormat;
  item4: ItemFormat;
  item5: ItemFormat;
  item6: ItemFormat;
  item7: ItemFormat;
  item8: ItemFormat;
}
//*interfaz de la tabla de contigencia como se deben de ver los datos
interface TablaContigencia {
  positivoPositivo: number;
  positivoNegativo: number;
  negativoNegativo: number;
  negativoPositivo: number;
}
//*Interfaz de como seran los datos de cobertura y canfianza
interface CoberturaConfianzaDatos {
  //*Cuando se comienza con el item 1
  positivoPositivoItem1AHead: number[];
  positivoNegativoItem1AHead: number[];
  negativoNegativoItem1AHead: number[];
  negativoPositivoItem1AHead: number[];
  //*Cuando se comienza con el item 2
  positivoPositivoItem2AHead: number[];
  positivoNegativoItem2AHead: number[];
  negativoNegativoItem2AHead: number[];
  negativoPositivoItem2AHead: number[];
}
//*Interfaz de como seran los datos de la tabla factor de dependencia
interface FactorDeDependeciaDatos {
  positivoPositivo: number;
  positivoNegativo: number;
  negativoNegativo: number;
  negativoPositivo: number;
}

const PutDataManually = () => {
  const inputRef1 = useRef<HTMLInputElement>(null);
  //*Este useState se va a utilizar para poder almacenar el nombre y los dato binarios de los items
  const [items, setItems] = useState({
    item1: { nombre: "", datos: "" },
    item2: { nombre: "", datos: "" },
    item3: { nombre: "", datos: "" },
    item4: { nombre: "", datos: "" },
    item5: { nombre: "", datos: "" },
    item6: { nombre: "", datos: "" },
    item7: { nombre: "", datos: "" },
    item8: { nombre: "", datos: "" },
  });
  //*Este estado es para poder saber si items tiene valores
  const [state, setState] = useState<boolean>(false);
  //*Este useState es para almacenar el valor de items.item#.datos en un arreglo
  const [datosArray, setdatosArray] = useState<ItemArray>({
    item1: { datosArray: [] },
    item2: { datosArray: [] },
    item3: { datosArray: [] },
    item4: { datosArray: [] },
    item5: { datosArray: [] },
    item6: { datosArray: [] },
    item7: { datosArray: [] },
    item8: { datosArray: [] },
  });
  const [nuevosDatosUsados, setNuevosDatosUsados] = useState<ItemArrayObjetos>(
    {}
  );
  //*En este useState se alamcenan todos los datos transformados que se quieren ver
  const [datosHoja, setDatosHoja] = useState<DatoHoja[]>([]); //* puede contener un arreglo de cualquier tipo de datos
  //*Este useState es para poder lanzar el mansaje de validacion en caso de que se seleccionen mas de dos items
  const [isValid, setIsValid] = useState<boolean>(false);
  //*Esta alamacena los items seleccionadaso por el usuario en un arreglo
  const [itemsSeleccionados, setItemsSeleccionados] = useState<string[]>([]);
  //*Este useState es en donde se alamcenan los datos de los dos items
  const [datosTablaContigencia, setDatosTablaContigencia] = useState<
    DatoHoja[]
  >([]);
  //*Este useState es para los datos de la tabla de contigencia
  const [tablaDeContigencia, setTablaDeContigencia] =
    useState<TablaContigencia>({
      positivoPositivo: 0,
      positivoNegativo: 0,
      negativoNegativo: 0,
      negativoPositivo: 0,
    });
  //*Este useState es para el valor de los datos de confianza y cobertura de la tabla de contigencia
  const [coberturaConfianzaValores, setCoberturaConfianzaValores] =
    useState<CoberturaConfianzaDatos>({
      //*Cuando se comienza con el item 1
      positivoPositivoItem1AHead: [0, 0],
      positivoNegativoItem1AHead: [0, 0],
      negativoPositivoItem1AHead: [0, 0],
      negativoNegativoItem1AHead: [0, 0],
      //*Cuando se comienza con el item 2
      positivoPositivoItem2AHead: [0, 0],
      positivoNegativoItem2AHead: [0, 0],
      negativoPositivoItem2AHead: [0, 0],
      negativoNegativoItem2AHead: [0, 0],
    });
  //*En este useState se alamacenaran los valores de depedencia esto se imprimira en una tabla
  const [factorDeDependenciaValores, setFactorDeDependenciaValores] =
    useState<FactorDeDependeciaDatos>({
      positivoPositivo: 0,
      positivoNegativo: 0,
      negativoNegativo: 0,
      negativoPositivo: 0,
    });
  //*En este useState se almacenaran todos los valores del chi 2
  const [chiCuadradoValores, setChiCuadradoValores] =
    useState<FactorDeDependeciaDatos>({
      positivoPositivo: 0,
      positivoNegativo: 0,
      negativoNegativo: 0,
      negativoPositivo: 0,
    });
  const [confianza, setConfianza] = useState<number>(
    chiSquareTable[0].confianza[0]
  );
  //*Este use effect se utiliza para que cuando cambie el valor datosTablaContiugencia se compilen esas dos fuciones las cuales son la logica de todo el codigo
  useEffect(() => {
    //*Se llama la funcion de la tabla de contigencia para poder crear la misma
    tablaContigencia();
  }, [datosTablaContigencia]);
  //*En ese useEffect se llama a la funcion coberturaConfianzaFn una vez tenga datos tablaDeContigencia
  useEffect(() => {
    //*Se llama la funcion coberturaConfianzaFn para poder determinar la cobertura y confianza de nuestra tabla de contigencia
    coberturaConfianzaFn();
    factorDeDependenciaFn();
    chiCuadradoFn();
  }, [tablaDeContigencia]);

  //*Este useEfffect es para poder cambiar el state en el caso de que algun item en el apartado nombre tiene valor de ser asi se activara la tabla
  useEffect(() => {
    if (
      items.item1.nombre ||
      items.item2.nombre ||
      items.item3.nombre ||
      items.item4.nombre ||
      items.item5.nombre ||
      items.item6.nombre ||
      items.item7.nombre ||
      items.item8.nombre
    ) {
      setState(true);
    } else {
      setState(false);
    }
  }, [items]);
  //*Este useEffect es para cuando cambien los nuevosDatosUsados y asi poder compilar la funcion arregloObjetos
  useEffect(() => {
    arregloObjetos();
  }, [nuevosDatosUsados]);
  //*Esta funcion es para almacenar el valor nombre de los items
  const handleOnChangeItem = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setItems((prevItems) => ({
      ...prevItems,
      [name]: {
        ...prevItems[name as keyof ItemsData],
        nombre: value,
      },
    }));
  };
  //*Funcion para limiar toda la data
  const clearData = (): void => {
    setItems({
      item1: { nombre: "", datos: "" },
      item2: { nombre: "", datos: "" },
      item3: { nombre: "", datos: "" },
      item4: { nombre: "", datos: "" },
      item5: { nombre: "", datos: "" },
      item6: { nombre: "", datos: "" },
      item7: { nombre: "", datos: "" },
      item8: { nombre: "", datos: "" },
    });

    setState(false);

    setdatosArray({
      item1: { datosArray: [] },
      item2: { datosArray: [] },
      item3: { datosArray: [] },
      item4: { datosArray: [] },
      item5: { datosArray: [] },
      item6: { datosArray: [] },
      item7: { datosArray: [] },
      item8: { datosArray: [] },
    });

    setNuevosDatosUsados({});

    setDatosHoja([]);

    setIsValid(false);

    setItemsSeleccionados([]);

    setDatosTablaContigencia([]);

    setTablaDeContigencia({
      positivoPositivo: 0,
      positivoNegativo: 0,
      negativoNegativo: 0,
      negativoPositivo: 0,
    });

    setCoberturaConfianzaValores({
      positivoPositivoItem1AHead: [0, 0],
      positivoNegativoItem1AHead: [0, 0],
      negativoPositivoItem1AHead: [0, 0],
      negativoNegativoItem1AHead: [0, 0],
      positivoPositivoItem2AHead: [0, 0],
      positivoNegativoItem2AHead: [0, 0],
      negativoPositivoItem2AHead: [0, 0],
      negativoNegativoItem2AHead: [0, 0],
    });

    setFactorDeDependenciaValores({
      positivoPositivo: 0,
      positivoNegativo: 0,
      negativoNegativo: 0,
      negativoPositivo: 0,
    });

    setChiCuadradoValores({
      positivoPositivo: 0,
      positivoNegativo: 0,
      negativoNegativo: 0,
      negativoPositivo: 0,
    });

    setConfianza(chiSquareTable[0].confianza[0]);
  };
  const handleOnChangeItemValues = (e: ChangeEventOrObject): void => {
    const { name, value } = e.target;
    const lon = value.length;
    let insideState: boolean = true;
    //*Este for dentro tiene un if el cual valida que los datos sean solo 1 y 0 y el " "
    for (let i: number = 0; i < lon; i++) {
      if (
        (value[i] === "1" && value[i + 1] === "1") ||
        (value[i] === "1" && value[i + 1] === "0") ||
        (value[i] === "0" && value[i + 1] === "1") ||
        (value[i] === "0" && value[i + 1] === "0")
      ) {
        insideState = false;
        break;
      } else if (value[i] === "0" || value[i] === "1" || value[i] === " ") {
        console.log("permitido");
      } else {
        insideState = false;
        break;
      }
    }
    if (insideState) {
      setItems((prevItems) => ({
        ...prevItems,
        [name]: {
          ...prevItems[name as keyof ItemsData],
          datos: value,
        },
      }));
      //*En esta parte se almacena el array del string ingresado por el usuario
      setdatosArray((prevItems) => ({
        ...prevItems,
        [name]: {
          ...prevItems[name as keyof ItemsData],
          //*El array se crea con split cada que el string tenga un espacio en " " va a hacer otro elemento para el array
          datosArray: value
            .split(" ")
            .filter((elemento) => elemento !== "")
            .map(Number),
        },
      }));
    } else {
      toast.error("Solo se permiten los datos 1 o 0");
    }
  };

  //*Esta funcion convertira el string de los valores de las columnas a arreglo para iterarlo en la tabla en tiempo real
  const itemKeys = Object.keys(datosArray) as Array<keyof ItemArray>;
  const maxLength = Math.max(
    ...itemKeys.map((key) => datosArray[key].datosArray.length)
  );
  //*Funcion para calcular todo
  const handleGenerarCalculos = (): void => {
    //*Destructuring para sacar el valor de los datos
    const { datosArray: datos1 } = datosArray.item1;
    const { datosArray: datos2 } = datosArray.item2;
    const { datosArray: datos3 } = datosArray.item3;
    const { datosArray: datos4 } = datosArray.item4;
    const { datosArray: datos5 } = datosArray.item5;
    const { datosArray: datos6 } = datosArray.item6;
    const { datosArray: datos7 } = datosArray.item7;
    const { datosArray: datos8 } = datosArray.item8;
    //*Estas variables son para el tamaño de cada string y saber si son del mismo length
    const dato1Length = datos1.length;
    const dato2Length = datos2.length;
    const dato3Length = datos3.length;
    const dato4Length = datos4.length;
    const dato5Length = datos5.length;
    const dato6Length = datos6.length;
    const dato7Length = datos7.length;
    const dato8Length = datos8.length;
    //*Arreglo de length del arreglo principal
    const allLength = [
      dato1Length,
      dato2Length,
      dato3Length,
      dato4Length,
      dato5Length,
      dato6Length,
      dato7Length,
      dato8Length,
    ];
    //*Crear el nuevo arreglo solo de los datos que se van a utilizar

    let nuevoArrayConDatosSeleccionados: number[] = []; //*Almacena los datos que se estan utilizando
    allLength.forEach((seleccionado) => {
      if (seleccionado > 0) {
        nuevoArrayConDatosSeleccionados.push(seleccionado);
      }
    });

    //*En este forEach saco el valor maximo del arreglo,length
    let maximoLength: number = 0;
    nuevoArrayConDatosSeleccionados.forEach((max) => {
      if (max > maximoLength) {
        maximoLength = max;
      }
    });

    //*El every valida si todos son igual a una dato en caso al dato1Length
    const allEqual = nuevoArrayConDatosSeleccionados.every(
      (length) => length === maximoLength
    );
    //*Este if es para cuando el maximoLength sea igual a 0 no se puede acceder a la logica
    if (maximoLength === 0) {
      toast.error(`Debes de tener datos en almenos dos columnas`);
      return;
    }

    if (!allEqual) {
      toast.error(
        `El tamaño de la columna debe de ser igual a la columna "${items.item1.nombre}"`
      );
      return;
    }
    //*Objetos que tienen valores
    let objetosConDatos: ItemArrayObjetos = {};

    if (dato1Length > 0) {
      objetosConDatos.item1 = { datosArray: datos1 };
    }
    if (dato2Length > 0) {
      objetosConDatos.item2 = { datosArray: datos2 };
    }
    if (dato3Length > 0) {
      objetosConDatos.item3 = { datosArray: datos3 };
    }
    if (dato4Length > 0) {
      objetosConDatos.item4 = { datosArray: datos4 };
    }
    if (dato5Length > 0) {
      objetosConDatos.item5 = { datosArray: datos5 };
    }
    if (dato6Length > 0) {
      objetosConDatos.item6 = { datosArray: datos6 };
    }
    if (dato7Length > 0) {
      objetosConDatos.item7 = { datosArray: datos7 };
    }
    if (dato8Length > 0) {
      objetosConDatos.item8 = { datosArray: datos8 };
    }
    setNuevosDatosUsados(objetosConDatos);
    //*Logica de calculos
  };
  // console.log(nuevosDatosUsados);

  //*Esta funcion sirve para hacer un arreglo de objetos para el array de items
  const arregloObjetos = (): void => {
    //*Es if valida que almenos la tabla tenga dos columnas con datos
    if (Object.keys(nuevosDatosUsados).length < 2) {
      toast.error("Debes de tener datos en almenos dos columnas");
    }
    let nuevoFormato: DatoHoja[] = [];

    //* Sacar el máximo tamaño de datosArray
    const maxLength = Math.max(
      ...Object.values(nuevosDatosUsados).map(
        (item) => item?.datosArray?.length || 0
      )
    );

    //*Este for sirve para la transformacion del nuevo arreglo de objetos
    for (let i = 0; i < maxLength; i++) {
      let nuevoObjeto: DatoHoja = {};

      if (
        nuevosDatosUsados.item1?.datosArray &&
        nuevosDatosUsados.item1.datosArray[i] !== undefined
      ) {
        nuevoObjeto[items.item1.nombre] = nuevosDatosUsados.item1.datosArray[i];
      }
      if (
        nuevosDatosUsados.item2?.datosArray &&
        nuevosDatosUsados.item2.datosArray[i] !== undefined
      ) {
        nuevoObjeto[items.item2.nombre] = nuevosDatosUsados.item2.datosArray[i];
      }
      if (
        nuevosDatosUsados.item3?.datosArray &&
        nuevosDatosUsados.item3.datosArray[i] !== undefined
      ) {
        nuevoObjeto[items.item3.nombre] = nuevosDatosUsados.item3.datosArray[i];
      }
      if (
        nuevosDatosUsados.item4?.datosArray &&
        nuevosDatosUsados.item4.datosArray[i] !== undefined
      ) {
        nuevoObjeto[items.item4.nombre] = nuevosDatosUsados.item4.datosArray[i];
      }
      if (
        nuevosDatosUsados.item5?.datosArray &&
        nuevosDatosUsados.item5.datosArray[i] !== undefined
      ) {
        nuevoObjeto[items.item5.nombre] = nuevosDatosUsados.item5.datosArray[i];
      }
      if (
        nuevosDatosUsados.item6?.datosArray &&
        nuevosDatosUsados.item6.datosArray[i] !== undefined
      ) {
        nuevoObjeto[items.item6.nombre] = nuevosDatosUsados.item6.datosArray[i];
      }
      if (
        nuevosDatosUsados.item7?.datosArray &&
        nuevosDatosUsados.item7.datosArray[i] !== undefined
      ) {
        nuevoObjeto[items.item7.nombre] = nuevosDatosUsados.item7.datosArray[i];
      }
      if (
        nuevosDatosUsados.item8?.datosArray &&
        nuevosDatosUsados.item8.datosArray[i] !== undefined
      ) {
        nuevoObjeto[items.item8.nombre] = nuevosDatosUsados.item8.datosArray[i];
      }

      nuevoFormato.push(nuevoObjeto);
    }

    setDatosHoja(nuevoFormato);
  };
  //*Esta funcion valida si hay solo 2 items seleccionados
  const handleItemsSelected = (e: string[]): void => {
    if (e.length > 2) {
      setIsValid(true);
    } else {
      setIsValid(false);
      setItemsSeleccionados(e);
    }
  };
  const tablaContigencia = (): void => {
    const [dato1, dato2] = itemsSeleccionados;
    const contador = {
      positivoPositivo: 0,
      positivoNegativo: 0,
      negativoNegativo: 0,
      negativoPositivo: 0,
    };

    datosTablaContigencia.forEach((dato) => {
      const valor1 = dato[dato1];
      const valor2 = dato[dato2];

      if (valor1 && valor2) {
        contador.positivoPositivo++;
      } else if (valor1 && !valor2) {
        contador.positivoNegativo++;
      } else if (!valor1 && !valor2) {
        contador.negativoNegativo++;
      } else if (!valor1 && valor2) {
        contador.negativoPositivo++;
      }
    });
    setTablaDeContigencia(contador);
  };
  //*Se sacara confianza y cobertura en base a la tabla de contigencia
  const coberturaConfianzaFn = (): void => {
    const {
      positivoPositivo,
      positivoNegativo,
      negativoPositivo,
      negativoNegativo,
    } = tablaDeContigencia;
    //*Calculos de cobertura y confianza
    setCoberturaConfianzaValores({
      positivoPositivoItem1AHead: [
        positivoPositivo,
        (positivoPositivo / (positivoPositivo + positivoNegativo)) * 100,
      ],
      positivoNegativoItem1AHead: [
        positivoNegativo,
        (positivoNegativo / (positivoPositivo + positivoNegativo)) * 100,
      ],
      negativoPositivoItem1AHead: [
        negativoPositivo,
        (negativoPositivo / (negativoPositivo + negativoNegativo)) * 100,
      ],
      negativoNegativoItem1AHead: [
        negativoNegativo,
        (negativoNegativo / (negativoPositivo + negativoNegativo)) * 100,
      ],
      //*Cuando se comienza con el item 2
      positivoPositivoItem2AHead: [
        positivoPositivo,
        (positivoPositivo / (positivoPositivo + negativoPositivo)) * 100,
      ],
      positivoNegativoItem2AHead: [
        negativoPositivo, //*Es negativoPositivo porque es en base a las coordenadas
        (negativoPositivo / (positivoPositivo + negativoPositivo)) * 100,
      ],
      negativoPositivoItem2AHead: [
        positivoNegativo, //*Es positivoNegativo porque es en base a las coordenadas
        (positivoNegativo / (positivoNegativo + negativoNegativo)) * 100,
      ],
      negativoNegativoItem2AHead: [
        negativoNegativo,
        (negativoNegativo / (positivoNegativo + negativoNegativo)) * 100,
      ],
    });
  };
  //*Esta funcion se encargara de calcular y generear el Factor de dependencia
  const factorDeDependenciaFn = (): void => {
    const {
      positivoPositivo,
      positivoNegativo,
      negativoPositivo,
      negativoNegativo,
    } = tablaDeContigencia;
    //*Sumas de las filas y columnas
    const sumaFila1 = positivoPositivo + positivoNegativo;
    const sumaFila2 = negativoPositivo + negativoNegativo;
    const sumaColumna1 = positivoPositivo + negativoPositivo;
    const sumaColumna2 = positivoNegativo + negativoNegativo;

    setFactorDeDependenciaValores({
      positivoPositivo: (positivoPositivo / (sumaFila1 * sumaColumna1)) * 100,
      positivoNegativo: (positivoNegativo / (sumaFila1 * sumaColumna2)) * 100,
      negativoNegativo: (negativoNegativo / (sumaFila2 * sumaColumna2)) * 100,
      negativoPositivo: (negativoPositivo / (sumaFila2 * sumaColumna1)) * 100,
    });
  };
  //*Esta funcion calcula el chi 2 y da los valores en el useState
  const chiCuadradoFn = (): void => {
    const {
      positivoPositivo,
      positivoNegativo,
      negativoPositivo,
      negativoNegativo,
    } = tablaDeContigencia;
    //*Sumas de las filas y columnas
    const sumaFila1 = positivoPositivo + positivoNegativo;
    const sumaFila2 = negativoPositivo + negativoNegativo;
    const sumaColumna1 = positivoPositivo + negativoPositivo;
    const sumaColumna2 = positivoNegativo + negativoNegativo;

    const ePP = (sumaFila1 * sumaColumna1) / 100;
    const ePN = (sumaFila1 * sumaColumna2) / 100;
    const eNP = (sumaFila2 * sumaColumna1) / 100;
    const eNN = (sumaFila2 * sumaColumna2) / 100;

    setChiCuadradoValores({
      positivoPositivo: (positivoPositivo - ePP) ** 2 / ePP,
      positivoNegativo: (positivoNegativo - ePN) ** 2 / ePN,
      negativoPositivo: (negativoPositivo - eNP) ** 2 / eNP,
      negativoNegativo: (negativoNegativo - eNN) ** 2 / eNN,
    });
  };
  //*Esta funcion es para poder calcular la confianza
  const confianzaFn = (e: string): void => {
    const valor = parseInt(e);
    setConfianza(chiSquareTable[0].confianza[valor]);
  };
  //*Esta funcion sirve para el llenado de datos aleatorios
  const handleLlenadoDeDatosAleatorios = (id: number): void => {
    let dato = "";
    switch (id) {
      case 1:
        for (let i = 0; i < 200; i++) {
          if (i % 2 === 0) {
            dato += " ";
          } else {
            dato += Math.random() >= 0.5 ? "1" : "0";
          }
        }
        //*Se llama la funcion para poder genera el  evento y poder poner todos los datos en tiempo real en la tabla y asi mismo que se conviertan a arreglo
        handleOnChangeItemValues({ target: { name: "item1", value: dato } });

        break;
      case 2:
        for (let i = 0; i < 200; i++) {
          if (i % 2 === 0) {
            dato += " ";
          } else {
            dato += Math.random() >= 0.5 ? "1" : "0";
          }
        }
        //*Se llama la funcion para poder genera el  evento y poder poner todos los datos en tiempo real en la tabla y asi mismo que se conviertan a arreglo
        handleOnChangeItemValues({ target: { name: "item2", value: dato } });

        break;
      case 3:
        for (let i = 0; i < 200; i++) {
          if (i % 2 === 0) {
            dato += " ";
          } else {
            dato += Math.random() >= 0.5 ? "1" : "0";
          }
        }
        //*Se llama la funcion para poder genera el  evento y poder poner todos los datos en tiempo real en la tabla y asi mismo que se conviertan a arreglo
        handleOnChangeItemValues({ target: { name: "item3", value: dato } });

        break;
      case 4:
        for (let i = 0; i < 200; i++) {
          if (i % 2 === 0) {
            dato += " ";
          } else {
            dato += Math.random() >= 0.5 ? "1" : "0";
          }
        }
        //*Se llama la funcion para poder genera el  evento y poder poner todos los datos en tiempo real en la tabla y asi mismo que se conviertan a arreglo
        handleOnChangeItemValues({ target: { name: "item4", value: dato } });

        break;
      case 5:
        for (let i = 0; i < 200; i++) {
          if (i % 2 === 0) {
            dato += " ";
          } else {
            dato += Math.random() >= 0.5 ? "1" : "0";
          }
        }
        //*Se llama la funcion para poder genera el  evento y poder poner todos los datos en tiempo real en la tabla y asi mismo que se conviertan a arreglo
        handleOnChangeItemValues({ target: { name: "item5", value: dato } });

        break;
      case 6:
        for (let i = 0; i < 200; i++) {
          if (i % 2 === 0) {
            dato += " ";
          } else {
            dato += Math.random() >= 0.5 ? "1" : "0";
          }
        }
        //*Se llama la funcion para poder genera el  evento y poder poner todos los datos en tiempo real en la tabla y asi mismo que se conviertan a arreglo
        handleOnChangeItemValues({ target: { name: "item6", value: dato } });

        break;
      case 7:
        for (let i = 0; i < 200; i++) {
          if (i % 2 === 0) {
            dato += " ";
          } else {
            dato += Math.random() >= 0.5 ? "1" : "0";
          }
        }
        //*Se llama la funcion para poder genera el  evento y poder poner todos los datos en tiempo real en la tabla y asi mismo que se conviertan a arreglo
        handleOnChangeItemValues({ target: { name: "item7", value: dato } });

        break;
      case 8:
        for (let i = 0; i < 200; i++) {
          if (i % 2 === 0) {
            dato += " ";
          } else {
            dato += Math.random() >= 0.5 ? "1" : "0";
          }
        }
        //*Se llama la funcion para poder genera el  evento y poder poner todos los datos en tiempo real en la tabla y asi mismo que se conviertan a arreglo
        handleOnChangeItemValues({ target: { name: "item8", value: dato } });

        break;
      default:
        break;
    }
  };
  const handleSelectItemsSubmit = (): void => {
    if (isValid || itemsSeleccionados.length < 2) {
      toast.error("Solo puedes seleccionar DOS items");
      return;
    }
    //*generar nuevo arreglo con los objetos que se va a trabajar
    const nuevosDatosFiltrados: DatoHoja[] = datosHoja.map((dato) => {
      const nuevoDato: DatoHoja = {};
      itemsSeleccionados.forEach((item) => {
        nuevoDato[item] = dato[item];
      });
      return nuevoDato;
    });
    //*Los nuevos datos fitrados osea los dos items
    setDatosTablaContigencia(nuevosDatosFiltrados);
  };
  return (
    <>
      <div className="container mx-auto grid grid-cols-2 gap-5 ">
        <div className="mt-5">
          <h1 className="mb-5 font-thin text-3xl">
            Ingresa los el nombre de los items
          </h1>
          {/**Poner el nombre a los items*/}
          <div className="grid grid-cols-8 gap-1">
            <Input
              name="item1"
              onChange={(e) => handleOnChangeItem(e)}
              type="text"
              value={items.item1.nombre}
              variant={"underlined"}
              label="Item1"
            />
            <Input
              name="item2"
              onChange={(e) => handleOnChangeItem(e)}
              type="text"
              value={items.item2.nombre}
              variant={"underlined"}
              label="Item2"
            />
            <Input
              name="item3"
              onChange={(e) => handleOnChangeItem(e)}
              type="text"
              value={items.item3.nombre}
              variant={"underlined"}
              label="Item3"
            />
            <Input
              name="item4"
              onChange={(e) => handleOnChangeItem(e)}
              type="text"
              value={items.item4.nombre}
              variant={"underlined"}
              label="Item4"
            />
            <Input
              name="item5"
              onChange={(e) => handleOnChangeItem(e)}
              type="text"
              value={items.item5.nombre}
              variant={"underlined"}
              label="Item5"
            />
            <Input
              name="item6"
              onChange={(e) => handleOnChangeItem(e)}
              type="text"
              value={items.item6.nombre}
              variant={"underlined"}
              label="Item6"
            />
            <Input
              name="item7"
              onChange={(e) => handleOnChangeItem(e)}
              type="text"
              value={items.item7.nombre}
              variant={"underlined"}
              label="Item7"
            />
            <Input
              name="item8"
              onChange={(e) => handleOnChangeItem(e)}
              type="text"
              value={items.item8.nombre}
              variant={"underlined"}
              label="Item8"
            />
          </div>
          <div className="my-5 fixed top-1 left-6">
            <Button color="danger" size="lg" onClick={clearData}>
              Reset
            </Button>
          </div>
          {/**Estos input son para poner los datos de las columnas */}
          <div className="my-5">
            <div className="flex items-center gap-2">
              <Tooltip
                size="lg"
                content="Para poner los datos se tienen que separar por espacios, por ejemplo: 1 0 1 0 1 0 0 1 0 1 0 1 0 0 1 0"
                className="w-[20rem] font-bold text-xl"
              >
                <div className="w-10">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 7.75C11.3787 7.75 10.875 8.25368 10.875 8.875C10.875 9.28921 10.5392 9.625 10.125 9.625C9.71079 9.625 9.375 9.28921 9.375 8.875C9.375 7.42525 10.5503 6.25 12 6.25C13.4497 6.25 14.625 7.42525 14.625 8.875C14.625 9.58584 14.3415 10.232 13.883 10.704C13.7907 10.7989 13.7027 10.8869 13.6187 10.9708C13.4029 11.1864 13.2138 11.3753 13.0479 11.5885C12.8289 11.8699 12.75 12.0768 12.75 12.25V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V12.25C11.25 11.5948 11.555 11.0644 11.8642 10.6672C12.0929 10.3733 12.3804 10.0863 12.6138 9.85346C12.6842 9.78321 12.7496 9.71789 12.807 9.65877C13.0046 9.45543 13.125 9.18004 13.125 8.875C13.125 8.25368 12.6213 7.75 12 7.75ZM12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
                        fill="#006FEE"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
              </Tooltip>
              <h1 className=" font-thin text-sm">
                Nota importante antes de poner datos manualmente
              </h1>
            </div>

            {items.item1.nombre && (
              <div className=" flex gap-1 items-center">
                <Input
                  ref={inputRef1}
                  name="item1"
                  onChange={(e) => handleOnChangeItemValues(e)}
                  type="text"
                  value={items.item1.datos}
                  variant={"underlined"}
                  label="Datos de Item1 "
                />
                <Button
                  color="primary"
                  onClick={() => {
                    handleLlenadoDeDatosAleatorios(1);
                  }}
                >
                  Random
                </Button>
              </div>
            )}
            {items.item2.nombre && (
              <div className=" flex gap-1 items-center">
                <Input
                  name="item2"
                  onChange={(e) => handleOnChangeItemValues(e)}
                  type="text"
                  value={items.item2.datos}
                  variant={"underlined"}
                  label="Datos de Item2"
                />
                <Button
                  color="primary"
                  onClick={() => {
                    handleLlenadoDeDatosAleatorios(2);
                  }}
                >
                  Random
                </Button>
              </div>
            )}

            {items.item3.nombre && (
              <div className="flex gap-1 items-center">
                <Input
                  name="item3"
                  onChange={(e) => handleOnChangeItemValues(e)}
                  type="text"
                  value={items.item3.datos}
                  variant={"underlined"}
                  label="Datos de Item3"
                />
                <Button
                  color="primary"
                  onClick={() => {
                    handleLlenadoDeDatosAleatorios(3);
                  }}
                >
                  Random
                </Button>
              </div>
            )}

            {items.item4.nombre && (
              <div className="flex gap-1 items-center">
                <Input
                  name="item4"
                  onChange={(e) => handleOnChangeItemValues(e)}
                  type="text"
                  value={items.item4.datos}
                  variant={"underlined"}
                  label="Datos de Item4"
                />
                <Button
                  color="primary"
                  onClick={() => {
                    handleLlenadoDeDatosAleatorios(4);
                  }}
                >
                  Random
                </Button>
              </div>
            )}

            {items.item5.nombre && (
              <div className="flex gap-1 items-center">
                <Input
                  name="item5"
                  onChange={(e) => handleOnChangeItemValues(e)}
                  type="text"
                  value={items.item5.datos}
                  variant={"underlined"}
                  label="Datos de Item5"
                />
                <Button
                  color="primary"
                  onClick={() => {
                    handleLlenadoDeDatosAleatorios(5);
                  }}
                >
                  Random
                </Button>
              </div>
            )}

            {items.item6.nombre && (
              <div className="flex gap-1 items-center">
                <Input
                  name="item6"
                  onChange={(e) => handleOnChangeItemValues(e)}
                  type="text"
                  value={items.item6.datos}
                  variant={"underlined"}
                  label="Datos de Item6"
                />
                <Button
                  color="primary"
                  onClick={() => {
                    handleLlenadoDeDatosAleatorios(6);
                  }}
                >
                  Random
                </Button>
              </div>
            )}

            {items.item7.nombre && (
              <div className="flex gap-1 items-center">
                <Input
                  name="item7"
                  onChange={(e) => handleOnChangeItemValues(e)}
                  type="text"
                  value={items.item7.datos}
                  variant={"underlined"}
                  label="Datos de Item7"
                />
                <Button
                  color="primary"
                  onClick={() => {
                    handleLlenadoDeDatosAleatorios(7);
                  }}
                >
                  Random
                </Button>
              </div>
            )}

            {items.item8.nombre && (
              <div className="flex gap-1 items-center">
                <Input
                  name="item8"
                  onChange={(e) => handleOnChangeItemValues(e)}
                  type="text"
                  value={items.item8.datos}
                  variant={"underlined"}
                  label="Datos de Item8"
                />
                <Button
                  color="primary"
                  onClick={() => {
                    handleLlenadoDeDatosAleatorios(8);
                  }}
                >
                  Random
                </Button>
              </div>
            )}
          </div>
          <div className="mt-5">
            <Button
              onClick={() => {
                handleGenerarCalculos();
              }}
              color="warning"
              size="lg"
            >
              Almecenar datos
            </Button>
          </div>
          {datosHoja.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              <div className="my-5">
                <div>
                  <CheckboxGroup
                    isInvalid={isValid}
                    onChange={(e) => {
                      handleItemsSelected(e);
                    }}
                    label="Selecciona solo dos items"
                  >
                    {Object.keys(datosHoja[0]).map((colum) => (
                      <Checkbox key={colum} value={colum}>
                        {colum}
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                </div>
                <div className="mt-5">
                  <Button
                    onClick={handleSelectItemsSubmit}
                    radius="sm"
                    color="primary"
                    size="lg"
                  >
                    Seleccionar
                  </Button>
                </div>
              </div>
              {/**
               * En esta parte se imprimira los datos de la tabla de contingencia
               */}
              <div>
                <h1 className="text-3xl font-thin mb-5">
                  Tabla de contigencia
                </h1>
                <table className="min-w-full bg-white border-gray-200 shadow-md rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr className="border-b-2 border-gray-300 py-2 px-4 text-left text-sm font-semibold text-gray-700">
                      <th></th>
                      <th>{itemsSeleccionados[0]}</th>
                      <th>~{itemsSeleccionados[0]}</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  {/** Datos de la tabla */}
                  <tbody>
                    <tr className="text-center">
                      {/**Nombre de la fila 1*/}
                      <td>{itemsSeleccionados[1]}</td>
                      {/**datos de primera fila */}
                      <td>{tablaDeContigencia.positivoPositivo}</td>
                      <td>{tablaDeContigencia.positivoNegativo}</td>
                      {/**Total de la fila 1 */}
                      <td>
                        {tablaDeContigencia.positivoPositivo +
                          tablaDeContigencia.positivoNegativo}
                      </td>
                    </tr>
                    <tr className="text-center">
                      {/**Nombre de la fila 1*/}
                      <td>~{itemsSeleccionados[1]}</td>
                      {/**Datos de la segunda fila */}
                      <td>{tablaDeContigencia.negativoPositivo}</td>
                      <td>{tablaDeContigencia.negativoNegativo}</td>
                      {/**Total de la fila 2 */}
                      <td>
                        {tablaDeContigencia.negativoPositivo +
                          tablaDeContigencia.negativoNegativo}
                      </td>
                    </tr>
                    <tr className="text-center">
                      <td>Total</td>
                      <td>
                        {tablaDeContigencia.positivoPositivo +
                          tablaDeContigencia.negativoPositivo}
                      </td>
                      <td>
                        {tablaDeContigencia.positivoNegativo +
                          tablaDeContigencia.negativoNegativo}
                      </td>
                      {/**Total de la general */}
                      <td>
                        {tablaDeContigencia.positivoPositivo +
                          tablaDeContigencia.positivoNegativo +
                          tablaDeContigencia.negativoPositivo +
                          tablaDeContigencia.negativoNegativo}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="my-5">
                  <h1 className=" text-3xl font-thin mb-5">
                    Cobertura y Confianza
                  </h1>
                  {/**Se imprimen los datos de la cobertura y la confianza */}
                  <div>
                    <h2>
                      Si ({itemsSeleccionados[1]}=1) Entonces{" "}
                      {itemsSeleccionados[0]} = 1 Cb={" "}
                      <strong>
                        {coberturaConfianzaValores.positivoPositivoItem1AHead[0].toFixed(
                          2
                        )}
                      </strong>
                      % Cf={" "}
                      <strong>
                        {coberturaConfianzaValores.positivoPositivoItem1AHead[1].toFixed(
                          2
                        )}
                      </strong>
                      %
                    </h2>
                    <h2>
                      Si ({itemsSeleccionados[1]}=1) Entonces{" "}
                      {itemsSeleccionados[0]} = 0 Cb={" "}
                      <strong>
                        {coberturaConfianzaValores.positivoNegativoItem1AHead[0].toFixed(
                          2
                        )}
                      </strong>
                      % Cf={" "}
                      <strong>
                        {" "}
                        {coberturaConfianzaValores.positivoNegativoItem1AHead[1].toFixed(
                          2
                        )}
                      </strong>
                      %
                    </h2>
                    <h2>
                      Si ({itemsSeleccionados[1]}=0) Entonces{" "}
                      {itemsSeleccionados[0]} = 1 Cb={" "}
                      <strong>
                        {" "}
                        {coberturaConfianzaValores.negativoPositivoItem1AHead[0].toFixed(
                          2
                        )}
                      </strong>
                      % Cf={" "}
                      <strong>
                        {coberturaConfianzaValores.negativoPositivoItem1AHead[1].toFixed(
                          2
                        )}
                      </strong>
                      %
                    </h2>
                    <h2>
                      Si ({itemsSeleccionados[1]}=0) Entonces{" "}
                      {itemsSeleccionados[0]} = 0 Cb={" "}
                      <strong>
                        {coberturaConfianzaValores.negativoNegativoItem1AHead[0].toFixed(
                          2
                        )}
                      </strong>
                      % Cf={" "}
                      <strong>
                        {coberturaConfianzaValores.negativoNegativoItem1AHead[1].toFixed(
                          2
                        )}
                      </strong>
                      %
                    </h2>
                    {/**Item dos a head */}
                    <h2>
                      Si ({itemsSeleccionados[0]}=1) Entonces{" "}
                      {itemsSeleccionados[1]} = 1 Cb={" "}
                      <strong>
                        {" "}
                        {coberturaConfianzaValores.positivoPositivoItem2AHead[0].toFixed(
                          2
                        )}
                      </strong>
                      % Cf={" "}
                      <strong>
                        {coberturaConfianzaValores.positivoPositivoItem2AHead[1].toFixed(
                          2
                        )}
                      </strong>
                      %
                    </h2>
                    <h2>
                      Si ({itemsSeleccionados[0]}=1) Entonces{" "}
                      {itemsSeleccionados[1]} = 0 Cb={" "}
                      <strong>
                        {coberturaConfianzaValores.positivoNegativoItem2AHead[0].toFixed(
                          2
                        )}
                      </strong>
                      % Cf={" "}
                      <strong>
                        {coberturaConfianzaValores.positivoNegativoItem2AHead[1].toFixed(
                          2
                        )}
                      </strong>
                      %
                    </h2>
                    <h2>
                      Si ({itemsSeleccionados[0]}=0) Entonces{" "}
                      {itemsSeleccionados[1]} = 1 Cb={" "}
                      <strong>
                        {coberturaConfianzaValores.negativoPositivoItem2AHead[0].toFixed(
                          2
                        )}
                      </strong>
                      % Cf={" "}
                      <strong>
                        {coberturaConfianzaValores.negativoPositivoItem2AHead[1].toFixed(
                          2
                        )}
                      </strong>
                      %
                    </h2>
                    <h2>
                      Si ({itemsSeleccionados[0]}=0) Entonces{" "}
                      {itemsSeleccionados[1]} = 0 Cb={" "}
                      <strong>
                        {coberturaConfianzaValores.negativoNegativoItem2AHead[0].toFixed(
                          2
                        )}
                      </strong>
                      % Cf={" "}
                      <strong>
                        {coberturaConfianzaValores.negativoNegativoItem2AHead[1].toFixed(
                          2
                        )}
                      </strong>
                      %
                    </h2>
                  </div>
                  <h1 className="text-3xl font-thin my-5">
                    Factor de dependencia
                  </h1>
                  <table className="min-w-full bg-white border-gray-200 shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                      <tr className="border-b-2 border-gray-300 py-2 px-4 text-left text-sm font-semibold text-gray-700">
                        <th></th>
                        <th>{itemsSeleccionados[0]}</th>
                        <th>~{itemsSeleccionados[0]}</th>
                      </tr>
                    </thead>
                    {/** Datos de la tabla */}
                    <tbody>
                      <tr className="text-center">
                        {/**Nombre de la fila 1*/}
                        <td>{itemsSeleccionados[1]}</td>
                        {/**datos de primera fila */}
                        <td>
                          {factorDeDependenciaValores.positivoPositivo.toFixed(
                            4
                          )}
                        </td>
                        <td>
                          {factorDeDependenciaValores.positivoNegativo.toFixed(
                            4
                          )}
                        </td>
                      </tr>
                      <tr className="text-center">
                        {/**Nombre de la fila 1*/}
                        <td>~{itemsSeleccionados[1]}</td>
                        {/**Datos de la segunda fila */}
                        <td>
                          {factorDeDependenciaValores.negativoPositivo.toFixed(
                            4
                          )}
                        </td>
                        <td>
                          {factorDeDependenciaValores.negativoNegativo.toFixed(
                            4
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <h1 className="text-3xl font-thin my-5">Chi-cuadrado</h1>
                  <div>
                    <h1>
                      {chiCuadradoValores.positivoPositivo.toFixed(3)} +{" "}
                      {chiCuadradoValores.positivoNegativo.toFixed(3)} +{" "}
                      {chiCuadradoValores.negativoPositivo.toFixed(3)} +{" "}
                      {chiCuadradoValores.negativoNegativo.toFixed(3)} ={" "}
                      <strong>
                        {(
                          chiCuadradoValores.positivoPositivo +
                          chiCuadradoValores.positivoNegativo +
                          chiCuadradoValores.negativoPositivo +
                          chiCuadradoValores.negativoNegativo
                        ).toFixed(3)}
                      </strong>
                    </h1>
                  </div>
                  <div className="my-2">
                    <RadioGroup
                      label="Selecciona el nivel de confianza"
                      onValueChange={confianzaFn}
                      defaultValue={"0"}
                      orientation="horizontal"
                    >
                      <Radio value="0">95%</Radio>
                      <Radio value="1">99%</Radio>
                      <Radio value="2">99.99%</Radio>
                    </RadioGroup>
                  </div>
                  <div>{confianza}</div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/**En esta parte se mostraran los datos en una tabla */}
        <div className="mt-5">
          {state && (
            <>
              <h1 className="mb-5 font-thin text-3xl">Datos</h1>
              <div className="h-[50rem] overflow-scroll">
                <table className="min-w-full  bg-white border-gray-200 shadow-md rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr className="">
                      <th className="border-b-2  border-gray-300 py-2 px-4 text-left text-sm font-semibold text-gray-700">
                        {items.item1.nombre}
                      </th>
                      <th className="border-b-2 border-gray-300 py-2 px-4 text-left text-sm font-semibold text-gray-700">
                        {items.item2.nombre}
                      </th>
                      <th className="border-b-2 border-gray-300 py-2 px-4 text-left text-sm font-semibold text-gray-700">
                        {items.item3.nombre}
                      </th>
                      <th className="border-b-2 border-gray-300 py-2 px-4 text-left text-sm font-semibold text-gray-700">
                        {items.item4.nombre}
                      </th>
                      <th className="border-b-2 border-gray-300 py-2 px-4 text-left text-sm font-semibold text-gray-700">
                        {items.item5.nombre}
                      </th>
                      <th className="border-b-2 border-gray-300 py-2 px-4 text-left text-sm font-semibold text-gray-700">
                        {items.item6.nombre}
                      </th>
                      <th className="border-b-2 border-gray-300 py-2 px-4 text-left text-sm font-semibold text-gray-700">
                        {items.item7.nombre}
                      </th>
                      <th className="border-b-2 border-gray-300 py-2 px-4 text-left text-sm font-semibold text-gray-700">
                        {items.item8.nombre}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/**[...Array(maxLength)] esta parte utiliza ... para convertirlo en un array osea el mexLengh lo convierte en una lista de elementos */}
                    {[...Array(maxLength)].map((_, rowIndex) => (
                      <tr key={rowIndex}>
                        {itemKeys.map((key, colIndex) => (
                          //*En caso de que una columna no tenga datos los va a dejar como vacios
                          <td
                            key={colIndex}
                            className="border border-slate-300 text-center"
                          >
                            {datosArray[key].datosArray[rowIndex] !== undefined
                              ? datosArray[key].datosArray[rowIndex]
                              : ""}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default PutDataManually;
