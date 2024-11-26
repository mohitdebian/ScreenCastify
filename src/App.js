// src/App.js
// src/App.js
import React, { useState, useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react"; // Import the Analytics component
import Modal from './components/modals/Modal'; // Import the existing modal
import PopupModal from './components/modals/PopupModal'; // Import the new popup modal
import ScreenRecorder from './components/ScreenRecorder';
import styled from 'styled-components';
import Card from './components/Card'; // Ensure this path is correct
import StyledButton from './components/StyledButton'; // Import the new StyledButton component
import PopupCard from './components/PopupCard';

const StyledWrapper = styled.div`
  .notification {
    display: flex;
    flex-direction: column;
    isolation: isolate;
    position: relative;
    width: 100%;
    height: auto;
    background: #29292c;
    border-radius: 1rem;
    overflow: hidden;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 16px;
    --gradient: linear-gradient(to bottom, #2eadff, #3d83ff, #7e61ff);
    --color: #32a6ff;
  }

  .notification:before {
    position: absolute;
    content: "";
    inset: 0.0625rem;
    border-radius: 0.9375rem;
    background: #18181b;
    z-index: 2;
  }

  .notification:after {
    position: absolute;
    content: "";
    width: 0.25rem;
    inset: 0.65rem auto 0.65rem 0.5rem;
    border-radius: 0.125rem;
    background: var(--gradient);
    transition: transform 300ms ease;
    z-index: 4;
  }

  .notification:hover:after {
    transform: translateX(0.15rem);
  }

  .notititle {
    color: var(--color);
    padding: 0.65rem 0.25rem 0.4rem 1.25rem;
    font-weight: 500;
    font-size: 1.1rem;
    transition: transform 300ms ease;
    z-index: 5;
  }

  .notification:hover .notititle {
    transform: translateX(0.15rem);
  }

  .notibody {
    margin-bottom: 1rem;
    color: #99999d;
    padding: 0 1.25rem;
    transition: transform 300ms ease;
    z-index: 5;
  }

  .notification:hover .notibody {
    transform: translateX(0.25rem);
  }

  .notiglow,
  .notiborderglow {
    position: absolute;
    width: 20rem;
    height: 20rem;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle closest-side at center, white, transparent);
    opacity: 0;
    transition: opacity 300ms ease;
  }

  .notiglow {
    z-index: 3;
  }

  .notiborderglow {
    z-index: 1;
  }

  .notification:hover .notiglow {
    opacity: 0.1;
  }

  .notification:hover .notiborderglow {
    opacity: 0.1;
  }

  .note {
    color: var(--color);
    position: fixed;
    top: 80%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    font-size: 0.9rem;
    width: 75%;
  }
`;

const FAQCard = ({ title, body }) => {
  return (
    <StyledWrapper>
      <div className="notification">
        <div className="notiglow" />
        <div className="notiborderglow" />
        <div className="notititle">{title}</div>
        <div className="notibody">{body}</div>
      </div>
    </StyledWrapper>
  );
};

const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 3%;
  margin-bottom: 2%;
`;

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isIframeOpen, setIsIframeOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(true); // Front page poup of review and follow me on twitter

  useEffect(() => {
    // Automatically open the popup when the component mounts
    setIsPopupOpen(true);
  }, []);

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openIframe = () => {
    setIsIframeOpen(true);
  };

  const closeIframe = () => {
    setIsIframeOpen(false);
  };

  return (
    <div className="App min-h-screen bg-[#212121] text-white flex flex-col items-center justify-center p-4">
      {/* Popup Modal */}
      <PopupModal isOpen={isPopupOpen} onClose={closePopup}>
      <PopupCard />
    </PopupModal>
      <header className="w-full p-4 flex justify-between items-center" style={{ marginBottom: '5%' }}>
        <div className="text-2xl font-bold">ScreenCastify</div>
        <nav className="hidden md:flex space-x-4">
          <a href="https://x.com/mohitdebian" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300" style={{ fontWeight: '550', fontSize: '1.2rem' }}>Twitter</a>
          <span className="text-white">|</span> {/* Separator */}
          <a href="https://github.com/mohitdebian" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300" style={{ fontWeight: '550', fontSize: '1.2rem' }}>GitHub</a>
          <span className="text-white">|</span> {/* Separator */}
          <a href="https://www.instagram.com/_mohit_1302/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300" style={{ fontWeight: '550', fontSize: '1.2rem' }}>Instagram</a>
        </nav>
        <button className="md:hidden text-white" onClick={toggleMenu}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </header>
      {isMenuOpen && (
        <div className="border border-white p-2 flex justify-center" style={{ marginBottom: '5%' }}> {/* Added a div with border and padding */}
          <nav className="md:hidden flex flex-row space-x-4">
            <a href="https://x.com/mohitdebian" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300" style={{ fontSize: '1.2rem' }}>Twitter</a>
            <span className="text-white">|</span> {/* Separator */}
            <a href="https://github.com/mohitdebian" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300" style={{ fontSize: '1.2rem' }}>GitHub</a>
            <span className="text-white">|</span> {/* Separator */}
            <a href="https://www.instagram.com/_mohit_1302/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300" style={{ fontSize: '1.2rem' }}>Instagram</a>
          </nav>
        </div>
      )}
      <main className="w-full max-w-4xl mx-auto text-center mb-0 md:mb-10">

        <h1 className="text-4xl md:text-6xl font-bold mb-4">Record Your Screen Like a Pro – No Sweat!</h1>
        <p className="text-md md:text-2xl text-gray-400 mb-6">Say goodbye to downloads and hello to hassle-free recording!</p>
        <div className="flex flex-col md:flex-row space-x-4 items-center justify-center">
          <div className='mb-2 md:mb-0'>
          <StyledButton onClick={openModal}>
            Try ScreenCastify for free
          </StyledButton>
          </div>
          <StyledButton onClick={openIframe}>
            How to use ?
          </StyledButton>
        </div>
      </main>
      <section className="w-full max-w-4xl mx-auto mb-8 mt-20 md:mt-0">
        <CardContainer className="space-y-12 md:space-y-0"> {/* Added responsive spacing */}
          <div className="card1" style={{ marginBottom: '5%' }}>
            <Card
              text="Record and Share Your Screen in Stunning 4K Quality with Ultra-Smooth 120 FPS – Completely Free!"
            />
          </div>

          <div className="card2">
            <Card text="Record through any browser— Chrome, Brave, Edge or even Safari ( just make sure it's in the mood 😂)!" />
          </div>

        </CardContainer>
      </section>
      <section className="w-full max-w-4xl mx-auto mb-8">
        <h2 className="text-xl md:text-4xl font-semibold mb-4 text-center">Frequently Asked Questions</h2>
        <div className="space-y-8">
          <FAQCard
            title="How do I start recording?"
            body="Simply click the 'Get Started Now' button, select your desired frame rate and resolution, and hit the 'Start Recording' button. It's that easy!"
          />
          <FAQCard
            title="Is ScreenCastify free to use?"
            body="Yes, ScreenCastify is completely free to use. No hidden fees or subscriptions required."
          />
          <FAQCard
            title="Can I use ScreenCastify on any browser?"
            body="Yes, ScreenCastify is compatible with all major browsers including Chrome, Firefox, and Safari."
          />
          <FAQCard
            title="What kind of recordings can I make?"
            body="You can record anything on your screen, from tutorials and presentations to gaming sessions and online lectures."
          />
        </div>
      </section>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ScreenRecorder />
      </Modal>
      {isIframeOpen && (
        <Modal isOpen={isIframeOpen} onClose={closeIframe} className="iframe-modal">
          <iframe
            title="ScreenCastify Tutorial" // Added a unique title for accessibility
            src="https://story.screenspace.io/screencastify-4991/e_7bfc7416s"
            width="100%"
            height="100%"
            scrolling="no"
            allow="autoplay; fullscreen; clipboard-write"
            style={{ minHeight: '400px', border: 'none', background: 'transparent' }}
          ></iframe>
        </Modal>
      )}
      <footer className="w-full max-w-4xl mx-auto text-gray-400 flex flex-col items-center py-4">
        <div className="flex space-x-4">
          <a href="mailto:devbyte.mohit@gmail.com" className="hover:text-white">Help</a>
          <a href="https://x.com/mohitdebian" target="_blank" rel="noopener noreferrer" className="hover:text-white">Twitter</a>
          <a href="https://www.instagram.com/_mohit_1302/" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a>
          {/* <a href="#" className="hover:text-white">Pricing</a> */}

        </div>
        {/* <button className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition duration-300">
          Download
        </button> */}
      </footer>
      <Analytics />
    </div>
  );
}

export default App;
