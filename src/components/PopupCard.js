import React from 'react';
import styled from 'styled-components';
import links from './links';

const Card = ({ onMarkAsRead, onOkay }) => {
    const handleTwitterClick = () => {
        window.open(links.twitter, '_blank'); // Use the imported Twitter link
    };

    const handleGithubClick = () => {
        window.open(links.github, '_blank'); // Use the imported GitHub link
    };

    const handleproductHuntClick = () => {
        window.open(links.productHunt, '_blank'); // Use the imported GitHub link
    };

    return (
        <StyledWrapper>
            <div className="brutalist-card">
                <div className="brutalist-card__header">
                    <div className="brutalist-card__icon">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                        </svg>
                    </div>
                    <div className="brutalist-card__alert">Hey There 👋</div>
                </div>
                <div className="brutalist-card__message">
                    Be a part of this journey and follow me on Twitter 🚀
                </div>
                <div className="brutalist-card__actions flex flex-col justify-center items-center">
                    <button className="brutalist-card__button brutalist-card__button--mark" onClick={handleTwitterClick}>
                        Follow Me on Twitter
                    </button>
                    <button className="brutalist-card__button brutalist-card__button--read" onClick={handleGithubClick}>
                        Contribute on Github
                    </button>
                    <button className="brutalist-card__button brutalist-card__button--prodcutHunt" style={{ color: '#ff4700' }} onClick={handleproductHuntClick}>
                        Review us on Product Hunt!
                    </button>
                </div>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .brutalist-card {
    width: 320px;
    border: 4px solid #000;
    background-color: #fff;
    padding: 1.5rem;
    box-shadow: 10px 10px 0 #000;
    font-family: "Arial", sans-serif;
  }

  .brutalist-card__header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    border-bottom: 2px solid #000;
    padding-bottom: 1rem;
  }

  .brutalist-card__icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000;
    padding: 0.5rem;
  }

  .brutalist-card__icon svg {
    height: 1.5rem;
    width: 1.5rem;
    fill: #fff;
  }

  .brutalist-card__alert {
    font-weight: 900;
    color: #000;
    font-size: 1.5rem;
    text-transform: uppercase;
  }

  .brutalist-card__message {
    margin-top: 1rem;
    color: #000;
    font-size: 0.9rem;
    line-height: 1.4;
    border-bottom: 2px solid #000;
    padding-bottom: 1rem;
    font-weight: 600;
  }

  .brutalist-card__actions {
    margin-top: 1rem;
  }

  .brutalist-card__button {
    display: block;
    width: 100%;
    padding: 0.75rem;
    text-align: center;
    font-size: 1rem;
    font-weight: 700;
    text-transform: uppercase;
    border: 3px solid #000;
    background-color: #fff;
    color: #1DA1F2; // Twitter blue color
    position: relative;
    transition: all 0.2s ease;
    box-shadow: 5px 5px 0 #000;
    overflow: hidden;
    text-decoration: none;
    margin-bottom: 1rem;
    cursor: pointer; // Change cursor to pointer for buttons
  }

  .brutalist-card__button--read {
    background-color: #fff;
    color: #181717; // Github dark gray color
  }
    

  .brutalist-card__button::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: all 0.6s;
  }

  .brutalist-card__button:hover::before {
    left: 100%;
  }

  .brutalist-card__button:hover {
    transform: translate(-2px, -2px);
    box-shadow: 7px 7px 0 #000;
  }

  .brutalist-card__button--mark:hover {
    background-color: #296fbb;
    border-color: #296fbb;
    color: #fff;
    box-shadow: 7px 7px 0 #004280;
  }

  .brutalist-card__button--read:hover {
    background-color: #00CC00;
    border-color: #00CC00;
    color: #fff;
    box-shadow: 7px 7px 0 #008000;
  }

  .brutalist-card__button:active {
    transform: translate(5px, 5px);
    box-shadow: none;
  }
`;

export default Card;