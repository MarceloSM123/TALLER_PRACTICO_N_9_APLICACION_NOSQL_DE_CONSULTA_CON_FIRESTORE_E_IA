import { db } from '../fireBase'
import { setDoc, doc } from 'firebase/firestore'

export const crearDatosPeliculas = async () => {
    // 1. Colección de géneros
    await setDoc(doc(db, "generos", "GEN001"), { nombre: "Ciencia Ficción", popularidad: "alta" });
    await setDoc(doc(db, "generos", "GEN002"), { nombre: "Drama", popularidad: "alta" });
    await setDoc(doc(db, "generos", "GEN003"), { nombre: "Acción", popularidad: "alta" });
    await setDoc(doc(db, "generos", "GEN004"), { nombre: "Animación", popularidad: "media" });
    await setDoc(doc(db, "generos", "GEN005"), { nombre: "Comedia", popularidad: "alta" });
    await setDoc(doc(db, "generos", "GEN006"), { nombre: "Suspenso", popularidad: "media" });
    await setDoc(doc(db, "generos", "GEN007"), { nombre: "Crimen", popularidad: "media" });
    await setDoc(doc(db, "generos", "GEN008"), { nombre: "Fantasía", popularidad: "alta" });

    // 2. Colección de películas
    await setDoc(doc(db, "peliculas", "PEL001"), {
        titulo: "Inception", generoId: "GEN001", generoNombre: "Ciencia Ficción", disponible: true, anio: 2010,
        detalles: { duracionMinutos: 148, clasificacion: "PG-13", idiomaOriginal: "Inglés" }
    });
    await setDoc(doc(db, "peliculas", "PEL002"), {
        titulo: "Parasite", generoId: "GEN002", generoNombre: "Drama", disponible: false, anio: 2019,
        detalles: { duracionMinutos: 132, clasificacion: "R", idiomaOriginal: "Coreano" }
    });
    await setDoc(doc(db, "peliculas", "PEL003"), {
        titulo: "The Dark Knight", generoId: "GEN003", generoNombre: "Acción", disponible: true, anio: 2008,
        detalles: { duracionMinutos: 152, clasificacion: "PG-13", idiomaOriginal: "Inglés" }
    });
    await setDoc(doc(db, "peliculas", "PEL004"), {
        titulo: "Interstellar", generoId: "GEN001", generoNombre: "Ciencia Ficción", disponible: true, anio: 2014,
        detalles: { duracionMinutos: 169, clasificacion: "PG-13", idiomaOriginal: "Inglés" }
    });
    await setDoc(doc(db, "peliculas", "PEL005"), {
        titulo: "Spirited Away", generoId: "GEN004", generoNombre: "Animación", disponible: true, anio: 2001,
        detalles: { duracionMinutos: 125, clasificacion: "PG", idiomaOriginal: "Japonés" }
    });
    await setDoc(doc(db, "peliculas", "PEL006"), {
        titulo: "Pulp Fiction", generoId: "GEN002", generoNombre: "Drama", disponible: false, anio: 1994,
        detalles: { duracionMinutos: 154, clasificacion: "R", idiomaOriginal: "Inglés" }
    });
    await setDoc(doc(db, "peliculas", "PEL007"), {
        titulo: "The Matrix", generoId: "GEN001", generoNombre: "Ciencia Ficción", disponible: true, anio: 1999,
        detalles: { duracionMinutos: 136, clasificacion: "R", idiomaOriginal: "Inglés" }
    });
    await setDoc(doc(db, "peliculas", "PEL008"), {
        titulo: "Coco", generoId: "GEN004", generoNombre: "Animación", disponible: true, anio: 2017,
        detalles: { duracionMinutos: 105, clasificacion: "PG", idiomaOriginal: "Español" }
    });
    await setDoc(doc(db, "peliculas", "PEL009"), {
        titulo: "Gladiator", generoId: "GEN003", generoNombre: "Acción", disponible: true, anio: 2000,
        detalles: { duracionMinutos: 155, clasificacion: "R", idiomaOriginal: "Inglés" }
    });
    await setDoc(doc(db, "peliculas", "PEL010"), {
        titulo: "The Grand Budapest Hotel", generoId: "GEN005", generoNombre: "Comedia", disponible: true, anio: 2014,
        detalles: { duracionMinutos: 99, clasificacion: "R", idiomaOriginal: "Inglés" }
    });
    await setDoc(doc(db, "peliculas", "PEL011"), {
        titulo: "Se7en", generoId: "GEN006", generoNombre: "Suspenso", disponible: false, anio: 1995,
        detalles: { duracionMinutos: 127, clasificacion: "R", idiomaOriginal: "Inglés" }
    });
    await setDoc(doc(db, "peliculas", "PEL012"), {
        titulo: "Dune", generoId: "GEN001", generoNombre: "Ciencia Ficción", disponible: true, anio: 2021,
        detalles: { duracionMinutos: 155, clasificacion: "PG-13", idiomaOriginal: "Inglés" }
    });
    await setDoc(doc(db, "peliculas", "PEL013"), {
        titulo: "Whiplash", generoId: "GEN002", generoNombre: "Drama", disponible: true, anio: 2014,
        detalles: { duracionMinutos: 106, clasificacion: "R", idiomaOriginal: "Inglés" }
    });
    await setDoc(doc(db, "peliculas", "PEL014"), {
        titulo: "Spider-Man: Into the Spider-Verse", generoId: "GEN004", generoNombre: "Animación", disponible: true, anio: 2018,
        detalles: { duracionMinutos: 117, clasificacion: "PG", idiomaOriginal: "Inglés" }
    });
    await setDoc(doc(db, "peliculas", "PEL015"), {
        titulo: "Mad Max: Fury Road", generoId: "GEN003", generoNombre: "Acción", disponible: false, anio: 2015,
        detalles: { duracionMinutos: 120, clasificacion: "R", idiomaOriginal: "Inglés" }
    });
    await setDoc(doc(db, "peliculas", "PEL016"), {
        titulo: "Superbad", generoId: "GEN005", generoNombre: "Comedia", disponible: true, anio: 2007,
        detalles: { duracionMinutos: 113, clasificacion: "R", idiomaOriginal: "Inglés" }
    });
    await setDoc(doc(db, "peliculas", "PEL017"), {
        titulo: "Shutter Island", generoId: "GEN006", generoNombre: "Suspenso", disponible: true, anio: 2010,
        detalles: { duracionMinutos: 138, clasificacion: "R", idiomaOriginal: "Inglés" }
    });
    await setDoc(doc(db, "peliculas", "PEL018"), {
        titulo: "Oppenheimer", generoId: "GEN002", generoNombre: "Drama", disponible: false, anio: 2023,
        detalles: { duracionMinutos: 180, clasificacion: "R", idiomaOriginal: "Inglés" }
    });
    await setDoc(doc(db, "peliculas", "PEL019"), {
        titulo: "Blade Runner 2049", generoId: "GEN001", generoNombre: "Ciencia Ficción", disponible: true, anio: 2017,
        detalles: { duracionMinutos: 164, clasificacion: "R", idiomaOriginal: "Inglés" }
    });
    await setDoc(doc(db, "peliculas", "PEL020"), {
        titulo: "John Wick", generoId: "GEN003", generoNombre: "Acción", disponible: true, anio: 2014,
        detalles: { duracionMinutos: 101, clasificacion: "R", idiomaOriginal: "Inglés" }
    });
    await setDoc(doc(db, "peliculas", "PEL021"), {
        titulo: "Toy Story", generoId: "GEN004", generoNombre: "Animación", disponible: true, anio: 1995,
        detalles: { duracionMinutos: 81, clasificacion: "G", idiomaOriginal: "Inglés" }
    });
    await setDoc(doc(db, "peliculas", "PEL022"), {
        titulo: "Deadpool", generoId: "GEN005", generoNombre: "Comedia", disponible: false, anio: 2016,
        detalles: { duracionMinutos: 108, clasificacion: "R", idiomaOriginal: "Inglés" }
    });
    await setDoc(doc(db, "peliculas", "PEL023"), {
        titulo: "Gone Girl", generoId: "GEN006", generoNombre: "Suspenso", disponible: true, anio: 2014,
        detalles: { duracionMinutos: 149, clasificacion: "R", idiomaOriginal: "Inglés" }
    });
    await setDoc(doc(db, "peliculas", "PEL024"), {
        titulo: "El Viaje de Chihiro", generoId: "GEN004", generoNombre: "Animación", disponible: true, anio: 2001,
        detalles: { duracionMinutos: 125, clasificacion: "PG", idiomaOriginal: "Japonés" }
    });
    await setDoc(doc(db, "peliculas", "PEL025"), {
        titulo: "El Señor de los Anillos: La Comunidad del Anillo", generoId: "GEN008", generoNombre: "Fantasía", disponible: true, anio: 2001,
        detalles: { duracionMinutos: 178, clasificacion: "PG-13", idiomaOriginal: "Inglés" }
    });
    await setDoc(doc(db, "peliculas", "PEL026"), {
        titulo: "El Padrino", generoId: "GEN007", generoNombre: "Crimen", disponible: true, anio: 1972,
        detalles: { duracionMinutos: 175, clasificacion: "R", idiomaOriginal: "Inglés" }
    });
    await setDoc(doc(db, "peliculas", "PEL027"), {
        titulo: "Forrest Gump", generoId: "GEN002", generoNombre: "Drama", disponible: true, anio: 1994,
        detalles: { duracionMinutos: 142, clasificacion: "PG-13", idiomaOriginal: "Inglés" }
    });
    await setDoc(doc(db, "peliculas", "PEL028"), {
        titulo: "El Rey León", generoId: "GEN004", generoNombre: "Animación", disponible: true, anio: 1994,
        detalles: { duracionMinutos: 88, clasificacion: "G", idiomaOriginal: "Inglés" }
    });
    await setDoc(doc(db, "peliculas", "PEL029"), {
        titulo: "Jurassic Park", generoId: "GEN003", generoNombre: "Acción", disponible: true, anio: 1993,
        detalles: { duracionMinutos: 127, clasificacion: "PG-13", idiomaOriginal: "Inglés" }
    });
    await setDoc(doc(db, "peliculas", "PEL030"), {
        titulo: "Volver al Futuro", generoId: "GEN001", generoNombre: "Ciencia Ficción", disponible: true, anio: 1985,
        detalles: { duracionMinutos: 116, clasificacion: "PG", idiomaOriginal: "Inglés" }
    });
    await setDoc(doc(db, "peliculas", "PEL031"), {
        titulo: "Alien", generoId: "GEN006", generoNombre: "Suspenso", disponible: true, anio: 1979,
        detalles: { duracionMinutos: 117, clasificacion: "R", idiomaOriginal: "Inglés" }
    });
    await setDoc(doc(db, "peliculas", "PEL032"), {
        titulo: "Die Hard", generoId: "GEN003", generoNombre: "Acción", disponible: false, anio: 1988,
        detalles: { duracionMinutos: 132, clasificacion: "R", idiomaOriginal: "Inglés" }
    });
    await setDoc(doc(db, "peliculas", "PEL033"), {
        titulo: "El Resplandor", generoId: "GEN006", generoNombre: "Suspenso", disponible: true, anio: 1980,
        detalles: { duracionMinutos: 146, clasificacion: "R", idiomaOriginal: "Inglés" }
    });
    await setDoc(doc(db, "peliculas", "PEL034"), {
        titulo: "Amélie", generoId: "GEN005", generoNombre: "Comedia", disponible: true, anio: 2001,
        detalles: { duracionMinutos: 122, clasificacion: "R", idiomaOriginal: "Francés" }
    });
    await setDoc(doc(db, "peliculas", "PEL035"), {
        titulo: "Ciudad de Dios", generoId: "GEN007", generoNombre: "Crimen", disponible: true, anio: 2002,
        detalles: { duracionMinutos: 130, clasificacion: "R", idiomaOriginal: "Portugués" }
    });
    await setDoc(doc(db, "peliculas", "PEL036"), {
        titulo: "El Show de Truman", generoId: "GEN002", generoNombre: "Drama", disponible: true, anio: 1998,
        detalles: { duracionMinutos: 103, clasificacion: "PG", idiomaOriginal: "Inglés" }
    });
    await setDoc(doc(db, "peliculas", "PEL037"), {
        titulo: "La Llegada", generoId: "GEN001", generoNombre: "Ciencia Ficción", disponible: true, anio: 2016,
        detalles: { duracionMinutos: 116, clasificacion: "PG-13", idiomaOriginal: "Inglés" }
    });
    await setDoc(doc(db, "peliculas", "PEL038"), {
        titulo: "El Laberinto del Fauno", generoId: "GEN008", generoNombre: "Fantasía", disponible: false, anio: 2006,
        detalles: { duracionMinutos: 118, clasificacion: "R", idiomaOriginal: "Español" }
    });
    await setDoc(doc(db, "peliculas", "PEL039"), {
        titulo: "Rocky", generoId: "GEN002", generoNombre: "Drama", disponible: true, anio: 1976,
        detalles: { duracionMinutos: 120, clasificacion: "PG", idiomaOriginal: "Inglés" }
    });
    await setDoc(doc(db, "peliculas", "PEL040"), {
        titulo: "Ratatouille", generoId: "GEN004", generoNombre: "Animación", disponible: true, anio: 2007,
        detalles: { duracionMinutos: 111, clasificacion: "G", idiomaOriginal: "Inglés" }
    });

   
}