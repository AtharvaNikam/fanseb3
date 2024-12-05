import { useEffect, useState } from "react";
import { Box, Grid, IconButton, Dialog, DialogActions, Button } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList"; // Import the filter icon
import ProductList from "./product-list";
import { useResponsive } from "src/hooks/use-responsive";
import Filters from "./filters";
import axiosInstance from "src/utils/axios";
import CartIcon from "../common/cart-icon";

export default function ProductListView() {
    const isMdUp = useResponsive('up', 'md');
    const [openFiltersDialog, setOpenFiltersDialog] = useState(false); // State to control dialog visibility
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState();

    const fetchProductsData = async ({ categoryId, priceRange, sortBy, discount, page, limit } = {}) => {
        try {
            let data = { 
                page : page || 1, 
                limit : limit || 16 }; // include page and limit in the data object

            console.log(data);
    
            if (categoryId) {
                data.categoryId = Number(categoryId);
            }
            if (priceRange) {
                data.priceRange = priceRange;
            }
            if (sortBy) {
                data.sortBy = sortBy;
            }
            if (discount) {
                data.discount = discount;
            }
    
            const response = await axiosInstance.post('/filtered-products', data); // send page and limit as part of the data payload
    
            if (response?.data?.success) {
                console.log('response', response);
                setData(response?.data?.data); // update state with paginated product data
                setTotalPages(response?.data?.totalPages);
            }
        } catch (error) {
            console.log('error while fetching filtered products', error);
        }
    };
    

    useEffect(()=>{
        fetchProductsData();
    },[])

    const handleOpenDialog = () => {
        setOpenFiltersDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenFiltersDialog(false);
    };

    const handleApplyFilters = () => {
        // Logic to apply filters can be added here
        handleCloseDialog();
    };

    return (
        <>
            <CartIcon />
            <Box
                component="div"
                sx={{
                    width: '100%',
                    maxWidth: !isMdUp ? '100%' : '1150px',
                    margin: 'auto',
                    marginTop: isMdUp ? '' : '10px',
                    padding: !isMdUp ? '2%' : '40px',
                }}
            >
                {/* Icon Button for mobile view */}
                {!isMdUp && (
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            justifyContent: 'flex-end', 
                            marginTop: '16px' // Add some space above the icon
                        }}
                    >
                        <IconButton
                            onClick={handleOpenDialog}
                            sx={{
                                backgroundColor: '#7635dc', // Customize background color
                                color: '#fff', // Customize icon color
                                marginRight: '10px',
                                marginBottom : '10px'
                            }}
                        >
                            <FilterListIcon />
                        </IconButton>
                    </Box>
                )}
                <Grid container spacing={1.5}>
                    {isMdUp && (
                        // for desktop only
                        <Grid item md={3}>
                            <Filters fetchProductData={(categoryId, priceRange) => fetchProductsData(categoryId, priceRange)}/>
                        </Grid>
                    )}
                    <Grid item md={9} xs={12}>
                        <ProductList productData={data} totalPagesCount={totalPages} fetchProductsData = {fetchProductsData}/>
                    </Grid>
                </Grid>
            </Box>

            {/* Filters Dialog */}
            <Dialog
                open={openFiltersDialog}
                onClose={handleCloseDialog}
                fullWidth // Enable full width
                maxWidth="lg" // Set the maximum width to large (optional)
            >
                <Box sx={{ padding: '16px' }}>
                    <Filters fetchProductData={(categoryId, priceRange) => fetchProductsData(categoryId, priceRange)}/>
                </Box>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>
                    <Button onClick={handleApplyFilters} color="primary">
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
