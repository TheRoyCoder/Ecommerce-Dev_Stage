import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";

const User = () => {
  return (
    <Layout>
      <div className="container-fluid m-4 p-4 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h3>All Users</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default User;
