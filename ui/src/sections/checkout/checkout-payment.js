import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
// components
import FormProvider from 'src/components/hook-form';
//
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, Grid, useTheme } from '@mui/material';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useAuthContext } from 'src/auth/hooks';
import Iconify from 'src/components/iconify';
import { HOST_API } from 'src/config-global';
import { useRouter } from 'src/routes/hook';
import axiosInstance from 'src/utils/axios';
import CheckoutBillingInfo from './checkout-billing-info';
import CheckoutBillingNumber from './checkout-billing-number';
import CheckoutDelivery from './checkout-delivery';
import CheckoutPaymentMethods from './checkout-payment-methods';
import CheckoutSummary from './checkout-summary';

// ----------------------------------------------------------------------

const PAYMENT_OPTIONS = [
  {
    value: 'PHONEPE',
    label: 'Pay with PhonePe',
    description: 'You will be redirected to PayPal website to complete your purchase securely.',
  },

  {
    value: 'CASH_ON_DELIVERY',
    label: 'Cash',
    description: 'Pay with cash when your order is delivered.',
  },
];

const CARDS_OPTIONS = [
  { value: 'ViSa1', label: '**** **** **** 1212 - Jimmy Holland' },
  { value: 'ViSa2', label: '**** **** **** 2424 - Shawn Stokes' },
  { value: 'MasterCard', label: '**** **** **** 4545 - Cole Armstrong' },
];

