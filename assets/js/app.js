
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

        resultado.textContent = `${conversion} ${moneda.toUpperCase()}`
      

    } catch (error) {
        alert("No se ah podido generar conexion con la pagina")
    }
    
        }

document.querySelector("#btnConvertir").addEventListener("click", obtenerMoneda)

   


