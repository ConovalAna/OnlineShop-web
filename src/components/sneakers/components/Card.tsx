import React from 'react';
import ContentLoader from 'react-content-loader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
const plusDefault = '/asset/sneakers/button-plus.svg';
const plusAdded = '/asset/sneakers/button-added.svg';
const heartLiked = '/asset/sneakers/heart-liked.svg';
const heartDefault = '/asset/sneakers/heart-default.svg';
import { addToCart } from '../../../store/cart/cartSlice';
import { addToFavorite } from '../../../store/favorite/favoriteSlice';
import { IsInFavoriteList } from '../../../utils/helper';

function Card({
    card,
    onAddToFavorites,
    isOnFavoritesPage = false,
    isLoading,
}: any) {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const favoriteItems = useSelector(
        (state: RootState) => state.favorite.favoriteItems
    );

    const cartHandler = () => dispatch(addToCart(card));
    const favoriteHandler = () => dispatch(addToFavorite(card));
    //const { openImagePopup, favoriteItems, cartItems } = useContext(AppContext);

    return (
        <li className="card">
            {isLoading ? (
                <ContentLoader
                    speed={1}
                    width={200}
                    height={300}
                    viewBox="0 0 210 300"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect
                        x="0"
                        y="5"
                        rx="10"
                        ry="10"
                        width="146"
                        height="145"
                    />
                    <rect x="0" y="168" rx="3" ry="3" width="146" height="15" />
                    <rect x="0" y="187" rx="3" ry="3" width="90" height="15" />
                    <rect x="0" y="226" rx="8" ry="8" width="80" height="25" />
                    <rect
                        x="114"
                        y="220"
                        rx="8"
                        ry="8"
                        width="32"
                        height="32"
                    />
                </ContentLoader>
            ) : (
                <>
                    {onAddToFavorites && (
                        <button className="card-button card-button_type_favorite">
                            <img
                                onClick={favoriteHandler}
                                className="card-button__image"
                                src={
                                    favoriteItems.some(
                                        (item) =>
                                            item.customId === card.customId
                                    )
                                        ? heartLiked
                                        : heartDefault
                                }
                                alt="Empty heart"
                            />
                        </button>
                    )}
                    <img
                        // onClick={() =>{ openImagePopup(card)}}
                        className="card__image"
                        src={card.imgUrl}
                        alt={card.title}
                    />
                    <p className="card__title">{card.title}</p>
                    <div className="card__buy">
                        <div className="card__price">
                            <p className="card__price-title">Price:</p>
                            <p className="card__price-value">
                                {card.price} RON.
                            </p>
                        </div>
                        <button className="card-button">
                            <img
                                onClick={cartHandler}
                                className="card-button__image"
                                src={
                                    cartItems.some(
                                        (item) =>
                                            item.customId === card.customId
                                    )
                                        ? plusAdded
                                        : plusDefault
                                }
                                alt="plus"
                            />
                        </button>
                    </div>
                </>
            )}
        </li>
    );
}

export default Card;
