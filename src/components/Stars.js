import React from 'react'
import styled from 'styled-components'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'

const Stars = ({ stars, reviews }) => {

  // here we are setting up the stars programmatically instead of copy and pasting
  // first we create an array with a lenght of 5, but arrays are 0 based so 0-4 is the index, we don't care about the first paramater, so "_"; Array.from has a cb function as welll, which is what we are using to return our stars
  // every iteration it will change, it with 0 and go to 4, which is why we add + 1 for the number
  const tempStars = Array.from({ length: 5 }, (_, index) => {
    // index 0-4
    const number = index + 0.5;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <BsStarFill /> 
        ) : stars >= number ? (
          <BsStarHalf /> 
        ) : (
          <BsStar />
        )}
      </span>
    )
  });
  
  return (
    <Wrapper>
      <div className="stars">
        {tempStars}
      </div>
      <p className='reviews'>({reviews} customer reviews)</p>
    </Wrapper>
  ) 
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`
export default Stars
