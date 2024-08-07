import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { NavLink } from "react-router-dom";
import { Footer } from "../components/Footer";

export const Product = () => {
    const [productData, setProductData] = useState([]);

    const getAllProductData = async() => {
        try {
            const response = await fetch("http://localhost:5000/api/data/product", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await response.json();
            // console.log(data);
            if (response.ok) {
                setProductData(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllProductData();
    }, []);
    return (
        <>
            <Navbar />
            <div className="main-wrapper">
                <img src="./images/poster.png" alt="poster" style={{ height: "30em", width: "99vw", zIndex: "-1"}} ></img>
            </div >
            <div className="products">
                <div className="container-fluid fruite py-3" >
                    <div className="container">
                        <div className="tab-class text-center">
                            <div className="row g-4">
                                <div className="tab-content">
                                    <div id="tab-1" className="tab-pane fade show p-0 active">
                                        <div className="row g-4">
                                            <div className="col-lg-12">
                                                <div className="row g-4">
                                                    {productData == null ? "" :
                                                        productData.map((product) => {
                                                            return (
                                                                <div className="col-md-6 col-lg-4 col-xl-3">
                                                                    <NavLink to={`/product/${product._id}/productDetails`}>
                                                                        <div className="rounded fruite-item">
                                                                            <div className="fruite-img">
                                                                                <img src={`http://localhost:5000/${product.productImg}`} className="img-fluid w-100 rounded-top"
                                                                                    alt="" />
                                                                            </div>
                                                                            <div className="p-4 border-maavdi border-top-0 rounded-bottom" style={{ height: "150px" }}>
                                                                                <h4>{product.productName}</h4>
                                                                                <p>{product.description}</p>
                                                                            </div>
                                                                        </div>
                                                                    </NavLink>
                                                                </div>
                                                            )
                                                        })
                                                    } 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}