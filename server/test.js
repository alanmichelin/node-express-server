let obj1 = {
  id: 2,
  anio: 2014,
  marca: "Ford",
  modelo: "Fiesta",
  valor: 17000,
  disponible: false,
};

let obj2 = {
  id: 2,
  anio: 2014,
  marca: "Ford",
  modelo: "Fiesta",
  valor: 17000,
  disponible: true,
};

for (const key in obj1) {
  if (Object.hasOwnProperty.call(obj1, key)) {
    obj1[key] = obj2[key];
  }
}
console.log(obj1);
