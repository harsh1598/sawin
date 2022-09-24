import React from 'react';
import './Pagination.scss';

interface PaginationProps {
    totalItems?: number
    itemsCountPerPage?: number
}

const Pagination = (props: PaginationProps) => {
    var items: number = props.totalItems ? props.totalItems : Number(1)
    var count: number = props.itemsCountPerPage ? props.itemsCountPerPage : Number(1)
    const totalPages = items / count

    return (
        <>
            <div className='pagination'>
                <div className='arrow-box'>
                    <img src={require('../../assets/images/left-light-icon.svg').default} alt='left' className='pagination-icon' />
                </div>
                <div className='arrow-box'>
                    <div className='pagination-count'>1</div>
                </div>
                <div className='arrow-box'>
                    <img src={require('../../assets/images/right-icon.svg').default} alt='right' className='pagination-icon' />
                </div>
            </div>
        </>
    )
}

export default Pagination;