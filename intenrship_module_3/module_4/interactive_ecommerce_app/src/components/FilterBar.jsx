function FilterBar({
search,
setSearch,
category,
setCategory,
sort,
setSort
}){


return(

<div className="filter">


<input

placeholder="Search products..."

value={search}

onChange={
e=>setSearch(e.target.value)
}

/>



<select

value={category}

onChange={
e=>setCategory(e.target.value)
}

>

<option value="all">
All Categories
</option>

<option value="electronics">
Electronics
</option>

<option value="jewelery">
Jewelery
</option>

<option value="men's clothing">
Men clothing
</option>

<option value="women's clothing">
Women clothing
</option>


</select>



<select

value={sort}

onChange={
e=>setSort(e.target.value)
}

>

<option value="">
Sort Price
</option>

<option value="low">
Low to High
</option>

<option value="high">
High to Low
</option>


</select>


</div>

)

}

export default FilterBar;