import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import Header from '../components/PergoHeader/PergoHeader';

const MainLayout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <AppContainer>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div className="body-container">
          <main>{children}</main>
        </div>
      </AppContainer>
    </>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;

const AppContainer = styled.div``;
