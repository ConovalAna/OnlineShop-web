import React from 'react';
import Card from './Card';

function CardList({ cards, onAddToCart, onAddToFavorites, isLoading }: any) {
    return (
        <ul className="cards-grid">
            {cards.map((card: any, index: number) => (
                <Card
                    key={isLoading ? index : card.id}
                    card={card}
                    onAddToCart={onAddToCart}
                    onAddToFavorites={onAddToFavorites}
                    isLoading={isLoading}
                />
            ))}
        </ul>
    );
}

export default CardList;
