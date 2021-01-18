import React, { useCallback } from 'react';
import styled from 'styled-components';
import imageNotFound from '../../../assets/image-not-found.jpg';

export function Card({ data, onClick }) {
  const {
    title, poster_path: posterPath, release_date: releaseDate, genres,
  } = data;

  const genresList = genres.join(', ');
  const movieTitle = (title).slice(0, 33);
  const releaseYear = (releaseDate).slice(0, 4);

  const onErrorImg = useCallback((e) => {
    e.target.onerror = null;
    e.target.src = imageNotFound;
  }, []);

  return (
    <Container onClick={onClick}>
      <ImageInner>
        <StyledImg
          alt={title}
          src={posterPath}
          onError={onErrorImg}
        />
      </ImageInner>
      <Context>
        <TextInner>
          <StyledTitle>{movieTitle}</StyledTitle>
          <StyledDate>{releaseYear}</StyledDate>
        </TextInner>
        <Genre>{genresList}</Genre>
      </Context>
    </Container>
  );
}

const Container = styled.div`
  margin: 5px;
  height: 300px;
  display: flex;
  min-width: 222px;
  max-width: 222px;
  flex-direction: column;
  background: #121413;
  cursor: pointer;
  background-size: cover;

  &:hover {
    transform: scale(1.02);
  }
`;

const ImageInner = styled.div`
  width: 100%;
  height: 73%;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Context = styled.div`
  padding: 5px;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const TextInner = styled.div`
  margin-bottom: 5px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const StyledTitle = styled.h3`
  margin: 0;
  color: #fff;
  text-transform: none;
`;

const StyledDate = styled.p`
  margin: 0;
  padding: 1px 3px;
  color: #fff;
  border: 1px solid #fff;
`;

const Genre = styled.p`
  margin: 0;
  text-align: left;
  text-transform: none;
  color: #fff;
`;
