import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import { useCheckout } from 'src/sections/hooks';
import { SingleReelView } from 'src/sections/main/influencer/view';
import axiosInstance from 'src/utils/axios';
// sections

// ----------------------------------------------------------------------

export default function SingleReelPage() {
  const [reel, setReel] = useState([]);
  const [nextReel, setNextReel] = useState();
  const [currentReel, setCurrentReel] = useState();

  const { onUpdateReelId, checkout } = useCheckout();
  const { currentReelId } = checkout;
  console.log('🚀 ~ currentReelId:', currentReelId);

  const { reelId } = useParams();

  useEffect(() => {
    const fetchSingleReel = async (_reelId) => {
      try {
        console.log('fetching reel by reelId');

        const inputData = {
          reelId: _reelId,
        };
        const response = await axiosInstance.post(`/users/randomReels?filter[limit]=10`, inputData);

        if (!response.status === 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.data;

        setReel(data);
        onUpdateReelId(data);
      } catch (error) {
        console.error('🚀 Error fetching reel by reelId:', error.message);
        // Handle the error as needed
      }
    };
    if (currentReelId) {
      const lastReel = currentReelId[currentReelId.length - 1];
      const currentIndex = currentReelId.findIndex((_reel) => _reel.id === Number(reelId));
      if (Number(reelId) !== Number(lastReel.id)) {
        const _nextReelId = currentReelId[currentIndex];
        setNextReel(_nextReelId);
      } else {
        fetchSingleReel(reelId);
      }
    } else {
      fetchSingleReel(reelId);
    }
  }, [reelId, onUpdateReelId, currentReelId]);

  useEffect(() => {
    if (currentReelId) {
      setCurrentReel(nextReel);
    } else {
      setCurrentReel(reel[0]);
    }
  }, [currentReelId, nextReel, reel]);

  return (
    <>
      <Helmet>
        <title> Reels </title>
      </Helmet>

      {currentReel && <SingleReelView currentReel={currentReel} />}
    </>
  );
}
