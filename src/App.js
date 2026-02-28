import React from 'react';
import Layout from './components/Layout/Layout';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import TrustBar from './components/TrustBar/TrustBar';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Layout>
      <Header />
      <Hero />
      <TrustBar />
      <Footer />
    </Layout>
  );
}

export default App;