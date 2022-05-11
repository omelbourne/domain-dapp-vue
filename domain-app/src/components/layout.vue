<script setup>
const TWITTER_HANDLE = "twitter";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
</script>
<template>
  <div className="App">
    <div className="container">
      <div className="header-container">
        <header>
          <div className="top-text">
            <p className="title">Melbs Name Service</p>
            <p className="subtitle">Mint a personal domain & record</p>
          </div>
        </header>
      </div>
      <slot></slot>

      <div className="footer-container">
        <!-- <img
          alt="Twitter Logo"
          className="twitter-logo"
          src="/twitter-logo.svg"
        />
        <a
          className="footer-text"
          :href="TWITTER_LINK"
          target="_blank"
          rel="noreferrer"
          >{{ `built with @${TWITTER_HANDLE}` }}</a
        > -->
      </div>
    </div>
  </div>
</template>