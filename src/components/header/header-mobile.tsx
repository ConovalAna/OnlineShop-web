import React from 'react';
import { HeaderContainer, Header } from '../../style/header';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Actions from './actions';
import { IconButton } from '@mui/material';

export default function HeaderMobile({ matches }: { matches: boolean }) {
    return (
        <HeaderContainer>
            <IconButton onClick={() => {}}>
                <MenuIcon />
            </IconButton>
            <Header textAlign={'center'} variant="h4">
                My Bags
            </Header>
            <IconButton onClick={() => {}}>
                <SearchIcon />
            </IconButton>
            <Actions matches={matches} />
        </HeaderContainer>
    );
}
