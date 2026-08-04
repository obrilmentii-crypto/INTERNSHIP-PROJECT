function ProductDetailModal({product,close}){

return(

<div className="modal">


<div className="drawer">


<button onClick={close}>
X
</button>


<h2>
{product.title}
</h2>


<img src={product.image}/>


<p>
{product.description}
</p>


<h3>
Specifications
</h3>


<p>
Category: {product.category}
</p>


<p>
Rating: ⭐ {product.rating.rate}
</p>



</div>

</div>

)


}


export default ProductDetailModal;