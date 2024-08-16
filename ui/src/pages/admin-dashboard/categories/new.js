import { Helmet } from 'react-helmet-async';
import { CategoriesCreateView } from 'src/sections/categories/view';
// sections

// ----------------------------------------------------------------------

export default function CategoryCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Category a new user</title>
      </Helmet>

      <CategoriesCreateView />
    </>
  );
}
