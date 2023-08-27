import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserManu from "../../components/Layout/UserManu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  // Get Orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={""}>
      <div className="container-flui p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserManu />
          </div>
          <div className="col-md-9">
            <h4 className="text-center textStyle">All Orders</h4>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow mt-4">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Order date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td> {i + 1} </td>
                        <td> {o?.status} </td>
                        <td> $ {o?.payment?.transaction?.amount} </td>
                        <td> {moment(o?.createdAt).fromNow()} </td>
                        <td> {o?.payment.success ? "Success" : "Failed"} </td>
                        <td> {o?.products?.length} </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products.map((p, i) => (
                      <div className="row mb-2 card flex-row">
                        <div className="col-md-4">
                          <img
                            src={`/api/v1/product/get-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                          />
                        </div>
                        <div className="col-md-4 mt-3">
                          <h6> {p.name} </h6>
                          <h6> {p.description} </h6>
                          <h6> Price: $ {p.price} </h6>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* <p> {JSON.stringify(orders, null, 4)} </p> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
