import React from 'react'
import Layout from '../components/Layout/Layout';

const Policy = () => {
    return (
        <Layout title={"Privacy Policy"}>
            <div className="row contactus " style={{ margin: "0px" }} >
                <div className="col-md-6 ">
                    <img
                        src="https://blog.darwinbox.com/hubfs/2020-08-26.jpg"
                        alt="contactus"
                    // style={{ width: "100%" }}
                    />
                </div>
                <div className="col-md-4" >
                    <h1 className="bg-dark p-2 text-white text-center">POLICY</h1>
                    <p>add privacy policy</p>
                    <p>add privacy policy</p>
                    <p>add privacy policy</p>
                    <p>add privacy policy</p>
                    <p>add privacy policy</p>
                </div>
            </div>
        </Layout>
    )
}

export default Policy;