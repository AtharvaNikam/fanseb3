import { Card, CardContent, Stack, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

export default function TermsAndConditions() {
  const renderCondition = (
    <Card sx={{ maxWidth: 779, margin: 'auto', height: 'auto', mb: 3 }}>
      <CardContent>
        <Stack spacing={2} sx={{ mt: 5, mb: 5 }} px={{ xs: `5%`, md: `12%` }}>
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            TERMS AND CONDITIONS
          </Typography>

          <Typography variant="caption">
            Welcome to Fanseb, your go-to multivendor platform. These terms and conditions govern
            your use of our services, ensuring a seamless experience for both buyers and sellers. By
            engaging with our platform, you agree to comply with the following terms:
          </Typography>

          <Stack spacing={0.3}>
            {/* Platform Purpose */}
            <Typography variant="caption">Platform Purpose:</Typography>
            <List>
              <ListItem sx={{ mx: 0, p: 0 }}>
                <Typography variant="caption">
                  Fanseb serves as a multivendor platform, connecting sellers and buyers.
                </Typography>
              </ListItem>
              <ListItem sx={{ mx: 0, p: 0 }}>
                <Typography variant="caption">
                  Our mission is to provide a user-friendly marketplace for diverse products and
                  services.
                </Typography>
              </ListItem>
              <ListItem sx={{ mx: 0, p: 0 }}>
                <Typography variant="caption">
                  These terms govern the relationship between Fanseb, sellers, and buyers.
                </Typography>
              </ListItem>
            </List>

            {/* Seller Responsibilities */}
            <Typography>Seller Responsibilities:</Typography>
            <List>
              <ListItem sx={{ mx: 0, p: 0 }}>
                <Typography variant="caption">
                  Sellers on Fanseb are responsible for the accuracy of product listings, including
                  descriptions, images, and prices.
                </Typography>
              </ListItem>
              <ListItem sx={{ mx: 0, p: 0 }}>
                <Typography variant="caption">
                  Sellers should adhere to ethical business practices and provide excellent customer
                  service.
                </Typography>
              </ListItem>
              <ListItem sx={{ mx: 0, p: 0 }}>
                <Typography variant="caption">
                  Fanseb reserves the right to moderate and remove listings that violate our
                  policies.
                </Typography>
              </ListItem>
            </List>

            {/* Buyer Responsibilities */}
            <Typography>Buyer Responsibilities:</Typography>
            <List>
              <ListItem sx={{ mx: 0, p: 0 }}>
                <Typography variant="caption">
                  Buyers are expected to provide accurate shipping information and make timely
                  payments for purchased items.
                </Typography>
              </ListItem>
              <ListItem sx={{ mx: 0, p: 0 }}>
                <Typography variant="caption">
                  Respectful and courteous communication is encouraged between buyers and sellers.
                </Typography>
              </ListItem>
              <ListItem sx={{ mx: 0, p: 0 }}>
                <Typography variant="caption">
                  Buyers are encouraged to review and rate sellers based on their experience.
                </Typography>
              </ListItem>
            </List>

            {/* Transaction Process */}
            <Typography>Transaction Process:</Typography>
            <List>
              <ListItem sx={{ mx: 0, p: 0 }}>
                <Typography variant="caption">
                  Transactions on Fanseb are facilitated through secure payment gateways.
                </Typography>
              </ListItem>
              <ListItem sx={{ mx: 0, p: 0 }}>
                <Typography variant="caption">
                  Fanseb is not responsible for any disputes between buyers and sellers but
                  encourages fair resolution.
                </Typography>
              </ListItem>
              <ListItem sx={{ mx: 0, p: 0 }}>
                <Typography variant="caption">
                  Sellers should fulfill orders promptly, and buyers should confirm receipt of
                  products/services.
                </Typography>
              </ListItem>
            </List>

            {/* Fees and Payments */}
            <Typography>Fees and Payments:</Typography>
            <List>
              <ListItem sx={{ mx: 0, p: 0 }}>
                <Typography variant="caption">
                  Fanseb may charge fees for certain services, which will be clearly communicated to
                  sellers.
                </Typography>
              </ListItem>
              <ListItem sx={{ mx: 0, p: 0 }}>
                <Typography variant="caption">
                  Payments to sellers will be processed according to the agreed-upon terms and
                  conditions.
                </Typography>
              </ListItem>
            </List>

            {/* Intellectual Property */}
            <Typography>Intellectual Property:</Typography>
            <List>
              <ListItem sx={{ mx: 0, p: 0 }}>
                <Typography variant="caption">
                  Sellers are responsible for ensuring they have the right to sell the
                  products/services listed on Fanseb.
                </Typography>
              </ListItem>
              <ListItem sx={{ mx: 0, p: 0 }}>
                <Typography variant="caption">
                  Fanseb respects intellectual property rights and encourages users to report any
                  infringements.
                </Typography>
              </ListItem>
            </List>

            {/* User Conduct */}
            <Typography>User Conduct:</Typography>
            <List>
              <ListItem sx={{ mx: 0, p: 0 }}>
                <Typography variant="caption">
                  Users must comply with applicable laws and regulations while using Fanseb.
                </Typography>
              </ListItem>
              <ListItem sx={{ mx: 0, p: 0 }}>
                <Typography variant="caption">
                  Inappropriate or fraudulent behavior, including but not limited to spamming and
                  hacking, is strictly prohibited.
                </Typography>
              </ListItem>
            </List>

            {/* Termination of Accounts */}
            <Typography>Termination of Accounts:</Typography>
            <List>
              <ListItem sx={{ mx: 0, p: 0 }}>
                <Typography variant="caption">
                  Fanseb reserves the right to terminate accounts that violate our terms and
                  conditions.
                </Typography>
              </ListItem>
              <ListItem sx={{ mx: 0, p: 0 }}>
                <Typography variant="caption">
                  Users will be notified of any violations and given an opportunity to rectify the
                  situation.
                </Typography>
              </ListItem>
            </List>

            {/* Modification of Terms */}
            <Typography>Modification of Terms:</Typography>
            <List>
              <ListItem sx={{ mx: 0, p: 0 }}>
                <Typography variant="caption">
                  Fanseb may update these terms and conditions to reflect changes in the platform’s
                  features or legal requirements.
                </Typography>
              </ListItem>
              <ListItem sx={{ mx: 0, p: 0 }}>
                <Typography variant="caption">
                  Users will be notified of any significant changes.
                </Typography>
              </ListItem>
            </List>

            {/* Disclaimer and Limitation of Liability */}
            <Typography>Disclaimer and Limitation of Liability:</Typography>
            <List>
              <ListItem sx={{ mx: 0, p: 0 }}>
                <Typography variant="caption">
                  Fanseb provides the platform on an “as is” basis and is not liable for the quality
                  or legality of products/services listed.
                </Typography>
              </ListItem>
              <ListItem sx={{ mx: 0, p: 0 }}>
                <Typography variant="caption">
                  Fanseb is not responsible for any consequential or indirect damages arising from
                  the use of the platform.
                </Typography>
              </ListItem>
            </List>
            <Typography variant="caption">
              By using Fanseb, you acknowledge and agree to these terms and conditions. If you have
              any questions or concerns, please contact us. Happy buying and selling on Fanseb!
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );

  return <div>{renderCondition}</div>;
}
