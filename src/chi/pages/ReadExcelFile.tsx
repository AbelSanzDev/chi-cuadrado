import { useState } from 'react';
import * as XLSX from 'xlsx';

interface DatoHoja {
    [key: string]: string | number | boolean | null;
  }

const ReadExcelFile:React.FC = () => {
    const [datosHoja, setDatosHoja] = useState<DatoHoja[]>([]); //* puede contener un arreglo de cualquier tipo de datos

    const manejarCargaArchivo = (e:React.ChangeEvent<HTMLInputElement>):void => {
      const archivo = e.target.files?.[0]; //*seleccionamos solo un archivo en este caso el primero
      if(!archivo) return;
      const lector = new FileReader(); 
  
      lector.onload = (evento:ProgressEvent<FileReader>):void => {
        const datos = evento.target?.result;
        if(!datos) return;
        const workbook = XLSX.read(datos, { type: "binary" });
        workbook.SheetNames.forEach((nombreHoja) => {
          const hoja = workbook.Sheets[nombreHoja];
          const datosHoja:any = XLSX.utils.sheet_to_json(hoja);
  
          setDatosHoja(datosHoja);
        });
      };
  
      lector.readAsBinaryString(archivo);
    };
    console.log(datosHoja);
  return (
    <div>
    <input type="file" accept=".xlsx, .xls" onChange={manejarCargaArchivo} />

    {datosHoja.length > 0 && (
      <div>
        <h2>Datos del archivo Excel</h2>
        <table className="styled-table">
          <thead>
            <tr>
              {Object.keys(datosHoja[0]).map((clave, index) => (
                <th key={index}>{clave}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {datosHoja.map((fila, index) => (
              <tr key={index}>
                {Object.values(fila).map((valor, index) => (
                  <td key={index}>{valor}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
  )
}

export default ReadExcelFile