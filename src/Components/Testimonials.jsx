import React, { useEffect, useState } from 'react'

import { getTestimonial } from "../Store/ActionCreators/TestimonialActionCreators"
import { useDispatch, useSelector } from 'react-redux'
export default function Testimonials() {
    let [testimonial, setTestimonial] = useState([])

    let dispatch = useDispatch()
    let TestimonialStateData = useSelector((state) => state.TestimonialStateData)
    function getAPIData() {
        dispatch(getTestimonial())
        if (TestimonialStateData.length) {
            setTestimonial(TestimonialStateData.slice(0, 12))
        }
    }
    useEffect(() => {
        getAPIData()
    }, [TestimonialStateData.length])
    return (
        <>
            <div id="carouselExample" className="carousel slide my-3">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="swiper-slide text-center d-flex justify-content-center">
                            <div className="review-item col-md-10">
                                <i className="icon icon-review"></i>
                                <blockquote className='testimonial-message'>“{testimonial[0]?.message}”</blockquote>
                                <div className="rating">
                                    <i className='fa fa-star'></i>
                                    <i className='fa fa-star'></i>
                                    <i className='fa fa-star'></i>
                                    <i className='fa fa-star'></i>
                                    <i className='fa fa-star'></i>
                                </div>
                                <div className="author-detail">
                                    <img src={`/images/${testimonial[0]?.pic}`} height={50} width={50} style={{ borderRadius: "50%" }} alt="" />
                                    <div className="name text-dark text-uppercase pt-2">{testimonial[0]?.name}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        testimonial.slice(1).map((item, index) => {
                            return <div className="carousel-item" key={index}>
                                <div className="swiper-slide text-center d-flex justify-content-center">
                                    <div className="review-item col-md-10">
                                        <i className="icon icon-review"></i>
                                        <blockquote className='testimonial-message'>“{item.message}”</blockquote>
                                        <div className="rating">
                                            <i className='fa fa-star'></i>
                                            <i className='fa fa-star'></i>
                                            <i className='fa fa-star'></i>
                                            <i className='fa fa-star'></i>
                                            <i className='fa fa-star'></i>
                                        </div>
                                        <div className="author-detail">
                                            <img src={`/images/${item.pic}`} height={50} width={50} style={{ borderRadius: "50%" }} alt="" />
                                            <div className="name text-dark text-uppercase pt-2">{item.name}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="material-symbols-outlined fs-1 text-dark">
                        arrow_back_ios
                    </span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="material-symbols-outlined fs-1 text-dark">
                        arrow_forward_ios
                    </span>
                </button>
            </div>
        </>
    )
}
