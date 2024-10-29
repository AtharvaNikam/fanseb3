import { Box } from "@mui/material";
import ProductList from "./product-list";
import { useResponsive } from "src/hooks/use-responsive";

export default function ProductListView(){
    const isMdUp = useResponsive('up', 'md');
    return(
        <>
            <Box
                component = {'div'}
                sx = {{
                    width : '100%',
                    maxWidth : !isMdUp ? '100%' : '1000px',
                    margin : 'auto',
                    padding :  !isMdUp ? '2%' : '40px',
                }}
            >
                <ProductList />
            </Box>
        </>
    )
} 