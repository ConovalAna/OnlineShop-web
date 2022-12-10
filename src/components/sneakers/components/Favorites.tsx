import React, { useContext, useEffect, useState } from 'react';
import Card from './Card';
import Header from './Header';
import Message from './Message';
//import { AppContext } from "../contexts/AppContext";
import { getRandomNumber } from '../utils/pages';
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';

function Favorites({ onAddToCart, onAddToFavorites, onOpenCart, email }: any) {
    //const { favoriteItems } = useContext(AppContext);
    const [numberForEmoji, setNumberForEmoji] = useState(1);

    const favoriteItems = useSelector(
        (state: RootState) => state.favorite.favoriteItems
    );

    useEffect(() => setNumberForEmoji(getRandomNumber(1, 10)), []);

    return (
        <div className="page__wrapper">
            <Header onOpenCart={onOpenCart} email={email} />
            <section className="store">
                <div className="store__header">
                    <h2 className="store__title">Мои закладки</h2>
                </div>
                <ul className="cards-grid">
                    {favoriteItems.length ? (
                        favoriteItems.map((card) => (
                            <Card
                                key={card.id}
                                card={card}
                                onAddToCart={onAddToCart}
                                onAddToFavorites={onAddToFavorites}
                                isOnFavoritesPage={true}
                            />
                        ))
                    ) : (
                        <Message
                            img={`/images/emoji/emoji-${numberForEmoji}.png`}
                            title="Закладок нет :("
                            subtitle="Вы ничего не добавляли в закладки"
                            alt="Смайлик"
                        />
                    )}
                </ul>
            </section>
        </div>
    );
}

export default Favorites;
