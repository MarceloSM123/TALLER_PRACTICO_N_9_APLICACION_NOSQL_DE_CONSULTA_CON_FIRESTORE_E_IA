import { useState } from 'react'
import type { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'
import {
  obtenerPeliculasDeGenero,
  obtenerPeliculasDeAnio,
  obtenerPeliculasDisponibles,
  obtenerPeliculaPorId,
  type PeliculaConId
} from '../services/catalogoService'

// Tipo para saber qué filtro está activo
type TipoBusqueda = 'genero' | 'anio' | 'disponibles' | 'id' | null

export const ConsultaPeliculas = () => {
  const [resultados, setResultados] = useState<PeliculaConId[]>([])
  const [cargando, setCargando] = useState(false)
  const [mensaje, setMensaje] = useState('')
  
  // Inputs
  const [generoId, setGeneroId] = useState('')
  const [anio, setAnio] = useState('')
  const [peliculaId, setPeliculaId] = useState('')

  // Estado de Paginación
  const [tipoBusquedaActiva, setTipoBusquedaActiva] = useState<TipoBusqueda>(null)
  const [ultimoDoc, setUltimoDoc] = useState<QueryDocumentSnapshot<DocumentData> | undefined>()
  const [pagina, setPagina] = useState(1)
  const [historialCursores, setHistorialCursores] = useState<(QueryDocumentSnapshot<DocumentData> | undefined)[]>([])

  // Función unificada para manejar la paginación de cualquier filtro
  const ejecutarConsultaPaginada = async (
    tipo: TipoBusqueda,
    valorFiltro: any,
    cursor?: QueryDocumentSnapshot<DocumentData>,
    esAvanzar: boolean = false,
    nuevaPagina: number = 1
  ) => {
    setCargando(true)
    setMensaje('')
    setTipoBusquedaActiva(tipo)
    
    try {
      let res;

      // Si es búsqueda por ID (no pagina)
      if (tipo === 'id') {
        const data = await obtenerPeliculaPorId(valorFiltro);
        if (!data) {
          setResultados([]);
          setMensaje('No se encontró la película con ese ID.');
          return;
        }
        setResultados([data]);
        setUltimoDoc(undefined); // No hay paginación para ID
        return;
      }

      // Para los filtros que sí paginan
      if (tipo === 'genero') res = await obtenerPeliculasDeGenero(valorFiltro, cursor);
      else if (tipo === 'anio') res = await obtenerPeliculasDeAnio(Number(valorFiltro), cursor);
      else if (tipo === 'disponibles') res = await obtenerPeliculasDisponibles(cursor);
      
      if (res) {
        if (res.resultados.length === 0 && esAvanzar) {
          setMensaje('No hay más resultados para esta búsqueda.');
          return;
        }
        setResultados(res.resultados);
        setUltimoDoc(res.ultimoDocumento);
        setPagina(nuevaPagina);

        if (esAvanzar) {
          setHistorialCursores(prev => [...prev, cursor]);
        }
      }
    } catch (error) {
      console.error(error);
      setMensaje('Error al consultar. Revisa la consola (puede requerir un índice).');
    } finally {
      setCargando(false);
    }
  }

  // Iniciar cualquier búsqueda
  const iniciarBusqueda = (tipo: TipoBusqueda, valor: any) => {
    setHistorialCursores([]);
    ejecutarConsultaPaginada(tipo, valor, undefined, true, 1);
  }

  const siguientePagina = () => {
    if (!ultimoDoc || !tipoBusquedaActiva) return;
    const valorFiltro = tipoBusquedaActiva === 'genero' ? generoId : tipoBusquedaActiva === 'anio' ? anio : null;
    ejecutarConsultaPaginada(tipoBusquedaActiva, valorFiltro, ultimoDoc, true, pagina + 1);
  }

  const paginaAnterior = () => {
    if (pagina <= 1 || !tipoBusquedaActiva) return;
    const nuevoHistorial = historialCursores.slice(0, -1);
    const cursorAnterior = nuevoHistorial.length > 0 ? nuevoHistorial[nuevoHistorial.length - 1] : undefined;
    const valorFiltro = tipoBusquedaActiva === 'genero' ? generoId : tipoBusquedaActiva === 'anio' ? anio : null;
    
    setHistorialCursores(nuevoHistorial);
    ejecutarConsultaPaginada(tipoBusquedaActiva, valorFiltro, cursorAnterior, false, pagina - 1);
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#333', marginBottom: '5px' }}>Catálogo de Películas</h1>
        <p style={{ color: '#666', margin: 0 }}>Taller 9 - Paginación por cada búsqueda</p>
      </header>

      {/* Panel de Controles */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px', backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {/* Consulta 1 */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flex: '1 1 45%' }}>
            <input 
              type="text" placeholder="ID del Género (Ej: GEN001)" value={generoId} onChange={(e) => setGeneroId(e.target.value)}
              style={{ padding: '8px', flex: 1 }}
            />
            <button onClick={() => iniciarBusqueda('genero', generoId)} disabled={cargando || !generoId} style={{ padding: '8px 16px', cursor: 'pointer' }}>
              1. Por Género
            </button>
          </div>

          {/* Consulta 2 */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flex: '1 1 45%' }}>
            <input 
              type="number" placeholder="Año de estreno (Ej: 2010)" value={anio} onChange={(e) => setAnio(e.target.value)}
              style={{ padding: '8px', flex: 1 }}
            />
            <button onClick={() => iniciarBusqueda('anio', anio)} disabled={cargando || !anio} style={{ padding: '8px 16px', cursor: 'pointer' }}>
              2. Por Año
            </button>
          </div>

          {/* Consulta 3 */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flex: '1 1 45%' }}>
            <span style={{ flex: 1 }}>Filtrar Disponibles</span>
            <button onClick={() => iniciarBusqueda('disponibles', null)} disabled={cargando} style={{ padding: '8px 16px', cursor: 'pointer' }}>
              3. Disponibles
            </button>
          </div>

          {/* Consulta 4 */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flex: '1 1 45%' }}>
            <input 
              type="text" placeholder="ID de la Película (Ej: PEL001)" value={peliculaId} onChange={(e) => setPeliculaId(e.target.value)}
              style={{ padding: '8px', flex: 1 }}
            />
            <button onClick={() => iniciarBusqueda('id', peliculaId)} disabled={cargando || !peliculaId} style={{ padding: '8px 16px', cursor: 'pointer' }}>
              4. Por ID
            </button>
          </div>
        </div>
      </div>

      {cargando && <p style={{ color: 'blue', fontWeight: 'bold' }}>Consultando Firestore...</p>}
      {mensaje && <p style={{ color: 'red', fontWeight: 'bold' }}>{mensaje}</p>}

      {/* Tabla de Resultados */}
      {resultados.length > 0 && (
        <>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#0056b3', color: 'white' }}>
                <th style={{ border: '1px solid #ddd', padding: '10px' }}>ID</th>
                <th style={{ border: '1px solid #ddd', padding: '10px' }}>Título</th>
                <th style={{ border: '1px solid #ddd', padding: '10px' }}>Género / Año</th>
                <th style={{ border: '1px solid #ddd', padding: '10px' }}>Estado</th>
                <th style={{ border: '1px solid #ddd', padding: '10px' }}>Detalles</th>
              </tr>
            </thead>
            <tbody>
              {resultados.map((pelicula) => (
                <tr key={pelicula.id} style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '10px' }}>{pelicula.id}</td>
                  <td style={{ padding: '10px' }}><strong>{pelicula.titulo}</strong></td>
                  <td style={{ padding: '10px' }}>
                    {pelicula.generoNombre} <br/>
                    <small style={{ color: '#666' }}>({pelicula.generoId}) - {pelicula.anio}</small>
                  </td>
                  <td style={{ padding: '10px' }}>
                    <span style={{ 
                      padding: '4px 8px', borderRadius: '4px', 
                      backgroundColor: pelicula.disponible ? '#d4edda' : '#f8d7da',
                      color: pelicula.disponible ? '#155724' : '#721c24'
                    }}>
                      {pelicula.disponible ? 'Disponible' : 'No Disponible'}
                    </span>
                  </td>
                  <td style={{ padding: '10px', fontSize: '13px', textAlign: 'left' }}>
                    Dur: {pelicula.detalles.duracionMinutos} min <br/>
                    Clasif: {pelicula.detalles.clasificacion} <br/>
                    Idioma: {pelicula.detalles.idiomaOriginal}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Barra de Navegación (Solo si el tipo de búsqueda es paginable, o sea, no 'id') */}
          {tipoBusquedaActiva !== 'id' && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center', marginTop: '20px', backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '5px' }}>
              <button 
                onClick={paginaAnterior} 
                disabled={pagina <= 1 || cargando}
                style={{ padding: '8px 16px', cursor: pagina <= 1 ? 'not-allowed' : 'pointer' }}
              >
                Anterior
              </button>
              <span><strong>Página {pagina}</strong></span>
              <button 
                onClick={siguientePagina} 
                disabled={!ultimoDoc || cargando}
                style={{ padding: '8px 16px', cursor: !ultimoDoc ? 'not-allowed' : 'pointer' }}
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}