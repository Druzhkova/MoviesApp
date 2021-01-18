/* eslint-disable camelcase */
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import ReactLoading from 'react-loading';
import { getMovieRequest, deleteMovieData } from '../../actions';
import imageNotFound from '../../../assets/image-not-found.jpg';
import imageError from '../../../assets/popUpError.jpg';

export const DetailsPopUp = () => {
  const { movieData: data, loadingPopUp, errorMessagePopUp } = useSelector((state) => state.movies);

  const {
    poster_path: image,
    title,
    overview,
    vote_average: rating,
    genres,
    runtime,
    release_date: releaseDate,
  } = data || {};

  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const movieId = id.substr(1);

  useEffect(() => {
    dispatch(getMovieRequest(movieId));
  }, [dispatch, movieId]);

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const handleOutsideClick = () => {
    dispatch(deleteMovieData());
    history.goBack();
  };

  const onErrorImg = useCallback((e) => {
    e.target.onerror = null;
    e.target.src = imageNotFound;
  }, []);

  return (
    <Container onClick={handleOutsideClick}>
      { loadingPopUp
        ? <ReactLoading type="spokes" color="white" height={60} width={60} /> : (
          <Card onClick={handleClick} error={errorMessagePopUp}>
            <ImageInner>
              <StyledImg alt={title} src={image} onError={onErrorImg} />
            </ImageInner>
            { data
              ? (
                <Context>
                  <TextInner>
                    <StyledTitle>{title}</StyledTitle>
                    <StyledDate>{releaseDate ? (releaseDate).slice(0, 4) : releaseDate}</StyledDate>
                  </TextInner>
                  <Genre>{genres ? genres.join(', ') : genres}</Genre>
                  <Overview>{overview}</Overview>
                  <Inner>
                    <span>
                      Movie duration:
                      {' '}
                      {runtime || 'unknown'}
                    </span>
                    <span>
                      Rating:
                      {' '}
                      {rating || 0}
                    </span>
                  </Inner>
                </Context>
              )
              : null }
          </Card>
        )}
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  overflow: auto;
  display:flex;
  justify-content:center;
  align-items:center;
  z-index: 2;
`;

const Card = styled.div`
  color: white;
  max-width: 500px;
  width: 100%;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  align-items:center;
  background-color: #101010;

  ${(props) => (props.error ? `
      background: url(${imageError}) no-repeat 50% 50%;
  ` : '')}
`;

const ImageInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 15px;
  outline: none;
  min-height: 300px;
`;

const StyledImg = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
`;

const Context = styled.div`
  width: 95%;
  height: 300px;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const TextInner = styled.div`
  width: 100%;
  margin-bottom: 5px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const StyledTitle = styled.h1`
  margin: 0;
  color: #fff;
  text-transform: none;
`;

const StyledDate = styled.p`
  margin: 0 0 0 5px;
  padding: 1px 3px;
  color: #fff;
  border: 1px solid #fff;
  font-size: 16px;
`;

const Genre = styled.p`
  margin: 0;
  text-align: left;
  text-transform: none;
  color: #fff;
`;

const Overview = styled.p`
  height: 165px;
  font-size: 16px;
  overflow-y: auto;
`;

const Inner = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 15px;
`;
