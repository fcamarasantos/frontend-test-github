import React, { useEffect, useState } from 'react'
import { getCommitList } from '../../../requests/getRepoList/getRepoList';
import './Home.scss'

function Home(props) {

    const [commitsData, setCommitsData] = useState(null); 
    const [actualPage, setActualPage] = useState(1);
    const [lastPageNum, setLastPageNum] = useState(null);

    useEffect(async () => {
        let commitsResp = await getCommitList(props.data.owner.login, props.data.name, {per_page: 50, page: actualPage}); 
        setCommitsData(commitsResp);
        setLastPageNum(commitsResp.lastPage);
    },[]);

    useEffect(async () => {
        let commitsResp = await getCommitList(props.data.owner.login, props.data.name, {per_page: 50, page: actualPage}); 
        setCommitsData(commitsResp);
        setLastPageNum(commitsResp.lastPage);
    }, [actualPage]);

    const verifyPageNum = (pageNum) => {
        return (pageNum >= 1 && pageNum <= lastPageNum);
    }

    const onPaginationChange = (pageNum) => {
        verifyPageNum(pageNum)
            setActualPage(pageNum)
    }

    const onBeforePagition = () => {
        setActualPage(prev => {
            if(verifyPageNum(prev -1)) return prev -1;
            else return prev;
        });
    }
    const onNextPagition = () => {
        setActualPage(prev => {
            if(verifyPageNum(+prev +1)) return +prev +1;
            else return +prev;
        });
    }

    let paginationIndexes = [];
    for(let i =0; i < lastPageNum; i++){
        let itemPageNum = i + 1;
        paginationIndexes.push(
            <li key={i} className={`waves-effect ${itemPageNum==actualPage ? 'active' : ''}`} onClick={() => {onPaginationChange(itemPageNum)}}><a className='like-a' href='#'>{itemPageNum}</a></li>
        )
    }

  return (
    <div className='HomeContainer container'>
        <p className='table-title'>Tabela de commits</p>
        <table>
        <thead>
          <tr>
              <th>Autor</th>
              <th>Descrição</th>
              <th>Data</th>
          </tr>
        </thead>
        <tbody>
            {commitsData && commitsData.map((item) => { 
                let date = new Date(item.commit.author.date);
                return(
                    <tr key={item.sha}>
                        <td>{item.commit.author.name}</td>
                        <td>{item.commit.message}</td>
                        <td>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</td>
                    </tr>
            )})}
         
        </tbody>
      </table>
      <div className='container'>
          
        <div className='row'>
            <div className='col'>
                <ul className="pagination">
                    <li className={`${actualPage <= 1 ? 'disabled' : ''}`}><a href="#" onClick={onBeforePagition}><i className="material-icons">chevron_left</i></a></li>
                    {paginationIndexes}
                    <li className={`waves-effect ${actualPage >= lastPageNum ? 'disabled' : ''}`} ><a href="#" onClick={onNextPagition}><i className="material-icons">chevron_right</i></a></li>
                </ul>
            </div>
        </div>
        
      </div>
    </div>
  )
}

export default Home