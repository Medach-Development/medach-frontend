<template lang="pug">
.wrapper
  .container
    .content
      .title
        | О проекте
      article.text
        p
          | <b>Medical Channel</b> (www.medach.pro) – это портал для молодых врачей и студентов медицинских университетов, задачей которого является знакомство людей с достижениями современной медицины, обменом знаниями между участниками, а также выпуск материалов, облегчающих учебную и практическую деятельность. Деятельность проекта направлена в первую очередь на создание современной образовательной среды, основанной на принципах доказательной медицины, актуальности предоставляемой информации, публичного обсуждения актуальных научных проблем, качественной подачи контента и обратной связи. Все это дополняет университетскую среду, способствуя развитию творческого потенциала студентов, тем самым повышая качество медицинского образования.
        p
          | Medical Channel победители в номинации «Лучшее СМИ о науке» Всероссийском медиа-форуме 2017
      .social-items
        a.social.social-vk(href="https://vk.com/medach" target="_blank")
        a.social.social-facebook(href="https://www.facebook.com/medachofficial/" target="_blank")
        a.social.social-telegram(href="https://t.me/medach" target="_blank")
        a.social.social-youtube(href="https://www.youtube.com/channel/UCPbE0ZLynjRd-FziGZQsgsA" target="_blank")
      .contacts
        .contacts-title
          | Связаться с редакцией:
        a(href="mailto:medachofficial@gmail.com").email
          | medachofficial@gmail.com
</template>

<script>

  export default {
  }
</script>

<style scoped lang="scss">
  .content {
    padding-top: 80px;
    max-width: 800px;
    width: 100%;
  }
  .title {
    margin-bottom: 40px;

    font-size: 54px;
    color: #5B5B5B;
  }

  .text {
    font-size: 16px;
    line-height: 1.5;
    color: #474747;
    letter-spacing: 0;
  }

  .text p {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .social-items {
    display: flex;
    flex-flow: row nowrap;
  }

  .social {
    width: 40px;
    height: 40px;

    margin-top: 40px;
    margin-bottom: 16px;

    &-youtube {
      background: url('~assets/images/youtube.svg') no-repeat center / contain;
    }
    &-vk {
      background: url('~assets/images/vk.svg') no-repeat center / contain;
    }
    &-telegram {
      background: url('~assets/images/telegram.svg') no-repeat center / contain;
    }
    &-instagram {
      background: url('~assets/images/instagram.svg') no-repeat center / contain;
    }
    &-twitter {
      background: url('~assets/images/twitter.svg') no-repeat center / contain;
    }
    &-facebook {
      background: url('~assets/images/facebook.svg') no-repeat center / contain;
    }

    &:not(:first-child) {
      margin-left: 16px;
    }
  }

  .contacts {
    margin-bottom: 120px;
  }

  .contacts-title {
    font-size: 24px;
    color: #474747;
    letter-spacing: 0;
    line-height: 32px;
  }

  .email {
    color: #7198BA;
    font-size: 24px;
    font-weight: bold;
  }
</style>
