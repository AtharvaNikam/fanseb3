import { Card, CardContent, Stack, Typography } from '@mui/material';

export default function PrivacyPolicy() {
  const renderInfo = (
    <Card sx={{ maxWidth: 779, margin: 'auto', height: 'auto', mb: 3 }}>
      <CardContent>
        <Stack spacing={2} sx={{ mt: 5, mb: 5 }} px={{ xs: `5%`, md: `12%` }}>
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            Our Information
          </Typography>
            <Typography variant='paragraph' sx={{textAlign:'justify'}}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur fuga at neque placeat atque, 
                veritatis asperiores architecto iure fugit repudiandae! Fugiat tempore natus quas a voluptates 
                dolores at dolorum nam vero suscipit debitis fugit commodi doloremque aliquam aut nobis, unde 
                fuga totam. Totam, quidem reiciendis rerum perspiciatis, voluptate quas dicta eveniet mollitia, 
                error soluta impedit laudantium rem ducimus cupiditate harum. Quia adipisci saepe consectetur 
                enim mollitia eius et fugiat est neque voluptas! Sequi reprehenderit corrupti nam accusantium 
                perferendis obcaecati, inventore explicabo soluta itaque nostrum voluptate laborum maiores optio. 
                Vitae deleniti tenetur impedit quo saepe dolore eveniet dolorem rem voluptates eligendi. 
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur fuga at neque placeat atque, 
                veritatis asperiores architecto iure fugit repudiandae! Fugiat tempore natus quas a voluptates 
                dolores at dolorum nam vero suscipit debitis fugit commodi doloremque aliquam aut nobis, unde 
                fuga totam. Totam, quidem reiciendis rerum perspiciatis, voluptate quas dicta eveniet mollitia, 
                error soluta impedit laudantium rem ducimus cupiditate harum. Quia adipisci saepe consectetur 
                enim mollitia eius et fugiat est neque voluptas! Sequi reprehenderit corrupti nam accusantium 
                perferendis obcaecati, inventore explicabo soluta itaque nostrum voluptate laborum maiores optio. 
                Vitae deleniti tenetur impedit quo saepe dolore eveniet dolorem rem voluptates eligendi.
            </Typography>
          
        </Stack>
      </CardContent>
    </Card>
  );

  return <div>{renderInfo}</div>;
}
