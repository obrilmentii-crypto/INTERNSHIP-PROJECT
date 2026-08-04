function CartModal({
cart,
close,
increase,
decrease,
remove
}){


const subtotal =
cart.reduce(
(sum,item)=>
sum + item.price*item.quantity,
0
);



return(

<div className="modal">


<div className="drawer">


<button onClick={close}>
X
</button>


<h2>
Shopping Cart
</h2>


{
cart.map(item=>

<div key={item.id}>


<h4>
{item.title}
</h4>


<p>
Quantity: {item.quantity}
</p>


<button onClick={()=>increase(item.id)}>
+
</button>


<button onClick={()=>decrease(item.id)}>
-
</button>


<button onClick={()=>remove(item.id)}>
Remove
</button>


</div>


)

}


<h3>
Subtotal: ${subtotal.toFixed(2)}
</h3>


<button>
Checkout
</button>


</div>


</div>

)

}


export default CartModal;