import PropTypes from 'prop-types';
// @mui
import Pagination, { paginationClasses } from '@mui/material/Pagination';
//
import { useState } from 'react';
import ProductQuestionsItem from './product-questions-item';

// ----------------------------------------------------------------------

export default function ProductQuestionsList({ questions }) {
  // Number of questions per page
  const questionsPerPage = 5;

  // State to track the current page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total number of pages
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  // Calculate index of the first and last question to display on the current page
  const startIndex = (currentPage - 1) * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;

  // Filter questions to display on the current page
  const questionsToShow = questions.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {/* Display questions for the current page */}
      {questionsToShow.map((question) => (
        <ProductQuestionsItem key={question.id} questions={question} />
      ))}

      {/* Pagination component */}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        sx={{
          mx: 'auto',
          [`& .${paginationClasses.ul}`]: {
            my: 5,
            mx: 'auto',
            justifyContent: 'center',
          },
        }}
      />
    </>
  );
}

ProductQuestionsList.propTypes = {
  questions: PropTypes.any,
};
