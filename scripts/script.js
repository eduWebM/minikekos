    import { paragraphs,ham,enlacesContenedor,userCartIcons,menuIcons,submenuFlecha,inicioFlecha,search,alertDialog,btnModal,btnModalLast } from "./constantes.js";
    
    let currentParagraphIndex = 0;
    function mostrarSiguienteParrafo() {
        // Oculta el párrafo actual
        paragraphs[currentParagraphIndex].style.opacity = 0;

        /* Calcula el índice del próximo párrafo:
            Cuando currentParagraphIndex alcanza el último índice del array (en este caso, 2), agregarle 1 da como resultado 3. Luego, al usar el operador módulo % con la longitud del array (que también es 3), obtienes el resto de la división, que en este caso es 0. Por lo tanto, la próxima vez que se llame a la función, currentParagraphIndex será 0, comenzando desde el primer párrafo.
        */
        currentParagraphIndex = (currentParagraphIndex + 1) % paragraphs.length;

        // Muestra el próximo párrafo
        paragraphs[currentParagraphIndex].style.opacity = 1;
    }
    // Inicia el intervalo para cambiar cada 6 segundos
    setInterval(mostrarSiguienteParrafo, 6000);

    // Botón Hamburguesa
    ham.addEventListener('click', () => {
        enlacesContenedor.classList.toggle('activado');
        userCartIcons.classList.toggle('user-cart-icons-activado');
        menuIcons.classList.toggle('menu-icons-activado');
        ham.classList.toggle('rotar');
        // Escuchar el evento de transición
        ham.addEventListener('transitionend', function() {
            // Eliminar la clase que realiza la transformación
            ham.classList.remove('rotar');
        
            // Aplicar la clase de Bootstrap u otra clase deseada
            ham.classList.toggle('bi-x-lg');
        }, { once: true });
    });

    // Submenús Flecha
    submenuFlecha.forEach(function(boton) {
        boton.addEventListener('click', function() {
            // Obtener el elemento padre
            const padre = boton.parentElement;
            // Seleccionar el hermano siguiente del elemento padre
            const hermanoSiguiente = padre.nextElementSibling;

            hermanoSiguiente.classList.add('mostrar-submenu');
            hermanoSiguiente.classList.remove('ocultar-submenu');
        });
    });

    // Inicio Flecha
    inicioFlecha.forEach(function(boton) {
        boton.addEventListener('click', function() {
            boton.parentNode.parentNode.parentNode.classList.toggle('desplazar-submenu');
            setTimeout(() => {
                boton.parentNode.parentNode.parentNode.classList.toggle('ocultar-submenu');
            }, 400); // espero 4 milisegundos y oculto el submenú
        });
    });

// Función para mover el elemento
const moverElemento = () => {
    menuIcons.insertBefore(search, userCartIcons);
}
  
// Verificar la resolución de pantalla y mover el elemento si es al menos 1024px
function verificarYMover() {
    if (window.innerWidth >= 1024) {
      moverElemento();
      // cambio las flechas de los submenús
      submenuFlecha.forEach((el) => {
        el.classList.remove('bi-caret-right');
        el.classList.add('bi-caret-down');
      });
    }
}
  
// Ejecutar la función al cargar la página y al cambiar el tamaño de la ventana
window.onload = verificarYMover;
window.onresize = verificarYMover;

// Mostrar Ventana Cookies a los 10 segundos
setTimeout(() => {
    alertDialog.showModal();
}, 4000);

// Manejador de eventos para los botones de cerrar las cookies
btnModal.forEach(function(boton) {
    boton.addEventListener('click', function() {
        alertDialog.close();
    });
});

btnModalLast.addEventListener('click', () => {
    alert("Uppss! Esta opción no está disponble.\nPero cerramos la ventana de igual manera. \u263A");
    alertDialog.close();
});