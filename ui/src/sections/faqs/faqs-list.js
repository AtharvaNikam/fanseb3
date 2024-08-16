// @mui
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
// _mock
// components
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------
const mockFaqs = [
  {
    id: 1,
    value: `question1`,
    heading: 'How to contact with Customer Service?',
    detail:
      'Our Customer Experience Team is available 7 days a week and we offer 2 ways to get in contact.Email and Chat . We try to reply quickly, so you need not to wait too long for a response!',
  },
  {
    id: 2,
    value: `question2`,
    heading: 'App installation failed, how to update system information?',
    detail:
      'Please read the documentation carefully. We also have some online video tutorials regarding this issue . If the problem remains, Please Open a ticket in the support forum.',
  },
  {
    id: 3,
    value: `question3`,
    heading: 'Website reponse taking time, how to improve?',
    detail:
      'At first, Please check your internet connection . We also have some online video tutorials regarding this issue . If the problem remains, Please Open a ticket in the support forum.',
  },
  {
    id: 4,
    value: `question4`,
    heading: 'New update fixed all bug and issues?',
    detail:
      'We are giving the update of this theme continuously . You will receive an email Notification when we push an update. Always try to be updated with us .',
  },
  {
    id: 5,
    value: `question5`,
    heading: 'How to contact with Customer Service?',
    detail:
      'Our Customer Experience Team is available 7 days a week and we offer 2 ways to get in contact.Email and Chat . We try to reply quickly, so you need not to wait too long for a response!',
  },
  {
    id: 6,
    value: `question6`,
    heading: 'App installation failed, how to update system information?',
    detail:
      'Please read the documentation carefully. We also have some online video tutorials regarding this issue . If the problem remains, Please Open a ticket in the support forum.',
  },
  {
    id: 7,
    value: `question7`,
    heading: 'Website reponse taking time, how to improve?',
    detail:
      'At first, Please check your internet connection . We also have some online video tutorials regarding this issue . If the problem remains, Please Open a ticket in the support forum.',
  },
  {
    id: 8,
    value: `question8`,
    heading: 'New update fixed all bug and issues?',
    detail:
      'We are giving the update of this theme continuously . You will receive an email Notification when we push an update. Always try to be updated with us .',
  },
];
// ----------------------------------------------------------------------

export default function FaqsList() {
  return (
    <div>
      {mockFaqs.map((accordion) => (
        <Accordion key={accordion.id}>
          <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
            <Typography variant="subtitle1">{accordion.heading}</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>{accordion.detail}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
