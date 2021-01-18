import React, {
  useCallback, useState, useEffect,
} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
import {
  Header, Carousel, Main, Card,
} from './components';
import { Button, Input } from '../components';
import search from '../assets/search.svg';
import errorImg from '../assets/error.png';
import { getPopularMoviesRequest, getMoviesRequest, getMoreMoviesRequest } from './actions';

export function Movies() {
  const [value, setValue] = useState('');
  const [searchByValue, setSearchByValue] = useState('title');
  const [sortByValue, setSortByValue] = useState('vote_average');

  const dispatch = useDispatch();

  const {
    movies,
    errorMessage,
    loading,
    loadingMore,
    popularMovies,
    errorMessagePopularMovies,
    loadingPopularMovies,
  } = useSelector((state) => state.movies);

  useEffect(() => {
    if (!movies) {
      dispatch(getPopularMoviesRequest());
      dispatch(getMoviesRequest({
        sortBy: 'vote_average',
      }));
    }
  }, [dispatch, movies]);

  const getActiveButton = useCallback((typeButton) => (searchByValue === typeButton), [searchByValue]);
  const getActiveButtonSortBy = useCallback((typeButton) => (sortByValue === typeButton), [sortByValue]);

  const getMovies = useCallback(() => {
    dispatch(getMoviesRequest({
      searchValue: value,
      searchBy: searchByValue,
      sortBy: sortByValue,
    }));
  }, [dispatch, value, searchByValue, sortByValue]);

  const onClickTitleButton = useCallback(() => {
    setSearchByValue('title');
    if (value) {
      dispatch(getMoviesRequest({
        searchValue: value,
        searchBy: 'title',
        sortBy: sortByValue,
      }));
    }
  }, [dispatch, value, sortByValue]);

  const onClickGenreButton = useCallback(() => {
    setSearchByValue('genres');
    if (value) {
      dispatch(getMoviesRequest({
        searchValue: value,
        searchBy: 'genres',
        sortBy: sortByValue,
      }));
    }
  }, [dispatch, value, sortByValue]);

  const onClickReleaseDateButton = useCallback(() => {
    setSortByValue('release_date');
    dispatch(getMoviesRequest({
      searchValue: value,
      searchBy: searchByValue,
      sortBy: 'release_date',
    }));
  }, [dispatch, value, searchByValue]);

  const onClickRatingButton = useCallback(() => {
    setSortByValue('vote_average');
    dispatch(getMoviesRequest({
      searchValue: value,
      searchBy: searchByValue,
      sortBy: 'vote_average',
    }));
  }, [dispatch, value, searchByValue]);

  const onClickMoreMovies = useCallback(() => {
    dispatch(getMoreMoviesRequest());
  }, [dispatch]);

  return (
    <Container>
      <Header>
        <Search>
          <Input value={value} onChangeText={(valueInput) => setValue(valueInput)} />
          <SearchButton onClick={getMovies} />
        </Search>
        <Inner>
          <SearchBy>
            <Title>search by</Title>
            <ButtonGroup>
              <Button onClick={onClickGenreButton} active={getActiveButton('genres')}>genre</Button>
              <Button onClick={onClickTitleButton} active={getActiveButton('title')}>title</Button>
            </ButtonGroup>
          </SearchBy>
          <StyledButton onClick={getMovies} active>SEARCH</StyledButton>
        </Inner>
        <Carousel data={popularMovies} error={errorMessagePopularMovies} loading={loadingPopularMovies} />
      </Header>
      <Main>
        <HeaderMain>
          <FoundMovies>
            {movies ? movies.total : '0'}
            {' '}
            movies found
          </FoundMovies>
          <InnerSort>
            <TitleSortBy>sort by</TitleSortBy>
            <ButtonGroup>
              <Button onClick={onClickRatingButton} active={getActiveButtonSortBy('vote_average')}>rating</Button>
              <Button onClick={onClickReleaseDateButton} active={getActiveButtonSortBy('release_date')}>release date</Button>
            </ButtonGroup>
          </InnerSort>
        </HeaderMain>
        {errorMessage ? <ImgError src={errorImg} alt="" /> : null}
        {loading
          ? <ReactLoading type="spokes" color="white" height={60} width={60} />
          : (
            <>
              { movies
                ? (movies.data.map((movie) => (
                  <Link key={movie.id} to={{ pathname: `/film/:${movie.id}` }}>
                    <Card data={movie} />
                  </Link>
                )))
                : null }
              {
                movies && movies.total === 0 && !errorMessage ? <NotFoundFilms>Not found movies</NotFoundFilms> : null
              }
            </>
          )}
      </Main>
      { movies && !loading && (movies.total >= 24)
        ? <Button onClick={onClickMoreMovies} active>{loadingMore ? 'Loading...' : 'Loading more'}</Button>
        : null}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

const Search = styled.div`
  position: relative;
  margin-bottom: 15px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const SearchButton = styled.span`
  position: absolute;
  right: 16px;
  top: 9px;
  width: 20px;
  height: 20px;
  background: url(${search}) no-repeat 50% 50%;
  cursor: pointer;
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 25px;

  @media screen and (max-width: 395px) {
    justify-content: center;
  }
`;

const SearchBy = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 395px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const Title = styled.div`
  margin-right: 25px;
  font-size: 16px;
  text-transform: uppercase;
  color: #4A4A4A;
`;

const ButtonGroup = styled.div`
  padding: 5px;
  background: #121413;
`;

const StyledButton = styled(Button)`
  padding: 10px;

  @media screen and (max-width: 395px) {
    display: none;
  }
`;

const HeaderMain = styled.div`
  width: 100%;
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 480px) {
    justify-content: center;
  }
`;

const FoundMovies = styled.p`
  color: #4A4A4A;
  text-transform: uppercase;

  @media screen and (max-width: 480px) {
    display: none;
  }
`;

const InnerSort = styled.div`
  display: flex;
  align-items: center;
`;

const TitleSortBy = styled.div`
  margin-right: 25px;
  font-size: 16px;
  text-transform: uppercase;
  color: #4A4A4A;

  @media screen and (max-width: 325px) {
    display: none;
  }
`;

const ImgError = styled.img`
  width: 100%;
  height: 100%;
`;

const NotFoundFilms = styled.p`
  font-size: 16px;
  text-transform: uppercase;
  color: #4A4A4A;
`;
