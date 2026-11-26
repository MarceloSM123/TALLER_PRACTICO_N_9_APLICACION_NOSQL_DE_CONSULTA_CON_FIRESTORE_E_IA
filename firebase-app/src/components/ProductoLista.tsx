import {useEffect, useState} from "react";
import {suscribirProductos, eliminarProducto, type ProductoConId} from "../services/productoService";

interface ProductoListaProps {
    onEditar: (producto: ProductoConId) => void;
}

export const ProductoLista = ({ onEditar }: ProductoListaProps) => {
    const [productos, setProductos] = useState<ProductoConId[]>([]);

    useEffect(() => {
        const unsubscribe = suscribirProductos(
            (datos) => setProductos(datos),
            (error) => console.error("Error al obtener productos: ", error)
        );

        // cleanup: cierra el listener al desmontar el componente
        return () => unsubscribe();
    }, []);

const hansleEliminarProducto = async (id: string) => {
    try {
        await eliminarProducto(id);
        console.log(`Producto con ID ${id} eliminado correctamente.`);
        // Ya NO se filtra manualmente: onSnapshot actualiza la lista solo
    } catch (error) {
        console.error("Error al eliminar producto: ", error);
    }
};

    return(
        <div>
            <h2>Lista de productos</h2>
            {
                productos.map((producto) => (
                    <div key={producto.id}>
                        <h3>Producto ID: {producto.id}</h3>
                        <p>Nombre: {producto.nombre}</p>
                        <p>Precio: ${producto.precio.toFixed(2)}</p>
                        <p>Stock: {producto.stock}</p>
                        <p>Categoría: {producto.categoria}</p>
                        <button onClick={() => onEditar(producto)}>Editar</button>
                        <button onClick={() => hansleEliminarProducto(producto.id)}>Eliminar</button>
                    </div>
                ))
            }
        </div>
    )
}