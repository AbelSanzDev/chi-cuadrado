import { useState } from "react";
import * as XLSX from "xlsx";
import MostrarTablaConDatos from "../components/MostrarTablaConDatos";
import { Button, Checkbox, CheckboxGroup } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface DatoHoja {
  [key: string]: string | number | boolean | null;
}

interface TablaContigencia {
  positivoPositivo: number;
  positivoNegativo: number;
  negativoNegativo: number;
  negativoPositivo: number;
}

const ReadExcelFile = () => {
  const [datosHoja, setDatosHoja] = useState<DatoHoja[]>([]); //* puede contener un arreglo de cualquier tipo de datos
  const [itemsSeleccionados, setItemsSeleccionados] = useState<string[]>([]);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [datosTablaContigencia, setDatosTablaContigencia] = useState<
    DatoHoja[]
  >([]);
  const [tablaDeContigencia, setTablaDeContigencia] =
    useState<TablaContigencia>({
      positivoPositivo: 0,
      positivoNegativo: 0,
      negativoNegativo: 0,
      negativoPositivo: 0,
    });

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

    setDatosTablaContigencia(nuevosDatosFiltrados);
    tablaContigencia();
  };

  return (
    <div className=" container mx-auto">
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
              <div className="mt-5 grid grid-cols-2">
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
                        <th>{itemsSeleccionados[1]}</th>
                        <th>{itemsSeleccionados[1]}</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    {/** Datos de la tabla */}
                    <tbody>
                      <tr className="text-center">
                        {/**Nombre de la fila 1*/}
                        <td>{itemsSeleccionados[0]}</td>
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
                        <td>{itemsSeleccionados[1]}</td>
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
