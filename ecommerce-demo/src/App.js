import React, {Component} from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  ClearRefinements,
  RefinementList,
  Configure,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import './App.css';

const searchClient = algoliasearch('B1G2GM9NG0', 'aadef574be1f9252bb48d4ea09b5cfe5');

class App extends Component {
  render() {
    return (
      <div>
        <header className="header">
          <h1 className="header-title">
            <a href="/">ecommerce-demo</a>
          </h1>
          <p className="header-subtitle">
            using{' '}
            <a href="https://github.com/algolia/react-instantsearch">
              React InstantSearch
            </a>
          </p>
        </header>

        <div className="container">
          <InstantSearch searchClient={searchClient} indexName="demo_ecommerce">
            <div className="left-panel">
              <ClearRefinements />
              <h2>Brands</h2>
              <RefinementList attribute="brand" />
              <h2>Categories</h2>
              <RefinementList attribute="categories" />
              <Configure hitsPerPage={16} />
            </div>
            <div className="search-panel right-panel">
              <div className="search-panel__results">
                <SearchBox
                  className="searchbox"
                  translations={{
                    placeholder: 'Search here',
                  }}
                />
                <Hits hitComponent={Hit} />

                <div className="pagination">
                  <Pagination />
                </div>
              </div>
            </div>
          </InstantSearch>
        </div>
      </div>
    );
  }
}

function Hit(props) {
  console.log(props)
  return (
    <article>
      <div>
        <img src={props.hit.image} align="left" alt={props.hit.name} />
        <div className="hit-name">
          <Highlight attribute="name" hit={props.hit} />
        </div>
        <div className="hit-description">
          <Highlight attribute="description" hit={props.hit} />
        </div>
        <div className="hit-price">${props.hit.price}</div>
      </div>
    </article>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default App;
