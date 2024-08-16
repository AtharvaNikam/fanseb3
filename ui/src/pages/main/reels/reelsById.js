// // import { useCallback, useEffect, useState } from 'react';
// // import { Helmet } from 'react-helmet-async';
// // import { useParams } from 'react-router';
// // import { useRouter } from 'src/routes/hook';
// // import { useCheckout } from 'src/sections/hooks';
// // import { SingleReelView } from 'src/sections/main/influencer/view';
// // import axiosInstance from 'src/utils/axios';
// // // sections

// // // ----------------------------------------------------------------------

// // export default function ReelsByIdPage() {
// //   const router = useRouter();
// //   const { checkout } = useCheckout();

// //   const [reels, setReels] = useState([]);
// //   const [skip, setSkip] = useState(0);
// //   const [crId, setCrId] = useState(0);
// //   const { reelId } = useParams();
// //   const { currentReelId } = checkout;

// //   useEffect(() => {
// //     if (currentReelId) {
// //       router.push(`/reels/${currentReelId}`);
// //     }
// //   }, [currentReelId, router]);

// //   const fetchReel = useCallback(
// //     async (_reelId) => {
// //       try {
// //         console.log('fetching reels by reelId');

// //         const inputData = {
// //           reelId: _reelId,
// //         };
// //         const response = await axiosInstance.post(
// //           `/users/randomReels?filter[limit]=3&filter[skip]=${skip}`,
// //           inputData
// //         );

// //         if (!response.status === 200) {
// //           throw new Error(`HTTP error! Status: ${response.status}`);
// //         }

// //         const data = await response.data;

// //         setReels((prev) => [...prev, ...data]);
// //       } catch (error) {
// //         console.error('🚀 Error fetching reels by reelId:', error.message);
// //         // Handle the error as needed
// //       }
// //     },
// //     [skip]
// //   );

// //   useEffect(() => {
// //     if (reelId) {
// //       router.push(`/reels/${reelId}`);
// //     }
// //   }, [reelId, router]);

// //   useEffect(() => {
// //     console.log('fetched single time');
// //     fetchReel(reelId);
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, []);
// //   useEffect(() => {
// //     fetchReel(reelId);
// //     console.log('reels updated successfully');
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [skip]);
// //   console.log('current reels', reels);

// //   useEffect(() => {
// //     if (reelId) {
// //       if (reels && reels.length > 0) {
// //         const lastItem = reels[reels.length];
// //         if (Number(reelId) === lastItem.id) {
// //           console.log('🚀 ~ refresh reels');
// //           setSkip((prevSkip) => prevSkip + 3);
// //         }
// //       }
// //     }
// //   }, [reelId, reels]);

// //   useEffect(() => {
// //     if (reelId) {
// //       if (reels && reels.length > 0) {
// //         const lastItem = reels[reels.length - 1];
// //         const randomSkip = Math.floor(Math.random() * 10) + 1;
  
// //         if (Number(reelId) === lastItem.id) {
// //           console.log('🚀 ~ refresh reels');
// //           setSkip((prevSkip) => prevSkip + randomSkip);
// //         }
// //       }
// //     }
// //   }, [reelId, reels]);

// //   return (
// //     <>
// //       <Helmet>
// //         <title> Reels </title>
// //       </Helmet>

// //       <SingleReelView currentReel={reels} />
// //     </>
// //   );
// // }


// // import { useCallback, useEffect, useState } from 'react';
// // import { Helmet } from 'react-helmet-async';
// // import { useParams } from 'react-router';
// // import { useRouter } from 'src/routes/hook';
// // import { useCheckout } from 'src/sections/hooks';
// // import { SingleReelView } from 'src/sections/main/influencer/view';
// // import axiosInstance from 'src/utils/axios';

// // export default function ReelsByIdPage() {
// //   const router = useRouter();
// //   const { checkout } = useCheckout();
// //   const { reelId } = useParams();
// //   const { currentReelId } = checkout;

// //   const [reels, setReels] = useState([]);
// //   const [skip, setSkip] = useState(0);

// //   useEffect(() => {
// //     if (currentReelId) {
// //       router.push(`/reels/${currentReelId}`);
// //     }
// //   }, [currentReelId, router]);

// //   const fetchReel = useCallback(async (_reelId, _skip) => {
// //     try {
// //       const inputData = { reelId: _reelId };
// //       const response = await axiosInstance.post(
// //         `/users/randomReels?filter[limit]=3&filter[skip]=${_skip}`,
// //         inputData
// //       );

// //       if (response.status !== 200) {
// //         throw new Error(`HTTP error! Status: ${response.status}`);
// //       }

// //       const data = await response.data;

// //       setReels((prev) => [...prev, ...data]);
// //     } catch (error) {
// //       console.error('Error fetching reels by reelId:', error.message);
// //       // Handle the error more gracefully, e.g., display an error message to the user
// //     }
// //   }, []);

// //   useEffect(() => {
// //     if (reelId) {
// //       router.push(`/reels/${reelId}`);
// //     }
// //   }, [reelId, router]);

// //   useEffect(() => {
// //     console.log('Fetching reels initially');
// //     fetchReel(reelId, skip);
// //   }, [reelId, fetchReel, skip]);

// //   useEffect(() => {
// //     if (reelId && reels.length > 0) {
// //       const lastItem = reels[reels.length - 1];
// //       const randomSkip = Math.floor(Math.random() * 10) + 1;

