import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeProduct, updateProductAmount } from "../features/productSlice";
import { Link } from "react-router-dom";

function FoodStore() {
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || {
      products: [],
    };
    setCartItems(savedCart.products);
  }, []);

  const handleRemove = (slug) => {
    dispatch(removeProduct(slug));
    const updatedCart = cartItems.filter((item) => item.slug !== slug);
    localStorage.setItem("cart", JSON.stringify({ products: updatedCart }));
    setCartItems(updatedCart);
  };

  const handleIncrement = (slug) => {
    const updatedCart = cartItems.map((item) => {
      if (item.slug === slug) {
        const newAmount = item.amount + 1;
        dispatch(updateProductAmount({ slug, amount: newAmount }));
        return { ...item, amount: newAmount };
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify({ products: updatedCart }));
    setCartItems(updatedCart);
  };

  const handleDecrement = (slug) => {
    const updatedCart = cartItems.map((item) => {
      if (item.slug === slug && item.amount > 1) {
        const newAmount = item.amount - 1;
        dispatch(updateProductAmount({ slug, amount: newAmount }));
        return { ...item, amount: newAmount };
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify({ products: updatedCart }));
    setCartItems(updatedCart);
  };

  console.log(cartItems);
  return (
    <div className="font-sans md:max-w-2xl lg:max-w-5xl max-w-[340px] sm:max-w-xl mx-auto py-4">
      <h1 className="text-3xl font-bold text-center">Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((product) => {
              console.log(product);
              return (
                <div
                  key={product.slug}
                  className="grid grid-cols-3 border p-3 rounded items-start gap-4"
                >
                  <div className="col-span-2 flex items-start gap-4">
                    <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0 p-2 rounded-md">
                      <img
                        src={product.image}
                        className="w-full rounded h-full object-contain"
                        alt={product.slug}
                      />
                    </div>

                    <div className="flex flex-col">
                      <h3 className="text-base font-bold">{product.title}</h3>
                      <p className="text-xs font-semibold text-gray-500 mt-0.5">
                        Time: {product.time} min
                      </p>
                      <h4 className="text-lg max-sm:text-base font-bold">
                        ${product.price}
                      </h4>
                    </div>
                  </div>

                  <div className="ml-auto">
                    <button
                      type="button"
                      className="mt-6 flex items-center px-3 py-1.5 border text-xs outline-none bg-transparent rounded-md"
                      onClick={() => handleDecrement(product.slug)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-2.5 fill-current"
                        viewBox="0 0 124 124"
                      >
                        <path
                          d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                          data-original="#000000"
                        ></path>
                      </svg>

                      <span className="mx-3 font-bold">{product.amount}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-2.5 fill-current"
                        viewBox="0 0 42 42"
                        onClick={() => handleIncrement(product.slug)}
                      >
                        <path
                          d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="mt-6 font-semibold text-red-500 text-xs flex items-center gap-1 shrink-0"
                      onClick={() => handleRemove(product.slug)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 fill-current inline"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                          data-original="#000000"
                        ></path>
                        <path
                          d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                          data-original="#000000"
                        ></path>
                      </svg>
                      REMOVE
                    </button>
                  </div>
                </div>
              );
            })}
            <hr className="" />
          </div>

          <div className="border rounded-md p-4 h-max">
            <h3 className="text-lg max-sm:text-base font-bold border-b pb-2">
              Order Summary
            </h3>

            <form className="mt-6">
              <div>
                <h3 className="text-base font-semibold mb-4">Enter Details</h3>
              </div>
            </form>

            <ul className="mt-6 space-y-3">
              <li className="flex flex-wrap gap-4 text-sm">
                Subtotal <span className="ml-auto font-bold">$200.00</span>
              </li>
              <li className="flex flex-wrap gap-4 text-sm">
                Shipping <span className="ml-auto font-bold">$2.00</span>
              </li>
              <li className="flex flex-wrap gap-4 text-sm">
                Tax <span className="ml-auto font-bold">$4.00</span>
              </li>
              <hr className="border" />
              <li className="flex flex-wrap gap-4 text-sm font-bold">
                Total <span className="ml-auto">$206.00</span>
              </li>
            </ul>

            <div className="mt-6 space-y-3">
              <button
                type="button"
                className="btn btn-primary text-sm px-4 py-2.5 w-full font-semibold tracking-wide rounded-md"
              >
                Checkout
              </button>
              <Link
                to="/"
                type="button"
                className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent border rounded-md btn btn-outline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="align-element mt-16 flex items-center justify-center flex-col text-center p-6">
          <img className="w-56 mb-7" src="./assets/empty.png" alt="" />
          <h1 className="text-2xl font-medium">
            Your cart is currently no products
          </h1>
          <p>
            Start with the selections on the main page or find the product you
            need using the search
          </p>
          <div className="mt-5">
            <Link className="btn btn-primary capitalize" to="/">
              Shop Now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default FoodStore;
