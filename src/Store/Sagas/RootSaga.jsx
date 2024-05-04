import { all } from "redux-saga/effects"

import maincategorySagas from "./MaincategorySagas"
import subcategorySagas from "./SubcategorySagas"
import brandSagas from "./BrandSagas"
import productSagas from "./ProductSagas"
import testimonialSagas from "./TestimonialSagas"
import cartSagas from "./CartSagas"
import wishlistSagas from "./WishlistSagas"
import checkoutSagas from "./CheckoutSagas"
import contactUsSagas from "./ContactUsSagas"
import newsletterSagas from "./NewsletterSagas"
export default function* RootSaga() {
    yield all([
        maincategorySagas(),
        subcategorySagas(),
        brandSagas(),
        productSagas(),
        testimonialSagas(),
        cartSagas(),
        wishlistSagas(),
        checkoutSagas(),
        contactUsSagas(),
        newsletterSagas()
    ])
}