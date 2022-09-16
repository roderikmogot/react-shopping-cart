import Image from "next/image";

interface ShoppingCartItem<T> {
  addItemHandler: (item: any) => void;
  image: T;
  name: T;
  id: number;
  price: number;
}

const Item = ({
  name,
  price,
  id,
  image,
  addItemHandler,
}: ShoppingCartItem<string>) => {
  const item = {
    name,
    price,
    id,
  };
  return (
    <div
      onClick={() => addItemHandler(item)}
      className="rounded-lg shadow-lg cursor-pointer transform duration-500 hover:scale-105"
    >
      <Image src={image} alt={name} width={200} height={300} />
      <div className="p-4">{name}</div>
      <div className="px-4 pb-4 font-bold text-xl">${price}</div>
    </div>
  );
};

export default Item;
