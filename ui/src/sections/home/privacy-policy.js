import { Card, CardContent, Stack, Typography } from '@mui/material';

export default function PrivacyPolicy() {
  const renderPolicy = (
    <Card sx={{ maxWidth: 779, margin: 'auto', height: 'auto', mb: 3 }}>
      <CardContent>
        <Stack spacing={2} sx={{ mt: 5, mb: 5 }} px={{ xs: `5%`, md: `12%` }}>
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            PRIVACY POLICY
          </Typography>

          <stack direction="row" spacing={0.5}>
            <Typography variant="h5">Purpose</Typography>
            <Typography variant="caption">
              Little & Big is committed to protecting your privacy because we are committed to
              valuing people. Our Privacy Policy below sets out how your personal information is
              collected, used, and protected. The Demo Country Privacy Principles also apply to us.
              This Privacy Policy describes our policies and procedures on the collection, holding,
              use, and disclosure of your personal information and should be read together with our
              Terms and Conditions. By providing your personal information you consent to our
              collection, use, and disclosure of that information in accordance with this Privacy
              Policy.
            </Typography>
          </stack>

          <stack direction="row" spacing={0.5}>
            <Typography variant="h5">What is Personal Data?</Typography>
            <Typography variant="caption">
              Little & Big is commit When used in this Policy, personal information has the meaning
              given in the Privacy Act. Generally, it means any information or an opinion that could
              be used to identify you. ribes our policies and procedures on the collection, holding,
              use, and disclosure of your personal information and should be read together with our
              Terms and Conditions. By providing your personal information you consent to our
              collection, use, and disclosure of that information in accordance with this Privacy
              Policy.
            </Typography>
          </stack>

          <stack direction="row" spacing={0.5}>
            <Typography variant="h5">Accessing your Personal Data</Typography>
            <Typography variant="caption">
              You may request access to your personal information collected by us, and ask that we
              correct that personal information. You can ask for access or correction by contacting
              us and we will usually respond within 30 days. If we refuse to give you access to, or
              correct, your personal information, we will notify you in writing setting out the
              reasons.st or newsletter: email address; first name describes our policies and
              procedures on the collection, holding, use, and disclosure of your personal
              information and should be read together with our Terms and Conditions. By providing
              your personal information you consent to our collection, use, and disclosure of that
              information in accordance with this Privacy Policy.
            </Typography>
          </stack>

          <stack direction="row" spacing={0.5}>
            <Typography variant="h5">Complaints</Typography>
            <Typography variant="caption">
              Complaints’s Privacy Policy describes our policies and procedures on the collection,
              holding, use, and disclosure of your personal information and should be read together
              with our Terms and Conditions. By providing your personal information you consent to
              our collection, use, and disclosure of that information in accordance with this
              Privacy Policy.
            </Typography>
          </stack>

          <stack direction="row" spacing={0.5}>
            <Typography variant="h5">Owner and Data Controller</Typography>
            <Typography variant="caption">
              The Commons 20-40 demo St, Jon Doe NSW 2008 Country demo@demo.comrivacy Policy
              describes our policies and procedures on the collection, holding, use, and disclosure
              of your personal information and should be read together with our Terms and
              Conditions. By providing your personal information you consent to our collection, use,
              and disclosure of that information in accordance with this Privacy Policy.
            </Typography>
          </stack>
        </Stack>
      </CardContent>
    </Card>
  );

  return <div>{renderPolicy}</div>;
}
