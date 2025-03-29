import React from "react";

const Pagination = ({ totalPosts, postsPerPage, currentPage, setCurrentPage }) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center mt-6 space-x-2">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-4 py-2 rounded-md text-gray-700 transition-colors duration-300
            ${currentPage === page ? " bg-slate-700 hover:bg-slate-800 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
