import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { json, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";
import "../styles/ProductDetailsStyles.css";

const ProductDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();

  // initial details
  useEffect(() => {
    if (params.slug) {
      getProduct();
    }
  }, [params.slug]);

  // Get Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-sigle-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get Similar Product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      {/* <div className="row container mt-4 product-details"> */}
      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/get-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="420px"
            width="360px"
          />
        </div>
        {/* <div className="col-md-6"> */}
        <div className="col-md-6 product-details-info">
          <h1 className="text-center"> Product Details </h1>
          <hr />
          <h6> Name : {product.name} </h6>
          <h6> Description : {product.description} </h6>
          <h6>
            Price :
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h6>
          <h6> Category : {product?.category?.name} </h6>
          <button
            class="btn btn-secondary ms-1"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Item Added to Cart");
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>
      <hr />
      <div className="row container similar-products">
        <h3> Similar Product ➡️</h3>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Product Found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-0" style={{ width: "18rem" }}>
              <img
                style={{ cursor: "pointer" }}
                src={`/api/v1/product/get-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
                onClick={() => navigate(`/product/${p.slug}`)}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                </div>

                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <div className="card-name-price">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    class="btn btn-secondary ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to Cart");
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
