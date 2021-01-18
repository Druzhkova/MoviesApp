import React, { useRef } from 'react';
import styled from 'styled-components';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
import notFound from '../../../assets/moviesNotFound.gif';

export function Carousel({ data, error, loading }) {
  const MARGIN_IMG = 2;

  const scrollRef = useRef(null);
  const imgRef = useRef(null);

  let scrollAmount = 0;

  const sliderScrollLeft = () => {
    scrollRef.current.scrollTo({
      top: 0,
      left: (scrollAmount -= imgRef.current.clientWidth + MARGIN_IMG),
      behavior: 'smooth',
    });

    if (scrollAmount < 0) {
      scrollAmount = 0;
    }
  };

  const sliderScrollRight = () => {
    if (scrollAmount <= scrollRef.current.scrollWidth - scrollRef.current.clientWidth) {
      scrollRef.current.scrollTo({
        top: 0,
        left: (scrollAmount += imgRef.current.clientWidth + MARGIN_IMG),
        behavior: 'smooth',
      });
    }
  };

  const handleKeyDown = (evt) => {
    if (evt.keyCode === 37) {
      sliderScrollLeft();
    } else if (evt.keyCode === 39) {
      sliderScrollRight();
    }
  };

  return (
    <Container onKeyDown={handleKeyDown} tabIndex="0" error={error}>
      {loading ? <ReactLoading type="spokes" color="#4A4A4A" height={60} width={60} /> : null}
      <CarouselBox ref={scrollRef}>
        {/* {error ? <ImgNotFound src={notFound} alt="" /> : null} */}
        { data
          ? data.data.map((cur) => (
            <Link key={cur.id} to={{ pathname: `/film/:${cur.id}` }}>
              <Img
                ref={imgRef}
                alt={cur.title}
                src={cur.poster_path}
              />
            </Link>
          ))
          : null }
      </CarouselBox>
      {
        error ? null
          : (
            <>
              <SwitchLeft onClick={sliderScrollLeft}>{'<'}</SwitchLeft>
              <SwitchRight onClick={sliderScrollRight}>{'>'}</SwitchRight>
            </>
          )
      }

    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 927px;
  height: 223px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) => (props.error ? `
      background: url(${notFound}) no-repeat 50% 50%;
      background-size: cover;
  ` : '')}

  @media screen and (max-width: 1030px) {
    width: 100%;
  }
`;

const SwitchLeft = styled.a`
  position: absolute;
  left: -50px;
  height: 100%;
  width: 45px;
  font-weight: bold;
  line-height: 203px;
  font-size: 25px;
  text-align: center;
  color: #4A4A4A;
  top: 0;
  z-index: 2;
  cursor: pointer;

  @media screen and (max-width: 1030px) {
    display: none;
  }
`;

const SwitchRight = styled.a`
  position: absolute;
  right: -50px;
  height: 100%;
  width: 45px;
  font-size: 25px;
  font-weight: bold;
  line-height: 203px;
  text-align: center;
  color: #4A4A4A;
  top: 0;
  z-index: 2;
  cursor: pointer;

  @media screen and (max-width: 1030px) {
    display: none;
  }
`;

const CarouselBox = styled.div`
  height: 100%;
  width: auto;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
  display: flex;
  align-items: center;

  @media screen and (max-width: 935px) {
    margin: 0 -20px;
  }

  @media screen and (max-width: 395px) {
    margin: 0 -10px;
  }
`;

const Img = styled.img`
  margin: 0 1px;
  min-width: 152.5px;
  max-width: 152.5px;
  height: 225px;
  background-size: cover;
  cursor: pointer;
  transition: 0.5s ease;

  &:hover {
    transform: scale(1.4);
    z-index: 3;
  }
`;
