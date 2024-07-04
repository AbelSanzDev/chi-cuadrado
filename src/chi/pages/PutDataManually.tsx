import { commonColors, Input } from "@nextui-org/react";
import { ChangeEvent, useEffect, useState } from "react";

//*Iterfaz de como tiene que ser los datos de cada item
interface ItemFormat {
  nombre: string;
  datos: number[];
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
    item1: { nombre: "", datos: [] },
    item2: { nombre: "", datos: [] },
    item3: { nombre: "", datos: [] },
    item4: { nombre: "", datos: [] },
    item5: { nombre: "", datos: [] },
    item6: { nombre: "", datos: [] },
    item7: { nombre: "", datos: [] },
    item8: { nombre: "", datos: [] },
  });

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
  console.log(items);

  return (
    <>
      <div className="container mx-auto grid grid-cols-2 gap-5">
        <div>
          <h1>Poner data de forma manual</h1>
          {/**Poner el nombre a los items*/}
          <div className="grid grid-cols-8 gap-1">
            <Input
              name="item1"
              onChange={(e) => handleOnChangeItem(e)}
              type="text"
              variant={"underlined"}
              label="Item1"
            />
            <Input
              name="item2"
              onChange={(e) => handleOnChangeItem(e)}
              type="text"
              variant={"underlined"}
              label="Item2"
            />
            <Input
              name="item3"
              onChange={(e) => handleOnChangeItem(e)}
              type="text"
              variant={"underlined"}
              label="Item3"
            />
            <Input
              name="item4"
              onChange={(e) => handleOnChangeItem(e)}
              type="text"
              variant={"underlined"}
              label="Item4"
            />
            <Input
              name="item5"
              onChange={(e) => handleOnChangeItem(e)}
              type="text"
              variant={"underlined"}
              label="Item5"
            />
            <Input
              name="item6"
              onChange={(e) => handleOnChangeItem(e)}
              type="text"
              variant={"underlined"}
              label="Item6"
            />
            <Input
              name="item7"
              onChange={(e) => handleOnChangeItem(e)}
              type="text"
              variant={"underlined"}
              label="Item7"
            />
            <Input
              name="item8"
              onChange={(e) => handleOnChangeItem(e)}
              type="text"
              variant={"underlined"}
              label="Item8"
            />
          </div>
        </div>
        {/**En esta parte se mostraran los dotos en una tabla */}
        <div>
          <table>
            <thead>
              <tr>
                <th>{items.item1.nombre}</th>
                <th>{items.item2.nombre}</th>
                <th>{items.item3.nombre}</th>
                <th>{items.item4.nombre}</th>
                <th>{items.item5.nombre}</th>
                <th>{items.item6.nombre}</th>
                <th>{items.item7.nombre}</th>
                <th>{items.item8.nombre}</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </>
  );
};

export default PutDataManually;
