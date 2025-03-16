//Variables
const nombreAmigo = document.getElementById('amigo'); //Campo de entrada para el nombre del amigo
const listaAmigos = document.getElementById('listaAmigos'); //Lista para mostrar los nombres de los amigos
const resultadoEspacio = document.getElementById('resultado'); //Donde se mostrara el resultado del sorteo
//QuerySelector -> permite tomar un selector de CSS para manipular su estructura
const btnSortear = document.querySelector('.button-draw'); // Obtiene el boton "Sortear amigo"

// Variable para almacenar los nombres de los amigos
let amigos = []; 

//FUNCION PARA AGREAGR AMIGO A LA LISTA
function agregarAmigo() {

    //Obtiene el valor del campo de entrada
    let nombre = nombreAmigo.value;
    //Validación de entrada
    if (!nombre) {
        alert('Por favor, ingresa un nombre válido.'); //Alerta si el campo de entrada está vacío
        return; //Sale de la funcion si el campo está vacio, si esta vacio para
    }

    //Validación para nombres repetidos
    if (amigos.includes(nombre)) {
        alert('Este nombre ya está en la lista.'); //Alerta si el nombre ya existe en la lista
        return; //Sale de la función si el nombre ya existe, si existe para
    }

    //Push() -> Agrega uno o más elementos al final de un array o modifica el array original y devuelve la nueva longitud del array
    amigos.push(nombre); //Agrega el nombre de un amigo al final del array

    //console.log(amigo); //Consola
    //Limpiar la lista existente
    listaAmigos.innerHTML = '';

    //Actualizar la lista con todos los nombres
    //forEach para iterar sobre el array amigos
    amigos.forEach(amigo => {
        let nuevoAmigo = document.createElement('li');
        nuevoAmigo.textContent = amigo;
        listaAmigos.appendChild(nuevoAmigo);
    });

    nombreAmigo.value = ''; //Limpia el campo de entrada después de agregar el nombre
}


//FUNCION PARA SORTEAR AMIGO
function sortearAmigo() {
    // Validación de la cantidad de amigos
    if (amigos.length < 2) {
      alert('Necesitas al menos dos amigos para el sorteo.'); // Muestra una alerta si hay menos de dos amigos en la lista
      return; // Sale de la funcion si no hay suficientes amigos
    }

    let amigosSecretos = []; //Array para almacenar las asignaciones de amigos secretos.
    let indicesDisponibles = []; //Array para almacenar los indices disponibles de amigos.
    
    //Bucle que se ejecuta mientras i sea menor que la longitud del array amigos
    for (/*Contador*/let i = 0; i < amigos.length; i++) {
        //Push -> En este caso se utiliza para agregar los índices de los amigos al final del array
        indicesDisponibles.push(i); 
    }

    //Bucle que se ejecuta mientras i sea menor que la longitud del array amigos
    for (let i = 0; i < amigos.length; i++) {
        let indiceAmigoSecreto; //Variable que almacena el indice del amigo secreto asignado al amigo actual
        
        //Bucle que genera un indice aleatorio que no sea el mismo que el indice actual del amigo. Se ejecuta al menos una vez, incluso si la condicion es falsa desde el principio
        do {
            indiceAmigoSecreto = Math.floor(Math.random() * indicesDisponibles.length); //Genera un indice aleatorio
            
            //WHILE-> Despues de ejecutar el codigo dentro del bloque DO, se evalua la condicion. Si la condicion es verdadera, el bucle se repite. Si es falsa, el bucle termina
            //HASTA LA i -> Se verifica si el indice aleatorio es el mismo que el índice actual del amigo. DESDE EL && -> Se verifica si hay más de un índice disponible
        } while (indicesDisponibles[indiceAmigoSecreto] === i && indicesDisponibles.length > 1); //Asegura que no se asigne a sI mismo
        //El bucle continuara generando indices aleatorios hasta que se encuentre un indice que no sea el mismo que el indice actual del amigo Ooo.. hasta que solo quede un indice disponible, lo que pase primero 
    
        //Push -> En este caso se utiliza para agregar OBJETOS que representan las asignaciones de amigos secretos al final del array
        // Un OBJETO son colecciones de pares clave-valor
        amigosSecretos.push({

            //  : -> Se utiliza para SEPARAR pares clave-valor dentro de un OBJETO
            amigo: amigos[i],
            amigoSecreto: amigos[indicesDisponibles[indiceAmigoSecreto]], //Asigna el amigo secreto usando el indice aleatorio
        });

        //SPLICE -> Puede eliminar, reemplazar o agregar elementos en cualquier posicion de un array
        //array.splice(inicio, cantidadEliminar)
        indicesDisponibles.splice(indiceAmigoSecreto, 1); //En este caso elimina el indice asignado de los disponibles
        }
    
        mostrarResultados(amigosSecretos); //Muestra los resultados del sorteo :)
        btnSortear.textContent = 'Volver a jugar'; // Cambia el texto del botón
        btnSortear.onclick = reiniciarJuego; // Cambia el evento onclick del botón
    }
  
  
   //FUNCION PARA MOSTRAR EL RESULTADO 
   function mostrarResultados(amigosSecretos) {

    //Inicia un bucle for que itera sobre cada elemento del array amigosSecretos
    for (let i = 0; i < amigosSecretos.length; i++) {
        
        let asignacion = amigosSecretos[i]; //Se obtiene el elemento actual del array amigosSecretos
        let resultado = document.createElement('li'); //Se crea un nuevo elemento de lista
        resultado.textContent = `${asignacion.amigo} le regala a ${asignacion.amigoSecreto}`; //Se establece el texto  en la lista
        resultadoEspacio.appendChild(resultado); //Se muetsra el resultado
    }
  }

  //FUNCION REINICAIR EL JUEGO
  function reiniciarJuego() {

    amigos = []; //Limpia el array de amigos
    listaAmigos.innerHTML = ''; //Limpia la lista de amigos
    resultadoEspacio.innerHTML = ''; //Limpia el espacio de resultados
    nombreAmigo.value = ''; //Limpia el campo de entrada de nombres
    btnSortear.textContent = 'Sortear amigo'; //Restaura el texto original del boton
    btnSortear.onclick = sortearAmigo; //Restaura el evento onclick original del boton
  }