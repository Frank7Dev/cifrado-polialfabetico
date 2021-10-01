//prettier-ignore
const alfabeto = {
    //Aquí el alfabeto para par es el de impar y viceversa, se usa esto ya que en js contamos desde 0 y no desde 1
    "par" : [
        ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
        ["a", "e", "i", "m", "p", "t", "x", "b", "f", "j", "n", "q", "u", "Y", "c", "g", "k", "ñ", "r", "v", "z", "d", "h", "l", "o", "s", "w"]
    ],
    "impar" : [
        ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
        ["n", "r", "w", "b", "g", "l", "p", "u", "z", "e", "j", "ñ", "s", "X", "c", "h", "m", "q", "v", "a", "f", "k", "o", "t", "y", "d", "i"]
    ]
};

const texto = document.querySelector("#texto");
const respuesta = document.querySelector("#cifrado");

function cifrar() {
  let str_t = texto.value.toLowerCase();

  let str_array = str_t.split(" ");
  str_t = str_t.replace(/\s+/g, "");
  console.log(str_t);

  let acc = 0;
  let positions = str_array.map((item) => {
    let acc_l = acc;
    acc += item.length;
    return item.length + acc_l;
  });
  console.log(positions);

  let str_r = "";
  let found = false;

  //   Recorre cada letra del texto a cifrar
  for (let i = 0; i < str_t.length; i++) {
    positions.forEach((position) => {
      str_r += i == position ? " " : "";
    });
    found = false;
    if (i % 2 === 0) {
      //Si es PAR recorre todo el alfabeto de par
      for (let j = 0; j < alfabeto.par[0].length; j++) {
        if (str_t[i] === alfabeto.par[0][j]) {
          str_r += alfabeto.par[1][j];
          found = true;
        }
      }
      if (!found) {
        str_r += str_t[i];
      }
    } else {
      //Si es IMPAR recorre todo el alfabeto de impar
      for (let j = 0; j < alfabeto.impar[0].length; j++) {
        if (str_t[i] === alfabeto.impar[0][j]) {
          str_r += alfabeto.impar[1][j];
          found = true;
        }
      }
      if (!found) {
        str_r += str_t[i];
      }
    }
  }

  respuesta.value = str_r;
}
