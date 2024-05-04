import React, { useEffect, useState } from 'react'

import { addNewsletter, getNewsletter } from "../Store/ActionCreators/NewsletterActionCreators"
import { useDispatch, useSelector } from 'react-redux'
export default function Newsletter() {
    let [email, setEmail] = useState("")
    let [message, setMessage] = useState("")

    let dispatch = useDispatch()
    let NewsletterStateData = useSelector((state) => state.NewsletterStateData)
    function postData(e) {
        e.preventDefault()
        if (email) {
            let item = NewsletterStateData.find((x) => x.email === email)
            if (item)
                setMessage("Your Email Address is Already Registered With Us")
            else {
                dispatch(addNewsletter({ email: email }))
                setMessage("Thanks to Subscribe Our Newsletter Service")
            }
        }
        else
            setMessage("Please Enter a Valid Email Address")
    }
    function getAPIData() {
        dispatch(getNewsletter())
    }
    useEffect(() => {
        getAPIData()
    }, [NewsletterStateData.length])
    return (
        <section id="subscribe" className="container-grid padding-large position-relative overflow-hidden">
            <div className="container">
                <div className="row">
                    <div className="subscribe-content bg-dark d-flex flex-wrap justify-content-center align-items-center padding-medium">
                        <div className="col-md-6 col-sm-12">
                            <div className="display-header pe-3">
                                <h2 className="display-7 text-uppercase text-light">Subscribe Us Now</h2>
                                <p>Get latest news, updates and deals directly mailed to your inbox.</p>
                            </div>
                        </div>
                        <div className="col-md-5 col-sm-12">
                            <p className='text-light'>{message}</p>
                            <form className="subscription-form validate" onSubmit={postData}>
                                <div className="input-group flex-wrap">
                                    <input className="form-control btn-rounded-none" onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Your email address here" />
                                    <button className="btn btn-medium btn-secondary text-uppercase btn-rounded-none" type="submit" name="subscribe">Subscribe</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
