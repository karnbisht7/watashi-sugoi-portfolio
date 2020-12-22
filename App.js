import './App.css';
import React, { useState, useEffect } from 'react';
import Login from './components/Login/Login';
import {BrowserRouter , Route , Switch} from 'react-router-dom'
import NavBar from './components/Navbar/NavBar';
import Home from './components/Home';
import About from './components/About';
import Ecommerce from './components/Ecom/Ecommerce';
import Elearning from './components/Elearning';
import Resume from './components/Resume/Resume';
import Cart from './components/cart/Cart';





const Routing = ()=> {

  const [ products , setProducts ] = useState([])
  const [ cartItems , setCartItems ] = useState([])

  const itemsPrice = cartItems.reduce( ( a , c ) => a + c.store.cost * c.qty , 0 )

  const addToCart = (product) => {
    const doesExist = cartItems.find( x => x.itemId === product.itemId)

    if(doesExist) {
      setCartItems ( cartItems.map( x => x.itemId===product.itemId ? {...doesExist , qty:doesExist.qty + 1 }
         :
         x
         ) )
    } else {
      setCartItems([...cartItems , {...product , qty : 1}])
    }
  }

  const removeFromCart = (product) => {
    const doesExist = cartItems.find( x => x.itemId === product.itemId)

    if(doesExist.qty===1) {
      setCartItems ( cartItems.filter( x => x.itemId!==product.itemId ) )
    } else {
      setCartItems(
        cartItems.map(x => x.itemId === product.itemId ? {...doesExist , qty:  doesExist.qty -1} : x )
      )
  }
}
 
  const fetchProducts = () => {
    fetch('https://fortnite-api.theapinetwork.com/store/get')
    .then((res)=> res.json())
    .then((data) => {
      setProducts(data.data)
      console.log(products)
    })
  }

  const PostCartdata = (product) => {
    console.log(product)
    fetch( '/ecommerce' , {
      method:"POST" ,
      headers: {
        "Content-Type" : "application/json"
      } ,
      body: JSON.stringify({
        name : product.item.name ,
        cost : product.store.cost ,
        itemId : product.itemId ,
        image : product.item.images.icon
      })      
    } )
    .then(res=> {
      // res.json()
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  }


  return(
    <Switch>
      <Route path="/login" >
          <Login />
      </Route>
      <Route path="/" exact >
          <Home />
      </Route>
      <Route path="/About" >
          <About />
      </Route>
      <Route path="/ecommerce" >
          <Ecommerce products={products}
                     fetchProducts={fetchProducts} 
                     addToCart={addToCart} 
                     PostCartdata={PostCartdata} />
      </Route>
      <Route path="/Elearning" >
          <Elearning />
      </Route>
      <Route path="/Resume" >
          <Resume />
      </Route>
      <Route path="/Cart" >
          <Cart cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart} itemsPrice={itemsPrice} />
      </Route>
    </Switch>
  )
}


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
      
    </div>
  );
}

export default App;
