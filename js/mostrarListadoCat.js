window.addEventListener('load', () => {
    CargarDatosCategorias();
});

async function CargarDatosCategorias() {
    const contenedorCategorias = document.querySelector('.contenedorCategorias');

    try {
        const response = await fetch('https://api.yumserver.com/17001/generic/categorias');
        const categorias = await response.json();
        console.log('Categorias obtenidas:', categorias);
        renderizarTablaCategorias(categorias, contenedorCategorias);
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

function renderizarTablaCategorias(data, contenedorCategorias) {

    console.log('Datos recibidos para renderizar:', data);

    let tablaHTML = `
        <table class="tabla-datos">
            <thead>
                <tr>
                    <th>Id Cod</th>
                    <th>Categoria</th>
                    <th>Descripcion</th>
                </tr>
            </thead>
            <tbody>
    `;
    data.forEach(({ idcod, param1, param2}) => {
        tablaHTML += `
            <tr>
                <td>${idcod}</td>
                <td>${param1}</td>
                <td>${param2}</td>
            </tr>
        `;
    });
    tablaHTML += `
            </tbody>
        </table>
    `;
    contenedorCategorias.innerHTML = tablaHTML;
}