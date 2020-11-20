<template lang="pug">
footer.footer
  .container
    .left
      .footer-item
        nuxt-link.link(to="/bloggers") Блоггеры
        nuxt-link.link(to="/about-us") О нас
        a.link(href="https://forum.medach.pro/") Форум

    .right
      .social-items
        a.social.social-vk(href="https://vk.com/medach" target="_blank")
        a.social.social-facebook(href="https://www.facebook.com/medachofficial/" target="_blank")
        a.social.social-telegram(href="https://t.me/medach" target="_blank")
        a.social.social-youtube(href="https://www.youtube.com/channel/UCPbE0ZLynjRd-FziGZQsgsA" target="_blank")

</template>

<script>
export default {
  name: 'TheFooter'
}
</script>

<style scoped lang="scss">
.footer {
  background: #2d3436;
  padding: 24px 0 40px 0;

  .container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
}

.social-items {
  display: flex;
  flex-flow: row nowrap;
}

.social {
  width: 40px;
  height: 40px;
  display: block;
  cursor: pointer;

  &-youtube {
    background: url('~/assets/images/youtube.svg') no-repeat center / contain;
  }
  &-vk {
    background: url('~/assets/images/vk.svg') no-repeat center / contain;
  }
  &-telegram {
    background: url('~/assets/images/telegram.svg') no-repeat center / contain;
  }
  &-instagram {
    background: url('~/assets/images/instagram.svg') no-repeat center / contain;
  }
  &-twitter {
    background: url('~/assets/images/twitter.svg') no-repeat center / contain;
  }
  &-facebook {
    background: url('~/assets/images/facebook.svg') no-repeat center / contain;
  }

  &:not(:first-child) {
    margin-left: 16px;
  }
}

.left {
  display: flex;
  flex-flow: row nowrap;
}

.title {
  font-size: 16px;
  color: #EEDD;
  letter-spacing: 0;
  font-weight: 500;
  padding-bottom: 16px;
  border-bottom: 1px solid #AFB09A;
}

.footer-item {
  &:not(:first-child) {
    margin-left: 40px;
  }
}

.link {
  display: block;
  margin-top: 16px !important;
  font-size: 16px !important;
  color: #7198BA !important;
  letter-spacing: 0 !important;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}

@media (max-width: 768px) {
  .footer .container {
    flex-flow: column nowrap;
  }

  .title {
    padding-bottom: 8px;

    font-size: 14px;
  }

  .link {
    margin-top: 4px;

    font-size: 14px;
  }

  .social-items {
    margin-top: 24px;
  }

  .social {
    width: 24px;
    height: 24px;
    &:not(:first-child) {
      margin-left: 8px;
    }
  }

  .footer-item:not(:first-child) {
    margin-left: 32px;
  }
}
</style>
