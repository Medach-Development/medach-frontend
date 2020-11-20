<template lang="pug">
  nuxt-link.card-wrapper(:to="`/post/${id}`")
    article.content
      .content-title
        | {{ name }}
      .content-description
        | {{ short_description }}
    .image
      image-component(:src="image")
</template>

<script>
import ImageComponent from '~/components/ImageComponent'

const BASE_URL = process.env.BASE_URL

  export default {
    name: 'ProfileCard',

    props: {
      image: String,
      id: [Number, String],
      name: String,
      short_description: String,
      profile: Object
    },

    data() {
      return {
       BASE_URL: BASE_URL
      }
    },

    components: {
      ImageComponent
    },
  }
</script>

<style scoped lang="scss">
.card-wrapper {
  display: flex;
  flex-flow: row nowrap;
  min-height: 280px;
}

.image {
  flex: 1 0 auto;
  width: 260px;
}

.content {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;

  width: 100%;
  padding: 15px 30px 15px 0;
}

.content-title {
  margin-bottom: 12px;

  font-size: 24px;
  color: #000000;
  letter-spacing: 0;
  font-weight: 600;
}
.content-description {
  font-size: 16px;
  color: #A2A2A2;
  letter-spacing: 0;
  line-height: 24px;
}

.footer {
  display: flex;
  flex-flow: row wrap;
  align-items: center;

  padding-top: 15px;
  margin-top: auto;
}

.avatar {
  flex: 0 1 auto;

  width: 50px;
  height: 50px;

  border-radius: 50%;
}

.blogger-name {
  padding-left: 10px;

  color: #A3A3A3;
  font-weight: 600;
  font-size: 16px;
  color: #A2A2A2;
  line-height: 24px;
}

@media (max-width: 768px) {
  .card-wrapper {
    flex-flow: column nowrap;
  }

  .image {
    order: 1;

    width: calc(100% + 60px);
    height: 64vw;
    margin-left: -30px;
    margin-right: -30px;
  }

  .content {
    order: 2;
    padding: 20px 30px 20px 30px;
    margin-left: -30px;
    margin-right: -30px;
    width: calc(100% + 60px);

    box-shadow: 0 2px 2px 0 rgba(219, 219, 219, .5);
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  .content-title {
    font-size: 18px;
    line-height: 20px;
  }

  .content-description {
    font-size: 14px;
  }

  .footer {
    padding-top: 30px;
    flex-flow: row nowrap;
  }

  .blogger-name {
    width: 100%;

    font-size: 15px;
  }

  .avatar {
    flex: 1 0 auto;
  }
}
</style>
