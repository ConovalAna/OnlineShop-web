import React from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from '@mui/material';
import FileUpload from 'react-mui-fileuploader';
import StockTable from './stock-table';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ProductModel, StockModel } from '../../../models/product.d';
import {
    fetchProductCategories,
    fetchProductDeliveryMethods,
} from '../../../api/StoreApi';
import { useQuery } from 'react-query';

interface ProductFieldsProps {
    product?: ProductModel;
    onSubmitCallback?: (product: ProductModel) => void;
}
export default function ProductFields({
    product,
    onSubmitCallback = (product: ProductModel) => {},
    ...props
}: ProductFieldsProps) {
    const [delivery, setDelivery] = React.useState<string[]>([]);
    const [category, setCategory] = React.useState('');

    const [stock, setStock] = React.useState<StockModel[]>([]);

    const productCategories = useQuery({
        queryKey: ['productCategories'],
        queryFn: fetchProductCategories,
    });

    const productDeliveryMethods = useQuery({
        queryKey: ['productDeliveryMethods'],
        queryFn: fetchProductDeliveryMethods,
    });

    const handleChange = (event: SelectChangeEvent<typeof delivery>) => {
        const {
            target: { value },
        } = event;
        setDelivery(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        );
    };

    const formik = useFormik({
        initialValues: {
            name: product?.name,
            descriptions: product?.descriptions,
            metaKeywords: product?.metaKeywords,
            price: product?.price,
            discountAmount: product?.discountAmount,
            discountPercent: product?.discountPercent,
            vatAmount: product?.vatAmount,
            provider: product?.provider,
            barcode: product?.barcode,
        },
        validationSchema: Yup.object({
            // name: Yup.string().max(562).required('Product name is required'),
            // provider: Yup.string()
            //     .max(100)
            //     .required('Product type is required'),
            // category: Yup.string()
            //     .max(100)
            //     .required('Product category is required'),
            // descriptions: Yup.string()
            //     .max(1000)
            //     .required('Product descriptions is required'),
            // metaKeywords: Yup.string()
            //     .max(1000)
            //     .required('Product meta keywords is required'),
            // price: Yup.number().required('Product price is required'),
            // discountAmount: Yup.number(),
            // discountPercent: Yup.number(),
            // vatAmount: Yup.number(),
            // barcode: Yup.string()
            //     .max(100)
            //     .required('Product category is required'),
        }),

        onSubmit: () => {
            const product: ProductModel = {
                name: formik.values.name,
                category: category,
                descriptions: formik.values.descriptions,
                metaKeywords: formik.values.metaKeywords,
                price: formik.values.price,
                discountAmount: formik.values.discountAmount,
                discountPercent: formik.values.discountPercent,
                vatAmount: formik.values.vatAmount,
                provider: formik.values.provider,
                barcode: formik.values.barcode,
                deliveryMethod: delivery,
                stock: stock,
            };
            onSubmitCallback(product);
        },
    });

    const handleFileUploadError = (error: any) => {
        // Do something...
    };

    const handleFilesChange = (files: any) => {
        // Do something...
    };
    return (
        <Box {...props} sx={{ mt: 3 }}>
            <Card>
                <CardContent>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid
                            container
                            rowSpacing={2}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        >
                            <Grid item xs={6} md={4}>
                                <TextField
                                    required
                                    id="outlined-basic"
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    error={Boolean(
                                        formik.touched.name &&
                                            formik.errors.name
                                    )}
                                    helperText={
                                        formik.touched.name &&
                                        formik.errors.name
                                    }
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    name="name"
                                    value={formik.values.name}
                                />
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <TextField
                                    required
                                    id="outlined-basic"
                                    label="Provider"
                                    variant="outlined"
                                    fullWidth
                                    error={Boolean(
                                        formik.touched.provider &&
                                            formik.errors.provider
                                    )}
                                    helperText={
                                        formik.touched.provider &&
                                        formik.errors.provider
                                    }
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.provider}
                                    name="provider"
                                />
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                        Category
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={category}
                                        name="category"
                                        label="Category"
                                        onChange={(
                                            event: SelectChangeEvent
                                        ) => {
                                            setCategory(
                                                event.target.value as string
                                            );
                                        }}
                                    >
                                        {productCategories.data?.map(
                                            (category) => (
                                                <MenuItem
                                                    value={category.categoryId}
                                                >
                                                    {category.name}
                                                </MenuItem>
                                            )
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    required
                                    id="outlined-basic"
                                    label="Description"
                                    variant="outlined"
                                    name="descriptions"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    error={Boolean(
                                        formik.touched.descriptions &&
                                            formik.errors.descriptions
                                    )}
                                    helperText={
                                        formik.touched.descriptions &&
                                        formik.errors.descriptions
                                    }
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.descriptions}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    required
                                    id="outlined-basic"
                                    label="Meta Keywords"
                                    variant="outlined"
                                    name="metaKeywords"
                                    fullWidth
                                    error={Boolean(
                                        formik.touched.metaKeywords &&
                                            formik.errors.metaKeywords
                                    )}
                                    helperText={
                                        formik.touched.metaKeywords &&
                                        formik.errors.metaKeywords
                                    }
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.metaKeywords}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Divider
                                    orientation="horizontal"
                                    variant="fullWidth"
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Typography sx={{ m: 1 }} variant="h5">
                                    Pricing
                                </Typography>
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <TextField
                                    required
                                    id="outlined-basic"
                                    label="Price"
                                    name="price"
                                    variant="outlined"
                                    fullWidth
                                    error={Boolean(
                                        formik.touched.price &&
                                            formik.errors.price
                                    )}
                                    helperText={
                                        formik.touched.price &&
                                        formik.errors.price
                                    }
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="number"
                                    value={formik.values.price}
                                />
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <TextField
                                    required
                                    id="outlined-basic"
                                    label="Discount Amount"
                                    variant="outlined"
                                    name="discountAmount"
                                    fullWidth
                                    error={Boolean(
                                        formik.touched.discountAmount &&
                                            formik.errors.discountAmount
                                    )}
                                    helperText={
                                        formik.touched.discountAmount &&
                                        formik.errors.discountAmount
                                    }
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="number"
                                    value={formik.values.discountAmount}
                                />
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <TextField
                                    required
                                    id="outlined-basic"
                                    label="Discount Percent"
                                    name="discountPercent"
                                    variant="outlined"
                                    fullWidth
                                    error={Boolean(
                                        formik.touched.discountPercent &&
                                            formik.errors.discountPercent
                                    )}
                                    helperText={
                                        formik.touched.discountPercent &&
                                        formik.errors.discountPercent
                                    }
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="number"
                                    value={formik.values.discountPercent}
                                />
                            </Grid>

                            <Grid item xs={6} md={4}>
                                <TextField
                                    required
                                    id="outlined-basic"
                                    label="Vat Amount"
                                    variant="outlined"
                                    name="vatAmount"
                                    fullWidth
                                    error={Boolean(
                                        formik.touched.vatAmount &&
                                            formik.errors.vatAmount
                                    )}
                                    helperText={
                                        formik.touched.vatAmount &&
                                        formik.errors.vatAmount
                                    }
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="number"
                                    value={formik.values.vatAmount}
                                />
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <TextField
                                    required
                                    id="outlined-basic"
                                    label="Barcode"
                                    variant="outlined"
                                    name="barcode"
                                    fullWidth
                                    error={Boolean(
                                        formik.touched.barcode &&
                                            formik.errors.barcode
                                    )}
                                    helperText={
                                        formik.touched.barcode &&
                                        formik.errors.barcode
                                    }
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.barcode}
                                />
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-multiple-checkbox-label">
                                        Delivery methods
                                    </InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={delivery}
                                        onChange={handleChange}
                                        input={
                                            <OutlinedInput label="Delivery methods" />
                                        }
                                        renderValue={(selected) =>
                                            selected.join(', ')
                                        }
                                    >
                                        {productDeliveryMethods?.data?.map(
                                            (del) => (
                                                <MenuItem
                                                    key={del.deliveryTypeId}
                                                    value={del.deliveryName}
                                                >
                                                    <Checkbox
                                                        checked={
                                                            delivery.indexOf(
                                                                del.deliveryName
                                                            ) > -1
                                                        }
                                                    />
                                                    <ListItemText
                                                        primary={
                                                            del.deliveryName
                                                        }
                                                    />
                                                </MenuItem>
                                            )
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Divider
                                    orientation="horizontal"
                                    variant="fullWidth"
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Typography sx={{ m: 1 }} variant="h5">
                                    Inventory
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <StockTable
                                    onChangeStock={(stock) => {
                                        setStock(stock);
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <Divider
                                    orientation="horizontal"
                                    variant="fullWidth"
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Typography sx={{ m: 1 }} variant="h5">
                                    Product images
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <FileUpload
                                    multiFile={true}
                                    disabled={false}
                                    title="Upload here images"
                                    header="[Drag to drop]"
                                    leftLabel="or"
                                    rightLabel="to select files"
                                    buttonLabel="click here"
                                    buttonRemoveLabel="Remove all"
                                    maxFileSize={10}
                                    maxUploadFiles={0}
                                    maxFilesContainerHeight={357}
                                    errorSizeMessage={
                                        'fill it or move it to use the default error message'
                                    }
                                    allowedExtensions={['jpg', 'jpeg', 'png']}
                                    onFilesChange={handleFilesChange}
                                    onError={handleFileUploadError}
                                    imageSrc={
                                        '../../../asset/resource/img/png-transparent-t-shirt-clothes.png'
                                    }
                                    bannerProps={{
                                        elevation: 0,
                                        variant: 'outlined',
                                    }}
                                    containerProps={{
                                        elevation: 0,
                                        variant: 'outlined',
                                    }}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={12}
                                container
                                justifyContent="flex-end"
                            >
                                <Button color="error" variant="contained">
                                    Reset
                                </Button>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                    onClick={() => {
                                        formik.submitForm();
                                    }}
                                >
                                    Save product
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}
