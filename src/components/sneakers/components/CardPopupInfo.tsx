import * as React from 'react';
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { addToCart } from '../../../store/cart/cartSlice';
import { useDispatch } from 'react-redux';

export default function CardPopupInfo({ card, images }: any) {
    const [size, setSize] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSize(event.target.value as string);
        console.log(card);
    };
    const dispatch = useDispatch();

    const cartHandler = () => dispatch(addToCart(card));

    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                {/* <Box
                    component="img"
                    sx={{
                        height: 350,
                        maxHeight: { xs: 350, md: 350 },
                    }}
                    alt={card.title}
                    src={card.imagesUrl[0]}
                />
            </Grid>
            <Grid item>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                >
                    <Grid item>
                        <Box
                            sx={{
                                minWidth: 70,
                                maxWidth: 120,
                            }}
                        >
                            <FormControl fullWidth>
                                <InputLabel id="size-select-label">
                                    Size
                                </InputLabel>
                                <Select
                                    labelId="size-select-label"
                                    id="size-select"
                                    value={size}
                                    label="Size"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={20}>20</MenuItem>
                                    <MenuItem value={30}>30</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Button
                            onClick={cartHandler}
                            variant="outlined"
                            startIcon={<AddShoppingCartIcon />}
                        >
                            Add to cart
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
