import { useState } from 'react'
import type { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'
import {
  obtenerPeliculasDeGenero,
  obtenerPeliculasDeAnio,
  obtenerPeliculasDisponibles,
  obtenerPeliculaPorId,
  obtenerPeliculasPaginadas,
  type PeliculaConId
} from '../services/catalogoService'

export const ConsultaPeliculas = () => {
  const [resultados, setResultados] = useState<PeliculaConId[]>([])
  const [cargando, setCargando] = useState(false)
  const [mensaje, setMensaje] = useState('')
  
  // Estados para los inputs de las consultas normales
  const [generoId, setGeneroId] = useState('')
  const [anio, setAnio] = useState('')
  const [peliculaId, setPeliculaId] = useState('')

  // Estados para Paginación
  const [generoPaginacion, setGeneroPaginacion] = useState('')
  const [ultimoDoc, setUltimoDoc] = useState<QueryDocumentSnapshot<DocumentData> | undefined>()
  const [pagina, setPagina] = useState(1)
  const [historialCursores, setHistorialCursores] = useState<(QueryDocumentSnapshot<DocumentData> | undefined)[]>([])
  const [enModoPaginacion, setEnModoPaginacion] = useState(false)

  // Helper para consultas normales
  const ejecutarConsulta = async (consulta: () => Promise<PeliculaConId[] | PeliculaConId | null>, titulo: string) => {
    setCargando(true)
    setMensaje('')
    setEnModoPaginacion(false) // Desactivamos modo paginación si se usa otro filtro
    try {
      const data = await consulta()
      
      if (data === null) {
        setResultados([])
        setMensaje(`No se encontró ningún registro para la ${titulo.toLowerCase()}.`)
      } else if (Array.isArray(data)) {
        setResultados(data)
        if (data.length === 0) setMensaje(`La consulta "${titulo}" no devolvió resultados.`)
      } else {
        setResultados([data])
      }
    } catch (error) {
      console.error(error)
      setMensaje('Ocurrió un error al ejecutar la consulta. Revisa la consola.')
    } finally {
      setCargando(false)
    }
  }

  // --- Lógica de Paginación ---
  const cargarPagina = async (
    cursor?: QueryDocumentSnapshot<DocumentData>,
    esAvanzar: boolean = false,
    nuevaPagina: number = 1
  ) => {
    setCargando(true)
    setMensaje('')
    setEnModoPaginacion(true)
    try {
      const res = await obtenerPeliculasPaginadas(cursor, generoPaginacion || undefined)
      
      if (res.peliculas.length === 0 && esAvanzar) {
        setMensaje('No hay más películas en esta página.')
        return
      }
      
      setResultados(res.peliculas)
      setUltimoDoc(res.ultimoDocumento)
      setPagina(nuevaPagina)

      if (esAvanzar) {
        setHistorialCursores(prev => [...prev, cursor])
      }
    } catch (error) {
      console.error(error)
      setMensaje('Error al cargar la página. Revisa la consola.')
    } finally {
      setCargando(false)
    }
  }

  const iniciarPaginacion = () => {
    setHistorialCursores([])
    cargarPagina(undefined, true, 1)
  }

  const siguientePagina = () => {
    if (!ultimoDoc) return
    cargarPagina(ultimoDoc, true, pagina + 1)
  }

  const paginaAnterior = () => {
    if (pagina <= 1) return
    const nuevoHistorial = historialCursores.slice(0, -1)
    const cursorAnterior = nuevoHistorial.length > 0 ? nuevoHistorial[nuevoHistorial.length - 1] : undefined
    setHistorialCursores(nuevoHistorial)
    cargarPagina(cursorAnterior, false, pagina - 1)
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Encabezado (Requisito 10) */}
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#333', marginBottom: '5px' }}>Catálogo de Películas</h1>
        <p style={{ color: '#666', margin: 0 }}>Taller 9 - Firestore & React</p>
      </header>

      {/* Panel de Controles / Filtros (Requisito 10) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px', backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {/* Consulta 1 */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flex: '1 1 45%' }}>
            <input 
              type="text" 
              placeholder="ID del Género (Ej: GEN001)" 
              value={generoId} 
              onChange={(e) => setGeneroId(e.target.value)}
              style={{ padding: '8px', flex: 1 }}
            />
            <button 
              onClick={() => ejecutarConsulta(() => obtenerPeliculasDeGenero(generoId), 'Películas del género')}
              disabled={cargando || !generoId}
              style={{ padding: '8px 16px', cursor: 'pointer' }}
            >
              1. Por Género
            </button>
          </div>

          {/* Consulta 2 */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flex: '1 1 45%' }}>
            <input 
              type="number" 
              placeholder="Año de estreno (Ej: 2010)" 
              value={anio} 
              onChange={(e) => setAnio(e.target.value)}
              style={{ padding: '8px', flex: 1 }}
            />
            <button 
              onClick={() => ejecutarConsulta(() => obtenerPeliculasDeAnio(anio), 'Películas del año')}
              disabled={cargando || !anio}
              style={{ padding: '8px 16px', cursor: 'pointer' }}
            >
              2. Por Año
            </button>
          </div>

          {/* Consulta 3 */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flex: '1 1 45%' }}>
            <span style={{ flex: 1 }}>Filtrar Disponibles</span>
            <button 
              onClick={() => ejecutarConsulta(() => obtenerPeliculasDisponibles(), 'Películas disponibles')}
              disabled={cargando}
              style={{ padding: '8px 16px', cursor: 'pointer' }}
            >
              3. Disponibles
            </button>
          </div>

          {/* Consulta 4 */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flex: '1 1 45%' }}>
            <input 
              type="text" 
              placeholder="ID de la Película (Ej: PEL001)" 
              value={peliculaId} 
              onChange={(e) => setPeliculaId(e.target.value)}
              style={{ padding: '8px', flex: 1 }}
            />
            <button 
              onClick={() => ejecutarConsulta(() => obtenerPeliculaPorId(peliculaId), 'Película por ID')}
              disabled={cargando || !peliculaId}
              style={{ padding: '8px 16px', cursor: 'pointer' }}
            >
              4. Por ID
            </button>
          </div>
        </div>

        {/* Separador */}
        <hr style={{ width: '100%', border: '1px solid #ddd', margin: '10px 0' }} />

        {/* Control de Paginación */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', backgroundColor: '#e9ecef', padding: '10px', borderRadius: '5px' }}>
          <strong style={{ marginRight: '10px' }}>Paginación (10 en 10)</strong>
          <input 
            type="text" 
            placeholder="Filtro opcional: ID Género" 
            value={generoPaginacion} 
            onChange={(e) => setGeneroPaginacion(e.target.value)}
            style={{ padding: '8px', flex: 1 }}
          />
          <button onClick={iniciarPaginacion} disabled={cargando} style={{ padding: '8px 16px', cursor: 'pointer' }}>
            Iniciar Paginación
          </button>
        </div>
      </div>

      {/* Mensajes y Carga */}
      {cargando && <p style={{ color: 'blue', fontWeight: 'bold' }}>Consultando Firestore...</p>}
      {mensaje && <p style={{ color: 'red', fontWeight: 'bold' }}>{mensaje}</p>}

      {/* Barra de Navegación de Paginación */}
      {enModoPaginacion && resultados.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
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

      {/* Tabla de Resultados */}
      {resultados.length > 0 && (
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
                <td style={{ padding: '10px' }}>
                  <strong>{pelicula.titulo}</strong>
                </td>
                <td style={{ padding: '10px' }}>
                  {pelicula.genero} <br/>
                  <small style={{ color: '#666' }}>({pelicula.genero}) - {pelicula.anio}</small>
                </td>
                <td style={{ padding: '10px' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    backgroundColor: pelicula.disponible ? '#d4edda' : '#f8d7da',
                    color: pelicula.disponible ? '#155724' : '#721c24'
                  }}>
                    {pelicula.disponible ? 'Disponible' : 'No Disponible'}
                  </span>
                </td>
                <td style={{ padding: '10px', fontSize: '13px', textAlign: 'left' }}>
                  Duración: {pelicula.detalles.duracionMinutos} min <br/>
                  Clasificación: {pelicula.detalles.clasificacion} <br/>
                  Idioma: {pelicula.detalles.idiomaOriginal}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}