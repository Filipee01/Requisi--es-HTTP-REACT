import './App.css'

import { useFetch } from './hooks/useFetch'

import { useState, useEffect } from 'react'

function App() {
  const [products, setProducts] = useState([])
  const url = "http://localhost:3000/products"

  // custom hook
  const {data : items} = useFetch(url)


  const [name, setName] = useState("")
  const [price, setPrice] = useState("")

    //resgatando dados

  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await fetch(url);
  //     const data = await res.json();

  //     setProducts(data)
  //   }

  //   fetchData()

  // },[])

  // add de produtos

  const handleSubmit = async(e) => {
    e.preventDefault()

    const product = {
      name,
      price,
    }
   const res = await fetch(url,  {
    method: "POST",
    headers: {
      "Content-Type": "aplication/json"
    },
    body: JSON.stringify(product),
   })

   //carregament dinâmico
   const addedProcut = await res.json()

   setProducts((prevProducts) => [...prevProducts, addedProcut])

   //lipando os inputs
   setName("")
   setPrice("")
   
  }


  return (
    <div className='App'>
    <h1>Lista de Produtos</h1>
    <ul>
      {items && items.map((product) => (
        <li key = {product.id}>
           {products.name} - R$: {product.price}
        </li>
      ))}
    </ul>
    <div className="add-product">
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" value={name} name ="name" onChange={(e)=> setName(e.target.value)}/>
        </label>
        <label>
          Preço:
          <input type="text" value={price} name ="price" onChange={(e)=> setPrice(e.target.value)}/>
        </label>
        <input type="submit" value="criar" />
      </form>
    </div>
    </div>
  )
}

export default App
