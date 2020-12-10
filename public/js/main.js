let i;
let contadorCheck = 0;
let filtro = [];
let agregarFiltro = true;

//Una Base de datos "ficticia"
let db = {
    "usuarios":[
        {"id":1,"usuario":"pepe","contrasena":"123"},
        {"id":2,"usuario":"miguel","contrasena":"321"},
    ]
}

let sDiseno = [
    {"id":1,"servicio":"Corel Draw","img":"https://insmac.org/uploads/posts/2019-03/1553188286_coreldraw-graphics-suite.png"},
    {"id":2,"servicio":"AI Ilustrator","img":"https://png4u.com/wp-content/uploads/2019/09/adobe-illustrator-cc-Logo-1024x999.png"},
    {"id":3,"servicio":"Photoshop CC2020","img":"https://clipground.com/images/photoshop-cc-logo-clipart-8.png"}
];

let sMultimedia = [
    {"id":1,"servicio":"Sony Vegas","img":"https://cdn2.iconfinder.com/data/icons/circular-icon-set/256/Sony_Vegas_Pro.png"},
    {"id":2,"servicio":"Camtasia Studio","img":"http://bilgisayarbilim.com/wp-content/uploads/2017/10/Camtasia-Studio-bilgisayarbilim.png"},
    {"id":3,"servicio":"Movie Maker","img":"https://i.ytimg.com/vi/6aBBJloTlPk/maxresdefault.jpg"},
    {"id":4,"servicio":"Pic Monkey","img":"https://www.shareasale.com/images/picmonkey_logo.jpg"},
]

let licOffice365 = [
    {"id":1,"servicio":"Word","img":"https://logos-world.net/wp-content/uploads/2020/03/Microsoft-Word-Logo-2013-2019.png"},
    {"id":2,"servicio":"Excel","img":"https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Microsoft_Excel_Logo.svg/1200px-Microsoft_Excel_Logo.svg.png"},
    {"id":3,"servicio":"Power Apps","img":"http://ww1.prweb.com/prfiles/2016/11/02/13813588/Microsoft%20PowerApps%20New%20Square.png"},
    {"id":4,"servicio":"Power BI","img":"https://www.tekenable.ie/wp-content/uploads/2019/09/PowerBI-Icon-Transparent.png"},
    {"id":5,"servicio":"Power Automate","img":"https://futurumresearch.com/wp-content/uploads/2020/03/MS-FLOW-ICON-512x475.png"},
];

let licAzure = [
    {"id":1,"servicio":"Azure Modo Produccion","img":"https://opsgility.com/Images/azure-icons/azure-logo.png"},
    {"id":2,"servicio":"Azure Propositos Estudiantiles","img":"https://www.umes.edu.gt/wp-content/uploads/2019/10/71516797_10156226880586876_4120587977355165696_o-900x444.jpg"},
    {"id":3,"servicio":"Azure Propositos Desarrollo","img":"https://microsofters.com/wp-content/uploads/2018/05/1_0iSywp8IF6NtrHF3-gBGMg.jpg"},
];


// Para validar los datos del formulario con la base de datos ficticia y permitir el login
// si existen esas credenciales
function validarSesion(){
    let usuario = document.getElementById("usuario").value;
    let contrasena = document.getElementById("contrasena").value;

    if(usuario==""||contrasena==""){
        alert("Ingresa las credenciales");
        return;
    }

    for(i=0;i<db.usuarios.length;i++){
        if(usuario==db.usuarios[i].usuario&&contrasena==db.usuarios[i].contrasena){
            alert("Entrando al sistema...");
            //Redirigir en caso de que esten validos los datos
            window.location.replace("sistema.html");
        }else{
            let login = false;
        }
    }
    if(!login){
        alert("Comprueba tus credenciales");
    }
}

//Validar cuantos checkbox estan activos para buscar en la ventana
function validarCheckboxes(id,suma,idCheckBox){
    contadorCheck+=parseInt(suma); //Numero de checkbox seleccionados, se suma el value de cada etiqueta para saber
    // la cantidad de checkbox activos
    console.log(contadorCheck);

    /* Se alterna el valor de la etiqueta para sumar y saber la cantidad de contadores activos en las invocaciones */
    document.getElementById(idCheckBox).value = document.getElementById(idCheckBox).value * -1;

    /* Se hace una busqueda en el arreglo filtro */
    for(i=0;i<filtro.length;i++){
        if(filtro[i]==id){
            /* Si existe el checkbox en el criterio de busqueda */
            i=filtro.length;
            /* Indicamos que no debe agregarse */
            agregarFiltro = false;
        }else{
            /* Si no se encuentra, significa que lo podemos agregar en el criterio de busqueda */
            agregarFiltro = true;
        }
    }

    /* Agregamos o eliminamos dependiendo del criterio de agregacion */
    if(agregarFiltro){
        filtro.push(id);
    }else{
        filtro.splice(filtro.indexOf(id),1);
        agregarFiltro = true; 
    }

    console.log(filtro);

    /* Se habilita/deshabilita el boton de buscar segun el criterio de los checkboxes activos*/
    if(contadorCheck>0){
        document.getElementById('btnBuscar').disabled = false;
        console.log('Si hay checkboxes');
    }else{
        console.log('No hay checkboxes');
        document.getElementById('btnBuscar').disabled = true;
    }
} 

/* Mandar mostrar resultados de los checkbox que estan activos */
function mostrarResultados(){
    for(i=0;i<filtro.length;i++){
        if(filtro[i]=='sDiseno'){
            console.log('Entre a sDiseno')
            crearElemento(sDiseno);    
        }

        if(filtro[i]=='sMultimedia'){
            console.log('Entre a sMultimedia');
            crearElemento(sMultimedia);
        }
        if(filtro[i]=='licOffice365'){
            console.log('Entre a sMultimedia');
            crearElemento(licOffice365);
        }
        if(filtro[i]=='licAzure'){
            console.log('Entre a sMultimedia');
            crearElemento(licAzure);
        }
    }
}

/* Crea los elementos de los checkboxes */
function crearElemento(producto){
    let contenedor = document.createElement('div');
    contenedor.classList.add('container');
    contenedor.id = 'resultados'; //<div id="restulados"></div>
    document.getElementById('contenedorResultados').appendChild(contenedor);
    

    for(let j=0;j<producto.length;j++){
        console.log(`${producto[j].id} - ${producto[j].servicio}`);
        let row = document.createElement('div');
        row.classList.add('row','text-center');
        row.id = producto[j].id;

        let elemento = document.createElement('div');
        elemento.classList.add('col-8');
        let texto = document.createTextNode(`${producto[j].id} - ${producto[j].servicio}`);
        elemento.appendChild(texto);


        let imagen = document.createElement('img');
        imagen.classList.add("img-previa","col-4");
        imagen.src = producto[j].img;


        document.getElementById('resultados').appendChild(row);
        document.getElementById(producto[j].id).appendChild(elemento);
        document.getElementById(producto[j].id).appendChild(imagen);
    }
}