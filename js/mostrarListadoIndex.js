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
    let gridHTML = data.map(({ param1, param2, param3, categoriaNombre, idcod }) => `
        <div class="card-producto">
            <div class="info">
                <h3>${param1}</h3>
                <p>Talle: ${param2}</p>
                <p>Categoría: ${categoriaNombre}</p>
                <p>Precio: $ ${param3}</p>
            </div>
        </div>
    `).join('');
    contenedor.innerHTML = gridHTML;
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
