import React, { useEffect, useState } from 'react'
import clases from './MyPagination.module.scss'

function MyPagination({onChange, range, actualPage,  ...props}) {

    const [paginationIndexes, setPaginationIndexes] = useState(null);

    const checkChangedPage = (index) => {
        return (index >= range[0] && index < range[1])
    }

    const onPaginationChange = (index) => {
        if(checkChangedPage(index))
            onChange(index)
    }

    const onNextPagition = () => {
        if(checkChangedPage(actualPage + 1))
            onChange(actualPage + 1)
    }
    const onLastPagition = () => {
        if(checkChangedPage(actualPage + 1))
            onChange(actualPage - 1)
    }

    useEffect(() => {
        const list = [];

        for(let i = range[0]; i < range[1]; i++){
            list.push(  
                <li key={i} className={`waves-effect ${i==actualPage ? 'active' : ''}`} 
                    onClick={() => {onPaginationChange(i)}}>
                    <a className='like-a' href='#'>{i}</a>
                </li>
            )
        }

        setPaginationIndexes(list)
    }, []);

  return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <ul className="pagination">
                    <li className={''}><a href="#!" onClick={onLastPagition}><i className="material-icons">chevron_left</i></a></li>
                    {paginationIndexes}
                    <li className={`waves-effect`} ><a href="#" onClick={onNextPagition}><i className="material-icons">chevron_right</i></a></li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default MyPagination