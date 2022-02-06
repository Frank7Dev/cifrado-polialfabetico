// Variables
const polialfabeto = {
    //El alfabeto a usar
    "alfabeto" : ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    "impar"    : ["a", "e", "i", "m", "p", "t", "x", "b", "f", "j", "n", "q", "u", "y", "c", "g", "k", "ñ", "r", "v", "z", "d", "h", "l", "o", "s", "w"],
    "par"      : ["n", "r", "w", "b", "g", "l", "p", "u", "z", "e", "j", "ñ", "s", "x", "c", "h", "m", "q", "v", "a", "f", "k", "o", "t", "y", "d", "i"]
};
// Esta variable define si se va a cifrar o a decifrar
let btnAction = 'encrypt';

// DOM
const input = document.querySelector("#one");
const output = document.querySelector("#two");

const mainBtn = document.querySelector('#button');
const changeBtn = document.querySelector('#change');
const clipboard = document.querySelector(".clipboard");
const msgClipboard = document.querySelector(".message-clipboard");


// Functions
function startApp() {
  btnAction = 'encrypt';
  input.value = '';
  output.value = '';
}

function encrypt() {

  // Convertimos el texto a cifrar en array de letras
  let text = input.value;
  let codeArr = text.split('').map( (letter) => {
    return letter;
  });

  // Iteramos el array para cifrar letra por letra
  const code = codeArr.reduce( (finalWord, letter, idx) => {

    if (btnAction == 'encrypt')
      finalWord += getEncryptedLetter(letter, (idx+1));
    else
      finalWord += getDecryptedLetter(letter, (idx+1));

    return finalWord;
  }, "");

  // Mostramos el texto cifrado
  output.value = code;

}

function getEncryptedLetter(letter, position) {

  const idx = polialfabeto.alfabeto.findIndex((lett) => lett === letter );

  if ( idx >= 0 ) // Si lo encontró
    return position % 2 == 0 ? polialfabeto.par[idx] : polialfabeto.impar[idx];
  else
    return letter;
}

function getDecryptedLetter(letter, position) {
  let idx = -1;
  
  if (position % 2 == 0) // Si es par
    idx = polialfabeto.par.findIndex((lett) => lett === letter);
  else
    idx = polialfabeto.impar.findIndex((lett) => lett === letter);

  return idx >= 0 ? polialfabeto.alfabeto[idx] : letter;
}

function changeUI() {
  if (btnAction === 'decrypt') {
    input.placeholder = 'Ingrese el texto a Decifrar';
    output.placeholder = 'Texto Decifrado';
    mainBtn.value = 'DECIFRAR';
    changeBtn.style.transform = 'rotate(180deg)';
  } else if (btnAction === 'encrypt') {
    input.placeholder = 'Ingrese el texto a Cifrar';
    output.placeholder = 'Texto Cifrado';
    mainBtn.value = 'CIFRAR';
    changeBtn.style.transform = 'rotate(0deg)';
  }

}

function writeClipboard() {
  navigator.clipboard.writeText(two.value);
  msgClipboard.classList.add('animate');
  setTimeout(() => {
    msgClipboard.classList.remove('animate');
  }, 1100);
}

// Event Listeners
eventListeners();
function eventListeners() {

  document.addEventListener('DOMContentLoaded', startApp)

  mainBtn.addEventListener('click', encrypt);

  changeBtn.addEventListener('click', () => {
    btnAction = btnAction === 'encrypt' ? 'decrypt' : 'encrypt';
    changeUI();
  });

  clipboard.addEventListener('click', writeClipboard);
}

// ###############################################


// function cifrar() {

//   const input = document.querySelector("#one");
//   const output = document.querySelector("#two");

//   let texto = input.value.toLowerCase();
//   let positions = getSpacesPositions(texto.split(" "));
//   let cifrado = "";

//   texto = texto.replace(/\s+/g, "");

//   // Recorre cada letra del texto a cifrar
//   for (let i = 0; i < texto.length; i++) {
//     positions.forEach((position) => {
//       if (i == position) cifrado += " ";
//     });

//     cifrado += iterateEncryption(texto[i], i);
//   }

//   output.value = cifrado;
// }

// function getSpacesPositions(textArray) {
//   let acc = 0;
//   let positions = textArray.map((item) => {
//     let position = item.length + acc;
//     acc += item.length;
//     return position;
//   });
//   return positions;
// }

// function iterateEncryption(letter, num) {
//   let rpta;
//   let found = false;

//   for (const index of polialfabeto.alfabeto.keys()) {
//     if (polialfabeto.alfabeto[index] === letter) {
//       //prettier-ignore
//       rpta = num % 2 === 0 ? polialfabeto.par[index] : polialfabeto.impar[index];
//       found = true;
//     }
//   }
//   if (!found) rpta = letter;

//   return rpta;
// }