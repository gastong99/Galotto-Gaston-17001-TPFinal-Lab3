window.addEventListener('load', () => {
    CargarDatosProductosConCategorias();
});

async function CargarDatosProductosConCategorias() {
    const contenedorRelleno = document.querySelector('.contenedor');

    try {
        const [productosResponse, categoriasResponse] = await Promise.all([
            fetch('https://api.yumserver.com/17001/generic/productos'),
            fetch('https://api.yumserver.com/17001/generic/categorias')
        ]);

        const productos = await productosResponse.json();
        const categorias = await categoriasResponse.json();

        const mapaCategorias = categorias.reduce((mapa, categoria) => {
            mapa[categoria.idcod] = categoria.param1;
            return mapa;
        }, {});

        productos.forEach(producto => {
            producto.categoriaNombre = mapaCategorias[producto.param4] || 'Sin categoria';
        });

        renderizarTabla(productos, contenedorRelleno);
        filtroBusqueda(productos, contenedorRelleno);
        
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

function renderizarTabla(data, contenedor) {
    let tablaHTML = `
        <table class="tabla-datos">
            <thead>
                <tr>
                    <th>Id Cod</th>
                    <th>Producto</th>
                    <th>Talle</th>
                    <th>Precio (ARS)</th>
                    <th>Categoria</th>
                </tr>
            </thead>
            <tbody>
    `;
    data.forEach(({ idcod, param1, param2, param3, categoriaNombre }) => {
        tablaHTML += `
            <tr>
                <td>${idcod}</td>
                <td>${param1}</td>
                <td>${param2}</td>
                <td>$ ${param3}</td>
                <td>${categoriaNombre}</td>
            </tr>
        `;
    });
    tablaHTML += `
            </tbody>
        </table>
    `;
    contenedor.innerHTML = tablaHTML;
}

function filtroBusqueda(data, contenedor) {
    const filtro = document.getElementById('filtro');
    filtro.addEventListener('input', () => {
        const textoFiltro = filtro.value.toLowerCase();
        const datosFiltrados = data.filter(item =>
            item.param1.toLowerCase().includes(textoFiltro) ||
            item.param2.toLowerCase().includes(textoFiltro)
        );
        renderizarTabla(datosFiltrados, contenedor);
    });
}
