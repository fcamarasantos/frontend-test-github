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
        let data = await resp.json();
        data.lastPage = lastPage;

        let pageCount = [];
        if(!lastPage) pageCount = [0]
        else
            for(let i = 1; i <= lastPage; i++){
                pageCount.push(i)
            }
        let allCommits = Promise.all(pageCount.map(async (elem) => {
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

export const getPullRequestList = async (owner, repo, {per_page = 50, page=1} = {per_page : 50, page:1}) => {
    return fetch(`https://api.github.com/repos/${owner}/${repo}/pulls?per_page=${per_page}&page=${page}&state=all`, {
        headers: headers
    }).then(async (resp) => {
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

export const getAllRepoPullRequests = async (owner, repo) => {
    let per_page = 100;

    return fetch(`https://api.github.com/repos/${owner}/${repo}/pulls?per_page=${per_page}&page=${1}&state=all`, {
        'headers': headers
    }).then(async resp => {
        let lastPage = getNumberOfPages(resp.headers.get('link'))
        
        let data = await resp.json();
        data.lastPage = lastPage;

        let pageCount = [];
        if(!lastPage) pageCount = [0]
        else
            for(let i = 1; i <= lastPage; i++){
                pageCount.push(i)
            }
        let allPull = Promise.all(pageCount.map(async (elem) => {
            let a = await  getPullRequestList(owner, repo, {per_page: per_page, page: elem})
            return a
        }
        )).then(async (resp) => {
            let toReturn = [];
            resp.forEach((item) => {
                item.forEach(elem => {
                    toReturn.push(elem)

                })
            });

            return toReturn
        });

        
        return allPull
    });
  
}

export const getRepoIssues = async (owner, repo, {per_page = 50, page=1} = {per_page : 50, page:1}) => {
    return fetch(`https://api.github.com/repos/${owner}/${repo}/issues?per_page=${per_page}&page=${page}&state=all`, {
        headers: headers
    }).then(async (resp) => {
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

export const getNumOfOpenClosedIssues = async  (query) => {
    return fetch(`https://api.github.com/search/issues?q=${query}&per_page=${1}&page=${1}`, {
        'headers': headers
    }).then(async resp => {
        let data = await resp.json();
        return data
    }).then(resp => {
        return resp
    });
}