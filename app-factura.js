let facturas = []

function construir(){
    recuperarDatos()
}

async function recuperarDatos(){
    facturas = []
    datos = await fetch('http://localhost:8000/facturas')
    .then(res => res.json())
    .then((data) => data.map(factura =>{facturas.push(factura)}))
    .catch((err) =>{alert('No se pudo hacer fetch a la api(recuerde que debe correrla en un entorno virtual)'); return false});
    mostrarDatos()
    Clear()
}

function mostrarDatos(){
  
    padre = document.getElementById('tabla-facturas')
    padre.innerHTML = '' 
    for (let i = 0; i < facturas.length; i++) {
        
        const factura = facturas[i];
        destino = document.getElementById('tabla-facturas');
        tr = _dce('tr');
        // tr.setAttribute('onclick','getRow('+factura.factura_id+')');
        
        td = _dce('td');
        td.innerHTML = factura.factura_id;
        tr.appendChild(td);
    
        td = _dce('td');
        td.innerHTML = factura.fecha;
        tr.appendChild(td);

        td = _dce('td');
        td.innerHTML = factura.cliente_id;
        tr.appendChild(td);
    
        td = _dce('td');
        descripcion = _dce('a');
        descripcion.innerHTML = 'descripcion';
        descripcion.setAttribute('href','detalle.html?factura_id='+factura.factura_id);
        descripcion.setAttribute('class', 'btn btn-warning');
        td.appendChild(descripcion);
        tr.appendChild(td);

    
        td = _dce('td');
        td.innerHTML = factura.subtotal;
        tr.appendChild(td);
    
        td = _dce('td');
        td.innerHTML = factura.itbis;
        tr.appendChild(td);

        td = _dce('td');
        td.innerHTML = factura.total;
        tr.appendChild(td);

        td = _dce('td');
        borrar = _dce('button');
        borrar.innerHTML = 'borrar';
        borrar.setAttribute('onclick','DeleteFactura('+factura.factura_id+')');
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

async function InsertFactura(){

    if(facturas.length != 0){
        id = parseInt(facturas[facturas.length - 1].id);
    }else{
        id = -1;
    }
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    datos = await fetch('http://127.0.0.1:8000/facturas',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "fecha": "aaaa",
            "cliente_id": document.getElementById('cliente_id').value.toString(),
            "descripcion": "ver detalle en tabla detalle",
            "subtotal": 0,
            "itbis": 0,
            "total": 0
        }) 
    })
    .catch((err) =>{alert('aca '+err); return false});
    recuperarDatos()
}


async function DeleteFactura(id){

    if(confirm(`De verdad desea borrar el factura ${id}?`)){
        data = await fetch(`http://127.0.0.1:8000/facturas/${id}`,{
            method: 'DELETE',
        })
        .catch((err) =>{alert(err); return false});
        recuperarDatos()
    } 
}

// async function UpdateFactura(id){

//     id = document.getElementById('factura_id').value

//     if(id != ''){
//         if(confirm(`De verdad desea editar el facturamon ${id}?`)){
//             data = await fetch(`http://127.0.0.1:8000/facturas/${id}`,{
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     "fecha": today.toString(),
//                     "cliente_id": document.getElementById('apellido').value.toString(),
//                     "Descricion": "ver detalle en tabla detalle",
//                     "subtotal": document.getElementById('documento_identidad').value,
//                     "itbis": document.getElementById('telefono').value,
//                     "total": document.getElementById('telefono').value
//                 }) 
//             })
//             .catch((err) =>{alert(err); return false});
//             recuperarDatos()
//         } 
//     }else{
//         alert('Mi loco pero ute ni el factura eligio')
//     }

// }

function Clear(){
    document.getElementById('factura_id').value = "",
    document.getElementById('fecha').value = "",
    document.getElementById('cliente_id').value = "", 
    document.getElementById('subtotal').value = "",
    document.getElementById('itbis').value = "",
    document.getElementById('total').value = ""

}