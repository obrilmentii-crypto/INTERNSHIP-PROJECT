import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ProductGrid from "./components/ProductGrid";
import FilterBar from "./components/FilterBar";
import CartModal from "./components/CartModal";
import ProductDetailModal from "./components/ProductDetailModal";
import "./App.css";


function App() {

  const [products,setProducts] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);

  const [search,setSearch] = useState("");
  const [category,setCategory] = useState("all");
  const [sort,setSort] = useState("");

  const [cart,setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const [cartOpen,setCartOpen] = useState(false);

  const [selectedProduct,setSelectedProduct] = useState(null);



  const fetchProducts = async()=>{

    try{

      setLoading(true);

      const response =
      await fetch("https://fakestoreapi.com/products");

      if(!response.ok){
        throw new Error("Failed to load products");
      }

      const data = await response.json();

      setProducts(data);
      setError(null);

    }
    catch(err){

      setError(err.message);

    }
    finally{

      setLoading(false);

    }

  };


  useEffect(()=>{

    fetchProducts();

  },[]);



  useEffect(()=>{

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

  },[cart]);



  const addToCart=(product)=>{

    const existing =
    cart.find(item=>item.id===product.id);


    if(existing){

      setCart(
        cart.map(item=>
          item.id===product.id
          ?
          {...item,quantity:item.quantity+1}
          :
          item
        )
      );

    }
    else{

      setCart([
        ...cart,
        {
          ...product,
          quantity:1
        }
      ]);

    }

  };



  const increase=(id)=>{

    setCart(
      cart.map(item=>
        item.id===id
        ?
        {...item,quantity:item.quantity+1}
        :
        item
      )
    );

  };



  const decrease=(id)=>{

    setCart(

      cart.map(item=>

        item.id===id
        ?
        {...item,quantity:item.quantity-1}
        :
        item

      )
      .filter(item=>item.quantity>0)

    );

  };



  const removeItem=(id)=>{

    setCart(
      cart.filter(item=>item.id!==id)
    );

  };



  let filteredProducts =
  products
  .filter(product=>

    product.title
    .toLowerCase()
    .includes(search.toLowerCase())

    ||
    
    product.description
    .toLowerCase()
    .includes(search.toLowerCase())

  )
  .filter(product=>

    category==="all"
    ?
    true
    :
    product.category===category

  );


  if(sort==="low"){

    filteredProducts.sort(
      (a,b)=>a.price-b.price
    );

  }


  if(sort==="high"){

    filteredProducts.sort(
      (a,b)=>b.price-a.price
    );

  }




return (

<div>


<Navbar

cartCount={
cart.reduce(
(total,item)=>total+item.quantity,
0
)
}

openCart={()=>setCartOpen(true)}

/>



<FilterBar

search={search}
setSearch={setSearch}

category={category}
setCategory={setCategory}

sort={sort}
setSort={setSort}

/>



<ProductGrid

products={filteredProducts}

loading={loading}

error={error}

retry={fetchProducts}

addToCart={addToCart}

openDetail={setSelectedProduct}

/>



{
cartOpen &&

<CartModal

cart={cart}

close={()=>setCartOpen(false)}

increase={increase}

decrease={decrease}

remove={removeItem}

/>

}



{
selectedProduct &&

<ProductDetailModal

product={selectedProduct}

close={()=>setSelectedProduct(null)}

/>

}



</div>

);

}


export default App;