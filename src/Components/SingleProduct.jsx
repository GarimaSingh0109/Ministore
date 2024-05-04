import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { getProduct } from "../Store/ActionCreators/ProductActionCreators";
import { addCart, getCart } from "../Store/ActionCreators/CartActionCreators";
import {
  addWishlist,
  getWishlist,
} from "../Store/ActionCreators/WishlistActionCreators";
export default function SingleProduct() {
  let [product, setProduct] = useState({});
  let [qty, setQty] = useState(1);
  let { id } = useParams();

  let navigate = useNavigate();
  let dispatch = useDispatch();
  let ProductStateData = useSelector((state) => state.ProductStateData);
  let CartStateData = useSelector((state) => state.CartStateData);
  let WishlistStateData = useSelector((state) => state.WishlistStateData);
  function addToCart() {
    var item = CartStateData.find(
      (x) => x.productid === id && x.userid === localStorage.getItem("userid")
    );
    if (!item) {
      item = {
        productid: product.id,
        userid: localStorage.getItem("userid"),
        name: product.name,
        brand: product.brand,
        color: product.color,
        size: product.size,
        price: product.finalprice,
        qty: qty,
        total: product.finalprice * qty,
        pic: product.pic[0],
      };
      dispatch(addCart(item));
    }
    navigate("/cart");
  }
  function addToWishlist() {
    var item = WishlistStateData.find(
      (x) => x.productid === id && x.userid === localStorage.getItem("userid")
    );
    if (!item) {
      item = {
        productid: product.id,
        userid: localStorage.getItem("userid"),
        name: product.name,
        brand: product.brand,
        color: product.color,
        size: product.size,
        price: product.finalprice,
        pic: product.pic[0],
      };
      dispatch(addWishlist(item));
    }
    navigate("/profile");
  }

  function getAPIData() {
    dispatch(getProduct());
    dispatch(getCart());
    dispatch(getWishlist());
    if (ProductStateData.length) {
      let item = ProductStateData.find((x) => x.id === id);
      if (item) setProduct(item);
    }
  }
  useEffect(() => {
    getAPIData();
  }, [ProductStateData.length, CartStateData.length, WishlistStateData.length]);
  return (
    <>
      <div className="container-fluid my-5">
        <div style={{ height: 50 }}></div>
        <div className="row">
          <div className="col-md-6">
            <div id="carouselExampleIndicators" className="carousel slide">
              <div className="carousel-inner">
                <div className="carousel-item active" key={0}>
                  <img
                    src={product?.pic?.length && `/images/${product.pic[0]}`}
                    height={600}
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                {product?.pic?.slice(1).map((item, index) => {
                  return (
                    <div className="carousel-item" key={index}>
                      <img
                        src={`/images/${item}`}
                        height={500}
                        className="d-block w-100"
                        alt="..."
                      />
                    </div>
                  );
                })}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <h5 className="bg-primary text-light text-center p-2">
              {product.name}
            </h5>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th>Maincategory</th>
                  <td>{product.maincategory}</td>
                </tr>
                <tr>
                  <th>Subcategory</th>
                  <td>{product.subcategory}</td>
                </tr>
                <tr>
                  <th>Brand</th>
                  <td>{product.brand}</td>
                </tr>
                <tr>
                  <th>Color</th>
                  <td>{product.color}</td>
                </tr>
                <tr>
                  <th>Size</th>
                  <td>{product.size}</td>
                </tr>
                <tr>
                  <th>Price</th>
                  <td>
                    <del className="text-danger">
                      &#8377;{product.baseprice}
                    </del>{" "}
                    &#8377;{product.finalprice}{" "}
                    <sup>{product.discount}% Off</sup>
                  </td>
                </tr>
                <tr>
                  <th colSpan={2} className="d-flex">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        if (qty > 1) setQty(qty - 1);
                      }}
                    >
                      <i className="fa fa-minus"></i>
                    </button>
                    <p className="mx-3 my-2 text-dark">{qty}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => setQty(qty + 1)}
                    >
                      <i className="fa fa-plus"></i>
                    </button>
                  </th>
                  <td>
                    <div className="btn-group w-100 ">
                      <button
                        className="btn btn-primary w-100 p-2 mr-1"
                        onClick={addToCart}
                      >
                        <i className="fa fa-shopping-cart "></i> Add to Cart
                      </button>
                      <br />
                      <button
                        className="btn btn-primary w-100 p-2 mr-1"
                        onClick={addToWishlist}
                      >
                        <i className="fa fa-heart"></i> Add to Wishlist
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>Discription</th>
                  <td>
                    <div
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
