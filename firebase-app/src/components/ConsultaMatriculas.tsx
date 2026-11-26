import { useState } from 'react'
import {
  obtenerCursosDeEstudiante,
  obtenerEstudiantesDeCurso,
  obtenerMatriculasActivas,
  obtenerMatriculaPorId,
  type MatriculaConId
} from '../services/matriculaService'

export const ConsultaMatriculas = () => {
  const [resultados, setResultados] = useState<MatriculaConId[]>([])
  const [cargando, setCargando] = useState(false)
  
  // Estados para los inputs de prueba
  const [estudianteId, setEstudianteId] = useState('')
  const [cursoId, setCursoId] = useState('')
  const [matriculaId, setMatriculaId] = useState('')
  const [mensaje, setMensaje] = useState('')

  // Función helper para manejar el estado de carga y errores
  const ejecutarConsulta = async (consulta: () => Promise<MatriculaConId[] | MatriculaConId | null>, titulo: string) => {
    setCargando(true)
    setMensaje('')
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

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      <h2>Prueba de Patrones de Acceso - Matrículas</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px', backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px' }}>
        
        {/* Consulta 1 */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="ID del Estudiante" 
            value={estudianteId} 
            onChange={(e) => setEstudianteId(e.target.value)}
            style={{ padding: '8px', flex: 1 }}
          />
          <button 
            onClick={() => ejecutarConsulta(() => obtenerCursosDeEstudiante(estudianteId), 'Cursos del estudiante')}
            disabled={cargando || !estudianteId}
            style={{ padding: '8px 16px', cursor: 'pointer' }}
          >
            1. Cursos de un Estudiante
          </button>
        </div>

        {/* Consulta 2 */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="ID del Curso" 
            value={cursoId} 
            onChange={(e) => setCursoId(e.target.value)}
            style={{ padding: '8px', flex: 1 }}
          />
          <button 
            onClick={() => ejecutarConsulta(() => obtenerEstudiantesDeCurso(cursoId), 'Estudiantes del curso')}
            disabled={cargando || !cursoId}
            style={{ padding: '8px 16px', cursor: 'pointer' }}
          >
            2. Estudiantes de un Curso
          </button>
        </div>

        {/* Consulta 3 */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span style={{ flex: 1 }}>Obtiene todas las matrículas con estado "Activa"</span>
          <button 
            onClick={() => ejecutarConsulta(() => obtenerMatriculasActivas(), 'Matrículas activas')}
            disabled={cargando}
            style={{ padding: '8px 16px', cursor: 'pointer' }}
          >
            3. Matrículas Activas
          </button>
        </div>

        {/* Consulta 4 */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="ID de la Matrícula (Documento)" 
            value={matriculaId} 
            onChange={(e) => setMatriculaId(e.target.value)}
            style={{ padding: '8px', flex: 1 }}
          />
          <button 
            onClick={() => ejecutarConsulta(() => obtenerMatriculaPorId(matriculaId), 'Matrícula por ID')}
            disabled={cargando || !matriculaId}
            style={{ padding: '8px 16px', cursor: 'pointer' }}
          >
            4. Matrícula por ID
          </button>
        </div>
      </div>

      {cargando && <p style={{ color: 'blue' }}>Cargando resultados...</p>}
      {mensaje && <p style={{ color: 'red', fontWeight: 'bold' }}>{mensaje}</p>}

      {/* Tabla de Resultados */}
      {resultados.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#0056b3', color: 'white' }}>
              <th style={{ border: '1px solid #ddd', padding: '10px' }}>ID Matrícula</th>
              <th style={{ border: '1px solid #ddd', padding: '10px' }}>Estudiante</th>
              <th style={{ border: '1px solid #ddd', padding: '10px' }}>Curso</th>
              <th style={{ border: '1px solid #ddd', padding: '10px' }}>Estado</th>
              <th style={{ border: '1px solid #ddd', padding: '10px' }}>Periodo</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((matricula) => (
              <tr key={matricula.id} style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px' }}>{matricula.id}</td>
                <td style={{ padding: '10px' }}>
                  {matricula.estudianteNombre} <br/>
                  <small style={{ color: '#666' }}>({matricula.estudianteId})</small>
                </td>
                <td style={{ padding: '10px' }}>
                  {matricula.cursoNombre} <br/>
                  <small style={{ color: '#666' }}>({matricula.cursoId})</small>
                </td>
                <td style={{ padding: '10px' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    backgroundColor: matricula.estado === 'Activa' ? '#d4edda' : '#f8d7da',
                    color: matricula.estado === 'Activa' ? '#155724' : '#721c24'
                  }}>
                    {matricula.estado}
                  </span>
                </td>
                <td style={{ padding: '10px' }}>{matricula.periodo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}