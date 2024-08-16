/* eslint-disable no-plusplus */

import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import './sticky-scroll.css';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function StickyScroll() {
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
                data-w-id="dd52dad8-9ef0-92ed-358f-1544c9317158"
                className="grid-fixed-content-container"
              >
                <div className="margin-24px">
                  <Typography variant="h1" color="white">
                    Your audience seeks links
                  </Typography>
                </div>
                <img
                  // eslint-disable-next-line no-octal-escape
                  src="assets\images\home\6.png"
                  loading="lazy"
                  sizes="(max-width: 479px) 100vw, (max-width: 767px) 76vw, 100vw"
                  // srcSet="https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d885f90f596bfe0d3a_Phone_Illustration%2001-min-p-500.png 500w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d885f90f596bfe0d3a_Phone_Illustration%2001-min-p-800.png 800w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d885f90f596bfe0d3a_Phone_Illustration%2001-min-p-1080.png 1080w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d885f90f596bfe0d3a_Phone_Illustration%2001-min.png 1764w"
                  alt=""
                  className="grid-scrolling-image img1 phone"
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
                        fontSize: '24px',
                        fontWeight: '400',
                        lineHeight: '32px',
                        letterSpacing: '-0.5px',
                        textAlign: 'left',
                        color: 'white',
                      }}
                    >
                      Simplify their experience by seamlessly linking products to every post and
                      video
                    </Typography>
                  </div>
                </div>
                <a target="_blank" className="button-light w-button" rel="noreferrer">
                  Get Started
                </a>
              </div>
            </div>
            <div className="grid-fixed-content-section">
              <div
                data-w-id="c090141e-543c-a541-da89-a0cf8002201e"
                className="grid-fixed-content-container"
              >
                <div className="margin-24px">
                  <h2 className="display-medium">
                    <Typography variant="h1" color="white">
                      Sales Spark: Journey Begins.
                    </Typography>
                  </h2>
                </div>
                <img
                  // src="https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d776979e2a48db19e4_Phone_Illustration%2002-min.png"
                  loading="lazy"
                  sizes="(max-width: 479px) 100vw, (max-width: 767px) 76vw, 100vw"
                  // srcSet="https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d776979e2a48db19e4_Phone_Illustration%2002-min-p-500.png 500w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d776979e2a48db19e4_Phone_Illustration%2002-min-p-800.png 800w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d776979e2a48db19e4_Phone_Illustration%2002-min-p-1080.png 1080w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d776979e2a48db19e4_Phone_Illustration%2002-min-p-1600.png 1600w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d776979e2a48db19e4_Phone_Illustration%2002-min.png 1764w"
                  alt=""
                  className="grid-scrolling-image img2 phone"
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
                        fontSize: '24px',
                        fontWeight: '400',
                        lineHeight: '32px',
                        letterSpacing: '-0.5px',
                        textAlign: 'left',
                        color: 'white',
                      }}
                    >
                      Maximize Earnings with Every Treasure from Fanseb.
                    </Typography>
                  </div>
                </div>
                <a target="_blank" className="button-light w-button" rel="noreferrer">
                  Get Started
                </a>
              </div>
            </div>
            <div className="grid-fixed-content-section">
              <div
                data-w-id="3bdfd1d5-58a2-1730-d3b6-897ea42fe92a"
                className="grid-fixed-content-container"
              >
                <div className="margin-24px">
                  <h2 className="display-medium">
                    <Typography variant="h1" color="white">
                      Brands Acknowledge Your Value.
                    </Typography>
                  </h2>
                </div>
                {/* <img
                  src="https://assets-global.website-files.com/63072d7ddc776c83938df8c1/63109406620367dd1832650b_Phone_Illustration%2003-min.png"
                  loading="lazy"
                  sizes="(max-width: 479px) 100vw, (max-width: 767px) 76vw, 100vw"
                  srcSet="https://assets-global.website-files.com/63072d7ddc776c83938df8c1/63109406620367dd1832650b_Phone_Illustration%2003-min-p-500.png 500w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/63109406620367dd1832650b_Phone_Illustration%2003-min-p-800.png 800w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/63109406620367dd1832650b_Phone_Illustration%2003-min-p-1080.png 1080w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/63109406620367dd1832650b_Phone_Illustration%2003-min.png 1764w"
                  alt=""
                  className="grid-scrolling-image img3 phone"
                /> */}
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
                        fontSize: '24px',
                        fontWeight: '400',
                        lineHeight: '32px',
                        letterSpacing: '-0.5px',
                        textAlign: 'left',
                        color: 'white',
                      }}
                    >
                      Select, Collaborate: Your Dream Brand Partnerships.
                    </Typography>
                  </div>
                </div>
                <a target="_blank" className="button-light w-button" rel="noreferrer">
                  Get Started
                </a>
              </div>
            </div>
            <div className="grid-fixed-content-section">
              <div
                data-w-id="248ec03d-11ba-fe55-be60-b22e2a1d386f"
                className="grid-fixed-content-container"
              >
                <div className="margin-24px">
                  <h2 className="display-medium">
                    <Typography variant="h1" color="white">
                      Your Content, Your Rules !
                    </Typography>
                  </h2>
                </div>
                {/* <img
                  src="https://assets-global.website-files.com/63072d7ddc776c83938df8c1/632184b0c5fa8c5f8d08369d_Phone_Illustration%2004-min.png"
                  loading="lazy"
                  sizes="(max-width: 479px) 100vw, (max-width: 767px) 76vw, 100vw"
                  srcSet="https://assets-global.website-files.com/63072d7ddc776c83938df8c1/632184b0c5fa8c5f8d08369d_Phone_Illustration%2004-min-p-500.png 500w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/632184b0c5fa8c5f8d08369d_Phone_Illustration%2004-min-p-800.png 800w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/632184b0c5fa8c5f8d08369d_Phone_Illustration%2004-min-p-1080.png 1080w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/632184b0c5fa8c5f8d08369d_Phone_Illustration%2004-min.png 1764w"
                  alt=""
                  className="grid-scrolling-image img4 phone"
                /> */}
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
                        fontSize: '24px',
                        fontWeight: '400',
                        lineHeight: '32px',
                        letterSpacing: '-0.5px',
                        textAlign: 'left',
                        color: 'white',
                      }}
                    >
                      Free Imagination, No Boundaries, Ever.
                    </Typography>
                  </div>
                </div>
                <a target="_blank" className="button-light w-button" rel="noreferrer">
                  Get Started
                </a>
              </div>
            </div>
            <div className="grid-fixed-content-section">
              <div
                data-w-id="c0243d0c-dd24-7f90-12e7-32bc42ba74f9"
                className="grid-fixed-content-container"
              >
                <div className="margin-24px">
                  <h2 className="display-medium">
                    <Typography variant="h1" color="white">
                      Elevate Brilliance: Let Data Guide Your Impact.
                    </Typography>
                  </h2>
                </div>
                {/* <img
                  src="https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d85d8d1c22a67eb203_Phone_Illustration%2005-min.png"
                  loading="lazy"
                  sizes="(max-width: 479px) 100vw, (max-width: 767px) 76vw, 100vw"
                  srcSet="https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d85d8d1c22a67eb203_Phone_Illustration%2005-min-p-500.png 500w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d85d8d1c22a67eb203_Phone_Illustration%2005-min-p-800.png 800w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d85d8d1c22a67eb203_Phone_Illustration%2005-min-p-1080.png 1080w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d85d8d1c22a67eb203_Phone_Illustration%2005-min.png 1764w"
                  alt=""
                  className="grid-scrolling-image img5 phone"
                /> */}
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
                        fontSize: '24px',
                        fontWeight: '400',
                        lineHeight: '32px',
                        letterSpacing: '-0.5px',
                        textAlign: 'left',
                        color: 'white',
                      }}
                    >
                      Unlock Audience Insights : Discover Audience Desires
                    </Typography>
                  </div>
                </div>
                <a target="_blank" className="button-light w-button" rel="noreferrer">
                  Get Started
                </a>
              </div>
            </div>
            <div className="grid-fixed-content-section">
              <div
                data-w-id="c7fc4248-4d08-706c-5ad4-18d1e66339ca"
                className="grid-fixed-content-container"
              >
                <div className="margin-24px">
                  <h2 className="display-medium">
                    <Typography variant="h1" color="white">
                      You Deserve Exceptional
                    </Typography>
                  </h2>
                </div>
                {/* <img
                  src="https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d80f0f4c823b5be82a_Phone_Illustration%2006-min.png"
                  loading="lazy"
                  sizes="(max-width: 479px) 100vw, (max-width: 767px) 76vw, 100vw"
                  srcSet="https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d80f0f4c823b5be82a_Phone_Illustration%2006-min-p-500.png 500w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d80f0f4c823b5be82a_Phone_Illustration%2006-min-p-800.png 800w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d80f0f4c823b5be82a_Phone_Illustration%2006-min-p-1080.png 1080w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d80f0f4c823b5be82a_Phone_Illustration%2006-min-p-1600.png 1600w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f96d80f0f4c823b5be82a_Phone_Illustration%2006-min.png 1764w"
                  alt=""
                  className="grid-scrolling-image img6 phone"
                /> */}
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
                        fontSize: '24px',
                        fontWeight: '400',
                        lineHeight: '32px',
                        letterSpacing: '-0.5px',
                        textAlign: 'left',
                        color: 'white',
                      }}
                    >
                      Experience Premium Collabs, Brand Shoots, Connection with Exceptional Creators
                    </Typography>
                  </div>
                </div>
                <a target="_blank" className="button-light w-button" rel="noreferrer">
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
              // eslint-disable-next-line no-octal-escape
              src="assets\images\home\6.png"
              loading="lazy"
              data-w-id="25b9e254-dce8-a370-f2b8-cfd7bd17c586"
              sizes="(max-width: 767px) 100vw, (max-width: 991px) 46vw, 42vw"
              alt=""
              // srcSet="https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773f2a15cad43ba47e6f_Illustration%2001-min-p-500.png 500w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773f2a15cad43ba47e6f_Illustration%2001-min-p-800.png 800w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773f2a15cad43ba47e6f_Illustration%2001-min-p-1080.png 1080w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773f2a15cad43ba47e6f_Illustration%2001-min.png 1764w"
              className={`grid-scrolling-image img1 ${activeIndex === 0 ? 'block' : 'hidden'}`}
            />
            <img
              // eslint-disable-next-line no-octal-escape
              src="assets\images\home\7.png"
              loading="lazy"
              data-w-id="9784404c-529e-28d5-7ea7-926a9dc084d8"
              sizes="(max-width: 767px) 100vw, (max-width: 991px) 46vw, 42vw"
              alt=""
              // srcSet="https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773ffff460ae65c359f5_Illustration%2002-min-p-500.png 500w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773ffff460ae65c359f5_Illustration%2002-min-p-800.png 800w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773ffff460ae65c359f5_Illustration%2002-min-p-1080.png 1080w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773ffff460ae65c359f5_Illustration%2002-min-p-1600.png 1600w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773ffff460ae65c359f5_Illustration%2002-min.png 1764w"
              className={`grid-scrolling-image img2 ${activeIndex === 1 ? 'block' : 'hidden'}`}
            />
            <img
              // eslint-disable-next-line no-octal-escape
              src="assets\images\home\5.png"
              loading="lazy"
              data-w-id="09def63f-a30c-fd71-8d86-f9f5b1685295"
              sizes="(max-width: 767px) 100vw, (max-width: 991px) 46vw, 42vw"
              alt=""
              // srcSet="https://assets-global.website-files.com/63072d7ddc776c83938df8c1/631094066c8742042efa1fda_Illustration%2003-min-p-500.png 500w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/631094066c8742042efa1fda_Illustration%2003-min-p-800.png 800w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/631094066c8742042efa1fda_Illustration%2003-min-p-1080.png 1080w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/631094066c8742042efa1fda_Illustration%2003-min.png 1764w"
              className={`grid-scrolling-image img3 ${activeIndex === 2 ? 'block' : 'hidden'}`}
            />
            <img
              // eslint-disable-next-line no-octal-escape
              src="assets\images\home\4.png"
              loading="lazy"
              data-w-id="73c255e3-3588-78b5-69ef-b99789066867"
              sizes="(max-width: 767px) 100vw, (max-width: 991px) 46vw, 42vw"
              alt=""
              // srcSet="https://assets-global.website-files.com/63072d7ddc776c83938df8c1/63217326ddd87d7729a8c8a1_Illustration%2004-min-p-500.png 500w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/63217326ddd87d7729a8c8a1_Illustration%2004-min-p-800.png 800w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/63217326ddd87d7729a8c8a1_Illustration%2004-min-p-1080.png 1080w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/63217326ddd87d7729a8c8a1_Illustration%2004-min.png 1767w"
              className={`grid-scrolling-image img4 ${activeIndex === 3 ? 'block' : 'hidden'}`}
            />
            <img
              // eslint-disable-next-line no-octal-escape
              src="assets\images\home\3.png"
              loading="lazy"
              data-w-id="e8201f2d-d4e1-11e9-a839-da21b86fc407"
              sizes="(max-width: 767px) 100vw, (max-width: 991px) 46vw, 42vw"
              alt=""
              // srcSet="https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773f09deec370ebca63b_Illustration%2005-min-p-500.png 500w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773f09deec370ebca63b_Illustration%2005-min-p-800.png 800w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773f09deec370ebca63b_Illustration%2005-min-p-1080.png 1080w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773f09deec370ebca63b_Illustration%2005-min.png 1764w"
              className={`grid-scrolling-image img5 ${activeIndex === 4 ? 'block' : 'hidden'}`}
            />
            <img
              // eslint-disable-next-line no-octal-escape
              src="assets\images\home\2.png"
              loading="lazy"
              data-w-id="09b48629-9053-accd-6e40-b8149334bb80"
              sizes="(max-width: 767px) 100vw, (max-width: 991px) 46vw, 42vw"
              alt=""
              // srcSet="https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773f116ccf58832447ec_Illustration%2006-min-p-500.png 500w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773f116ccf58832447ec_Illustration%2006-min-p-800.png 800w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773f116ccf58832447ec_Illustration%2006-min-p-1080.png 1080w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773f116ccf58832447ec_Illustration%2006-min-p-1600.png 1600w, https://assets-global.website-files.com/63072d7ddc776c83938df8c1/630f773f116ccf58832447ec_Illustration%2006-min.png 1764w"
              className={`grid-scrolling-image img6 ${activeIndex === 5 ? 'block' : 'hidden'}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
