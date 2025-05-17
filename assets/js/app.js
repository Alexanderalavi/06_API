let grafico = null

const obtenerMoneda = async () =>{
    const input = parseFloat(document.querySelector("#ingreso").value)
    const moneda = document.querySelector("#monedas").value
    const resultado = document.querySelector("#resultado")
    try {
        const url = `https://mindicador.cl/api/${moneda}`
        const res = await fetch(url)  
        const data = await res.json() 

        
        const monedaValor = data.serie[0].valor
        const conversion = (input / monedaValor).toFixed(3)

        resultado.textContent = `El resultado es $ ${conversion} ${moneda}`
      
        mostrarGrafico(data.serie, moneda)

    } catch (error) {
        alert("No se ah podido generar conexion con la pagina")
    }
    
}


const mostrarGrafico = (serie, moneda) => {
    const datos = serie.slice(0, 10)

    const labels = datos.map(dato => {
    const fecha = new Date(dato.fecha)
    return `${fecha.getDate()}/${fecha.getMonth() + 1}`
    })

    const valores = datos.map(dato => dato.valor)

    const graficas = document.querySelector("#grafica")

    if (grafico) {
        grafico.data.labels = labels
        grafico.data.datasets[0].data = valores
        grafico.data.datasets[0].label = `Valor de ${moneda}`
        grafico.update()
    } else {
        grafico = new Chart(graficas, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: `Valor de ${moneda}`,
                    data: valores,
                    borderColor: "red",
                    borderWidth: 2
                }]
            }
        })
    }
}
document.querySelector("#btnConvertir").addEventListener("click", obtenerMoneda)
