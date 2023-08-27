import React from "react";
import Layout from "../../components/Layout/Layout.js";
import UserManu from "../../components/Layout/UserManu";
import { useAuth } from "../../context/auth.js";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-flui p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserManu />
          </div>
          <div className="col-md-9  dashboard-1">
            <div className="card p-2" style={{ width: "66%" }}>
              <h4> User Name : {auth?.user?.name} </h4>
              <h4> User Email : {auth?.user?.email} </h4>
              <h4> User Contact : {auth?.user?.phone} </h4>
              <h4> User Address : {auth?.user?.address} </h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
