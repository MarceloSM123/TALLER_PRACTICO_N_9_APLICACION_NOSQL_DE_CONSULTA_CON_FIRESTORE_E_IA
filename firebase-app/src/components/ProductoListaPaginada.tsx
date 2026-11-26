import {useState} from "react"
import type {
    DocumentData,
    QueryDocumentSnapshot
} from "firebase/firestore"

import {obtenerProductoPaginado, type ProductoConId} from "../services/productoService"

export const ProductoListaPaginada=()=>{
    const[productos, setProductos]=useState<ProductoConId[]>([])
    const[UltimoDocumento,setUltimoDocumento]=useState<QueryDocumentSnapshot<DocumentData>>()

    const CargarPrimeraPagina = async ()=>{
        const resultado = await obtenerProductoPaginado();
        setProductos(resultado.productos);
        setUltimoDocumento(resultado.ultimoDocumento);
    }

   const siguientePagina = async ()=>{
    if(!UltimoDocumento) return;
    const resultado = await obtenerProductoPaginado(UltimoDocumento);
    setProductos(resultado.productos)
    setUltimoDocumento(resultado.ultimoDocumento)
   }

   return(
    <div>
        <h2> Productos paginados</h2>
        <button onClick={CargarPrimeraPagina}> Cargar Productos </button>
        {productos.map((producto) => (
            
            <div key={producto.id}>
                <p>
                    {producto.nombre}
                    ${producto.precio}
                    {producto.stock}
                    {producto.categoria}
                </p>
            </div>
            
                
        )
        
        )}
        <div>
            <div>
                <button onClick={siguientePagina} disabled={!UltimoDocumento}>
                    Siguiente
                </button>
            </div>
            </div>
    </div>
   )
}