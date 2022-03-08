import React, { useEffect, useRef, useState } from 'react'
import classes from './MyPagination.module.scss'

function MyPagination({onChange, range, actualPage,  ...props}) {
    const [paginationIndexes, setPaginationIndexes] = useState(null);

    const checkChangedPage = (index) => {
        return (index >= range[0] && index <= range[1])
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
        if(checkChangedPage(actualPage - 1))
            onChange(actualPage - 1)
    }

    useEffect(() => {
        const list = [];
        const PAGES_ITEMS_QUANT = 12;
        for(let i = actualPage - Math.round(PAGES_ITEMS_QUANT / 2); (i <= actualPage + Math.round(PAGES_ITEMS_QUANT / 2)); i++){
            if(!checkChangedPage(i)) continue
            list.push(  
                <li key={i} className={` ${ i==actualPage ? 'active' : ''}`} 
                    onClick={() => {onPaginationChange(i)}}>
                    <a className='like-a' href='#'>{i}</a>
                </li>
            )
        }

        if(actualPage - Math.round(PAGES_ITEMS_QUANT / 2) > range[0] ){
            list.unshift(
                <li key={'aa'}>
                    <div className={classes.middleDotsContainer}>
                        <div className={classes.middleDots}> </div>
                        <div className={classes.middleDots}> </div>
                        <div className={classes.middleDots}> </div>
                    </div>
                </li>
            )

        }

        if(actualPage + Math.round(PAGES_ITEMS_QUANT / 2) < range[1] ){
            list.push(
                <li key={'asas'}>
                    <div className={classes.middleDotsContainer}>
                        <div className={classes.middleDots}> </div>
                        <div className={classes.middleDots}> </div>
                        <div className={classes.middleDots}> </div>
                    </div>
            </li>
            )
        }
        setPaginationIndexes(list);
    }, [!paginationIndexes, actualPage]);

  return (
    <div className={classes.paginationContainer}>
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