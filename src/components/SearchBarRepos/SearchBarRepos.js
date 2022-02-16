import React, { useState } from 'react'
import { getRepoList } from '../../requests/getRepoList/getRepoList';
import './SearchBarRepos.scss';

function SearchBarRepos({setReposData}) {

    const [inputData, setInputData] = useState('');

    const inputChangeHandler = (e) => {
        setInputData(e.target.value)
    }

    const searchRepoList = async (query) => {
        let repoList = await getRepoList(`${query} in:name`, {per_page: 20});
        setReposData(repoList.items);
    }

    const searchHandler = (e) => {
        e.preventDefault();

        searchRepoList(inputData)
    }


  return (
    <div className='searchArea'>
        <form  onSubmit={searchHandler}>
            <div className='row searchTextArea'>

                <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                <input id="search" className='serach-text-input' type="search" value={inputData} onChange={inputChangeHandler} required />

                <button type='submit' className='serach-btn'>Pesquisar</button>
            </div>
            
        </form>
    </div>
  )
}

export default SearchBarRepos