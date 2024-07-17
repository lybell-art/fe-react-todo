function addValue(array, value, id) {
  return [
    ...array,
    { id: id ?? "" + array.length + 1, title: value, completed: false },
  ];
}
function moveValue(array, target, afterTarget) {
  if (target === afterTarget) return;

  const newData = [];
  const data = array.find(({ id }) => id === target);

  if (afterTarget === null)
    return [data, ...array.filter(({ id }) => id !== target)];

  for (let item of array) {
    if (item.id === target) continue;
    newData.push(item);
    if (item.id === afterTarget) newData.push(data);
  }
  return newData;
}
function deleteValue(array, target) {
  return array.filter(({ id }) => id !== target);
}
function checkValue(array, target, checkState) {
  return array.map((item) => {
    if (item.id !== target) return item;
    return { ...item, completed: checkState };
  });
}
function modifyValue(array, target, title) {
  return array.map((item) => {
    if (item.id !== target) return item;
    return { ...item, title };
  });
}

export { addValue, deleteValue, checkValue, modifyValue, moveValue };
