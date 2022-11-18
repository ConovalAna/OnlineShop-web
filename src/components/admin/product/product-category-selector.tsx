import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useProductCategoriesQuery } from '../../../api/use-store-api';
import { ICategory } from '../../../api/store-api.d';

interface ProductCategorySelectorProps {
    onChangeCategoryId: (categoryId: number) => void;
}

interface CategoryDropdownDetails {
    index: number;
    selectedCategoryId: string;
    selectOptions: ICategory[];
}

export default function ProductCategorySelector({
    onChangeCategoryId,
}: ProductCategorySelectorProps) {
    const [categoriesDropDetail, setCategoriesDropDetail] = useState<
        CategoryDropdownDetails[]
    >([]);
    const productCategories = useProductCategoriesQuery();

    useEffect(() => {
        const parentCategories =
            productCategories.data?.filter(
                (category) => category.parentCategoryId == null
            ) ?? [];
        setCategoriesDropDetail([
            {
                index: 0,
                selectedCategoryId: '',
                selectOptions: parentCategories,
            },
        ]);
    }, [productCategories.data]);

    useEffect(() => {
        let lastElement = categoriesDropDetail
            .slice()
            .reverse()
            .find((c) => c.selectedCategoryId !== '');

        if (!!lastElement) {
            onChangeCategoryId(parseInt(lastElement.selectedCategoryId));
        }
    }, [categoriesDropDetail]);

    const changeCategoryId = (index: number, categoryId: string) => {
        setCategoriesDropDetail((catDetail) => {
            catDetail[index].selectedCategoryId = categoryId;
            if (catDetail.length > index + 1) {
                catDetail.splice(index + 1, catDetail.length);
            }

            const childCategories =
                productCategories.data?.filter(
                    (category) =>
                        `${category.parentCategoryId}` ===
                        `${catDetail[index].selectedCategoryId}`
                ) ?? [];
            if (childCategories.some((c) => !!c))
                catDetail.push({
                    index: index + 1,
                    selectedCategoryId: '',
                    selectOptions: childCategories,
                });
            return [...catDetail];
        });
    };

    const renderCategoryDropDown = (
        categoryDropDetails: CategoryDropdownDetails
    ) => {
        return (
            <FormControl key={categoryDropDetails.index}>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                    labelId="category-select-label"
                    id="category-select"
                    value={categoryDropDetails.selectedCategoryId}
                    name="category"
                    label="Category"
                    onChange={(event: SelectChangeEvent) => {
                        changeCategoryId(
                            categoryDropDetails.index,
                            event.target.value as string
                        );
                    }}
                >
                    {categoryDropDetails.selectOptions?.map((category) => (
                        <MenuItem value={category.categoryId}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    };

    return (
        <>
            {categoriesDropDetail.map((catDropDet) =>
                renderCategoryDropDown(catDropDet)
            )}
        </>
    );
}
