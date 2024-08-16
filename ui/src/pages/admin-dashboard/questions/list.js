import { Helmet } from 'react-helmet-async';
import { QuestionsListView } from 'src/sections/admin/questions/view';
// sections

// ----------------------------------------------------------------------

export default function ProductListPage() {
  return (
    <>
      <Helmet>
        <title> Questions </title>
      </Helmet>

      <QuestionsListView />
    </>
  );
}
