import { useCallback } from 'react';
// redux
import {
  addAddress,
  addToCart,
  applyDiscount,
  applyShipping,
  applyTax,
  backStep,
  createBilling,
  decreaseQuantity,
  deleteCart,
  gotoStep,
  increaseQuantity,
  nextStep,
  resetCart,
  updateReelId,
} from 'src/redux/slices/checkout';
import { useDispatch, useSelector } from 'src/redux/store';
// _mock
import { PRODUCT_CHECKOUT_STEPS } from 'src/_mock/_product';
// routes
import { useRouter } from 'src/routes/hook';

// ----------------------------------------------------------------------

export default function useCheckout() {
  const dispatch = useDispatch();

  const router = useRouter();

  const checkout = useSelector((state) => state.checkout);

  const completed = checkout.activeStep === PRODUCT_CHECKOUT_STEPS.length;

  // const onUpdateReelId = useCallback(
  //   (reelId) => {
  //     console.log('🚀 ~ Reel ID:', reelId);
  //     dispatch(c(reelId));
  //   },
  //   [dispatch]
  // );
  const onUpdateReelId = useCallback(
    (id) => {
      dispatch(updateReelId(id));
    },
    [dispatch]
  );

  const onNextStep = useCallback(() => {
    dispatch(nextStep());
  }, [dispatch]);

  const onBackStep = useCallback(() => {
    dispatch(backStep());
  }, [dispatch]);

  const onGotoStep = useCallback(
    (step) => {
      dispatch(gotoStep(step));
    },
    [dispatch]
  );

  const onDeleteCart = useCallback(
    (productId) => {
      dispatch(deleteCart(productId));
    },
    [dispatch]
  );

  const onIncreaseQuantity = useCallback(
    (productId) => {
      dispatch(increaseQuantity(productId));
    },
    [dispatch]
  );

  const onDecreaseQuantity = useCallback(
    (productId) => {
      dispatch(decreaseQuantity(productId));
    },
    [dispatch]
  );

  const onCreateBilling = useCallback(
    (address) => {
      dispatch(createBilling(address));
      dispatch(nextStep());
    },
    [dispatch]
  );

  const onResetBilling = useCallback(() => {
    dispatch(createBilling(null));
  }, [dispatch]);

  const onAddAddress = useCallback(
    (address) => {
      dispatch(addAddress(address));
    },
    [dispatch]
  );

  const onResetAddress = useCallback(() => {
    dispatch(addAddress(null));
  }, [dispatch]);

  const onAddCart = useCallback(
    (newProduct) => {
      dispatch(addToCart(newProduct));
    },
    [dispatch]
  );

  const onApplyDiscount = useCallback(
    (value) => {
      if (checkout.cart.length) {
        dispatch(applyDiscount(value));
      }
    },
    [checkout.cart.length, dispatch]
  );

  const onApplyTax = useCallback(
    (value) => {
      dispatch(applyTax(value));
    },
    [dispatch]
  );

  const onApplyShipping = useCallback(
    (value) => {
      dispatch(applyShipping(value));
    },
    [dispatch]
  );

  const onResetAll = useCallback(() => {
    if (completed) {
      dispatch(resetCart());
      router.replace('/');
    }
  }, [completed, dispatch, router]);

  return {
    checkout,
    completed,
    //
    onUpdateReelId,
    onResetAll,
    onAddCart,
    onGotoStep,
    onNextStep,
    onBackStep,
    onDeleteCart,
    onAddAddress,
    onResetBilling,
    onResetAddress,
    onCreateBilling,
    onApplyDiscount,
    onApplyTax,
    onApplyShipping,
    onIncreaseQuantity,
    onDecreaseQuantity,
  };
}
