import { useEffect, useState, type SyntheticEvent } from 'react'
import {actualizarProducto, crearProducto, type ProductoConId } from '../services/productoService'

interface ProductoFormProps {
  productoEditar: ProductoConId | null;
  onEditarChange: (producto: ProductoConId | null) => void;
}

export default function ProductoForm({ productoEditar,onEditarChange }: ProductoFormProps) {
  const [nombre, setNombre] = useState(productoEditar?.nombre ??"")
  const [precio, setPrecio] = useState(productoEditar?.precio?.toString() ?? "")
  const [stock, setStock] = useState(productoEditar?.stock?.toString() ?? "")
  const [categoria, setCategoria] = useState(productoEditar?.categoria ?? "")
  const [guardando, setGuardando] = useState(false)

  useEffect(() => {
    setNombre(productoEditar?.nombre ?? "")
    setPrecio(productoEditar?.precio?.toString() ?? "")
    setStock(productoEditar?.stock?.toString() ?? "")
    setCategoria(productoEditar?.categoria ?? "")
  }, [productoEditar])

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setGuardando(true)

        if(productoEditar) {
            await actualizarProducto(productoEditar.id, 
                nombre.trim(), 
                Number(precio), 
                Number(stock),
                categoria.trim()
              )
            console.log('Documento actualizado con ID: ', productoEditar.id)
            onEditarChange(null)
        }else{
    try {
      const id = await crearProducto(
        nombre.trim(),
        Number(precio),
        Number(stock),
        categoria.trim()
      )
      console.log('Documento escrito con ID: ', id)
      // limpiar formulario
      setNombre('')
      setPrecio('')
      setStock('')
      setCategoria('')
    } catch (error) {
      console.error('Error añadiendo documento: ', error)
      
    } finally {
      setGuardando(false)
    }}
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre del producto"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="number"
        step="any"
        placeholder="Precio del producto"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        required
      />
      <input
        type="number"
        step="any"
        placeholder="Stock del producto"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Categoría del producto"
        value={categoria}
        onChange={(e) => setCategoria (e.target.value)}
        required
      />
      <button type="submit" disabled={guardando}>
        {guardando
          ? 'Guardando...'
          : productoEditar
            ? 'Actualizar'
            : 'Guardar'}
      </button>
    </form>
  )
}