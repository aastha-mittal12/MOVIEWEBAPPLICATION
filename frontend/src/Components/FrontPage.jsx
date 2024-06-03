import React from 'react';
import './FrontPage.css';

const FrontPage = () => {
  return (
    <div className="front-page">
      <div className="banner">
        <h1>Welcome to COLDSTAR</h1>
        <p>Stream your favorite movies and shows</p>
      </div>
      
      <div className="categories">
        <h2>Categories</h2>
        <div className="category-list">
          <div className="category">Action</div>
          <div className="category">Comedy</div>
          <div className="category">Drama</div>
          <div className="category">Horror</div>
          <div className="category">Romance</div>
          <div className="category">Sci-Fi</div>
        </div>
      </div>
      <div className="movies-grid">
        <h2>Featured Movies</h2>
        <div className="grid">
          <div className="movie-poster">
            <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-movie-poster-template-design-0f5fff6262fdefb855e3a9a3f0fdd361_screen.jpg?ts=1700270983" alt="Movie 1" />
          </div>
          <div className="movie-poster">
            <img src="https://intheposter.com/cdn/shop/products/the-family-comedy-in-the-poster-1_1600x.jpg?v=1694762497" alt="Movie 2" />
          </div>
          <div className="movie-poster">
            <img src="https://marketplace.canva.com/EAFB4J2hNdc/1/0/1131w/canva-yellow-black-simple-drama-romance-movie-promotion-poster-4YR9Iy1uJl0.jpg" alt="Movie 3" />
          </div>
          <div className="movie-poster">
            <img src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2016/10/Dont-Speak.jpg?auto=format&q=60&fit=max&w=930" alt="Movie 4" />
          </div>
          <div className="movie-poster">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfoFCl7KGr--eaiEWXNl_HOi5_8UeOszrNfQ&s" alt="Movie 5" />
          </div>
          <div className="movie-poster">
            <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/scifi-movie-poster-template-design-cd0acba902c2650acb2e2c6aa902e1d2_screen.jpg?ts=1668839644" alt="Movie 6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
