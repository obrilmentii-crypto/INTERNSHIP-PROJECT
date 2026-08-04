import ProductCard from "./ProductCard";

function ProductGrid({
products,
loading,
error,
retry,
addToCart,
openDetail
}){


if(loading)

return <h2>Loading products...</h2>



if(error)

return(

<div className="error">

<h3>{error}</h3>

<button onClick={retry}>
Retry
</button>

</div>

)



if(products.length===0)

return <h2>No products found</h2>



return(

<div className="grid">

{
products.map(product=>

<ProductCard

key={product.id}

product={product}

addToCart={addToCart}

openDetail={openDetail}

/>

)

}

</div>

)


}


export default ProductGrid;