import { Pagination } from '@heroui/react'

export function GradePagination({ totalPages, currentPage, setCurrentPage }) {
  return (
    <div className="flex justify-left my-4">
      <Pagination
        isCompact
        showControls
        total={totalPages}
        page={currentPage}
        onChange={(page) => setCurrentPage(page)}
      />
    </div>
  )
}
