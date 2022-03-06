interface Item {
  id: number;
}

export const setItems = (items: any) => {
  localStorage.setItem("items", JSON.stringify(items));
};
export const getItems = () => {
  const items = localStorage.getItem("items");
  if (items) {
    return JSON.parse(items);
  }
  return [];
};
export const getItem = (itemId: number) => {
  const items = getItems();
  return items.find((item: Item) => item.id === itemId);
};
export const addItem = (details: any) => {
  const items = getItems();
  items.push(details);
  setItems(items);
};
export const updateItem = (itemId: number, details: any) => {
  const items = getItems();
  const itemIndex = items.findIndex((item: Item) => item.id === itemId);
  items[itemIndex] = { ...items[itemIndex], ...details };
  setItems(items);
};
export const removeItem = (itemId: number) => {
  const items = getItems();
  console.log(items)
  const modifiedItems = items.filter((item: Item) => item.id !== itemId);
  setItems(modifiedItems);
};
export const clearItems = () => {
  localStorage.clear();
}
