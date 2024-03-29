import React, { useContext, useState } from "react";

import { Link } from "react-router-dom";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

import CartItem from "../components/CartItem";
import { CartContext } from "../local/CartContext";
import SummaryItem from "../components/SummaryItem";

export default function Cart() {
	const [cart, setCart] = useContext(CartContext);

	const [coupon, setCoupon] = useState({
		active: false,
		couponName: "",
		discount: null,
		discountPrice: null,
		message: "",
	});

	// const handleCheckout = () => {
	// 	alert("Checkout");
	// };

	const handleClearAll = () => {
		setCart([]);
	};

	const handleCouponName = (event) => {
		setCoupon({ ...coupon, couponName: event.target.value });
	};

	const renderButtonClearAll = () => {
		if (cart.length > 0) {
			return (
				<button
					className="btn cart-products-remove-btn"
					onClick={handleClearAll}
				>
					Clear All
				</button>
			);
		}
	};

	const renderTotal = cart.reduce((total, item) => {
		return total + item.price * item.quantity;
	}, 0);

	const handleCoupon = (event) => {
		event.preventDefault();

		let formatCouponInput = coupon.couponName.toUpperCase();

		if (formatCouponInput === "PROMO30") {
			setCoupon({
				...coupon,
				active: true,
				discount: renderTotal * 0.3,
				discountPrice: renderTotal - renderTotal * 0.3,
				message: "Succes",
			});
		} else {
			setCoupon({
				couponName: "",
				active: true,
				discount: null,
				discountPrice: null,
				message: "Wrong promo code, try again",
			});
		}

		if (formatCouponInput.length === 0) {
			setCoupon({
				...coupon,
				active: true,
				discount: null,
				discountPrice: null,
				message: "Error, input field is empty",
			});
		}
	};

	const renderDiscount = () => {
		if (coupon.discount !== null || coupon.discountPrice) {
			return (
				<>
					<tr className="product-row-discount">
						<td className="product-row-name">Discount</td>
						<td className="product-row-price">
							- {coupon.discount} €
						</td>
					</tr>
					<tr className="product-row-discount-price">
						<td className="product-row-name">Discounted price</td>
						<td className="product-row-price">
							{coupon.discountPrice} €
						</td>
					</tr>
				</>
			);
		}
	};

	const renderCart = () => {
		if (cart.length > 0) {
			return (
				<>
					<div className="cart-coupon-wrapper d-flex justify-content-center">
						<div className="cart-coupon-message">
							<span>Use coupon code PROMO30</span>
						</div>
						<form
							className="coupon-form d-flex"
							onSubmit={handleCoupon}
						>
							<input
								type="text"
								placeholder="Use coupon..."
								onChange={handleCouponName}
								value={coupon.couponName}
							/>
							<button className="btn cart-coupon-btn">
								<BsArrowRight />
							</button>
						</form>
						{coupon.active === true ? (
							<span className="coupon-message">
								{coupon.message}
							</span>
						) : (
							""
						)}
					</div>
					<div className="cart-products-wrapper">
						<table className="product-table">
							<thead>
								<tr>
									<th colSpan={2}>Product</th>
									<th>Quantity</th>
									<th>Price</th>
									<th>{renderButtonClearAll()}</th>
								</tr>
							</thead>
							<tbody>
								{cart.map((cartItem, index) => (
									<CartItem
										key={index}
										cartItem={cartItem}
										setCoupon={setCoupon}
									/>
								))}
							</tbody>
						</table>
					</div>
					<div className="cart-summary-wrapper">
						<h2 className="cart-headline-text">Summary</h2>
						<table className="summary-table">
							<tbody>
								{cart.map((summaryItem, index) => (
									<SummaryItem
										key={index}
										summaryItem={summaryItem}
									/>
								))}
							</tbody>
						</table>
						<table className="summary-total-table">
							<tbody>
								<tr className="product-row-total">
									<td className="product-row-name">Total</td>
									<td className="product-row-price">
										{renderTotal} €
									</td>
								</tr>
								{renderDiscount()}
							</tbody>
						</table>
						<button
							className="btn cart-summary-checkout-btn"
							// onClick={handleCheckout}
						>
							Checkout
						</button>
					</div>
				</>
			);
		}

		return (
			<div className="cart-messege-wraper">
				<h2 className="messege-wraper-headline">No products in cart</h2>
				<Link className="btn" to={"/React-Webshop/products"}>
					Go to products
				</Link>
			</div>
		);
	};

	return (
		<main className="page-wrapper cart-page-wrapper">
			<section className="breadcrumb-wrapper">
				<Link
					className="d-flex align-items-center"
					to={"/React-Webshop/products"}
				>
					<BsArrowLeft />
					<span className="breadcrumb-wrapper-text">
						Back to products
					</span>
				</Link>
			</section>

			<section className="cart-wrapper d-flex align-items-start justify-content-center flex-wrap">
				{renderCart()}
			</section>
		</main>
	);
}
