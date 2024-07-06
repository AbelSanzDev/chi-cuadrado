import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import MostrarTablaConDatos from "../components/MostrarTablaConDatos";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { chiSquareTable } from "../helpers/chiCuadradoDatosTabla";
//*Interfaz de los datos que puede recibir por el excel y es puede recibir un objeto d llave tipo string con datos tipo string | number | boolean | null;
interface DatoHoja {
  [key: string]: string | number | boolean | null;
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
const ReadExcelFile = () => {
  //*En este useState se alamcenan todos los datos de la hoja de excel que se quiere ver
  const [datosHoja, setDatosHoja] = useState<DatoHoja[]>([]); //* puede contener un arreglo de cualquier tipo de datos
  //*Esta alamacena los items seleccionadaso por el usuario en un arreglo
  const [itemsSeleccionados, setItemsSeleccionados] = useState<string[]>([]);
  //*Este useState es para poder lanzar el mansaje de validacion en caso de que se seleccionen mas de dos items
  const [isValid, setIsValid] = useState<boolean>(false);
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
  //*leemos el excel con esta funcion
  const manejarCargaArchivo = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const archivo = e.target.files?.[0]; //*seleccionamos solo un archivo en este caso el primero
    if (!archivo) return;
    const lector = new FileReader();

    lector.onload = (evento: ProgressEvent<FileReader>): void => {
      const datos = evento.target?.result;
      if (!datos) return;
      const workbook = XLSX.read(datos, { type: "binary" });
      workbook.SheetNames.forEach((nombreHoja) => {
        const hoja = workbook.Sheets[nombreHoja];
        const datosHoja: any = XLSX.utils.sheet_to_json(hoja);

        setDatosHoja(datosHoja);
      });
    };

    lector.readAsBinaryString(archivo);
  };
  //*esta funcion es para poder hacer la tabla de contigencia
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
  //*Funcion para limiar toda la data
  const clearData = (): void => {
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

  return (
    <div className=" container mx-auto">
      <div className="my-5 fixed top-1 left-6">
        <Button color="danger" size="lg" onClick={clearData}>
          Reset
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="mt-5">
          <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Seleccionar archivo</span>
                  <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={manejarCargaArchivo}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">xlsx, xls</p>
            </div>
          </div>
          <div className=" ">
            {datosHoja.length > 0 && (
              <div className="mt-5 flex gap-10">
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
                  <div className="mt-2">
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
        </div>

        <div>
          <h2 className="my-5 text-5xl font-thin">Datos del archivo Excel</h2>
          {datosHoja.length > 0 && (
            <div>
              <div>
                <div className="w-[50rem] h-[50rem] overflow-scroll">
                  <MostrarTablaConDatos datosHoja={datosHoja} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ReadExcelFile;
