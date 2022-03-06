import React, { useEffect, useState } from 'react'
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import SearchBarRepos from '../../components/SearchBarRepos/SearchBarRepos';
import { getRepoList } from '../../requests/getRepoList/getRepoList';
import './SearchRepos.scss';

function SearchRepos() {
    const [repoList, setRepoList] = useState([]);
    const [paginationNum, setPaginationNum] = useState(1);
    const [lastPageNum, setlastPageNum] = useState(null);
    const [inputQquery, setInputquery] = useState('');
    const resultsPerPage = 20;

    useEffect(async () => {
        if(!inputQquery || !paginationNum) return;

        let repoList = await getRepoList(`${inputQquery} in:name`, {per_page: resultsPerPage, page: paginationNum});
        setRepoList( repoList.items);
    }, [paginationNum]);

    const onPaginationChange = (index) => {
        setPaginationNum(index);
    }


    const setSearchRespData = (data) => {
        setRepoList(data.items);
        setlastPageNum(data.lastPage);
    }

    const onNextPagition = () => {
        setPaginationNum(prev => {
           let newNum = prev;
            if(newNum + 1 <= lastPageNum) newNum++;

            return newNum;
        })
    }
    const onLastPagition = () => {
        setPaginationNum(prev => {
            let newNum = prev;
             if(newNum - 1 > 0) newNum-=1;
 
             return newNum;
         })
    }

    const setInputqueryHandler = (query) => {
        setInputquery(query)    
    }

    let paginationIndexes = [];
    for(let i =0; i < lastPageNum; i++){
        let itemPageNum = i + 1;
        paginationIndexes.push(
            <li key={i} className={`waves-effect ${itemPageNum==paginationNum ? 'active' : ''}`} onClick={() => {onPaginationChange(itemPageNum)}}><a className='like-a' href='#'>{itemPageNum}</a></li>
        )
    }

  return (
    <div className='searchRepos-page'>
        <header>
            <div className='top-titles'>
                <h1>Encontre um repositório </h1>
                <p className='subtitle'>Insira o nome do repositório desejado. Por exemplo: 'vue', 'react' ...</p>
            </div>

            <SearchBarRepos setReposData={setSearchRespData} setInputquery={setInputqueryHandler} resultsQuantity={resultsPerPage}/>

            <div className='container'>
                <div className='row repo-list-row'>
                    {repoList ? repoList.map((item) => (
                        <div className='col s6 m4 my-profile-card-col' key={item.id}>
                            <ProfileCard 
                                title={item.name}
                                subtitle={item.owner.login}
                                img={item.owner.avatar_url}
                                issuesNumber={item.open_issues_count}
                                forksNumber={item.forks_count}
                                description={item.description}
                                item={item}
                                link={`/Dashboard/${item.id}`}
                            />
                        </div>
                    )) :''}
                </div>
            </div>
        </header>
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <ul className="pagination">
                        <li className={`${paginationNum <= 1 ? 'disabled' : ''}`}><a href="#!" onClick={onLastPagition}><i className="material-icons">chevron_left</i></a></li>
                        {paginationIndexes}
                        <li className={`waves-effect ${paginationNum >= lastPageNum ? 'disabled' : ''}`} ><a href="#" onClick={onNextPagition}><i className="material-icons">chevron_right</i></a></li>
                    </ul>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default SearchRepos