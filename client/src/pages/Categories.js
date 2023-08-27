import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout>
      <div
        className="container"
        style={{
          minHeight: "76.3vh",
          paddingTop: "50px",
          paddingBottom: "30px",
        }}
      >
        <div className="row container">
          {categories.map((c) => (
            <div className="col-md-6 mt-5 md-3 gx-3 gy-3" key={c._id}>
              <Link to={`/category/${c.slug}`} className="btn cat-btn">
                {" "}
                {c.name}{" "}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
