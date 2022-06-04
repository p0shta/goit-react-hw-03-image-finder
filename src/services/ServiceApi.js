const URL = 'https://pixabay.com/api/';
const API_KEY = '27312740-8863e8bb5d8c57be57511899b';

export default function ServiceApi(search, page) {
    const searchQueryString = makeLongQueryString(search);

    const url = `${URL}?key=${API_KEY}&q=${searchQueryString}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`;
    return fetch(url).then(res => res.json());
}

function makeLongQueryString(searchQuery) {
    const queryString = searchQuery.split(' ');
    if (queryString.length > 1) {
        return queryString.join('+');
    }

    return queryString.join('');
}
