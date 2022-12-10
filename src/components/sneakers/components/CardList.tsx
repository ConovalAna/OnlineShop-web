import React from 'react';
import Card from './Card';

function CardList({ cards, onAddToFavorites, isLoading }: any) {
    return (
        <ul className="cards-grid">
            {cards.map((card: any, index: number) => (
                <Card
                    key={isLoading ? index : card.id}
                    card={card}
                    onAddToFavorites={onAddToFavorites}
                    isLoading={isLoading}
                />
            ))}
        </ul>
    );
}

export default CardList;
