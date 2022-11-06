import React from 'react';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import HeaderMobile from './header-mobile';
import HeaderDesktop from './header-desktop';

export default function Header() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <>
            {matches ? (
                <HeaderMobile matches={matches} />
            ) : (
                <HeaderDesktop matches={matches} />
            )}
        </>
    );
}
