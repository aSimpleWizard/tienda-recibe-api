let productos = []

function construir(){
    recuperarDatos()
}

async function recuperarDatos(){
    productos = []
    datos = await fetch('http://localhost:8000/productos')
    .then(res => res.json())
    .then((data) => data.map(producto =>{productos.push(producto)}))
    .catch((err) =>{alert('No se pudo hacer fetch a la api(recuerde que debe correrla en un entorno virtual)'); return false});
    mostrarDatos()
    Clear()
}

function mostrarDatos(){
  
    padre = document.getElementById('tabla-productos')
    padre.innerHTML = '' 
    for (let i = 0; i < productos.length; i++) {
        
        const producto = productos[i];
        destino = document.getElementById('tabla-productos');
        tr = _dce('tr');
        tr.setAttribute('onclick','getRow('+producto.producto_id+')');
        
        td = _dce('td');
        td.innerHTML = producto.producto_id;
        tr.appendChild(td);
    
        td = _dce('td');
        td.innerHTML = producto.tipo;
        tr.appendChild(td);

        td = _dce('td');
        td.innerHTML = producto.nombre;
        tr.appendChild(td);
    
        td = _dce('td');
        td.innerHTML = producto.cantidad;
        tr.appendChild(td);
    
        td = _dce('td');
        td.innerHTML = producto.precio;
        tr.appendChild(td);
    
        td = _dce('td');
        td.innerHTML = producto.comentario;
        tr.appendChild(td);

        td = _dce('td');
        borrar = _dce('button');
        borrar.innerHTML = 'borrar';
        borrar.setAttribute('onclick','DeleteProducto('+producto.producto_id+')');
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

    datos = await fetch(`http://localhost:8000/productos/${id}`)
    .then(res => res.json())
    .then((producto) => {
        
        document.getElementById('producto_id').value = producto.producto_id,
        document.getElementById('nombre').value = producto.nombre,
        document.getElementById('tipo').value = producto.tipo, 
        document.getElementById('cantidad').value = producto.cantidad,
        document.getElementById('precio').value = producto.precio,
        document.getElementById('comentario').value = producto.comentario
    })
    .catch((err) =>{alert(err); return false});
    
}

async function InsertProducto(){

    if(productos.length != 0){
        id = parseInt(productos[productos.length - 1].id);
    }else{
        id = -1;
    }

    datos = await fetch('http://127.0.0.1:8000/productos',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "tipo": document.getElementById('tipo').value.toString(),
            "nombre": document.getElementById('nombre').value.toString(),
            "precio": document.getElementById('precio').value.toString(),
            "cantidad": document.getElementById('cantidad').value.toString(),
            "comentario": document.getElementById('comentario').value.toString()

        }) 
    })
    .catch((err) =>{alert('aca '+err); return false});
    recuperarDatos()
}


async function DeleteProducto(id){

    if(confirm(`De verdad desea borrar el producto ${id}?`)){
        data = await fetch(`http://127.0.0.1:8000/productos/${id}`,{
            method: 'DELETE',
        })
        .catch((err) =>{alert(err); return false});
        recuperarDatos()
    } 
}

async function UpdateProducto(id){

    id = document.getElementById('producto_id').value

    if(id != ''){
        if(confirm(`De verdad desea editar el productomon ${id}?`)){
            data = await fetch(`http://127.0.0.1:8000/productos/${id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "tipo": document.getElementById('tipo').value.toString(),
                    "nombre": document.getElementById('nombre').value.toString(),
                    "precio": document.getElementById('precio').value.toString(),
                    "cantidad": document.getElementById('cantidad').value.toString(),
                    "comentario": document.getElementById('comentario').value.toString()
                }) 
            })
            .catch((err) =>{alert(err); return false});
            recuperarDatos()
        } 
    }else{
        alert('Mi loco pero ute ni el producto eligio')
    }

}

function Clear(){
    document.getElementById('producto_id').value = "",
    document.getElementById('nombre').value = "",
    document.getElementById('tipo').value = "", 
    document.getElementById('cantidad').value = "",
    document.getElementById('precio').value = "",
    document.getElementById('comentario').value = ""
}