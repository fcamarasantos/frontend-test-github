import React, { useEffect, useState } from 'react'
import MyPagination from '../../components/myPagination/MyPagination';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import SearchBarRepos from '../../components/SearchBarRepos/SearchBarRepos';
import { getRepoList } from '../../requests/getRepoList/getRepoList';
import classes from './SearchRepos.module.scss';

function SearchRepos() {
    const [repoList, setRepoList] = useState([]);
    const [paginationNum, setPaginationNum] = useState(1);
    const [lastPageNum, setlastPageNum] = useState(null);
    const [inputQquery, setInputquery] = useState('');
    const resultsPerPage = 20;

    useEffect(async () => {
        if(!inputQquery || !paginationNum) return;

        let repoList = await getRepoList(`${inputQquery} in:name`, {per_page: resultsPerPage, page: paginationNum});
        console.log(repoList.items)
        setRepoList( repoList.items);

        
    }, [paginationNum]);

    const setSearchRespData = (data) => {
        setRepoList(data.items);
        setlastPageNum(data.lastPage);
    }


    const setInputqueryHandler = (query) => {
        setInputquery(query)    
    }

  return (
    <div className={classes.searchReposPage}>
        <header>
            <div className={classes.topTitles}>
                <h1>Encontre um repositório </h1>
                <p className={classes.subtitle}>Insira o nome do repositório desejado. Por exemplo: 'vue', 'react' ...</p>
            </div>

            <SearchBarRepos setReposData={setSearchRespData} setInputquery={setInputqueryHandler} resultsQuantity={resultsPerPage}/>

            <div className='container'>
                <div className={['row', classes.repoListRow].join(' ')}>
                    {repoList ? repoList.map((item) => (
                        <div className={['col s6 m4', classes.myProfileCardCol].join(' ')} key={item.id}>
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
        {lastPageNum &&
            <MyPagination range={[1, lastPageNum]} actualPage={paginationNum} onChange={setPaginationNum}/>
        }
    </div>
  )
}

export default SearchRepos