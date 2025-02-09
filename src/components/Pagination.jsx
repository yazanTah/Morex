const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-8 mb-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md ${
          currentPage === 1
            ? "cursor-not-allowed bg-[#0F0D23]"
            : "bg-[#0F0D23] hover:bg-[#1E213A]"
        }`}
      >
        <img src="/public/back-page.svg" />
      </button>

      <div className="flex items-center gap-2">
        <span className="text-xl font-semibold text-white">{currentPage}</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-400">{totalPages}</span>
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md ${
          currentPage === totalPages
            ? "cursor-not-allowed bg-[#0F0D23]"
            : "bg-[#0F0D23] hover:bg-[#1E213A]"
        }`}
      >
        <img src="/public/next-page.svg" />
      </button>
    </div>
  );
};

export default Pagination;
