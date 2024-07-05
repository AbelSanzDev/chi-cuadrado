import { Button, Input, Tooltip } from "@nextui-org/react";
import { ChangeEvent, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

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

const PutDataManually = () => {
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
  };
  const handleOnChangeItemValues = (e: ChangeEvent<HTMLInputElement>): void => {
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
    let arregloDeObjetos: ItemArrayObjetos;
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
    //*Logica de calculos
  };
  //*Esta funcion sirve para hacer un arreglo de objetos para el array de items
  const arregloObjetos = (): void => {};

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
              <Input
                name="item1"
                onChange={(e) => handleOnChangeItemValues(e)}
                type="text"
                value={items.item1.datos}
                variant={"underlined"}
                label="Datos de Item1 "
              />
            )}
            {items.item2.nombre && (
              <Input
                name="item2"
                onChange={(e) => handleOnChangeItemValues(e)}
                type="text"
                value={items.item2.datos}
                variant={"underlined"}
                label="Datos de Item2"
              />
            )}

            {items.item3.nombre && (
              <Input
                name="item3"
                onChange={(e) => handleOnChangeItemValues(e)}
                type="text"
                value={items.item3.datos}
                variant={"underlined"}
                label="Datos de Item3"
              />
            )}

            {items.item4.nombre && (
              <Input
                name="item4"
                onChange={(e) => handleOnChangeItemValues(e)}
                type="text"
                value={items.item4.datos}
                variant={"underlined"}
                label="Datos de Item4"
              />
            )}

            {items.item5.nombre && (
              <Input
                name="item5"
                onChange={(e) => handleOnChangeItemValues(e)}
                type="text"
                value={items.item5.datos}
                variant={"underlined"}
                label="Datos de Item5"
              />
            )}

            {items.item6.nombre && (
              <Input
                name="item6"
                onChange={(e) => handleOnChangeItemValues(e)}
                type="text"
                value={items.item6.datos}
                variant={"underlined"}
                label="Datos de Item6"
              />
            )}

            {items.item7.nombre && (
              <Input
                name="item7"
                onChange={(e) => handleOnChangeItemValues(e)}
                type="text"
                value={items.item7.datos}
                variant={"underlined"}
                label="Datos de Item7"
              />
            )}

            {items.item8.nombre && (
              <Input
                name="item8"
                onChange={(e) => handleOnChangeItemValues(e)}
                type="text"
                value={items.item8.datos}
                variant={"underlined"}
                label="Datos de Item8"
              />
            )}
          </div>
          <div className="mt-5">
            <Button
              onClick={() => {
                handleGenerarCalculos();
              }}
              color="primary"
              size="lg"
            >
              Generear Calculos
            </Button>
          </div>
        </div>
        {/**En esta parte se mostraran los datos en una tabla */}
        <div className="mt-5">
          {state && (
            <>
              <h1 className="mb-5 font-thin text-3xl">Datos</h1>
              <table className="min-w-full bg-white border-gray-200 shadow-md rounded-lg overflow-hidden">
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
            </>
          )}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default PutDataManually;
