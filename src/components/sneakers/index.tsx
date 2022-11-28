import React, { useEffect, useMemo, useRef, useState } from 'react';
import './index.css';
import Home from './pages/Home';
import { api } from './utils/Api';

export default function Sneakers() {
    const [items, setItems] = useState<any>([]);
    const [cartItems, setCartItems] = useState([]);
    const [favoriteItems, setFavoriteItems] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSort, setSelectedSort] = useState('');

    const [isCartOpened, setIsCartOpened] = useState(false);
    const [isImagePopupOpened, setIsImagePopupOpened] = useState(false);

    const [isLoading, setIsLoading] = useState(false); // состояние загрузки карточек
    const [isFormLoading, setIsFormLoading] = useState(false);

    const [isAuth, setIsAuth] = useState(false);

    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1); // текущая страница

    const [selectedCard, setSelectedCard] = useState({}); // выбранная карточка при клике на фото
    const [email, setEmail] = useState('');

    const [isInfoTipOpen, setIsInfoTipOpen] = useState(false);
    const [infoTipStatus, setInfoTipStatus] = useState(false);
    const [infoTipMessage, setInfoTipMessage] = useState('');

    //const { lockScroll, unlockScroll } = useScrollLock();
    const lastElement = useRef(); // скрытый дивчик, он нужен для бесконечной ленты
    const observer = useRef(); // сохраняем observer
    // const history = useHistory();

    const limit = 16; // количество карточек на странице
    const searchedCards = useMemo(() => {
        // поиск кроссовок по названию
        // сохраняем результат, чтобы он каждый раз не вычислялся
        return items.filter((card: any) =>
            card.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, items]);
    const sortItems = (sort: any) => {
        setSelectedSort(sort);
        {
            sort === 'ascending' &&
                setItems([...items].sort((a, b) => a['price'] - b['price']));
        }
        {
            sort === 'descending' &&
                setItems([...items].sort((a, b) => b['price'] - a['price']));
        }
    };

    useEffect(() => {
        // подгрузка карточек
        setTotalPages(Math.ceil(100 / limit));
        setIsLoading(true);
        api.getInitialItems('items', limit, page)
            .then((response) => setItems([...items, ...response]))
            .finally(() => setIsLoading(false));
    }, [page]); // когда меняется страница, подгружаем новую порцию карточек

    return (
        <Home
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchedCards={searchedCards}
            onAddToCart={() => {}}
            onAddToFavorites={() => {}}
            onOpenCart={() => {}}
            isLoading={isLoading}
            cardsCount={items.length}
            selectedSort={selectedSort}
            sortItems={sortItems}
            email={email}
        />
    );
}