// //       if (Number(reelId) === lastItem.id) {
// //         console.log('Refreshing reels');
// //         setSkip((prevSkip) => prevSkip + randomSkip);
// //       }
// //     }
// //   }, [reelId, reels]);

// //   return (
// //     <>
// //       <Helmet>
// //         <title>Reels</title>
// //       </Helmet>
// //       <SingleReelView currentReel={reels} />
// //     </>
// //   );
// // }

// import { useCallback, useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { useParams } from 'react-router';
// import { useRouter } from 'src/routes/hook';
// import { useCheckout } from 'src/sections/hooks';
// import { SingleReelView } from 'src/sections/main/influencer/view';
// import axiosInstance from 'src/utils/axios';

// // ----------------------------------------------------------------------

// export default function ReelsByIdPage() {
//   const router = useRouter();
//   const { checkout } = useCheckout();

//   const [reels, setReels] = useState([]);
//   const [skip, setSkip] = useState(0);
//   const { reelId } = useParams();
//   const { currentReelId } = checkout;

//   useEffect(() => {
//     if (currentReelId) {
//       router.push(`/reels/${currentReelId}`);
//     }
//   }, [currentReelId, router]);

//   const fetchRandomReels = useCallback(
//     async () => {
//       try {
//         console.log('fetching random reels');

//         const randomSkip = Math.floor(Math.random() * 10) + 1;
//         const inputData = {
//           reelId,
//         };

//         const response = await axiosInstance.post(
//           `/users/randomReels?filter[limit]=3&filter[skip]=${skip + randomSkip}`,
//           inputData
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.data;

//         setReels((prev) => [...prev, ...data]);
//       } catch (error) {
//         console.error('🚀 Error fetching random reels:', error.message);
//         // Handle the error as needed
//       }
//     },
//     [reelId, skip]
//   );

//   useEffect(() => {
//     console.log('fetched single time');
//     fetchRandomReels();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     fetchRandomReels();
//     console.log('reels updated successfully');
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [skip]);

//   useEffect(() => {
//     if (reelId && reels.length > 0) {
//       const lastItem = reels[reels.length - 1];

//       if (Number(reelId) === lastItem.id) {
//         console.log('🚀 ~ refresh reels');
//         setSkip((prevSkip) => prevSkip + 3);
//       }
//     }
//   }, [reelId, reels]);

//   return (
//     <>
//       <Helmet>
//         <title> Reels </title>
//       </Helmet>

//       <SingleReelView currentReel={reels} />
//     </>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import { useRouter } from 'src/routes/hook';
import { useCheckout } from 'src/sections/hooks';
import { SingleReelView } from 'src/sections/main/influencer/view';
import axiosInstance from 'src/utils/axios';

// ----------------------------------------------------------------------

const ReelsByIdPage = () => {
  const router = useRouter();
  const { checkout } = useCheckout();

  const [reels, setReels] = useState([]);
  const [currentReel, setCurrentReel] = useState(null);

  const { reelId } = useParams();
  const { currentReelId } = checkout;

  useEffect(() => {
    if (currentReelId) {
      router.push(`/reels/${currentReelId}`);
    }
  }, [currentReelId, router]);

  // Fetch reels from the backend when the component mounts or reelId changes
  useEffect(() => {
    const fetchReelsFromBackend = async () => {
      try {
        console.log('fetching reels with reelId:', reelId);

        // Make an API request to fetch reels from your backend
        const response = await axiosInstance.get('your-backend-api-endpoint');

        // Check if the request was successful (status code 200)
        if (response.status === 200) {
          // Parse the response JSON to get the reels array
          const reelsData = response.data;

          // Assuming your backend response has an array of reels
          setReels(reelsData.reels);
        } else {
          // Handle the case when the request is not successful
          console.error('Error fetching reels:', response.statusText);
        }
      } catch (error) {
        // Handle any other errors that might occur during the fetch
        console.error('Error fetching reels:', error.message);
      }
    };

    fetchReelsFromBackend();
  }, [reelId]);

  // Display the reel based on the reelId from the params
  useEffect(() => {
    const selectedReel = reels.find((reel) => reel.id === parseInt(reelId));
    setCurrentReel(selectedReel);
  }, [reelId, reels]);

  // Handle random reel selection on scroll
  const handleScroll = () => {
    if (reels.length > 0 && currentReel) {
      // Logic to update the currentReel with a random reel
      const randomReel = getRandomReel();
      setCurrentReel(randomReel);
    }
  };

  // Attach the scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [reels, currentReel]); // Include reels and currentReel as dependencies

  // Function to get a random reel different from the current one
  const getRandomReel = () => {
    // Get a random index within the range of the available reels
    const randomIndex = Math.floor(Math.random() * reels.length);

    // Get the reel at the random index
    const randomReel = reels[randomIndex];

    // Ensure the random reel is different from the current reel
    if (randomReel.id === currentReel.id) {
      // If the random reel is the same as the current reel, get the next reel in the array
      const nextIndex = (randomIndex + 1) % reels.length;
      return reels[nextIndex];
    }

    return randomReel;
  };

  return (
    <>
      <Helmet>
        <title> Reels </title>
      </Helmet>

      <SingleReelView currentReel={currentReel} />
    </>
  );
};

export default ReelsByIdPage;
