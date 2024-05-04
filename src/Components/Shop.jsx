import React, { useEffect, useState } from "react";

import { getMaincategory } from "../Store/ActionCreators/MaincategoryActionCreators";
import { getSubcategory } from "../Store/ActionCreators/SubcategoryActionCreators";
import { getBrand } from "../Store/ActionCreators/BrandActionCreators";
import { getProduct } from "../Store/ActionCreators/ProductActionCreators";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
export default function Shop() {
  let [maincategory, setMaincategory] = useState([]);
  let [subcategory, setSubcategory] = useState([]);
  let [brand, setBrand] = useState([]);
  let [product, setProduct] = useState([]);
  let [mc, setMc] = useState("");
  let [sc, setSc] = useState("");
  let [br, setBr] = useState("");
  let [search, setSearch] = useState("");
  let [min, setMin] = useState(0);
  let [max, setMax] = useState(0);
  let [flag, setFlag] = useState(false);
  const [params] = useSearchParams();

  let dispatch = useDispatch();
  let MaincategoryStateData = useSelector(
    (state) => state.MaincategoryStateData
  );
  let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData);
  let BrandStateData = useSelector((state) => state.BrandStateData);
  let ProductStateData = useSelector((state) => state.ProductStateData);

  function filter(mc, sc, br, min = 0, max = 0) {
    var data = [];
    if (mc === "" && sc === "" && br === "") data = ProductStateData;
    else if (mc !== "" && sc === "" && br === "")
      data = ProductStateData.filter((x) => x.maincategory == mc);
    else if (mc === "" && sc !== "" && br === "")
      data = ProductStateData.filter((x) => x.subcategory == sc);
    else if (mc === "" && sc === "" && br !== "")
      data = ProductStateData.filter((x) => x.brand == br);
    else if (mc !== "" && sc !== "" && br === "")
      data = ProductStateData.filter(
        (x) => x.maincategory == mc && x.subcategory == sc
      );
    else if (mc !== "" && sc === "" && br !== "")
      data = ProductStateData.filter(
        (x) => x.maincategory == mc && x.brand == br
      );
    else if (mc === "" && sc !== "" && br !== "")
      data = ProductStateData.filter(
        (x) => x.brand == br && x.subcategory == sc
      );
    else
      data = ProductStateData.filter(
        (x) => x.maincategory == mc && x.subcategory == sc && x.brand == br
      );

    if (min === 0 && max === 0) setProduct(data);
    else
      setProduct(
        data.filter((x) => x.finalprice >= min && x.finalprice <= max)
      );
  }
  function categoryFilter(mc, sc, br) {
    setMc(mc);
    setSc(sc);
    setBr(br);
    filter(mc, sc, br);
  }
  function postSearch(e) {
    e.preventDefault();
    var srch = search.toLowerCase();
    setProduct(
      ProductStateData.filter(
        (x) =>
          x.name.toLowerCase().includes(srch) ||
          x.maincategory.toLowerCase() === srch ||
          x.subcategory.toLowerCase() === srch ||
          x.brand.toLowerCase() === srch ||
          x.color.toLowerCase() === srch ||
          x.size.toLowerCase() === srch ||
          x.description.toLowerCase().includes(srch)
      )
    );
  }
  function sortFilter(option) {
    if (option === "1")
      setProduct(product.sort((x, y) => y.id.localeCompare(x.id)));
    else if (option === "2")
      setProduct(product.sort((x, y) => x.finalprice - y.finalprice));
    else setProduct(product.sort((x, y) => y.finalprice - x.finalprice));

    setFlag(!flag);
  }
  function postPriceFilter() {
    filter(mc, sc, br, min, max);
  }
  useEffect(() => {
    (() => {
      dispatch(getMaincategory());
      if (MaincategoryStateData.length) setMaincategory(MaincategoryStateData);
    })();
  }, [MaincategoryStateData.length]);
  useEffect(() => {
    (() => {
      dispatch(getSubcategory());
      if (SubcategoryStateData.length) setSubcategory(SubcategoryStateData);
    })();
  }, [SubcategoryStateData.length]);
  useEffect(() => {
    (() => {
      dispatch(getBrand());
      if (BrandStateData.length) setBrand(BrandStateData);
    })();
  }, [BrandStateData.length]);
  useEffect(() => {
    (() => {
      dispatch(getProduct());
      if (ProductStateData.length) {
        if (params.get("mc"))
          setProduct(
            ProductStateData.filter((x) => x.maincategory === params.get("mc"))
          );
        else setProduct(ProductStateData);
      }
    })();
  }, [ProductStateData.length, params.get("mc")]);
  return (
    <div className="container-fluid my-5">
      <div style={{ height: 50 }}></div>
      <div className="row">
        <div className="col-md-2">
          <div className="list-group mb-3">
            <button
              className="list-group-item list-group-item-action bg-primary text-light"
              aria-current="true"
            >
              Maincategory
            </button>
            <button
              className="list-group-item list-group-item-action"
              onClick={() => categoryFilter("", sc, br)}
            >
              All
            </button>
            {maincategory.map((item, index) => {
              return (
                <button
                  key={index}
                  className="list-group-item list-group-item-action"
                  onClick={() => categoryFilter(item.name, sc, br)}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
          <div className="list-group mb-3">
            <button
              className="list-group-item list-group-item-action bg-primary text-light"
              aria-current="true"
            >
              Subcategory
            </button>
            <button
              className="list-group-item list-group-item-action"
              onClick={() => categoryFilter(mc, "", br)}
            >
              All
            </button>
            {subcategory.map((item, index) => {
              return (
                <button
                  key={index}
                  className="list-group-item list-group-item-action"
                  onClick={() => categoryFilter(mc, item.name, br)}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
          <div className="list-group mb-3">
            <button
              className="list-group-item list-group-item-action bg-primary text-light"
              aria-current="true"
            >
              Brand
            </button>
            <button
              className="list-group-item list-group-item-action"
              onClick={() => categoryFilter(mc, sc, "")}
            >
              All
            </button>
            {brand.map((item, index) => {
              return (
                <button
                  key={index}
                  className="list-group-item list-group-item-action"
                  onClick={() => categoryFilter(mc, sc, item.name)}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
          <div className="mb-3">
            <h5 className="bg-primary text-center text-light p-2">
              Price Filter
            </h5>
            <div className="d-flex">
              <input
                type="number"
                name="min"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                className="form-control"
                placeholder="Min Amount"
              />
              <input
                type="number"
                name="max"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                className="form-control"
                placeholder="Max Amount"
              />
            </div>
            <button
              className="btn btn-primary w-100 my-3"
              onClick={postPriceFilter}
            >
              Apply
            </button>
          </div>
        </div>
        <div className="col-md-10">
          <div className="row">
            <div className="col-md-9 mb-3">
              <form onSubmit={postSearch}>
                <div className="d-flex">
                  <input
                    type="search"
                    name="search"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="form-control m-1"
                  />
                  <button className="btn btn-primary m-1" type="submit">
                    Search
                  </button>
                </div>
              </form>
            </div>
            <div className="col-md-3 mb-3">
              <select
                onChange={(e) => sortFilter(e.target.value)}
                className="form-select"
              >
                <option value="1">Latest</option>
                <option value="2">Price: L To H</option>
                <option value="3">Price: H To L</option>
              </select>
            </div>
          </div>
          <div className="row">
            {product.map((item, index) => {
              return (
                <div key={index} className="col-md-4 col-sm-6 col-12">
                  <div className="card p-2">
                    <div className="product-card position-relative m-2">
                      <div className="image-holder">
                        <img
                          src={`/images/${item.pic[0]}`}
                          alt="product-item"
                          className="img-fluid"
                          style={{ height: 300, width: "100%" }}
                        />
                      </div>
                      <p className="py-2 text-center" style={{ height: 30 }}>
                        <Link to={`/product/${item.id}`}>{item.name}</Link>
                      </p>
                      <p className="text-dark text-center">
                        <del className="text-danger">
                          &#8377;{item.baseprice}
                        </del>{" "}
                        &#8377;{item.finalprice}{" "}
                        <sup className="text-success">{item.discount}% Off</sup>
                      </p>
                      <Link
                        to={`/product/${item.id}`}
                        className="btn btn-sm w-100 btn-black"
                      >
                        Add to Cart
                        <span className="material-symbols-outlined float-end">
                          shopping_cart
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
