import {ConsultaPeliculas} from './components/ConsultaCatalogo'
import { crearDatosPeliculas } from './scripts/seedPeliculas'
function App() {
return(
    <>
    <h1> Datos de peliculas y series </h1>
    <button onClick={crearDatosPeliculas}>Crear datos</button>
    <ConsultaPeliculas/>
    </>
  )
}

export default App