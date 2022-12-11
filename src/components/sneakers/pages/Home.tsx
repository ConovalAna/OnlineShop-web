import React, { useEffect, useState } from 'react';
import CardList from '../components/CardList';
import CardSearch from '../components/CardSearch';
import Header from '../components/Header';
import Message from '../components/Message';
import Select from '../components/UI/Select';
import { createArrWithEmptyObjs, getRandomNumber } from '../utils/pages';

function Home({
    searchQuery,
    setSearchQuery,
    searchedCards,
    onAddToFavorites,
    isLoading,
    cardsCount,
    selectedSort,
    sortItems,
}: any) {
    const [numberForEmoji, setNumberForEmoji] = useState(1);

    useEffect(() => setNumberForEmoji(getRandomNumber(1, 10)), [searchQuery]);

    const arrayWithEmptyObjs = createArrWithEmptyObjs(cardsCount); 

    return (
        <div className="page__wrapper">
            <Header />
            <section className="store">
                <div className="store__header">
                    <h2 className="store__title">
                        {searchQuery
                            ? `Search by: ${searchQuery}`
                            : 'All Sneakers'}
                    </h2>
                    <CardSearch
                        search={searchQuery}
                        setSearch={setSearchQuery}
                    />
                    <Select
                        value={selectedSort}
                        onChange={sortItems}
                        defaultValue="Sorting"
                        options={[
                            { value: 'descending', name: 'Descending' },
                            { value: 'ascending', name: 'Ascending' },
                        ]}
                    />
                </div>
                {searchedCards.length === 0 && searchQuery ? (
                    <Message
                        img={`/images/emoji/emoji-${numberForEmoji}.png`}
                        title="No results"
                        subtitle="Try to find something else"
                        removeButton="true"
                        alt="Smail"
                    />
                ) : (
                    <CardList
                        cards={
                           isLoading ? arrayWithEmptyObjs : searchedCards
                        }
                        onAddToFavorites={onAddToFavorites}
                        isLoading={isLoading}
                    />
                )}
            </section>
        </div>
    );
}

export default Home;
