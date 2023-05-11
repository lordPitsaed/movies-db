import { Pagination } from 'antd'
import React from 'react'
import './pages-pagination.css'

const PagesPagination: React.FC<{
    pages: number
    onPageChange: (page: number) => void
}> = ({ pages, onPageChange }) => {
    return (
        <Pagination
            defaultCurrent={1}
            total={pages}
            hideOnSinglePage
            className="pagination"
            showSizeChanger={false}
            onChange={(page) => onPageChange(page)}
        />
    )
}

export default PagesPagination
