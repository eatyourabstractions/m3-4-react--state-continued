import React from 'react';
import styled from 'styled-components';
import GlobalStyles from './GlobalStyles';
import Typehead from './Typehead';

import data from '../data';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
`;

const App = (props) => {
  return (
    <>
      <GlobalStyles />
      {/* TODO */}
      <Wrapper>
        <Typehead 
          suggestions={data.books}
          handleSelect={(suggestion) => {window.alert(suggestion)}}
          />
      </Wrapper>
    </>
  );
};

export default App;
