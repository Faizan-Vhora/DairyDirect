import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminProductsUpdate = () => {
    const navigate = useNavigate();
    const { authorizationToken } = useAuth();

    const [pcategory, setPCategory] = useState("");
    const [pimg, setPImg] = useState("");
    const [pname, setPName] = useState("");
    const [desc, setDesc] = useState("");
    const [pack, setPack] = useState("");
    const [composition, setComposition] = useState("");
    const [shelfLife, setShelfLife] = useState("");
    const [price, setPrice] = useState("");
    const [storageCondition, setStorageCondition] = useState("");


    const [pcategoryError, setPCategoryError] = useState("");
    const [pimgError, setPImgError] = useState("");
    const [pnameError, setPNameError] = useState("");
    const [descError, setDescError] = useState("");
    const [packError, setPackError] = useState("");
    const [compositionError, setCompositionError] = useState("");
    const [shelfLifeError, setShelfLifeError] = useState("");
    const [priceError, setPriceError] = useState("");
    const [storageConditionError, setStorageConditionError] = useState("");

    const [selectedIndex, setSelectedIndex] = useState("")

    const [selectedImagePreview, setSelectedImagePreview] = useState(null);

    const params = useParams();

    // get Single Product data
    const getSingleProductById = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/products/${params.id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            })

            const data = await response.json()

            if (response.ok) {
                setPCategory(data.productCategory)
                setPImg(data.productImg)
                setSelectedImagePreview(`http://localhost:5000/${data.productImg}`)
                setPName(data.productName)
                setDesc(data.description)
                setPack(data.packing)
                setComposition(data.composition)
                setShelfLife(data.shelfLife)
                setPrice(data.price)
                setStorageCondition(data.storageCondition)
            }

        } catch (error) {
            console.log(error);
        }
    }

    const [categoryData, setCategoryData] = useState([]);

    // get category data
    const getAllCategorysData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/categorys", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            })


            const data = await response.json();

            if (response.ok) {
                setCategoryData(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // handle image change
    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setPImg(selectedFile); // Update state with selected file
            setSelectedImagePreview(URL.createObjectURL(selectedFile)); // Set preview image URL
        }
    };

    // handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let submit = true

            if (selectedIndex === "") {
                // Product Category validate
                if (pcategory === "" || pcategory === "0") {
                    setPCategoryError("Please Select Product Category");
                    submit = false
                } else {
                    setPCategoryError("");
                    submit = true
                }

                // Product Name validation
                if (pname === "") {
                    setPNameError("Please Enter Product Name");
                    submit = false
                } else {
                    setPNameError("");
                    submit = true
                }

                // Product Description validation
                if (desc === "") {
                    setDescError("Please Enter Product Description");
                    submit = false
                } else {
                    setDescError("");
                    submit = true
                }

                // Product Packing validation
                if (pack === "") {
                    setPackError("Please Enter Product Packing Details");
                    submit = false
                } else {
                    setPackError("");
                    submit = true
                }

                // Product Composition validation
                if (composition === "") {
                    setCompositionError("Please Enter Product Composition");
                    submit = false
                } else {
                    setCompositionError("")
                    submit = true
                }

                // Product Shelf Life validate
                if (shelfLife === "") {
                    setShelfLifeError("Please Enter Product Shelf Life");
                    submit = false
                } else {
                    setShelfLifeError("");
                    submit = true
                }

                // Product Price
                if (price === "") {
                    setPriceError("Please Enter Product Price");
                    submit = false
                } else {
                    setPriceError("");
                    submit = true;
                }

                // Product Storage Condition validate
                if (storageCondition === "") {
                    setStorageConditionError("Please Enter Product Storage Condition");
                    submit = false
                } else {
                    setStorageConditionError("");
                    submit = true
                }
            }

            if (submit === true) {
                const formData = new FormData();
                formData.append("productCategory", pcategory)
                formData.append("productImg", pimg)
                formData.append("productName", pname)
                formData.append("description", desc)
                formData.append("packing", pack)
                formData.append("composition", composition)
                formData.append("shelfLife", shelfLife)
                formData.append("price", price)
                formData.append("storageCondition", storageCondition)
                
                const response = await axios.patch(
                    `http://localhost:5000/api/admin/products/update/${params.id}`,
                    formData,
                    {
                        headers: {
                            Authorization: authorizationToken,
                            "Content-Type": "multipart/form-data",
                        }
                    }
                )

                const data = await response.data;
                if (response.status == 200) {
                    toast.success(data.message)
                    navigate("/admin/products")
                } else {
                    toast.error(data.extraDetails ? data.extraDetails : data.message);
                }
            }

        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        getSingleProductById();
    }, []);

    useEffect(() => {
        getAllCategorysData();
    }, []);

    return (<>

        <div style={{ marginTop: "20px" }}>
            <form className="form-container" onSubmit={handleSubmit}>
                <h1>Update Product</h1>
                <label>Choose a category:</label>
                <select name="productCategory" id="productCategory" onChange={(e) => setPCategory(e.target.value)}>
                    <option value="0">Select category</option>
                    {
                        categoryData.map((curCategoryData, index) => {
                            return (
                                <option key={index} value={curCategoryData.categoryName}>{curCategoryData.categoryName}</option>
                            )
                        })
                    }
                </select>
                <div style={{ color: "red" }}>{pcategoryError}</div>

                <label>Select Product Image:</label>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <input type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    <div style={{ width: "110px", height: "110px", backgroundColor: "#f2f2f2", marginLeft: "10px", border: "2px solid", borderRadius: "10px" }}>
                        {selectedImagePreview ? (
                            <img src={selectedImagePreview} alt="Product Preview" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px", padding: "5px" }} />
                        ) : (
                            <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "10px", padding: "5px" }}>
                                <span style={{ color: "#666", fontSize: "12px", textAlign: "center" }}>No Image Selected</span>
                            </div>
                        )}
                    </div>
                </div>
                <div style={{ color: "red" }}>{pimgError}</div>

                <label>Product Name:</label>
                <input type="text"
                    onChange={(e) => setPName(e.target.value)}
                    value={pname} name="pname"
                    placeholder="Enter your product name" />
                <div style={{ color: "red" }}>{pnameError}</div>

                <label>Product Description:</label>
                <textarea
                    rows="3" cols="50"
                    onChange={(e) => setDesc(e.target.value)}
                    value={desc} name="desc"
                    placeholder="Enter your product description" />
                <div style={{ color: "red" }}>{descError}</div>

                <label>Product Packing:</label>
                <textarea
                    rows="3" cols="50"
                    onChange={(e) => setPack(e.target.value)}
                    value={pack} name="pack"
                    placeholder="Enter your product packing details" />
                <div style={{ color: "red" }}>{packError}</div>

                <label>Product Composition:</label>
                <textarea
                    rows="3" cols="50"
                    onChange={(e) => setComposition(e.target.value)}
                    value={composition} name="composition"
                    placeholder="Enter your product composition" />
                <div style={{ color: "red" }}>{compositionError}</div>

                <label>Product Shelf Life:</label>
                <textarea
                    rows="3" cols="50"
                    onChange={(e) => setShelfLife(e.target.value)}
                    value={shelfLife} name="shelfLife"
                    placeholder="Enter your product shelf life" />
                <div style={{ color: "red" }}>{shelfLifeError}</div>

                <label>Product Price:</label>
                <input type="number" inputMode="numeric"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price} name="price"
                    placeholder="Enter your product price" />
                <div style={{ color: "red" }}>{priceError}</div>


                <label>Product Storage Condition:</label>
                <textarea
                    rows="3" cols="50"
                    onChange={(e) => setStorageCondition(e.target.value)}
                    value={storageCondition} name="storageCondition"
                    placeholder="Enter your product storage condition" />
                <div style={{ color: "red" }}>{storageConditionError}</div>

                <button type="submit">Submit</button>
            </form>
        </div>
    </>)
}