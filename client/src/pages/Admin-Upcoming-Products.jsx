import "../css/AdminUpcomingProducts.css";

export const AdminUpcomingProducts = () => {

    return (
        <>
            <div class="upcoming">
                <h1>Upcoming Product Details</h1>
                <label for>Product Category</label>
                <input type="text" placeholder="Milk" />
                <label for>Product Name</label>
                <input type="text" placeholder="Gold" />
                <label for="productImage">Enter product image:</label>
                <div class="imagess">
                    {/* <!-- add file code --> */}
                    <input type="file" name id />
                    {/* <div style="width: 110px; height: 110px; border: 1px solid black;"> */}
                    {/* <!-- add image view  --> */}
                    {/* </div> */}
                </div>
                <label for>Product Quantity</label>
                <input type="text" placeholder="250ml,500ml,1lt" />
                <label for>Product Shelf Life</label>
                <input type="text" placeholder="2day" />
                <label for>Product MRP</label>
                <input type="text" placeholder="20rs" />
                <label for>Description</label>
                <input type="text" />
                {/* <input type="text" />
                <input type="text" /> */}
                <button className="sub">Submit</button>
            </div>
        </>
    )
}