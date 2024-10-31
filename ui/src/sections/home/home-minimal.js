/* eslint-disable import/no-extraneous-dependencies */
// @mui
import Typography from '@mui/material/Typography';
// components
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import './slider.css';
import { useResponsive } from 'src/hooks/use-responsive';
// ----------------------------------------------------------------------

const CARDS = [
  {
    icon: ' /assets/icons/home/ic_make_brand.svg',
    title: 'Branding',
    description: 'Consistent design makes it easy to brand your own.',
  },
  {
    icon: ' /assets/icons/home/ic_design.svg',
    title: 'UI & UX Design',
    description:
      'The kit is built on the principles of the atomic design system. It helps you to create projects fastest and easily customized packages for your projects.',
  },
  {
    icon: ' /assets/icons/home/ic_development.svg',
    title: 'Development',
    description: 'Easy to customize and extend, saving you time and money.',
  },
];

// ----------------------------------------------------------------------

export default function HomeMinimal() {
  const isMdUp = useResponsive('up', 'md');
  const [counter, setCounter] = useState(5000);
  const [upperValue, setUpperValue] = useState(500000);
  const [lowerValue, setLowerValue] = useState(30);

  const [upperSlider, setUpperSlider] = useState((upperValue - 500) * 0.00010005002);
  const [lowerSlider, setLowerSlider] = useState((lowerValue - 10) * 1.111);

  function nFormatter(num, digits, rail = 0) {
    let lookup;
    if (rail === 0) {
      lookup = [
        { value: 1, symbol: '' },
        { value: 1e3, symbol: 'K' },
        { value: 1e5, symbol: 'L' },
        { value: 1e7, symbol: 'Cr' },
      ];
    } else if (rail === 1) {
      lookup = [
        { value: 1, symbol: '' },
        { value: 1e3, symbol: 'K' },
      ];
    }

    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    const item = lookup
      .slice()
      .reverse()
      .find((items) => num >= items.value);
    return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0';
  }

  function onUpperSliderChange(value) {
    setUpperValue(value);
  }
  function onLowerSliderChange(value) {
    setLowerValue(value);
  }

  useEffect(() => {
    setCounter(upperValue * lowerValue * 0.1);
    setUpperSlider((upperValue - 500) * 0.00010005002);
    setLowerSlider((lowerValue - 10) * 1.111);
  }, [upperValue, lowerValue]);
  return (
    <Grid container padding={{ xs: '24px 16px', md: '52px 48px' }}>
      <Grid item xs={12} md={12}>
        <Typography
          variant="h2"
          style={{
            textAlign: 'center',
            // fontFamily: 'Dosis',
            color: 'white',
            fontSize: isMdUp ? '48px' : '24px',
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: '100%' /* 48px */,
          }}
        >
          Let’s hunt the treasure ?
        </Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <Typography
          style={{
            textAlign: 'center',
            color: 'white',
            marginTop : !isMdUp && '20px',
            fontSize: isMdUp ? '20px' : '18px', 
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: ' 100%' /* 20px */,
          }}
        >
          Start hunting the treasure based on your follower count & content sharing .
        </Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <Box>
          <div className="sliderArea">
            <div className="slider-1">
            <p
              style={{
                fontWeight: 700,
                fontSize: isMdUp ? '21px' : '16px', // Unified font size control
                lineHeight: 1.5, 
                textAlign: 'center'                   // Adjusted for better readability
              }}
            >
              Pick your followers count.
              <span style={{ fontWeight: 400, fontSize: isMdUp ? '16px' : '12px', textAlign:'center' }}> 
                (Instagram, Facebook, Twitter, YouTube)
              </span>
            </p>

              <div className="animate__backInLeft" style={{ marginLeft: '-2%', marginRight: '2%' }}>
                <h6
                  style={{
                    fontSize: 18,
                    color: 'white',

                    padding: 0,
                    left: `${upperSlider}%`,
                    position: 'relative',
                    width: '20px',
                  }}
                >
                  {/* {upperValue < 1000 ? upperValue : `${upperValue / 1000}K`} */}
                  {nFormatter(upperValue, 0, 1)}
                </h6>
              </div>

              <Slider
                // eslint-disable-next-line react/jsx-no-bind
                onChange={onUpperSliderChange}
                marks={{
                  500: `500`,
                  1000000: `1M`,
                }}
                min={500}
                max={1000000}
                defaultValue={[500000]}
                tipFormatter={(value) => `${value}`}
                tipProps={{
                  display: true,
                  placement: 'top',
                  prefixCls: 'rc-slider-tooltip',
                }}
                railStyle={{
                  height: '2rem',
                }}
                handleStyle={{
                  border: '3px solid  rgba(17, 17, 17, 1)',
                  background: 'rgba(17, 17, 17, 10)',
                  // background: 'rgba(17, 17, 17, 1)',

                  borderRadius: 28,
                  width: 15,
                  height: 46,
                  boxShadow: '0 0 2px 0 rgb(0 0 0 / 90%)',
                  opacity: 1,
                }}
                trackStyle={{
                  height: '2rem',
                  background: '#00e9e7',
                  // background: 'linear-gradient(40deg, #0171ed 0%, #d001ff 100%)',
                }}
                dotStyle={{
                  display: 'none',
                }}
              />
            </div>

            <div className="slider-2">
            <p
              style={{
                fontWeight: 700,
                fontSize: isMdUp ? '21px' : '16px', // Unified font size control
                lineHeight: 1.5, 
                textAlign: 'center',                   // Adjusted for better readability
                marginTop : '10px'
              }}
            >
              Pick your monthly posts{' '}
              <span style={{ fontWeight: 400, fontSize: isMdUp ? '16px' : '12px', textAlign:'center' }}> 
                (Average content /month ?)
              </span>
            </p>
              {/* <p>
                <span
                  style={{
                    paddingTop: '10px',
                    fontWeight: 700,
                    fontSize: '18px',
                    textAlign : 'center'
                  }}
                >
                  Pick your monthly posts
                </span>
                (Average content /month ?)
              </p> */}
              <div style={{ marginLeft: '-2%', marginRight: '2%' }}>
                <h6
                  style={{
                    fontSize: 18,
                    //
                    color: 'white',
                    // paddingRight: '0px',
                    paddingLeft: '10px',
                    left: `${lowerSlider}%`,
                    position: 'relative',
                    width: '20px',
                  }}
                >
                  {lowerValue}
                </h6>
              </div>
              <Slider
                // eslint-disable-next-line react/jsx-no-bind
                onChange={onLowerSliderChange}
                marks={{
                  10: `10`,
                  100: `100`,
                }}
                min={10}
                max={100}
                defaultValue={[30]}
                tipFormatter={(value) => `$${value}`}
                tipProps={{
                  placement: 'top',
                  visible: true,
                }}
                railStyle={{
                  height: '2rem',
                }}
                handleStyle={{
                  background: '#111',
                  border: '3px solid #111',
                  borderRadius: 28,
                  width: 15,
                  height: 46,
                  opacity: 1,

                  boxShadow: '0 0 2px 0 rgb(0 0 0 / 90%)',
                }}
                trackStyle={{
                  height: '2rem',
                  background: '#00e9e7',
                  // background: 'linear-gradient(40deg, #0171ed 0%, #d001ff 100%)',
                }}
                dotStyle={{
                  display: 'none',
                }}
              />
            </div>
          </div>
          <div className="slide_area_content">
            <h3 style={{ fontSize: isMdUp ? '32px' : '24px', color: 'white' }}>
              treasure could lie between{' '}
              <span
                style={{
                  // fontWeight: '600',
                  // background: '-webkit-linear-gradient(20deg, #0171ed 40%, #d001ff 50%)',
                  webkitBackgroundClip: 'text',
                  // webkitTextFillColor: 'transparent',
                  fontSize : !isMdUp && '28px',
                }}
              >
                ₹ {nFormatter(counter, 0)}
              </span>{' '}
              and{' '}
              <span
                style={{
                  // fontWeight: '600',
                  // background: '-webkit-linear-gradient(20deg, #0171ed 40%, #d001ff 50%)',
                  webkitBackgroundClip: 'text',
                  // webkitTextFillColor: 'transparent',
                  fontSize : !isMdUp && '28px',
                }}
              >
                ₹ {nFormatter(counter * 2, 0)} more
              </span>{' '}
            </h3>
            <p style={{fontSize : !isMdUp && '22px' }}>based on estimated purchase between 1% and 5% from your own store.</p>
          </div>
          <div className="join-waitlist">
            <div className="link">
              <span> http://fanseb.store/ </span>
              <span className="link-second-part"> user@name </span>
            </div>

            <Button
              variant="contained"
              className="link"
              style={{
                marginRight: { xs: '0px', md: 20 },
                width: 190,
                backgroundColor: 'white',
                // backgroundImage: 'linear-gradient(90deg, #0171ed 0%, #d001ff 100%)',
              }}
            >
              <span
                style={{
                  fontWeight: '800',
                  color: '#000',
                  fontFamily: 'Poppins',
                }}
              >
                Join the Waitlist
              </span>
            </Button>
          </div>
        </Box>
      </Grid>
    </Grid>
  );
}
