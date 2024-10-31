/* eslint-disable no-plusplus */

import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import './sticky-scroll.css';
import { useResponsive } from 'src/hooks/use-responsive';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function StickyScroll() {
  const isMdUp = useResponsive('up', 'md');
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const sections = document.querySelectorAll('.grid-fixed-content-section');
      const sectionPositions = Array.from(sections).map(
        (section) => section.getBoundingClientRect().top + scrollPosition
      );

      // Find the index of the section closest to the top of the viewport
      let closestIndex = 0;
      for (let i = 1; i < sectionPositions.length; i++) {
        if (
          Math.abs(sectionPositions[i] - scrollPosition) <
          Math.abs(sectionPositions[closestIndex] - scrollPosition)
        ) {
          closestIndex = i;
        }
      }

      setActiveIndex(closestIndex);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // console.log(activeIndex);
  return (
    <div className="section scroll-section">
      <div className="site-wrapper">
        <div className="fixed-scroll-grid">
          <div
            id="w-node-_5a1c7f82-2653-5e23-1256-126908559a3f-108df8c2"
            className="grid-fixed-section"
          >
            <div className="grid-fixed-content-section">
              <div
              style = {{
                marginBottom : isMdUp ? '72px' : '40px'
              }}
                data-w-id="dd52dad8-9ef0-92ed-358f-1544c9317158"
                className="grid-fixed-content-container"
              >
                <div className="margin-24px">
                  <Typography variant={isMdUp ? "h1" : "h2"}color="white">
                    Monetize your impressions
                  </Typography>
                </div>
                <img
                  // src="https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d885f90f596bfe0d3a_Phone_Illustration%2001-min.png"
                  src = "https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773f2a15cad43ba47e6f_Illustration%2001-min.png"
                  loading="lazy"
                  sizes="(max-width: 479px) 100vw, (max-width: 767px) 76vw, 100vw"
                  // srcSet="https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d885f90f596bfe0d3a_Phone_Illustration%2001-min-p-500.png 500w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d885f90f596bfe0d3a_Phone_Illustration%2001-min-p-800.png 800w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d885f90f596bfe0d3a_Phone_Illustration%2001-min-p-1080.png 1080w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d885f90f596bfe0d3a_Phone_Illustration%2001-min.png 1764w"
                  srcSet='https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773f2a15cad43ba47e6f_Illustration%2001-min.png'
                  alt=""
                  className="grid-scrolling-image img1 phone"
                />
                <div className="margin-24px">
                  <div className="text-b1">
                    <Typography
                      variant="h3"
                      sx={{
                        textAlign: 'left',

                        marginTop: isMdUp ? '40px' : '20px',
                      }}
                      style={{
                        fontFamily: 'Poppins',
                        fontSize: isMdUp ? '24px' : '22px',
                        fontWeight: '400',
                        lineHeight: '32px',
                        letterSpacing: '-0.5px',
                        textAlign: isMdUp ? 'left' : 'center',
                        color: 'white',
                      }}
                    >
                      Streamline transactions between creators and their audience. Unlock consistent
                      sales through creators ensuring a hassle-free experience
                    </Typography>
                  </div>
                </div>
                <a sx={{marginTop : isMdUp ? '40px !important' : '20px !important'}} target="_blank" className="button-light w-button" rel="noreferrer">
                  Get Started
                </a>
              </div>
            </div>
            <div className="grid-fixed-content-section">
              <div
              style = {{
                marginBottom : isMdUp ? '72px' : '40px'
              }}
                data-w-id="c090141e-543c-a541-da89-a0cf8002201e"
                className="grid-fixed-content-container"
              >
                <div className="margin-24px">
                  <h2 className="display-medium">
                    <Typography variant={isMdUp ? "h1" : "h2"} color="white">
                      Pay for performance, not promises
                    </Typography>
                  </h2>
                </div>
                <img
                  src="/assets/images/brands/sticky-scroll/pay_for_performance.png"
                  loading="lazy"
                  sizes="(max-width: 479px) 100vw, (max-width: 767px) 76vw, 100vw"
                  srcSet="/assets/images/brands/sticky-scroll/pay_for_performance.png"
                  alt=""
                  className="grid-scrolling-image img2 phone"
                />
                <div className="margin-24px">
                  <div className="text-b1">
                    <Typography
                      variant="h3"
                      sx={{
                        textAlign: 'left',

                        marginTop: isMdUp ? '40px' : '20px',
                      }}
                      style={{
                        fontFamily: 'Poppins',
                        fontSize: isMdUp ? '24px' : '22px',
                        fontWeight: '400',
                        lineHeight: '32px',
                        letterSpacing: '-0.5px',
                        textAlign: isMdUp ? 'left' : 'center',
                        color: 'white',
                      }}
                    >
                      Navigating upfront fees for creators can be challenging. We simplify it for
                      you with outcome-based payouts, ensuring fairness and valueadded results for
                      your brands success.
                    </Typography>
                  </div>
                </div>
                <a sx={{marginTop : isMdUp ? '40px !important' : '20px !important'}} target="_blank" className="button-light w-button" rel="noreferrer">
                  Get Started
                </a>
              </div>
            </div>
            <div className="grid-fixed-content-section">
              <div
              style = {{
                marginBottom : isMdUp ? '72px' : '40px'
              }}
                data-w-id="3bdfd1d5-58a2-1730-d3b6-897ea42fe92a"
                className="grid-fixed-content-container"
              >
                <div className="margin-24px">
                  <h2 className="display-medium">
                    <Typography variant={isMdUp ? "h1" : "h2"} color="white">
                      Navigate traffic on your website.
                    </Typography>
                  </h2>
                </div>
                <img
                  src="/assets/images/brands/sticky-scroll/navigate_traffic.png"
                  loading="lazy"
                  sizes="(max-width: 479px) 100vw, (max-width: 767px) 76vw, 100vw"
                  srcSet="/assets/images/brands/sticky-scroll/navigate_traffic.png"
                  alt=""
                  className="grid-scrolling-image img3 phone"
                />
                <div className="margin-24px">
                  <div className="text-b1">
                    <Typography
                      variant="h3"
                      sx={{
                        textAlign: 'left',

                        marginTop: '40px',
                      }}
                      style={{
                        fontFamily: 'Poppins',
                        fontSize: isMdUp ? '24px' : '22px',
                        fontWeight: '400',
                        lineHeight: '32px',
                        letterSpacing: '-0.5px',
                        textAlign: isMdUp ? 'left' : 'center',
                        color: 'white',
                      }}
                    >
                      Direct engaged, relevant audiences from social media to YOUR website, a step
                      closer to becoming your valued customer for brand growth.
                    </Typography>
                  </div>
                </div>
                <a sx={{marginTop : isMdUp ? '40px !important' : '20px !important'}} target="_blank" className="button-light w-button" rel="noreferrer">
                  Get Started
                </a>
              </div>
            </div>
            <div className="grid-fixed-content-section">
              <div
              style = {{
                marginBottom : isMdUp ? '72px' : '40px'
              }}
                data-w-id="248ec03d-11ba-fe55-be60-b22e2a1d386f"
                className="grid-fixed-content-container"
              >
                <div className="margin-24px">
                  <h2 className="display-medium">
                    <Typography variant={isMdUp ? "h1" : "h2"} color="white">
                      Acquire new patrons
                    </Typography>
                  </h2>
                </div>
                <img
                  src="/assets/images/brands/sticky-scroll/accquire_new_patrons.png"
                  loading="lazy"
                  sizes="(max-width: 479px) 100vw, (max-width: 767px) 76vw, 100vw"
                  srcSet="/assets/images/brands/sticky-scroll/accquire_new_patrons.png"
                  alt=""
                  className="grid-scrolling-image img4 phone"
                />
                <div className="margin-24px">
                  <div className="text-b1">
                    <Typography
                      variant="h3"
                      sx={{
                        textAlign: 'left',

                        marginTop: isMdUp ? '40px' : '20px',
                      }}
                      style={{
                        fontFamily: 'Poppins',
                        fontSize: isMdUp ? '24px' : '22px',
                        fontWeight: '400',
                        lineHeight: '32px',
                        letterSpacing: '-0.5px',
                        textAlign: isMdUp ? 'left' : 'center',
                        color: 'white',
                      }}
                    >
                      Seal transactions on your turf, own the customer, wield the data. Re-sell,
                      cross-sell, up-sell—unlock boundless potential.
                    </Typography>
                  </div>
                </div>
                <a sx={{marginTop : isMdUp ? '40px !important' : '20px !important'}} target="_blank" className="button-light w-button" rel="noreferrer">
                  Get Started
                </a>
              </div>
            </div>
            <div className="grid-fixed-content-section">
              <div
              style = {{
                marginBottom : isMdUp ? '72px' : '40px'
              }}
                data-w-id="c0243d0c-dd24-7f90-12e7-32bc42ba74f9"
                className="grid-fixed-content-container"
              >
                <div className="margin-24px">
                  <h2 className="display-medium">
                    <Typography variant={isMdUp ? "h1" : "h2"} color="white">
                      Elevate your ROI.
                    </Typography>
                  </h2>
                </div>
                <img
                  src="https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d85d8d1c22a67eb203_Phone_Illustration%2005-min.png"
                  loading="lazy"
                  sizes="(max-width: 479px) 100vw, (max-width: 767px) 76vw, 100vw"
                  srcSet="https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d85d8d1c22a67eb203_Phone_Illustration%2005-min-p-500.png 500w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d85d8d1c22a67eb203_Phone_Illustration%2005-min-p-800.png 800w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d85d8d1c22a67eb203_Phone_Illustration%2005-min-p-1080.png 1080w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d85d8d1c22a67eb203_Phone_Illustration%2005-min.png 1764w"
                  alt=""
                  className="grid-scrolling-image img5 phone"
                />
                <div className="margin-24px">
                  <div className="text-b1">
                    <Typography
                      variant="h3"
                      sx={{
                        textAlign: 'left',

                        marginTop: isMdUp ? '40px' : '20px',
                      }}
                      style={{
                        fontFamily: 'Poppins',
                        fontSize: isMdUp ? '24px' : '22px',
                        fontWeight: '400',
                        lineHeight: '32px',
                        letterSpacing: '-0.5px',
                        textAlign: isMdUp ? 'left' : 'center',
                        color: 'white',
                      }}
                    >
                      Elevate influencer collaborations with clear ROI insights. Our analytics
                      empower you to measure and maximize every aspect.
                    </Typography>
                  </div>
                </div>
                <a sx={{marginTop : isMdUp ? '40px !important' : '20px !important'}} target="_blank" className="button-light w-button" rel="noreferrer">
                  Get Started
                </a>
              </div>
            </div>
            <div className="grid-fixed-content-section">
              <div
              style = {{
                marginBottom : isMdUp ? '72px' : '40px'
              }}
                data-w-id="c7fc4248-4d08-706c-5ad4-18d1e66339ca"
                className="grid-fixed-content-container"
              >
                <div className="margin-24px">
                  <h2 className="display-medium">
                    <Typography variant={isMdUp ? "h1" : "h2"} color="white">
                      Let data spark perfect matches
                    </Typography>
                  </h2>
                </div>
                <img
                  src="https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d80f0f4c823b5be82a_Phone_Illustration%2006-min.png"
                  loading="lazy"
                  sizes="(max-width: 479px) 100vw, (max-width: 767px) 76vw, 100vw"
                  srcSet="https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d80f0f4c823b5be82a_Phone_Illustration%2006-min-p-500.png 500w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d80f0f4c823b5be82a_Phone_Illustration%2006-min-p-800.png 800w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d80f0f4c823b5be82a_Phone_Illustration%2006-min-p-1080.png 1080w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d80f0f4c823b5be82a_Phone_Illustration%2006-min-p-1600.png 1600w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d80f0f4c823b5be82a_Phone_Illustration%2006-min.png 1764w"
                  alt=""
                  className="grid-scrolling-image img6 phone"
                />
                <div className="margin-24px">
                  <div className="text-b1">
                    <Typography
                      variant="h3"
                      sx={{
                        textAlign: 'left',

                        marginTop: isMdUp ? '40px' : '20px',
                      }}
                      style={{
                        fontFamily: 'Poppins',
                        fontSize: isMdUp ? '24px' : '22px',
                        fontWeight: '400',
                        lineHeight: '32px',
                        letterSpacing: '-0.5px',
                        textAlign: isMdUp ? 'left' : 'center',
                        color: 'white',
                      }}
                    >
                      Precision pairing: Your target, creators audience, powered by sales and
                      insights
                    </Typography>
                  </div>
                </div>
                <a sx={{marginTop : isMdUp ? '40px !important' : '20px !important'}} target="_blank" className="button-light w-button" rel="noreferrer">
                  Get Started
                </a>
              </div>
            </div>
          </div>
          <div
            id="w-node-e0f2a095-33de-5656-8810-04aba6b8bc9b-108df8c2"
            className="grid-scroll-image-portion illustration-scroll"
          >
            <img
              src="https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773f2a15cad43ba47e6f_Illustration%2001-min.png"
              loading="lazy"
              data-w-id="25b9e254-dce8-a370-f2b8-cfd7bd17c586"
              sizes="(max-width: 767px) 100vw, (max-width: 991px) 46vw, 42vw"
              alt=""
              srcSet="https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773f2a15cad43ba47e6f_Illustration%2001-min-p-500.png 500w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773f2a15cad43ba47e6f_Illustration%2001-min-p-800.png 800w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773f2a15cad43ba47e6f_Illustration%2001-min-p-1080.png 1080w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773f2a15cad43ba47e6f_Illustration%2001-min.png 1764w"
              className={`grid-scrolling-image img1 ${activeIndex === 0 ? 'block' : 'hidden'}`}
            />
            <img
              src = "/assets/images/brands/sticky-scroll/pay_for_performance.png"
              // src="https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773ffff460ae65c359f5_Illustration%2002-min.png"
              loading="lazy"
              data-w-id="9784404c-529e-28d5-7ea7-926a9dc084d8"
              sizes="(max-width: 767px) 100vw, (max-width: 991px) 42vw, 40vw"
              alt=""
              srcSet = '/assets/images/brands/sticky-scroll/pay_for_performance.png'
              // srcSet="https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773ffff460ae65c359f5_Illustration%2002-min-p-500.png 500w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773ffff460ae65c359f5_Illustration%2002-min-p-800.png 800w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773ffff460ae65c359f5_Illustration%2002-min-p-1080.png 1080w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773ffff460ae65c359f5_Illustration%2002-min-p-1600.png 1600w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773ffff460ae65c359f5_Illustration%2002-min.png 1764w"
              className={`grid-scrolling-image img2 ${activeIndex === 1 ? 'block' : 'hidden'}`}
            />
            <img
              src = "/assets/images/brands/sticky-scroll/navigate_traffic.png"
              // src="https://assets-global.website-files.com/63072d7ddc776c83938df8c1/631094066c8742042efa1fda_Illustration%2003-min.png"
              loading="lazy"
              data-w-id="09def63f-a30c-fd71-8d86-f9f5b1685295"
              sizes="(max-width: 767px) 100vw, (max-width: 991px) 46vw, 42vw"
              alt=""
              srcSet = '/assets/images/brands/sticky-scroll/navigate_traffic.png'
              // srcSet="https://assets-global.website-files.com/63072d7ddc776c83938df8c1/631094066c8742042efa1fda_Illustration%2003-min-p-500.png 500w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/631094066c8742042efa1fda_Illustration%2003-min-p-800.png 800w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/631094066c8742042efa1fda_Illustration%2003-min-p-1080.png 1080w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/631094066c8742042efa1fda_Illustration%2003-min.png 1764w"
              className={`grid-scrolling-image img3 ${activeIndex === 2 ? 'block' : 'hidden'}`}
            />
            <img
              src = "/assets/images/brands/sticky-scroll/accquire_new_patrons.png"
              // src="https://assets-global.website-files.com/63072d7ddc776c83938df8c1/63217326ddd87d7729a8c8a1_Illustration%2004-min.png"
              loading="lazy"
              data-w-id="73c255e3-3588-78b5-69ef-b99789066867"
              sizes="(max-width: 767px) 100vw, (max-width: 991px) 46vw, 42vw"
              alt=""
              srcSet = '/assets/images/brands/sticky-scroll/accquire_new_patrons.png'
              // srcSet="https://assets-global.website-files.com/63072d7ddc776c83938df8c1/63217326ddd87d7729a8c8a1_Illustration%2004-min-p-500.png 500w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/63217326ddd87d7729a8c8a1_Illustration%2004-min-p-800.png 800w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/63217326ddd87d7729a8c8a1_Illustration%2004-min-p-1080.png 1080w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/63217326ddd87d7729a8c8a1_Illustration%2004-min.png 1767w"
              className={`grid-scrolling-image img4 ${activeIndex === 3 ? 'block' : 'hidden'}`}
            />
            <img
              src="https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773f09deec370ebca63b_Illustration%2005-min.png"
              loading="lazy"
              data-w-id="e8201f2d-d4e1-11e9-a839-da21b86fc407"
              sizes="(max-width: 767px) 100vw, (max-width: 991px) 46vw, 42vw"
              alt=""
              srcSet="https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773f09deec370ebca63b_Illustration%2005-min-p-500.png 500w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773f09deec370ebca63b_Illustration%2005-min-p-800.png 800w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773f09deec370ebca63b_Illustration%2005-min-p-1080.png 1080w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773f09deec370ebca63b_Illustration%2005-min.png 1764w"
              className={`grid-scrolling-image img5 ${activeIndex === 4 ? 'block' : 'hidden'}`}
            />
            <img
              src="https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773f116ccf58832447ec_Illustration%2006-min.png"
              loading="lazy"
              data-w-id="09b48629-9053-accd-6e40-b8149334bb80"
              sizes="(max-width: 767px) 100vw, (max-width: 991px) 46vw, 42vw"
              alt=""
              srcSet="https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773f116ccf58832447ec_Illustration%2006-min-p-500.png 500w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773f116ccf58832447ec_Illustration%2006-min-p-800.png 800w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773f116ccf58832447ec_Illustration%2006-min-p-1080.png 1080w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773f116ccf58832447ec_Illustration%2006-min-p-1600.png 1600w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773f116ccf58832447ec_Illustration%2006-min.png 1764w"
              className={`grid-scrolling-image img6 ${activeIndex === 5 ? 'block' : 'hidden'}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
