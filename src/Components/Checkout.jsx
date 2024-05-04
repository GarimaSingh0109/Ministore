import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import ProfileTable from "./ProfileTable";

import {
  deleteCart,
  getCart,
} from "../Store/ActionCreators/CartActionCreators";
import { addCheckout } from "../Store/ActionCreators/CheckoutActionCreators";
export default function Checkout() {
  let [mode, setMode] = useState("COD");
  let [user, setUser] = useState({});
  let [cart, setCart] = useState([]);
  let [subtotal, setSubtotal] = useState(0);
  let [shipping, setShipping] = useState(0);
  let [total, setTotal] = useState(0);

  let navigate = useNavigate();

  let dispatch = useDispatch();
  let CartStateData = useSelector((state) => state.CartStateData);

  function placeOrder() {
    let item = {
      userid: user.id,
      paymentmode: mode,
      paymentstatus: "Pending",
      orderstatus: "Order is Placed",
      subtotal: subtotal,
      shipping: shipping,
      total: total,
      date: new Date(),
      products: cart,
    };
    dispatch(addCheckout(item));
    for (let item of cart) {
      dispatch(deleteCart({ id: item.id }));
    }
    navigate("/confirmation");
  }
  async function getAPIData() {
    let response = await fetch("/user/" + localStorage.getItem("userid"), {
      method: "get",
      headers: {
        "content-type": "application-json",
      },
    });
    response = await response.json();
    if (response) {
      setUser(response);
    } else {
      navigate("/login");
    }
    dispatch(getCart());
    if (CartStateData.length) {
      let data = CartStateData.filter(
        (x) => x.userid === localStorage.getItem("userid")
      );
      setCart(data);
      let subtotal = 0;
      let shipping = 0;
      let total = 0;
      for (let item of data) {
        subtotal = subtotal + item.total;
      }
      if (subtotal > 0 && subtotal < 1000) shipping = 150;

      total = subtotal + shipping;

      setSubtotal(subtotal);
      setShipping(shipping);
      setTotal(total);
    }
  }
  useEffect(() => {
    getAPIData();
  }, [CartStateData.length]);
  return (
    <>
      <div className="container-fluid my-5">
        <div style={{ height: 50 }} />
        <div className="row">
          <div className="col-md-4">
            <ProfileTable
              user={user}
              heading="Billing Address"
              buttonText="Update Address"
            />
          </div>
          <div className="col-md-8">
            <h5 className="bg-primary text-center p-2">Cart Section</h5>
            {cart.length ? (
              <>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Pic</th>
                        <th>Name</th>
                        <th>Brand/Color/Size</th>
                        <th>Price</th>
                        <th>QTY</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <a
                                href={`/images/${item.pic}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img
                                  src={`/images/${item.pic}`}
                                  height={50}
                                  width={50}
                                  alt=""
                                />
                              </a>
                            </td>
                            <td>{item.name}</td>
                            <td>
                              {item.brand}/{item.color}/{item.size}
                            </td>
                            <td>&#8377;{item.price}</td>
                            <td>{item.qty}</td>
                            <td>&#8377;{item.total}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th>Subtotal</th>
                      <td>&#8377;{subtotal}</td>
                    </tr>
                    <tr>
                      <th>Shipping</th>
                      <td>&#8377;{shipping}</td>
                    </tr>
                    <tr>
                      <th>Total</th>
                      <td>&#8377;{total}</td>
                    </tr>
                    <tr>
                      <th>Payment Mode</th>
                      <td>
                        <select
                          name="mode"
                          onChange={(e) => setMode(e.target.value)}
                          className="form-select"
                        >
                          <option value="COD">COD</option>
                          <option value="Net Banking">
                            Net Banking/CARD/UPI
                          </option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <button
                          className="btn btn-primary w-100"
                          onClick={placeOrder}
                        >
                          Place Order
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            ) : (
              <div className="text-center">
                <p>No Items in Cart</p>
                <Link to="/shop" className="btn btn-primary">
                  Shop Now
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