export default function CheckoutPayment({
  userCheck,
  checkout,
  onReset,
  onResetAddress,
  onNextStep,
  onBackStep,
  onGotoStep,
  onApplyShipping,
  onApplyTax,
  onApplyDiscount,
  paymentInProgress,
}) {
  const {
    total,
    discount,
    subTotal,
    discountedSubTotal,
    shipping,
    taxAmount,
    taxRate,
    billing,
    cart,
  } = checkout;

  const router = useRouter();
  const { user } = useAuthContext();

  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [taxClasses, setTaxClasses] = useState([]);

  const [merchantTransactionId, setMerchantTransactionId] = useState('');

  const PaymentSchema = !userCheck
    ? Yup.object().shape({
        payment: Yup.string().required('Payment is required!'),
      })
    : Yup.object().shape({
        phoneNumber: Yup.string()
          .required('Phone Number is required!')
          .min(13, 'Phone Number must be 10 digits!'),
        // phoneNumberUpdate: Yup.string()
        //   .required('Phone Number is required!')
        //   .min(13, 'Phone Number must be 10 digits!'),
        otp: Yup.string().required('OTP is required!').min(6, 'OTP must be 6 digits!'),
        payment: Yup.string().required('Payment is required!'),
      });

  const defaultValues = {
    delivery: shipping,
    payment: '',
    phoneNumber: '',
    phoneNumberUpdate: '',
    verificationStatus: { phoneNumber: '', isVerified: false, verificationSid: '' },
  };

  const methods = useForm({
    resolver: yupResolver(PaymentSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    trigger,
  } = methods;
  const onSubmit = handleSubmit(async (data) => {
    trigger();

    try {
      console.log(cart);
      const inputData = {
        contact: !userCheck ? user?.contactNo : data?.verificationStatus?.phoneNumber,
        salesTax: taxAmount,
        paidTotal: total,
        total,
        subTotal,
        discount,
        paymentGateway: data.payment,
        shippingAddress: billing.fullAddress,
        billingAddress: billing.fullAddress,
        deliveryFee: shipping,
        userId: !userCheck && user.id,
        products: cart.map((item) => ({
          id: item.id,
          brandId: item.brandId,
          influencerId: Number(item.influencerId),
          name: item.name,
          description: item.description,
          price: item.price,
          sale_price: item.sale_price,
          min_price: item.min_price,
          max_price: item.max_price,
          sku: item.sku,
          inStock: item.inStock,
          isTaxable: item.isTaxable,
          status: item.status,
          productType: item.productType,
          unit: item.unit,
          height: item.height,
          width: item.width,
          length: item.length,
          quantity: item.quantity,
          inventoryQuantity: item.inventoryQuantity,
        })),
      };

      console.log(inputData);
      const res = await axiosInstance.post(`/orders`, inputData);
      if (res.data.success === false) {
        enqueueSnackbar(res.data.message, {
          variant: 'error',
        });
        return;
      }
      console.log('🚀 Order Created');
      if (inputData.paymentGateway === 'PHONEPE') {
        console.log('🚀 Payment Initiated');
        const inputDataForPayment = {
          price: total,
          redirectUrl: 'http://localhost:3030/checkout',
        };
        const res1 = await axiosInstance.post(`/initiatePhonePePayment`, inputDataForPayment);
        if (res1.data.success === false) {
          enqueueSnackbar(res1.data.message, {
            variant: 'error',
          });
          return;
        }
        paymentInProgress.onTrue();
        console.log('🚀 ~ response from initiatePhonePePayment:', res1.data);
        setMerchantTransactionId(res1.data.merchantTransactionId);
        console.log('🚀 ~ redirected:', res1.data.data.instrumentResponse.redirectInfo.url);
        window.open(res1.data.data.instrumentResponse.redirectInfo.url, '_blank');

        setTimeout(async () => {
          const checkPaymentStatus = async () => {
            console.log('🚀 Payment Status Checking');
            const inputDataForPaymentStatus = {
              merchantTransactionId: res1.data.merchantTransactionId,
            };
            const res2 = await axiosInstance.post(
              `/checkPhonePePaymentStatus`,
              inputDataForPaymentStatus
            );
            console.log('🚀 Payment Status Checking');
            if (res2.data.success === false) {
              enqueueSnackbar(res2.data.message, {
                variant: 'error',
              });
              return;
            }

            if (res2.data.success === true) {
              await new Promise((resolve) => setTimeout(resolve, 5000));
              onNextStep();
              onReset();
              onResetAddress();
              paymentInProgress.onFalse();
              console.log('🚀 Payment Completed');
            } else {
              await new Promise((resolve) => setTimeout(resolve, 5000));
              await checkPaymentStatus();
            }
          };
          await checkPaymentStatus();
        }, 3000);
      } else if (inputData.paymentGateway === 'CASH_ON_DELIVERY') {
        console.log('🚀 ~ CASH Payment Possessing');
        setTimeout(async () => {
          onNextStep();
          onReset();
          onResetAddress();
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  });

  // const handleApplyTax = useCallback(() => {
  //   const isGlobalValue = true;
  //   const taxApplicable = taxClasses.filter((tax) => tax.isGlobal === isGlobalValue);
  //   const taxRateApplicable = taxApplicable.reduce((_total, tax) => _total + tax.rate, 0);

  //   onApplyTax(taxRateApplicable);
  // }, [taxClasses, onApplyTax]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [shippingRes] = await Promise.all([
          // axios.get(`${HOST_API}tax-classes`),
          axios.get(`${HOST_API}shipping-classes`),
        ]);
        // setTaxClasses(taxRes.data);
        setDeliveryOptions(shippingRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);
  const theme = useTheme();

  // useEffect(() => {
  //   handleApplyTax();
  // }, [handleApplyTax, taxClasses]);
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <CheckoutDelivery
            onApplyShipping={onApplyShipping}
            onApplyTax={onApplyTax}
            options={deliveryOptions}
          />

          <CheckoutPaymentMethods
            cardOptions={CARDS_OPTIONS}
            options={PAYMENT_OPTIONS}
            sx={{ my: 3 }}
          />

          <Button
            size="small"
            color="inherit"
            onClick={onBackStep}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          >
            Back
          </Button>
        </Grid>

        <Grid item xs={12} md={4}>
          {userCheck && <CheckoutBillingNumber methods={methods} />}
          <CheckoutBillingInfo onBackStep={onBackStep} billing={billing} />
          <CheckoutSummary
            enableEdit
            enableDiscount
            onApplyDiscount={onApplyDiscount}
            total={total}
            subTotal={subTotal}
            discountedSubTotal={discountedSubTotal}
            discount={discount}
            taxAmount={taxAmount}
            taxRate={taxRate}
            shipping={shipping}
            onEdit={() => onGotoStep(0)}
          />
          <LoadingButton
            fullWidth
            size="large"
            // type="submit"
            variant="contained"
            // loading={isSubmitting}
            onClick={onSubmit}
          >
            Complete Order
          </LoadingButton>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

CheckoutPayment.propTypes = {
  userCheck: PropTypes.bool,
  onReset: PropTypes.func,
  onResetAddress: PropTypes.func,
  checkout: PropTypes.object,
  onBackStep: PropTypes.func,
  onGotoStep: PropTypes.func,
  onNextStep: PropTypes.func,
  onApplyShipping: PropTypes.func,
  onApplyTax: PropTypes.func,
  onApplyDiscount: PropTypes.func,
  paymentInProgress: PropTypes.object,
};
