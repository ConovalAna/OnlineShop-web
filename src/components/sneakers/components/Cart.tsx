import React, { useState } from 'react';
const complete_order = '/asset/sneakers/complete-order.jpg';
const empty_box = '/asset/sneakers/empty-box.jpg';
const remove_button = '/asset/sneakers/remove-button-colored.svg';
const right_arrow = '/asset/sneakers/right-arrow.svg';
import Message from './Message';
import Button from './UI/Button';
import { api } from '../utils/Api';
import { useCart } from '../hooks/useCart';

export interface ICartProduct {
    productId: number;
    quantity: number;
    size: number;
    imagesUrl: string[];
    name: string;
    totalPrice: number;
}

function Cart({ cartCloseHandler, isCartOpened }: any) {
    const cart = useCart();
    const [isOrderCompleted, setIsOrderCompleted] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // const { setCartItems } = useContext(AppContext);
    const delay = (ms: any) =>
        new Promise((resolve) => setTimeout(resolve, ms)); // функция задержки
    //const { itemsPrice, shippingPrice, totalPrice } = useCheckout();
    const delivery = cart.amount * 0.05;
    const totalPrice = cart.amount + delivery;
    const completeOrder = async () => {
        setIsLoading(true);

        api.addOrder(cart.cartItems)
            .then((response) => {
                setOrderId(response.id);
                setIsOrderCompleted(true);
            })
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));
        for (let i = 0; i < cart.cartItems.length; i++) {
            const item = cart.cartItems[i];
            // await api.removeItem(item.id, 'cart');
            await delay(700);
        }
    };

    const closeCart = () => {
        cartCloseHandler();
        setIsOrderCompleted(false);
    };

    return (
        <div
            onClick={closeCart}
            className={`cart ${isCartOpened ? 'cart_visible' : ''}`}
        >
            <div
                onClick={(event) => event.stopPropagation()}
                className={`cart__sidebar ${
                    isCartOpened && 'cart__sidebar_visible'
                }`}
            >
                <div className="cart__header">
                    <h2 className="cart__title">Корзина</h2>
                    <img
                        onClick={closeCart}
                        className="close-button"
                        src={remove_button}
                        alt="Крестик"
                    />
                </div>
                {cart.cartProducts.length ? (
                    <>
                        <ul className="cart__items">
                            {cart.cartProducts.map((item: any, index: number) => (
                                <li key={index} className="cart-item">
                                    <img
                                        className="cart-item__image"
                                        src={
                                            item.imagesUrl && item.imagesUrl[0]
                                        }
                                        alt={item.name}
                                    />
                                    <div className="cart-item__text">
                                        <p className="cart-item__title">
                                            {item.name}
                                        </p>
                                        <p className="cart-item__price">
                                            {item.totalPrice} ron.
                                        </p>
                                        <p className="cart-item__price">
                                            {item.size} size
                                        </p>
                                        <p className="cart-item__price">
                                            {item.quantity} quantity
                                        </p>
                                    </div>
                                    <img
                                        onClick={() => cart.removeFromCartHandler(item)}
                                        className="close-button"
                                        src={remove_button}
                                        alt="remove"
                                    />
                                </li>
                            ))}
                        </ul>
                        <ul className="order-info">
                            <li className="order-info__content">
                                <p className="order-info__title">Products:</p>
                                <div className="order-info__dots"></div>
                                <p className="order-info__value">
                                    {cart.amount} ron.
                                </p>
                            </li>
                            <li className="order-info__content">
                                <p className="order-info__title">
                                    Delivery 5%:
                                </p>
                                <div className="order-info__dots"></div>
                                <p className="order-info__value">
                                    {delivery} ron.
                                </p>
                            </li>
                            <li className="order-info__content">
                                <b className="order-info__title">Total:</b>
                                <div className="order-info__dots"></div>
                                <p className="order-info__value">
                                    {totalPrice} ron.
                                </p>
                            </li>
                        </ul>
                        <Button isLoading={isLoading} onClick={completeOrder}>
                            Make order
                            <img
                                className="button__right-arrow"
                                src={right_arrow}
                                alt="Arrow"
                            />
                        </Button>
                    </>
                ) : (
                    <Message
                        img={isOrderCompleted ? complete_order : empty_box}
                        title={
                            isOrderCompleted
                                ? 'Order complete!'
                                : 'Cart is empty'
                        }
                        subtitle={
                            isOrderCompleted
                                ? `Your #${orderId} soon will be packed`
                                : 'Please add at least one product, to make order.'
                        }
                        alt={isOrderCompleted ? 'Document' : 'Empty card'}
                        onButtonClick={closeCart}
                    />
                )}
            </div>
        </div>
    );
}

export default Cart;
