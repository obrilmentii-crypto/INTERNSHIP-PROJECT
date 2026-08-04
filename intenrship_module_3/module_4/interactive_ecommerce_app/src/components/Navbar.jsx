function Navbar({cartCount,openCart}){

return(

<nav className="navbar">

<h2>ShopZone</h2>


<div>

<button>
Products
</button>


<button onClick={openCart}>
Cart  ({cartCount})
</button>


</div>

</nav>

)

}


export default Navbar;