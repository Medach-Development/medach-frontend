<template lang="pug">
.wrapper.desctop(v-if="showCarousel")
  .inner
    carousel.slider(
      :perPage="1"
    )
      .opacity
      slide.slide(
        v-for="(slide, index) in slides",
        :key="slide.id",
        :style="{background: `url(${BASE_URL}${getSlideImageUrl(slide)}) no-repeat center / cover`}"
      )
        .content-wrapper  
          nuxt-link.content(:to="`/post/${slide.id}`")
            .slide-article__wrapper  
              .title
                | {{ slide.title }}
              .bottom
                .date
                  | {{ formatDate(slide.publicationDate) }}

                .author(v-if="slide.author")
                  | Автор:
                  span
                    | {{ slide.author }}
</template>

<script>
import format from 'date-fns/format'
import ru from 'date-fns/locale/ru'
import _ from 'lodash'

export default {
  name: 'TheSlider',
  props: {
    slides: Array
  },
  data () {
    return {
      currentSlide: 0,
      slidesCount: this.slides.length,
      showCarousel: false,
      BASE_URL: process.env.BASE_URL
    }
  },
  mounted() {
    this.showCarousel = true
  },
  methods: {
    formatDate(date) {
      return format(date, 'MMMM DD, YYYY', {locale: ru})
    },

    getSlideImageUrl(slide) {
      return _.get(slide, slide.sliderImage.url, slide.coverImage.url)
    }
  }
}
</script>

<style lang="scss">
.VueCarousel-wrapper {
  height: 680px;
  position: relative;
}

.VueCarousel-inner {
  height: 100%;
}

.VueCarousel-pagination {
  position: absolute;
  bottom: 20px;
  left: 40px;
  width: auto !important;
  z-index: 5;

  li:first-child {
    padding-left: 0 !important;
  }
}

.VueCarousel-dot {
  .VueCarousel-dot-button {
    background: #ffffff !important;
    opacity: .3;
    width: 14px !important;
    height: 14px !important;
  }


  &--active .VueCarousel-dot-button {
    background: #ffffff !important;
    opacity: 1;
  }
}
</style>

<style scoped lang="scss">
.inner {
  position: relative;
  height: 100%;
}

.opacity {
  opacity: 1;
  background: #5B5B5B;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  width: 100%;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  pointer-events: none;
}

.wrapper {
  height: 680px;
  position: relative;
}
.slider {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.slide {
  height: 100%;
  // padding: 40px 40px 84px 40px;
  display: flex;
}
// .content-wrapper {
//   display: flex;
//   width: 100%;
// }
.content-wrapper{
  width: 65%;
  display: flex;
}

.slide-article__wrapper {
  padding: 100% 40px 84px 40px;
}
.content {
  // max-width: 1200px;
  // width: 100%;
  flex: 1 1 auto;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  // padding-right: 50px;
  z-index: 5;
  position: relative;
  // padding: 30px;
  box-sizing: border-box;
  // &:after{
  //   content: "";
  //   position: absolute;
  //   bottom: -83px;
  //   left: -40px;
  //   height: 53%;
  //   width: 120%;
  //   background-color: rgba(0, 0, 0, 0.5);
  //   z-index: 2;
  // }
}



.title {
  position: relative;
  font-size: 54px;
  color: #FDFDFD;
  letter-spacing: 0;
  line-height: 66px;
  z-index: 4;
}

.bottom {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  margin-top: 32px;
  z-index: 4;
}

.date {
  font-size: 16px;
  color: #FFFFFF;
  letter-spacing: 0;
  text-transform: capitalize;
  white-space: nowrap;
}

.author {
  font-size: 16px;
  color: #FFFFFF;
  letter-spacing: 0;

  span {
    font-weight: bold;
    margin-left: 10px;
  }
}
</style>
