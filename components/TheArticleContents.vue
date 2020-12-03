<template lang="pug">
  div(
    :class="{'contents': true, 'stycky': isSticky}"
    :style="{'top': `${stickyPosition}`}"
    ref="contents"
    v-if="isBrowser && (contents.length > 0 || bannersLeft.length > 0)"
    )
    nav.ul-content__wrapper(:class="{ 'hide-wrap': !contents.length}")
      ul
        li(v-for="(content, index) in contents" @click="scrollTo(content)" :class="getClass(content, index)")
          | {{ content.textContent }}
    .banners-wrapper__left-wrapper
      .banners-wrapper__left
        template(v-for = "banner in bannersLeft")
          a.banner-wrapper(:href="banner.url" target="_blank") 
            .banner-img(:style="{ background: `url(${BASE_URL}${banner.image.url}) no-repeat center / cover`}")
            .banner-text
              .banner-title {{banner.title}}
              .banner-description {{banner.description}}

</template>

<script>
import VueScrollTo from "vue-scrollto";
import { mapGetters } from "vuex";

export default {
  props: {
    contents: Array
  },

  data() {
    return {
      BASE_URL: process.env.BASE_URL,
      isBrowser: null,
      isSticky: false,
      stickyPosition: null,
      headerBottomPosition: null,
      footerHeight: null,
      contentIndex: null,
      contentsPositions: null,
      scrollToOffset: 0
    };
  },

  mounted() {
    if (process.browser) {
      setTimeout(() => {
        this.scrollToOffset = window.innerWidth > 768 ? 68 : 45;
        window.addEventListener("scroll", this.scrollHandler);
        this.headerBottomPosition =
          document.querySelector(".header").offsetHeight + 20;
        this.footerTopPosition =
          document.querySelector(".interested-wrapper").getBoundingClientRect()
            .top +
          pageYOffset -
          window.innerHeight;
        this.stickyPosition = this.headerBottomPosition;

        this.contentsPositions = this.contents.map(
          el =>
            Number(el.getBoundingClientRect().top) +
            pageYOffset -
            this.scrollToOffset
        );

        this.isBrowser = true;
      }, 500);
    }
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollHandler);
  },

  computed: {
    ...mapGetters({
      bannersLeft: "articlePage/leftBanners"
    })
  },

  methods: {
    getClass(el, index) {
      return {
        h1: el.tagName.toLowerCase() === "h1",
        h2: el.tagName.toLowerCase() === "h2",
        active: Number(index) === this.contentIndex
      };
    },

    scrollTo(node) {
      VueScrollTo.scrollTo(node, 1000, {
        easing: "easeInOutQuart",
        offset: -this.scrollToOffset
      });
    },

    scrollHandler() {
      // sticky
      if (
        pageYOffset >= this.headerBottomPosition - 20 &&
        pageYOffset <= this.footerTopPosition
      ) {
        this.isSticky = true;
        this.stickyPosition = this.headerBottomPosition + 'px';
      } else if (pageYOffset <= this.headerBottomPosition) {
        this.isSticky = false;
        this.stickyPosition = this.headerBottomPosition  + 'px';
      } else if (pageYOffset >= this.footerTopPosition ) {
        this.isSticky = false;
        this.stickyPosition = '-100%';
      }

      // active contents
      this.contentsPositions.map((elPosition, index) => {
        if (pageYOffset >= elPosition - 10) {
          this.contentIndex = index;
        } else if (this.contentsPositions[0] - 10 > pageYOffset) {
          this.contentIndex = null;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.ul-content__wrapper {
  padding: 10px 17px 14px 20px;
}
.contents {
  z-index: 13;
  left: 55px;
  z-index: 2;
  top: 100px;

  width: 320px;
  max-height: calc(100vh - 108px);
  overflow-y: auto;
  border: 1px solid #dbdbdb;
  border-radius: 6px;

  background: #ffffff;

  transition: all 0.2s linear;
}

.contents.stycky {
  position: sticky;
  top: 20px;
}

.contents ul {
  overflow: auto;
  padding-left: 0;
  list-style: none;
}

.contents li {
  position: relative;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}

.contents li.h1 {
  padding-top: 8px;
  padding-bottom: 8px;
  font-size: 14px;
}

.contents li.h2 {
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 6px;
  font-size: 14px;
}

.contents li.active {
  color: #7198ba;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);

    display: block;
    height: 80%;
    width: 1px;
    background: #7198ba;
  }
}

.contents li.h1.active {
  padding-left: 10px;
}

.contents li.h2.active {
  padding-left: 12px;
}

.banner-inText__wrapper {
  width: 100%;
  position: relative;
  height: 357px;
  overflow: hidden;
}

.banner-inText__wrapper::after {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  top: 0px;
  border-radius: 4px;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
}

.banner-intext__img {
  position: absolute;
  width: 100%;
  height: auto;
  border-radius: 4px;

  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);
}

.banner-inText__text {
  width: 100%;
  position: absolute;
  bottom: 0px;
  left: 0px;
  z-index: 1;
  padding: 15px;
}

.banner-inText__title {
  width: 100%;
  font-family: Montserrat;
  font-weight: 700;
  font-size: 22px;
  color: #ffffff;
  margin-bottom: 10px;
}
.banner-inText__description {
  width: 100%;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #ffffff;
  z-index: 1;
}

.banners-wrapper__left {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.hide-wrap {
  display: none;
}

.banner-wrapper {
  position: relative;
  margin-top: 20px;
  width: 100%;
  height: 100%;
}

.banner-wrapper::after {
  /* content: ""; */
  display: block;
  position: absolute;
  left: 0;
  top: -1px;
  border-radius: 4px;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
}
.banner-img {
  width: 100%;
  min-height: 160px;
  border-radius: 4px;
  padding: 0 5px;
}
.banner-text {
  width: 100%;
  position: absolute;
  bottom: 0px;
  left: 0px;
  z-index: 1;
  padding: 15px;
}
.banner-title {
  width: 100%;
  font-weight: 700;
  font-size: 22px;
  color: #ffffff;
  margin-bottom: 10px;
}
.banner-description {
  width: 100%;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #ffffff;
  z-index: 1;
}

@media (max-width: 1024px) {
  .ul-content__wrapper {
    padding: 10px 10px 14px 28px;
  }
  .contents {
    top: 0 !important;
    left: 0 !important;
    border: 0;
    border-radius: 0;

    width: 280px;
    height: 100%;
    min-height: 0;
    max-height: 100%;
  }

  .contents li.h1 {
    font-size: 16px;
  }

  .contents li.h2 {
    font-size: 14px;
  }
  .banner-wrapper {
    padding: 10px;
  }
}
</style>
