import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";
// import "../styles/CategoryProductStyles.css";
import "../styles/CategoryProductStyles.css";

const CategoryProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) {
      getProductByCategory();
    }
  }, [params?.slug]);

  const getProductByCategory = async (req, res) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProduct(data?.product);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-3 category">
        <h3 className="text-center text-1"> Category - {category?.name} </h3>
        <h5 className="text-center">{product?.length} results found </h5>

        <div className="row">
          {/* <div className="col-md-9 "> */}
          <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
              {product?.map((p) => (
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    style={{ cursor: "pointer" }}
                    src={`/api/v1/product/get-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    onClick={() => navigate(`/product/${p.slug}`)}
                  />
                  <div className="card-body">
                    <div className="card-name-price"> </div>
                    <div className="card-name-price">
                      <h5 className="card-title">{p.name}</h5>
                      <h5 className="card-title card-price">
                        {p.price.toLocaleString("en-US", {
                          style: "currency",
                          // currency: "INR",
                          currency: "USD",
                        })}
                      </h5>
                    </div>

                    <p className="card-text">
                      {p.description.substring(0, 30)}...
                    </p>
                    <div className="card-name-price">
                      <button
                        class="btn btn-primary"
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
                          toast.success("Item Added to Cart.");
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
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
