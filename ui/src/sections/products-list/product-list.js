import { useCallback, useEffect, useState } from "react";
import ProductCard from "./product-card";
import { useResponsive } from "src/hooks/use-responsive";
import axiosInstance from "src/utils/axios";
import { Grid, Pagination, Box, CircularProgress } from "@mui/material";
import { useRouter } from "src/routes/hook";

export default function ProductList() {
  const isMdUp = useResponsive('up', 'md');
  const router = useRouter();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 16;

  const handleViewProductDetails = useCallback(
    (productId, brandId) => {
      router.push(`/brand/${brandId}/product/${productId}`);
    },
    [router]
  );

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/products?page=${page}&limit=${itemsPerPage}`);
      if (response.data) {
        setData(prevData => (page === 1 ? response.data : [...prevData, ...response.data]));
        setTotalPages(response.data.totalPages || 1);
        console.log("Fetched products:", response.data.items); // Debug log
      } else {
        console.log("No items found in response:", response.data); // Debug log
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    fetchProducts(value);
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, []);

  return (
    <Box>
      {loading ? (
        <Box display="flex" justifyContent="center" my={2}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={2}>
            {data?.map((item) => (
              <Grid key={item.id} item xs={6} md={3} lg={3}>
                <ProductCard
                  product={item}
                  handleViewProductDetails={() => handleViewProductDetails(item.id, item.brandId)}
                />
              </Grid>
            ))}
          </Grid>

          {isMdUp && (
            <Box display="flex" justifyContent="center" my={2}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
