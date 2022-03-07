const headers = {
    "Authorization" : `Token ${process.env.REACT_APP_KEY_TOKEN}`
}

const getNumberOfPages = (link) => {
    if(!link) return null;

    let lastPageNum = link.split(",")[1].match(/.*page=(?<page_num>\d+)/);
    lastPageNum = lastPageNum.groups.page_num;
    return lastPageNum;
}

export const getCommitList = async (owner, repo, {per_page = 50, page=1} = {per_page : 50, page:1}) => {
    return  fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=${per_page}&page=${page}`, 
        {
            headers : headers
        }
    ) .then(async (resp) => {
        // console.log(resp.headers.get('Link'))
        let lastPage = getNumberOfPages(resp.headers.get('link'));
        let data = await resp.json();
        data.lastPage = lastPage;
        return data;
    }).then(
        (resp) => {
            return resp
        }
    );
}

export const getRepoList = async (query, {per_page = 50, page=1} = {per_page : 50, page:1}) => {
    return fetch(`https://api.github.com/search/repositories?q=${query}&per_page=${per_page}&page=${page}`, {
            'headers': headers
    }).then(async resp => {
        let lastPage = getNumberOfPages(resp.headers.get('link'))

        let data = await resp.json();
        data.lastPage = lastPage;
        return data
    }).then(resp => {
        
        return resp});
}

export const getAllRepoCommits = async (owner, repo) => {
    let per_page = 100;

    return fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=${per_page}&page=${1}`, {
        'headers': headers
    }).then(async resp => {
        let lastPage = getNumberOfPages(resp.headers.get('link'))
        // console.log(resp.headers.get('link'))

        let data = await resp.json();
        data.lastPage = lastPage;

        let pageCount = [];
        if(!lastPage) pageCount = [0]
        else
            for(let i = 1; i <= lastPage; i++){
                pageCount.push(i)
            }
        let allCommits = Promise.all(pageCount.map(async (elem) => {
            // console.log(owner, repo, {per_page: per_page, page: elem.pageCount})
            let a = await  getCommitList(owner, repo, {per_page: per_page, page: elem})
            return a
        }
        )).then((resp) => {
            let toReturn = [];
            resp.forEach((item) => {
                item.forEach(elem => {
                    toReturn.push(elem)

                })
            });

            return toReturn
        });

        
        return allCommits
    });
  
}