import { Helmet } from 'react-helmet-async';
import { CategoriesEditView } from 'src/sections/categories/view';
// sections

// ----------------------------------------------------------------------

export default function CategoryEditPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Category Edit</title>
      </Helmet>

      <CategoriesEditView />
    </>
  );
}
