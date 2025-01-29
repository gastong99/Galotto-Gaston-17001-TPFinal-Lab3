function AgregarProducto() 
{
    let nombreProducto = document.getElementById('nombreProducto').value;
    let talleProducto = document.getElementById('talleProducto').value;
    let precioPeso = document.getElementById('precioPeso').value;
    let categoriaProducto = document.getElementById('categoria-producto').value;
    
    if (nombreProducto && talleProducto && precioPeso && categoriaProducto) {
        fetch('https://api.yumserver.com/17001/generic/productos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                param1: nombreProducto,
                param2: talleProducto,
                param3: precioPeso,
                param4: categoriaProducto,
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
        alert('Producto agregado con exito');
        document.getElementById('nombreProducto').value = "";
        document.getElementById('talleProducto').value = "";
        document.getElementById('precioPeso').value = "";
        document.getElementById('categoria-producto').value = "";
    } 
    else alert ('Los campos no pueden ser nulos.');
}

function AgregarCategoria() 
{
    let nombreCategoria = document.getElementById('nombreCategoria').value;
    let descripCategoria = document.getElementById('descripCategoria').value;

    if (nombreCategoria && descripCategoria) {
        fetch('https://api.yumserver.com/17001/generic/categorias', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                param1: nombreCategoria,
                param2: descripCategoria,
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
        alert('Categoría agregada con exito');
        document.getElementById('nombreCategoria').value = "";
        document.getElementById('descripCategoria').value = "";
    } 
    else alert ('Los campos no pueden ser nulos.');
}

function ModificarProducto()
{
    let id = document.getElementById('id').value
    let nombreProducto = document.getElementById('nombreProducto').value;
    let talleProducto = document.getElementById('talleProducto').value;
    let precioPeso = document.getElementById('precioPeso').value;
    let categoriaProducto = document.getElementById('categoria-producto').value;
    
    if(nombreProducto && talleProducto && precioPeso && categoriaProducto) {
        fetch('https://api.yumserver.com/17001/generic/productos', {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    idcod: id,
                    param1: nombreProducto,
                    param2: talleProducto,
                    param3: precioPeso,
                    param4: categoriaProducto,
                })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error=>console.error('Error:', error));
        alert('Producto modificado con exito');
        document.getElementById('id').value = "";
        document.getElementById('nombreProducto').value = "";
        document.getElementById('talleProducto').value = "";
        document.getElementById('precioPeso').value = "";
        document.getElementById('categoria-producto').value = "";
    }
    else alert ('Los campos no pueden ser nulos.');
}

function ModificarCategoria()
{
    let idCategoria = document.getElementById('idCategoria').value;
    let nombreCategoria = document.getElementById('nombreCategoria').value;
    let descripCategoria = document.getElementById('descripCategoria').value;

    if (nombreCategoria && descripCategoria) {
        fetch('https://api.yumserver.com/17001/generic/categorias', {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    idcod: idCategoria,
                    param1: nombreCategoria,
                    param2: descripCategoria,
                })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error: ', error));
        alert('Categoria modificada con exito');
        document.getElementById('idCategoria').value = "";
        document.getElementById('nombreCategoria').value = "";
        document.getElementById('descripCategoria').value = "";
    }
    else alert ('Los campos no pueden ser nulos.');
}

function EliminarProducto()
{
    let id = document.getElementById('id').value
    if(id != "") {
        let confirmar = confirm('¿Seguro que desea eliminar el producto?')
        if (confirmar) {
            fetch('https://api.yumserver.com/17001/generic/productos', {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(
                    {
                        idcod: id
                    })
                })
                .then(response=>response.json())
                .then(data=>console.log(data))
                .catch(error=>console.error('Error:', error));
                document.getElementById('id').value = "";
                alert('Producto eliminado con exito')
        }
    }
    else alert('Por favor ingrese el ID que desea eliminar.');

}

function EliminarCategoria()
{
    let idCategoria = document.getElementById('idCategoria').value;

    if (idCategoria != "") {
        let confirmar = confirm('¿Seguro que desea eliminar esta categoria?')
        if (confirmar) {
            fetch('https://api.yumserver.com/17001/generic/categorias', {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(
                        {
                            idcod: idCategoria
                        })
                })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error('Error: ', error));
                document.getElementById('idCategoria').value = "";
                alert('Categoria eliminada con exito')
        }
    }
    else alert('Por favor ingrese el ID que desea eliminar.');
}

async function CargarCategorias() {
    const selectCategorias = document.getElementById('categoria-producto');

    if (!selectCategorias) {
        console.error(error);
        return;
    }

    try {
        const response = await fetch('https://api.yumserver.com/17001/generic/categorias');
        const categorias = await response.json();
        console.log('Categorias obtenidas:', categorias);

        categorias.forEach(({ idcod, param1 }) => {
            const option = document.createElement('option');
            option.value = idcod;
            option.textContent = param1;
            selectCategorias.appendChild(option);
        });
    } catch (error) {console.error('Error al cargar las categorías:', error);}
}


