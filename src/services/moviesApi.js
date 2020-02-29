import axios from 'axios';

const baseUrl = 'https://api.themoviedb.org/3';
const key = '7fee467fd83a6a5bcfdb55d34b6fc4c6';

const getTrendingMovies = async () => {
  const url = `${baseUrl}/trending/all/day?api_key=${key}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    return data.results;
  }
  catch (error) {
    return console.error(error);
  }
};

const getSearchMovies = async searchQuery => {
  const url = `${baseUrl}/search/movie?api_key=${key}&language=en-US&query=${searchQuery}&page=1&include_adult=false`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    return data.results;
  }
  catch (error) {
    return console.error(error);
  }
};

const getMovieDetails = async id => {
  const url = `${baseUrl}/movie/${id}?api_key=${key}&language=en-US`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    return data;
  }
  catch (error) {
    return console.error(error);
  }
};

const getMovieCredits = async id => {
  const url = `${baseUrl}/movie/${id}/credits?api_key=${key}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    return data.cast;
  }
  catch (error) {
    return console.error(error);
  }
}

const getMovieReviews = async id => {
  const url = `${baseUrl}/movie/${id}/reviews?api_key=${key}&language=en-US&page=1`;
  try {
    const response = await axios.get(url);
    const data = response.data;

    return data.results;
  }
  catch (error) {
    return console.error(error);
  }
};

export default {
  getTrendingMovies,
  getSearchMovies,
  getMovieDetails,
  getMovieCredits,
  getMovieReviews
}