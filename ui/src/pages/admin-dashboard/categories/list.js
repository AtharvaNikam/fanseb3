import { Helmet } from 'react-helmet-async';
import { CategoriesListView } from 'src/sections/categories/view';

// sections

// ----------------------------------------------------------------------

export default function CategoryListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Category List</title>
      </Helmet>

      <CategoriesListView />
    </>
  );
}
