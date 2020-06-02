import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const PergoTitle = ({ children, fontSize, color, ...otherProps }) => {
  return (
    <TitleH2 fontSize={fontSize} color={color} {...otherProps}>
      {children}
    </TitleH2>
  );
};

PergoTitle.propTypes = {
  fontSize: PropTypes.string, // 'big', 'normal', 'small', '49px', '5em'
  color: PropTypes.string,
};

PergoTitle.defaultProps = {
  fontSize: '25px',
  color: 'white',
};

const TitleH2 = styled.h2`
  font-family: var(--font-family);
  font-weight: 600;
  font-size: ${props => props.fontSize};
  line-height: 110%;
  color: ${props => props.color};
  margin: 0;
`;

export const PergoDescription = ({ children, fontSize, color, ...otherProps }) => {
  return (
    <DescriptionP fontSize={fontSize} color={color} {...otherProps}>
      {children}
    </DescriptionP>
  );
};

PergoDescription.propTypes = {
  fontSize: PropTypes.string, // 'big', 'normal', 'small', '49px', '5em'
  color: PropTypes.string,
};

PergoDescription.defaultProps = {
  fontSize: '16px',
  color: 'white',
};

const DescriptionP = styled.p`
  font-family: var(--font-family);
  font-weight: 400;
  font-size: ${props => props.fontSize};
  color: ${props => props.color};
  margin: 0;
  padding: 0;
`;
