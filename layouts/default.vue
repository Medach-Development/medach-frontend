<template lang="pug">
  .wrapper.wrapper-layout
    the-header
    main
      nuxt
    the-footer
</template>

<script>
import 'normalize.css'
import TheFooter from '~/components/TheFooter'
import TheHeader from '~/components/TheHeader'

export default {
  components: {
    TheFooter,
    TheHeader,
  }
}
</script>

<style lang="scss">
@font-face {
	font-family: 'Montserrat';
	src: url('~assets/fonts/Montserrat-Bold.eot');
	src: url('~assets/fonts/Montserrat-Bold.eot?#iefix') format('embedded-opentype'),
		url('~assets/fonts/Montserrat-Bold.woff') format('woff'),
		url('~assets/fonts/Montserrat-Bold.ttf') format('truetype');
	font-weight: 700;
	font-style: normal;
}

@font-face {
	font-family: 'Montserrat';
	src: url('~assets/fonts/Montserrat-Medium.eot');
	src: url('~assets/fonts/Montserrat-Medium.eot?#iefix') format('embedded-opentype'),
		url('~assets/fonts/Montserrat-Medium.woff') format('woff'),
		url('~assets/fonts/Montserrat-Medium.ttf') format('truetype');
	font-weight: 500;
	font-style: normal;
}

@font-face {
	font-family: 'Montserrat';
	src: url('~assets/fonts/Montserrat-Regular.eot');
	src: url('~assets/fonts/Montserrat-Regular.eot?#iefix') format('embedded-opentype'),
		url('~assets/fonts/Montserrat-Regular.woff') format('woff'),
		url('~assets/fonts/Montserrat-Regular.ttf') format('truetype');
	font-weight: 400;
	font-style: normal;
}

@font-face {
	font-family: 'Montserrat';
	src: url('~assets/fonts/Montserrat-SemiBold.eot');
	src: url('~assets/fonts/Montserrat-SemiBold.eot?#iefix') format('embedded-opentype'),
		url('~assets/fonts/Montserrat-SemiBold.woff') format('woff'),
		url('~assets/fonts/Montserrat-SemiBold.ttf') format('truetype');
	font-weight: 600;
	font-style: normal;
}

@font-face {
	font-family: 'PTSerif';
	src: url('~assets/fonts/PTSerif-Regular.eot');
	src: url('~assets/fonts/PTSerif-Regular.eot?#iefix') format('embedded-opentype'),
		url('~assets/fonts/PTSerif-Regular.woff') format('woff'),
		url('~assets/fonts/PTSerif-Regular.ttf') format('truetype');
	font-weight: normal;
	font-style: normal;
}

html {
  font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  font-weight: 400;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.container {
  width: 100%;
  max-width: 1420px;
  padding: 0 30px;
  margin: 0 auto;
}

.wrapper-layout {
  padding-top: 68px;
}

a {
	text-decoration: none;
	color: inherit;
}

h1 {
  font-weight: inherit;
  margin: 0;
}

.content-article-wrapper {
  p {
    font-size: 16px;
    color: #000000 !important;
    letter-spacing: 0;
    line-height: 1.5;
    margin-top: 24px !important;
  }

  h1 {
    font-family: Helvetica;
    font-size: 24px;
  }

  h2 {
    font-size: 20px;
  }

  h3 {
    font-size: 16px;
    font-style: italic;
  }

  h4 {
    font-family: Helvetica;
    font-size: 14px;
  }

  figcaption {
    font-family: Helvetica;
    font-size: 14px;
  }

  .editor_img-title {
    width: 100%;
    color: #fff;
    font-family: inherit;
    font-weight: 700;
    font-size: 18px;
    background: #30312f;
    border-top: 2px solid #000;
    border-left: 2px solid #000;
    border-right: 2px solid #000;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    padding: 10px 10px 10px 20px;
    line-height: 20px;
  }

  .editor_img-content {
    margin-bottom: 20px;
    font-size: 14px;
    color: #30312f;
    border-left: 2px solid #000;
    border-right: 2px solid #000;
    border-bottom: 2px solid #000;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    padding: 10px 10px 10px 20px;
    line-height: 1.5;
  }

  ol,
  ul {
    margin-top: 24px;
  }

  li {
    padding: 2px;
    line-height: 1.7;
  }

  img {
    display: block;
    max-width: 100%;
    margin: 0;
    cursor: pointer;
  }

  h2,
  h3 {
    margin: 25px 0 15px 0;
    word-wrap: break-word;
  }

  a {
    color: #7198ba !important;
    word-wrap: break-word;
  }

  li {
    p {
      line-height: 1.3;
    }
  }
  blockquote {
    margin: 10px 0;
    padding-left: 20px;
    font-style: italic;
    border-left: 3px solid #a1a1a1;
    box-sizing: border-box;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}

@media(max-width: 1024px) {
  body {
    overflow-x: hidden;
  }
  .wrapper-layout {
    padding-top: 45px;
  }
}

@media (max-width: 768px) {
  .image-wrapper img {
    width: 100%;
  }

  .article-wrapper iframe {
    width: 100%;
    height: 50vw;
  }

  .content-article-wrapper {
    margin-left: 0 !important;
  }

  .content-article-wrapper img {
    width: 100% !important;
    height: auto !important;
  }

  .content-article-wrapper p {
    margin-top: 16px;
    font-size: 14px;
    line-height: 1.5;
  }
}
</style>

