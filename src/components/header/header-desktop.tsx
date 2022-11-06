import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Actions from './actions';
import { HeaderContainer, Header, MyList } from '../../style/header';

export default function AppbarDesktop({ matches }: { matches: boolean }) {
    return (
        <HeaderContainer>
            <Header variant="h4">My Bags</Header>
            <MyList type="row">
                <ListItemText primary="Home" />
                <ListItemText primary="Categories" />
                <ListItemText primary="Products" />
                <ListItemText primary="About us" />
                <ListItemText primary="Contact us" />
                <ListItemButton onClick={() => {}}>
                    <ListItemIcon>
                        <SearchIcon />
                    </ListItemIcon>
                </ListItemButton>
            </MyList>
            <Actions matches={matches} />
        </HeaderContainer>
    );
}
