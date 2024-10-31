import { useCallback, useEffect, useState } from "react";
import axiosInstance from "src/utils/axios";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Typography,
    Slider,
    List,
    ListItem,
    RadioGroup,
    FormControlLabel,
    Radio
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Filters({fetchProductData}) {
    const [categoryData, setCategoryData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(10000);
    const [selectedDiscount, setSelectedDiscount] = useState('');
    const [selectedSorting, setSelectedSorting] = useState('');

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/api/categories');
            if (response?.data) {
                const categories = response.data;
    
                // Step 1: Find the root category and access its children
                const rootCategory = categories.find(category => category.name === 'Root');
                const children = rootCategory?.children || [];

                console.log(children);
    
                // Step 2: Collect IDs of all child categories (including grandchildren)
                const childCategoryIds = new Set();
                children.forEach(child => {
                    childCategoryIds.add(child.id);
                    if (child.children && child.children.length) {
                        child.children.forEach(grandchild => {
                            childCategoryIds.add(grandchild.id);
                        });
                    }
                });
                
                console.log(childCategoryIds);

                // Step 3: Filter out categories that are already in the child category list
                const purelyFilteredCategories = categories.filter(
                    category => !childCategoryIds.has(category.id) && category.id !== rootCategory.id // Exclude root
                );

                console.log(children);
    
                // Step 4: Set the filtered categories in state
                setCategoryData(children);
            }
        } catch (error) {
            console.log('Error in fetching categories', error);
        }
    };
    

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const formattedPriceRange = {
            min: priceRange[0],
            max: priceRange[1]
        };

        // Only trigger fetchProductData if there's a meaningful change
        if ( priceRange[0] !== minValue || priceRange[1] !== maxValue ) {
            fetchProductData({
                categoryId: selectedCategory,
                priceRange: formattedPriceRange,
                discount: selectedDiscount,
                sortBy: selectedSorting
            });

            // Update minValue and maxValue refs to avoid retriggering
            setMinValue(priceRange[0]);
            setMaxValue(priceRange[1]);
        }
    }, [priceRange]);
    
    useEffect(() => {
        const formattedPriceRange = {
            min: priceRange[0],
            max: priceRange[1]
        };
        fetchProductData({
            categoryId: selectedCategory,
            priceRange: formattedPriceRange,
            discount: selectedDiscount,
            sortBy: selectedSorting
        });
    }, [ selectedCategory, selectedDiscount, selectedSorting ]);
    
    const handleSelectedCategory = (id) => {
        setSelectedCategory(id);
    }
    const handlePriceChange = (event, newValue) => {
        setMinValue(priceRange[0]);
        setMaxValue(priceRange[1]);
        setPriceRange(newValue);
    };

    const handleDiscountChange = (event) => {
        setSelectedDiscount(event.target.value);
    };

    const handleSortingChange = (event) => {
        setSelectedSorting(event.target.value);
    };

    const resetFilters = () => {
        setSelectedCategory(null);
        setPriceRange([0, 10000]);
        setSelectedDiscount('');
        setSelectedSorting('');
    };
    
    console.log(selectedCategory);
    return (
        <>
             <Box
                component="div"
                sx={{
                    padding: '10px 0', // Adjusted padding
                    marginRight : '10px'
                }}
            >
                <Box
                    component="div"
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0 10px'
                    }}
                >
                    <Typography variant="body1">Filters</Typography>
                    <Typography onClick = {() => resetFilters()} variant="body1" sx={{ cursor: 'pointer' }}>Reset</Typography>
                </Box>

                {/* Categories Section */}
                <Accordion disableGutters square sx={{ boxShadow: 'none', marginTop: 2, padding: 0 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Categories</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: '0px 10px', boxShadow: 'none' }}>
                    {categoryData.map((category) => (
                        <Accordion key={category.id} disableGutters square sx={{ boxShadow: 'none', marginBottom: 1, padding: 0 }}>
                            <AccordionSummary
                                expandIcon={category.children && category.children.length > 0 ? <ExpandMoreIcon /> : null}
                                sx={{ padding: '0 10px' }}
                            >
                                <Typography
                                    onClick={() => handleSelectedCategory(category.id)}
                                    variant="body1"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: selectedCategory === category.id ? '#7635dc' : 'inherit'
                                    }}
                                >
                                    {category.name}
                                </Typography>
                            </AccordionSummary>
                            {category.children && category.children.length > 0 && (
                                <AccordionDetails sx={{ padding: '0 10px' }}>
                                    {category.children.map((child) => (
                                        <Typography
                                            onClick={() => handleSelectedCategory(child.id)}
                                            key={child.id}
                                            variant="body2"
                                            sx={{
                                                marginLeft: 2,
                                                color: selectedCategory === child.id ? '#7635dc' : 'text.secondary',
                                                cursor : 'pointer'
                                            }}
                                        >
                                            {child.name}
                                        </Typography>
                                    ))}
                                </AccordionDetails>
                            )}
                        </Accordion>
                    ))}
                </AccordionDetails>
            </Accordion>

                {/* Separation Line */}
                <Box sx={{ borderBottom: '2px solid #7635dc', margin: '10px 0' }} />

                {/* Price Range Section */}
                <Box sx={{ padding: '8px 14px' }}>
                    <Typography
                        sx={{
                            fontSize: '18px',
                            fontFamily: 'var(--primaryFont)',
                            fontWeight: 'bold',
                            display: 'flex',
                            justifyContent: 'left'
                        }}
                    >
                        Price Range
                    </Typography>
                    <Slider
                        value={priceRange}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={10000}
                        step={10}
                        aria-labelledby="price-range-slider"
                        sx={{ mt: 2 }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, px: '4px' }}>
                        <Typography>Min: ₹{priceRange[0]}</Typography>
                        <Typography>Max: ₹{priceRange[1]}</Typography>
                    </Box>
                </Box>
                
                {/* Separation Line */}
                <Box sx={{ borderBottom: '2px solid #7635dc', margin: '10px 0' }} />

                {/* Sorting Section */}
                <Box sx={{ py: '16px', px: '8px' }}> {/* Increased padding */}
                    <Typography
                        sx={{
                            fontSize: '18px',
                            fontFamily: 'var(--primaryFont)',
                            fontWeight: 'bold',
                            display: 'flex',
                            justifyContent: 'left',
                        }}
                    >
                        Sort By
                    </Typography>
                    <RadioGroup value={selectedSorting} onChange={handleSortingChange}>
                        <List>
                            <ListItem sx={{ padding: '0px 8px', display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                                <FormControlLabel value="priceAsc" control={<Radio sx={{ width: '20px', height: '20px' }} />} label="Price: Low to High" />
                            </ListItem>
                            <ListItem sx={{ padding: '0px 8px', display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                                <FormControlLabel value="priceDesc" control={<Radio sx={{ width: '20px', height: '20px' }} />} label="Price: High to Low" />
                            </ListItem>
                        </List>
                    </RadioGroup>
                </Box>
            </Box>
            <style>
            {`.css-igpcv9-MuiPaper-root-MuiAccordion-root.Mui-expanded {
                    box-shadow: none !important;
                    border-radius: 0 !important; /* Use 0 instead of 'none' */
                    background-color: transparent !important; /* Ensure it's applied */
                }`}
            </style>
        </>
    );
}
