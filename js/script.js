//prettier-ignore
const polialfabeto = {
    //Aquí el alfabeto para par es el de impar y viceversa, se usa esto ya que en js contamos desde 0 y no desde 1
    "alfabeto" : ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    "par"      : ["a", "e", "i", "m", "p", "t", "x", "b", "f", "j", "n", "q", "u", "y", "c", "g", "k", "ñ", "r", "v", "z", "d", "h", "l", "o", "s", "w"],
    "impar"    : ["n", "r", "w", "b", "g", "l", "p", "u", "z", "e", "j", "ñ", "s", "x", "c", "h", "m", "q", "v", "a", "f", "k", "o", "t", "y", "d", "i"]
    
};

const inputTexto = document.querySelector("#texto");
const inputRespuesta = document.querySelector("#cifrado");
const clipboard = (document.querySelector(".clipboard").onclick =
  writeClipboard);

function cifrar() {
  let texto = inputTexto.value.toLowerCase();
  let positions = getSpacesPositions(texto.split(" "));
  let cifrado = "";

  texto = texto.replace(/\s+/g, "");

  // Recorre cada letra del texto a cifrar
  for (let i = 0; i < texto.length; i++) {
    positions.forEach((position) => {
      cifrado += i == position ? " " : "";
    });

    cifrado += iterateEncryption(texto[i], i);
  }

  inputRespuesta.value = cifrado;
}

function getSpacesPositions(text_array) {
  let acc = 0;
  let positions = text_array.map((item) => {
    let position = item.length + acc;
    acc += item.length;
    return position;
  });
  return positions;
}

function iterateEncryption(letter, num) {
  let rpta;
  let found = false;

  for (const index of polialfabeto.alfabeto.keys()) {
    if (polialfabeto.alfabeto[index] === letter) {
      //prettier-ignore
      rpta = num % 2 === 0 ? polialfabeto.par[index] : polialfabeto.impar[index];
      found = true;
    }
  }
  if (!found) rpta = letter;

  return rpta;
}

function writeClipboard() {
  console.log(inputRespuesta.value);
  navigator.clipboard.writeText(inputRespuesta.value);
}
