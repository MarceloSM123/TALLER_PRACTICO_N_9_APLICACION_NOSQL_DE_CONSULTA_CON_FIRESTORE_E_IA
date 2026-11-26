import {db} from "../fireBase";
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  getDoc,
  setDoc 
} from 'firebase/firestore'


export interface Matricula {
  estudianteId: string
  estudianteNombre: string
  cursoId: string
  cursoNombre: string
  estado: string // Ej: 'Activa', 'Inactiva', 'Retirado'
  periodo: string // Ej: '2024-1', '2024-2'
}

export interface MatriculaConId extends Matricula {
  id: string
}

export const crearDatosMatriculas = async () => {
    await setDoc(doc(db, "estudiantes", "EST001"), {
        nombre: "Juan Pérez",
        email: "juan.perez@example.com",
        estado: "activo"
    });
    await setDoc(doc(db, "cursos", "CUR001"), {
        nombre: "Desarrollo Web",
        Codigo: "DW-001",
        estado: "activo"
    });

    await setDoc(doc(db, "matriculas", "MAT001"), {
        estudianteId: "EST001",
        estudianteNombre: "Juan Pérez",
        cursoId: "CUR001",
        cursoNombre: "Desarrollo Web",
        estado: "activo",
        periodo: "2026-2"

    });      
}

// ---------------------------------------------------------
// 1. Cursos de un estudiante
// ---------------------------------------------------------
export const obtenerCursosDeEstudiante = async (estudianteId: string): Promise<MatriculaConId[]> => {
  const q = query(
    collection(db, 'matriculas'),
    where('estudianteId', '==', estudianteId)
    // Nota: Si quisieras ordenar, por ejemplo por periodo, puedes añadir: orderBy('periodo', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  })) as MatriculaConId[];
};

// ---------------------------------------------------------
// 2. Estudiantes de un curso
// ---------------------------------------------------------
export const obtenerEstudiantesDeCurso = async (cursoId: string): Promise<MatriculaConId[]> => {
  const q = query(
    collection(db, 'matriculas'),
    where('cursoId', '==', cursoId)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  })) as MatriculaConId[];
};

// ---------------------------------------------------------
// 3. Matrículas activas (Ej: estado === 'Activa')
// ---------------------------------------------------------
export const obtenerMatriculasActivas = async (): Promise<MatriculaConId[]> => {
  const q = query(
    collection(db, 'matriculas'),
    where('estado', '==', 'activo')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  })) as MatriculaConId[];
};

// ---------------------------------------------------------
// 4. Matrícula por ID
// ---------------------------------------------------------
export const obtenerMatriculaPorId = async (id: string): Promise<MatriculaConId | null> => {
  const docRef = doc(db, 'matriculas', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as MatriculaConId;
  } else {
    return null;
  }
};