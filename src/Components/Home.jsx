import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProduct } from "../Store/ActionCreators/ProductActionCreators";
import { useDispatch, useSelector } from "react-redux";
import Testimonials from "./Testimonials";
import ProductSlider from "./ProductSlider";
import Newsletter from "./Newsletter";
export default function Home() {
  let [products, setProducts] = useState([]);
  let [maleProducts, setMaleProducts] = useState([]);
  let [femaleProducts, setFemaleProducts] = useState([]);
  let [kidsProducts, setKidsProducts] = useState([]);

  let dispatch = useDispatch();
  let ProductStateData = useSelector((state) => state.ProductStateData);
  function getAPIData() {
    dispatch(getProduct());
    if (ProductStateData.length) {
      setProducts(ProductStateData.slice(0, 12));
      setMaleProducts(
        ProductStateData.filter((x) => x.maincategory === "Male").slice(0, 12)
      );
      setFemaleProducts(
        ProductStateData.filter((x) => x.maincategory === "Female").slice(0, 12)
      );
      setKidsProducts(
        ProductStateData.filter((x) => x.maincategory === "Kids").slice(0, 12)
      );
    }
  }
  useEffect(() => {
    getAPIData();
  }, [ProductStateData.length]);
  return (
    <>
      <div className="container-fluid">
        <div style={{ height: 100 }} />
        <div id="carouselExampleIndicators" className="carousel slide">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active text-dark"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="swiper-slide">
                <div className="container">
                  <div className="row d-flex align-items-center">
                    <div className="col-md-5 col-10 m-auto">
                      <div className="banner-content">
                        <h3 className="text-uppercase text-dark pb-5">
                          Best and Latest Fashion Products for Male
                        </h3>
                        <Link
                          to="/shop?mc=Male"
                          className="btn btn-medium btn-dark text-uppercase btn-rounded-none"
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="image-holder">
                        <img
                          src="images/banner1.png"
                          height={500}
                          width="100%"
                          alt="banner"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="swiper-slide">
                <div className="container">
                  <div className="row d-flex align-items-center">
                    <div className="col-md-5 col-10 m-auto">
                      <div className="banner-content">
                        <h3 className="text-uppercase text-dark pb-5">
                          Best and Latest Fashion Products for Female
                        </h3>
                        <Link
                          to="/shop?mc=Female"
                          className="btn btn-medium btn-dark text-uppercase btn-rounded-none"
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="image-holder">
                        <img
                          src="images/banner2.png"
                          height={500}
                          width="100%"
                          alt="banner"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="swiper-slide">
                <div className="container">
                  <div className="row d-flex align-items-center">
                    <div className="col-md-5 col-10 m-auto">
                      <div className="banner-content">
                        <h3 className="text-uppercase text-dark pb-5">
                          Best and Latest Fashion Products for Kids
                        </h3>
                        <Link
                          to="/shop?mc=Kids"
                          className="btn btn-medium btn-dark text-uppercase btn-rounded-none"
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="image-holder">
                        <img
                          src="images/banner3.png"
                          height={500}
                          width="100%"
                          alt="banner"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span className="material-symbols-outlined fs-1 text-dark">
              arrow_back_ios
            </span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span className="material-symbols-outlined fs-1 text-dark">
              arrow_forward_ios
            </span>
          </button>
        </div>
        <section id="company-services" className="padding-large">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 pb-3">
                <div className="icon-box d-flex">
                  <div className="icon-box-icon pe-3 pb-3">
                    <span className="material-symbols-outlined">
                      shopping_cart
                    </span>
                  </div>
                  <div className="icon-box-content">
                    <h3 className="card-title text-uppercase text-dark">
                      Free delivery
                    </h3>
                    <p>Consectetur adipi elit lorem ipsum dolor sit amet.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 pb-3">
                <div className="icon-box d-flex">
                  <div className="icon-box-icon pe-3 pb-3">
                    <span className="material-symbols-outlined">
                      new_releases
                    </span>
                  </div>
                  <div className="icon-box-content">
                    <h3 className="card-title text-uppercase text-dark">
                      Quality guarantee
                    </h3>
                    <p>Dolor sit amet orem ipsu mcons ectetur adipi elit.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 pb-3">
                <div className="icon-box d-flex">
                  <div className="icon-box-icon pe-3 pb-3">
                    <span className="material-symbols-outlined">sell</span>
                  </div>
                  <div className="icon-box-content">
                    <h3 className="card-title text-uppercase text-dark">
                      Daily offers
                    </h3>
                    <p>Amet consectetur adipi elit loreme ipsum dolor sit.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 pb-3">
                <div className="icon-box d-flex">
                  <div className="icon-box-icon pe-3 pb-3">
                    <span className="material-symbols-outlined">
                      verified_user
                    </span>
                  </div>
                  <div className="icon-box-content">
                    <h3 className="card-title text-uppercase text-dark">
                      100% secure payment
                    </h3>
                    <p>Rem Lopsum dolor sit amet, consectetur adipi elit.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ProductSlider heading="Latest Products" data={products} />
        {/*<ProductSlider heading="Male Latest Products" data={maleProducts} />
        <ProductSlider heading="Female Latest Products" data={femaleProducts} />
        <ProductSlider heading="Kids Latest Products" data={kidProducts} />
  */}

        <section
          id="yearly-sale"
          className="bg-light-blue overflow-hidden mt-5 padding-xlarge"
          style={{
            backgroundImage: "url('images/banner4.png')",
            backgroundPosition: "right",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="row d-flex flex-wrap align-items-center">
            <div className="col-md-6 col-sm-12">
              <div className="text-content offset-4 padding-medium">
                <h3>Upto 90% off</h3>
                <h2 className="display-2 pb-5 text-uppercase text-dark">
                  On All Brands
                </h2>
                <Link
                  to="/shop"
                  className="btn btn-medium btn-dark text-uppercase btn-rounded-none"
                >
                  Shop Now
                </Link>
              </div>
            </div>
            <div className="col-md-6 col-sm-12"></div>
          </div>
        </section>

        <Testimonials />

        <Newsletter />
      </div>
    </>
  );
}
