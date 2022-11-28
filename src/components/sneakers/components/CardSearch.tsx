import React from 'react';
// import searchImg from '../images/search.svg';
// import remove_button from '../images/remove-button.svg';

function CardSearch({ search, setSearch }: any) {
    return (
        <div className="store__search">
            <img className="store__search-image" src={''} alt="Лупа" />
            <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="store__input"
                type="text"
                placeholder="Поиск..."
            ></input>
            <button className="close-button close-button_type_input">
                <img
                    className="close-button__image"
                    onClick={() => setSearch('')}
                    src={''}
                    alt="Крестик"
                />
            </button>
        </div>
    );
}

export default CardSearch;
