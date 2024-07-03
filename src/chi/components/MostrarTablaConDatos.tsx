interface ComponentesProbs {
  datosHoja: Record<string, any>[]; //Acepta string como any, el record es para saber si es el uno o el otro
}

const MostrarTablaConDatos: React.FC<ComponentesProbs> = ({ datosHoja }) => {
  return (
    <table className="min-w-full bg-white border-gray-200 shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          {Object.keys(datosHoja[0]).map((clave, index) => (
            <th
              key={index}
              className="border-b-2 border-gray-300 py-2 px-4 text-left text-sm font-semibold text-gray-700"
            >
              {clave}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {datosHoja.map((fila, index) => (
          <tr key={index} className="transition-all hover:bg-gray-50">
            {Object.values(fila).map((valor, index) => (
              <td key={index} className="py-2 px-4 whitespace-nowrap">
                {valor}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MostrarTablaConDatos;
