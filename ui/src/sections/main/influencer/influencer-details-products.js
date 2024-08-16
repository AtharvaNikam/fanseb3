import PropTypes from 'prop-types';
import { useRef } from 'react';
// @mui
import Grid from '@mui/material/Unstable_Grid2';
import ProductList from './influencer-details-product-list';
// _mock
// utils
// components
//
// import ProfilePostItem from './profile-post-item';

// ----------------------------------------------------------------------
const products = [
  {
    id: '1',
    coverUrl: 'assets\\images\\home\\card-2.png',
    title: 'Gloss Me Transparent',
    price: '125',
  },
  {
    id: '2',
    coverUrl: 'assets\\images\\home\\card-2.png',
    title: 'Shiny Red Lipstick',
    price: '90',
  },
  {
    id: '3',
    coverUrl: 'assets\\images\\home\\card-2.png',
    title: 'Matte Finish Foundation',
    price: '150',
  },
  {
    id: '4',
    coverUrl: 'assets\\images\\home\\card-2.png',
    title: 'Lash Volume Mascara',
    price: '80',
  },
  {
    id: '5',
    coverUrl: 'assets\\images\\home\\card-2.png',
    title: 'Sparkling Eyeshadow Palette',
    price: '200',
  },
];
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

export default function InfluencerDetailsProducts({ info, posts }) {
  const fileRef = useRef(null);

  const handleAttach = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  //   const renderFollows = (
  //     <Card sx={{ py: 3, textAlign: 'center', typography: 'h4' }}>
  //       <Stack
  //         direction="row"
  //         divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
  //       >
  //         <Stack width={1}>
  //           {fNumber(info.totalFollowers)}
  //           <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
  //             Follower
  //           </Box>
  //         </Stack>

  //         <Stack width={1}>
  //           {fNumber(info.totalFollowing)}
  //           <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
  //             Following
  //           </Box>
  //         </Stack>
  //       </Stack>
  //     </Card>
  //   );

  //   const renderAbout = (
  //     <Card>
  //       <CardHeader title="About" />

  //       <Stack spacing={2} sx={{ p: 3 }}>
  //         <Box sx={{ typography: 'body2' }}>{info.quote}</Box>

  //         <Stack direction="row" spacing={2}>
  //           <Iconify icon="mingcute:location-fill" width={24} />

  //           <Box sx={{ typography: 'body2' }}>
  //             {`Live at `}
  //             <Link variant="subtitle2" color="inherit">
  //               {info.country}
  //             </Link>
  //           </Box>
  //         </Stack>

  //         <Stack direction="row" sx={{ typography: 'body2' }}>
  //           <Iconify icon="fluent:mail-24-filled" width={24} sx={{ mr: 2 }} />
  //           {info.email}
  //         </Stack>

  //         <Stack direction="row" spacing={2}>
  //           <Iconify icon="ic:round-business-center" width={24} />

  //           <Box sx={{ typography: 'body2' }}>
  //             {info.role} {`at `}
  //             <Link variant="subtitle2" color="inherit">
  //               {info.company}
  //             </Link>
  //           </Box>
  //         </Stack>

  //         <Stack direction="row" spacing={2}>
  //           <Iconify icon="ic:round-business-center" width={24} />

  //           <Box sx={{ typography: 'body2' }}>
  //             {`Studied at `}
  //             <Link variant="subtitle2" color="inherit">
  //               {info.school}
  //             </Link>
  //           </Box>
  //         </Stack>
  //       </Stack>
  //     </Card>
  //   );

  //   const renderPostInput = (
  //     <Card sx={{ p: 3 }}>
  //       <InputBase
  //         multiline
  //         fullWidth
  //         rows={4}
  //         placeholder="Share what you are thinking here..."
  //         sx={{
  //           p: 2,
  //           mb: 3,
  //           borderRadius: 1,
  //           border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.2)}`,
  //         }}
  //       />

  //       <Stack direction="row" alignItems="center" justifyContent="space-between">
  //         <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'text.secondary' }}>
  //           <Fab size="small" color="inherit" variant="softExtended" onClick={handleAttach}>
  //             <Iconify icon="solar:gallery-wide-bold" width={24} sx={{ color: 'success.main' }} />
  //             Image/Video
  //           </Fab>

  //           <Fab size="small" color="inherit" variant="softExtended">
  //             <Iconify icon="solar:videocamera-record-bold" width={24} sx={{ color: 'error.main' }} />
  //             Streaming
  //           </Fab>
  //         </Stack>

  //         <Button variant="contained">Post</Button>
  //       </Stack>

  //       <input ref={fileRef} type="file" style={{ display: 'none' }} />
  //     </Card>
  //   );

  //   const renderSocials = (
  //     <Card>
  //       <CardHeader title="Social" />

  //       <Stack spacing={2} sx={{ p: 3 }}>
  //         {_socials.map((link) => (
  //           <Stack
  //             key={link.name}
  //             spacing={2}
  //             direction="row"
  //             sx={{ wordBreak: 'break-all', typography: 'body2' }}
  //           >
  //             <Iconify
  //               icon={link.icon}
  //               width={24}
  //               sx={{
  //                 flexShrink: 0,
  //                 color: link.color,
  //               }}
  //             />
  //             <Link color="inherit">
  //               {link.value === 'facebook' && info.socialLinks.facebook}
  //               {link.value === 'instagram' && info.socialLinks.instagram}
  //               {link.value === 'linkedin' && info.socialLinks.linkedin}
  //               {link.value === 'twitter' && info.socialLinks.twitter}
  //             </Link>
  //           </Stack>
  //         ))}
  //       </Stack>
  //     </Card>
  //   );

  return (
    <Grid container spacing={3}>
      {/* <Grid xs={12} md={4}>
        <Stack spacing={3}>
          {renderFollows}

          {renderAbout}

          {renderSocials}
        </Stack>
      </Grid>

      <Grid xs={12} md={8}>
        <Stack spacing={3}>
          {renderPostInput}

          {posts.map((post) => (
            <ProfilePostItem key={post.id} post={post} />
          ))}
        </Stack>
      </Grid> */}
      <Grid
        container
        item
        display={{ xs: 'none', md: 'flex' }}
        gap={2}
        md={12}
        justifyContent="space-between"
        alignContent="flex-start"
      >
        {products.map((product) => (
          <ProductList
            key={product.id}
            srcLink={product.coverUrl}
            title={product.title}
            price={product.price}
          />
        ))}
      </Grid>
    </Grid>
  );
}

InfluencerDetailsProducts.propTypes = {
  info: PropTypes.object,
  posts: PropTypes.array,
};
