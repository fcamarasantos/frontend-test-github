import React, { useEffect, useState } from 'react'
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import SearchBarRepos from '../../components/SearchBarRepos/SearchBarRepos';
import './SearchRepos.scss';

function SearchRepos() {
    const [repoList, setRepoList] = useState([]);

    useEffect(() => {
       console.log(repoList)
    });

  return (
    <div className='searchRepos-page'>
        <header>
            <div className='top-titles'>
                <h1>Encontre um repositório </h1>
                <p className='subtitle'>Insira o nome do repositório desejado. Por exemplo: 'vue', 'react' ...</p>
            </div>

            <SearchBarRepos setReposData={setRepoList}/>

            <div className='container'>
                <div className='row repo-list-row'>
                    {repoList.map((item) => (
                        <div className='col s6 m4 l3' key={item.id}>
                            <ProfileCard 
                                title={item.owner.login}
                                subtitle={item.name}
                                img={item.owner.avatar_url}
                                issuesNumber={item.open_issues_count}
                                forksNumber={item.forks_count}
                                description={item.description}
                                link={'/'}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </header>
    </div>
  )
}

export default SearchRepos