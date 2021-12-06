let clientes = []

function construir(){
    recuperarDatos()
}

async function recuperarDatos(){
    clientes = []
    datos = await fetch('http://localhost:8000/clientes')
    .then(res => res.json())
    .then((data) => data.map(cliente =>{clientes.push(cliente)}))
    .catch((err) =>{alert('No se pudo hacer fetch a la api(recuerde que debe correrla en un entorno virtual)'); return false});
    mostrarDatos()
    Clear()
}

function mostrarDatos(){
  
    padre = document.getElementById('tabla-clientes')
    padre.innerHTML = '' 
    for (let i = 0; i < clientes.length; i++) {
        
        const cliente = clientes[i];
        destino = document.getElementById('tabla-clientes');
        tr = _dce('tr');
        tr.setAttribute('onclick','getRow('+cliente.cliente_id+')');
        
        td = _dce('td');
        td.innerHTML = cliente.cliente_id;
        tr.appendChild(td);
    
        td = _dce('td');
        td.innerHTML = cliente.nombre;
        tr.appendChild(td);

        td = _dce('td');
        td.innerHTML = cliente.apellido;
        tr.appendChild(td);
    
        td = _dce('td');
        td.innerHTML = cliente.correo;
        tr.appendChild(td);
    
        td = _dce('td');
        td.innerHTML = cliente.documento_identidad;
        tr.appendChild(td);
    
        td = _dce('td');
        td.innerHTML = cliente.telefono;
        tr.appendChild(td);

        td = _dce('td');
        borrar = _dce('button');
        borrar.innerHTML = 'borrar';
        borrar.setAttribute('onclick','DeleteCliente('+cliente.cliente_id+')');
        borrar.setAttribute('class', 'btn btn-danger');
        td.appendChild(borrar);
        tr.appendChild(td);
    
        destino.appendChild(tr);
    }

}

function _dce(obj){
    return document.createElement(obj);
}
//crea un input
function textInput(nombre, tipo){
    obj = _dce('input');
    obj.setAttribute('name', nombre);
    obj.setAttribute('class', 'form-control');
    obj.setAttribute('type', tipo);
    return obj;
}

async function getRow(id){

    datos = await fetch(`http://localhost:8000/clientes/${id}`)
    .then(res => res.json())
    .then((cliente) => {
        
        document.getElementById('cliente_id').value = cliente.cliente_id,
        document.getElementById('nombre').value = cliente.nombre,
        document.getElementById('apellido').value = cliente.apellido, 
        document.getElementById('correo').value = cliente.correo,
        document.getElementById('documento_identidad').value = cliente.documento_identidad,
        document.getElementById('telefono').value = cliente.telefono
    })
    .catch((err) =>{alert(err); return false});
    
}

async function InsertCliente(){

    if(clientes.length != 0){
        id = parseInt(clientes[clientes.length - 1].id);
    }else{
        id = -1;
    }

    datos = await fetch('http://127.0.0.1:8000/clientes',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "nombre": document.getElementById('nombre').value.toString(),
            "apellido": document.getElementById('apellido').value.toString(),
            "correo": document.getElementById('correo').value.toString(),
            "documento_identidad": document.getElementById('documento_identidad').value.toString(),
            "telefono": document.getElementById('telefono').value.toString()
        }) 
    })
    .catch((err) =>{alert('aca '+err); return false});
    recuperarDatos()
}


async function DeleteCliente(id){

    if(confirm(`De verdad desea borrar el cliente ${id}?`)){
        data = await fetch(`http://127.0.0.1:8000/clientes/${id}`,{
            method: 'DELETE',
        })
        .catch((err) =>{alert(err); return false});
        recuperarDatos()
    } 
}

async function UpdateCliente(id){

    id = document.getElementById('cliente_id').value

    if(id != ''){
        if(confirm(`De verdad desea editar el clientemon ${id}?`)){
            data = await fetch(`http://127.0.0.1:8000/clientes/${id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "nombre": document.getElementById('nombre').value.toString(),
                    "apellido": document.getElementById('apellido').value.toString(),
                    "correo": document.getElementById('correo').value.toString(),
                    "documento_identidad": document.getElementById('documento_identidad').value.toString(),
                    "telefono": document.getElementById('telefono').value.toString()
                }) 
            })
            .catch((err) =>{alert(err); return false});
            recuperarDatos()
        } 
    }else{
        alert('Mi loco pero ute ni el cliente eligio')
    }

}

function Clear(){
    document.getElementById('cliente_id').value = "",
    document.getElementById('nombre').value = "",
    document.getElementById('apellido').value = "", 
    document.getElementById('correo').value = "",
    document.getElementById('documento_identidad').value = "",
    document.getElementById('telefono').value = ""
}