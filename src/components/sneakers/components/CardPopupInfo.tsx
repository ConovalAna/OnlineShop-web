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

export default function CardPopupInfo({ card }: any) {
    const [size, setSize] = React.useState('');
    const [count, setCount] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSize(event.target.value as string);
        console.log(card);
    };

    const handleChangeCount = (event: SelectChangeEvent) => {
        setCount(event.target.value as string);
        console.log(card);
    };

    const dispatch = useDispatch();

    const cartHandler = () => dispatch(addToCart(card));

    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Carousel>
                    {card.imagesUrl.map((url: any) => (
                        <img src={url} className="card-button__images" />
                    ))}
                </Carousel>
            </Grid>
            <Grid item xs={6}>
                <Grid
                    xs={12}
                    container
                    spacing={{ xs: 2, md: 3 }}
                    direction="column"
                    justifyContent="space-between"
                    sx={{ height: 1 }}
                >
                    <Grid item xs={6}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-around"
                            alignItems="center"
                        >
                            <Grid item xs={12}>
                                <p>{card.name}</p>
                            </Grid>
                            <Grid item xs={12}>
                                <hr className="divider" />
                            </Grid>
                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        minWidth: 70,
                                        maxWidth: 120,
                                    }}
                                >
                                    <p>{card.description}</p>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <hr className="divider" />
                            </Grid>
                            {/* {ColorContainer} */}
                            {/* {SizeContainer}
                    {BuySection} */}
                            <Grid item xs={12} direction="row" display="flex">
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
                                <Box
                                    sx={{
                                        minWidth: 120,
                                        maxWidth: 220,
                                        paddingLeft: 3,
                                    }}
                                >
                                    <FormControl fullWidth>
                                        <InputLabel id="count-select-label">
                                            Count
                                        </InputLabel>
                                        <Select
                                            labelId="count-select-label"
                                            id="count-select"
                                            value={count}
                                            label="Count"
                                            onChange={handleChangeCount}
                                        >
                                            <MenuItem value={10}>1</MenuItem>
                                            <MenuItem value={20}>2</MenuItem>
                                            <MenuItem value={30}>3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid
                            item
                            xs={12}
                            direction="row"
                            display="flex"
                            justifyContent="space-between"
                        >
                            <Button variant="text">sum</Button>
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
        </Grid>
    );
}
