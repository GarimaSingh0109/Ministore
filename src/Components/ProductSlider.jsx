import React from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';

export default function ProductSlider({ heading, data }) {
    let options = {
        0: {
            width: 0,
            slidesPerView: 1,
        },
        480: {
            width: 576,
            slidesPerView: 2,
        },
        768: {
            width: 768,
            slidesPerView: 3,
        },
        1080: {
            width: 1080,
            slidesPerView: 4,
        },
    }
    return (
        <section id="products" className="product-store position-relative padding-large no-padding-top">
            <div className="container">
                <div className="row">
                    <div className="display-header d-flex justify-content-between pb-3">
                        <h2 className="display-7 text-dark text-uppercase">{heading}</h2>
                        <div className="btn-right">
                            <Link to="/shop" className="btn btn-medium btn-normal text-uppercase">Go to Shop</Link>
                        </div>
                    </div>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={4}
                        loop="true"
                        breakpoints={options}
                    >
                        {
                            data.map((item, index) => {
                                return <SwiperSlide key={index}>
                                    <div className="swiper-slide card p-2">
                                        <div className="product-card position-relative">
                                            <div className="image-holder">
                                                <img src={`/images/${item.pic[0]}`} alt="product-item" className="img-fluid" style={{ height: 300, width: "100%" }} />
                                            </div>
                                            <div className="cart-concern position-absolute">
                                                <div className="cart-button d-flex">
                                                    <Link to={`/product/${item.id}`} className="btn btn-medium btn-black">Add to Cart<span className="material-symbols-outlined">
                                                        shopping_cart
                                                    </span></Link>
                                                </div>
                                            </div>
                                            <p className="py-2 text-center" style={{ height: 30 }}>
                                                <Link to={`/product/${item.id}`}>{item.name}</Link>
                                            </p>
                                            <p className='text-dark text-center'><del className='text-danger'>&#8377;{item.baseprice}</del> &#8377;{item.finalprice} <sup className='text-success'>{item.discount}% Off</sup></p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            })
                        }
                    </Swiper>
                </div>
            </div>
            <div className="swiper-pagination position-absolute text-center"></div>
        </section>
    )
}
