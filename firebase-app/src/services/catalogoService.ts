import { db } from "../fireBase";
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  getDoc,
  orderBy,
  limit,
  startAfter,
  
} from 'firebase/firestore'
import type { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'

export interface Pelicula {
  titulo: string
  genero: string
  disponible: boolean
  anio: number
  detalles: {
    duracionMinutos: number
    clasificacion: string
    idiomaOriginal: string
  }
}

export interface PeliculaConId extends Pelicula {
  id: string
}

// ---------------------------------------------------------
// 1. Películas de un género
// ---------------------------------------------------------
export const obtenerPeliculasDeGenero = async (genero: string): Promise<PeliculaConId[]> => {
  const q = query(
    collection(db, 'peliculas'),
    where('genero', '==', genero)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  })) as PeliculaConId[];
};

// ---------------------------------------------------------
// 2. Películas disponibles
// ---------------------------------------------------------
export const obtenerPeliculasDisponibles = async (): Promise<PeliculaConId[]> => {
  const q = query(
    collection(db, 'peliculas'),
    where('disponible', '==', true)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  })) as PeliculaConId[];
};

// ---------------------------------------------------------
// 3. Películas por ID
// ---------------------------------------------------------
export const obtenerPeliculaPorId = async (id: string): Promise<PeliculaConId | null> => {
  const docRef = doc(db, 'peliculas', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as PeliculaConId;
  } else {
    return null;
  }
};

// ---------------------------------------------------------
// 4. Películas de un año específico
// ---------------------------------------------------------
export const obtenerPeliculasDeAnio = async (anio: string): Promise<PeliculaConId[]> => {
  const q = query(
    collection(db, 'peliculas'),
    where('anio', '==', Number(anio))
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  })) as PeliculaConId[];
};

export const obtenerPeliculasPaginadas = async (
  ultimoDocumento?: QueryDocumentSnapshot<DocumentData>,
  filtroGenero?: string
) => {
  let q;

  // Construimos la consulta dependiendo de si hay filtro y si hay cursor
  if (filtroGenero && ultimoDocumento) {
    q = query(
      collection(db, 'peliculas'),
      where('generoId', '==', filtroGenero),
      orderBy('titulo', 'asc'),
      startAfter(ultimoDocumento),
      limit(10)
    );
  } else if (filtroGenero && !ultimoDocumento) {
    q = query(
      collection(db, 'peliculas'),
      where('generoId', '==', filtroGenero),
      orderBy('titulo', 'asc'),
      limit(10)
    );
  } else if (!filtroGenero && ultimoDocumento) {
    q = query(
      collection(db, 'peliculas'),
      orderBy('titulo', 'asc'),
      startAfter(ultimoDocumento),
      limit(10)
    );
  } else {
    q = query(
      collection(db, 'peliculas'),
      orderBy('titulo', 'asc'),
      limit(10)
    );
  }

  const snapshot = await getDocs(q);
  const peliculas = snapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  })) as PeliculaConId[];

  const nuevoUltimoDoc = snapshot.docs.length > 0 
    ? snapshot.docs[snapshot.docs.length - 1] 
    : undefined;

  return {
    peliculas,
    ultimoDocumento: nuevoUltimoDoc,
  };
};