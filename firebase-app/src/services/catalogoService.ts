import { db } from "../fireBase";
import { 
  collection, query, where, getDocs, doc, getDoc,
  orderBy, limit, startAfter, type QueryDocumentSnapshot, type DocumentData
} from 'firebase/firestore'

export interface Pelicula {
  titulo: string
  generoNombre: string
  generoId: string
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
// 1. Películas de un género (Con paginación)
// ---------------------------------------------------------
export const obtenerPeliculasDeGenero = async (generoId: string, ultimoDocumento?: QueryDocumentSnapshot<DocumentData>) => {
  let q;
  if (ultimoDocumento) {
    q = query(collection(db, 'peliculas'), where('generoId', '==', generoId), orderBy('titulo', 'asc'), startAfter(ultimoDocumento), limit(10));
  } else {
    q = query(collection(db, 'peliculas'), where('generoId', '==', generoId), orderBy('titulo', 'asc'), limit(10));
  }
  const snapshot = await getDocs(q);
  return {
    resultados: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as PeliculaConId[],
    ultimoDocumento: snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : undefined
  };
};

// ---------------------------------------------------------
// 2. Películas de un año (Con paginación)
// ---------------------------------------------------------
export const obtenerPeliculasDeAnio = async (anio: number, ultimoDocumento?: QueryDocumentSnapshot<DocumentData>) => {
  let q;
  if (ultimoDocumento) {
    q = query(collection(db, 'peliculas'), where('anio', '==', anio), orderBy('titulo', 'asc'), startAfter(ultimoDocumento), limit(10));
  } else {
    q = query(collection(db, 'peliculas'), where('anio', '==', anio), orderBy('titulo', 'asc'), limit(10));
  }
  const snapshot = await getDocs(q);
  return {
    resultados: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as PeliculaConId[],
    ultimoDocumento: snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : undefined
  };
};

// ---------------------------------------------------------
// 3. Películas disponibles (Con paginación)
// ---------------------------------------------------------
export const obtenerPeliculasDisponibles = async (ultimoDocumento?: QueryDocumentSnapshot<DocumentData>) => {
  let q;
  if (ultimoDocumento) {
    q = query(collection(db, 'peliculas'), where('disponible', '==', true), orderBy('titulo', 'asc'), startAfter(ultimoDocumento), limit(10));
  } else {
    q = query(collection(db, 'peliculas'), where('disponible', '==', true), orderBy('titulo', 'asc'), limit(10));
  }
  const snapshot = await getDocs(q);
  return {
    resultados: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as PeliculaConId[],
    ultimoDocumento: snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : undefined
  };
};

// ---------------------------------------------------------
// 4. Película por ID (No requiere paginación)
// ---------------------------------------------------------
export const obtenerPeliculaPorId = async (id: string): Promise<PeliculaConId | null> => {
  const docRef = doc(db, 'peliculas', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return { id: docSnap.id, ...docSnap.data() } as PeliculaConId;
  return null;
};

// ---------------------------------------------------------
// Script de carga
// ---------------------------------------------------------
export const crearDatosPeliculas = async () => {
    // ... (Tu código de inserción de los 40 documentos)
    console.log("Películas y géneros de prueba insertados.");
}