const headers = {
    "Authorization" : `Token ${process.env.REACT_APP_KEY_TOKEN}`
}

export const getRepoList = async (query, {per_page = 50, page=1} = {per_page : 50, page:1}) => {
    return fetch(`https://api.github.com/search/repositories?q=${query}&per_page=${per_page}&page=${page}`, {
            'headers': headers
    }).then(resp => resp.json()).then(resp => resp);
}
