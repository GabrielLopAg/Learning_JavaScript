const miBoton = document.getElementById('boton')
miBoton.addEventListener('click', agregarTarea)
const miEntrada = document.getElementById('entrada')
const miLista = document.getElementById('lista')

let contenidoDeLista = [];

const main = function init() {
  obtenerLocalStorage();
}();

function obtenerLocalStorage() {
  let listaSinTrata = localStorage.getItem('ListaDeTareas');
  contenidoDeLista = JSON.parse(listaSinTrata);
  pintarListaEnHTML();
}

function pintarListaEnHTML () {
  miLista.innerHTML = '';

  contenidoDeLista.forEach((titulo) => {
    miLista.insertAdjacentHTML('beforeend', `<li class="item"><h5 class="item-name">${titulo}</h5><div class="item-icons"><a href="#" class="complete-item item-icon"><button>Completar</button></a><a href="#" class="edit-item item-icon"><button>Editar</button></a></div></li>` );
    manejarElemento(titulo);
  });
}

function manejarElemento(titulo) {
  let elementosDeLista = miLista.querySelectorAll('.item');

  elementosDeLista.forEach((elemento) => {
    if(elemento.querySelector('.item-name').textContent === titulo) {
      //escucha de edicion
      elemento.querySelector('.edit-item').addEventListener('click', () => {
        miEntrada.value = titulo;
        miLista.removeChild(elemento);
        contenidoDeLista = contenidoDeLista.filter((e) => e !== titulo);
      });
      //escucha de completar
      elemento.querySelector('.complete-item').addEventListener('click', () => {
        miLista.removeChild(elemento);
        contenidoDeLista = contenidoDeLista.filter((e) => e !== titulo);
        localStorage.setItem('ListaDeTareas', JSON.stringify(contenidoDeLista));
      })
    }
  });
}

function agregarTarea() {
  let titulo = miEntrada.value;
  contenidoDeLista.push(titulo);
  localStorage.setItem('ListaDeTareas', JSON.stringify(contenidoDeLista));
  pintarListaEnHTML();
  miEntrada.value = '';
}
