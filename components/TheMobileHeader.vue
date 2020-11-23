<template lang="pug">
  .container.container-mobile
    .mobile-menu
      .burger(:class="{'active': isOpenMenu}" @click="menuHandler")
        .burger-line
        .burger-line
        .burger-line
      nuxt-link.logo(to="/")
        | MEDACH
      .search-icon(:class="{'active': isOpenSearch}" @click="searchHandler")
    .categories(:class="{'menu-visible': isOpenMenu}")
      .category
        nuxt-link.category-name(to="/categories/cases") Кейсы
      .category
        nuxt-link.category-name(to="/categories/guides") Руководства
      .category
        nuxt-link.category-name(to="/categories/longread") Статьи
      .category
        nuxt-link.category-name(to="/categories/translated") Переводы
      .category
        nuxt-link.category-name(to="/categories/media") Медиа
      .category
        nuxt-link.category-name(to="/categories/blogs") Блоги
      .category
        nuxt-link.category-name(to="/categories/news") Новости
      .category
        nuxt-link.category-name(to="/vacancies") Вакансии
    form.search(@submit.prevent="search" :class="{'search-visible': isOpenSearch}")
      input(type="text" name="search" autocomplete="off" placeholder = "поиск..." v-model="query")
      .search-buffer
      .search-arrow(@click="search")
</template>

<script>
  export default {
    props: ['isOpenMenu', 'isOpenSearch', 'menuHandler', 'searchHandler'],
    data() {
      return {
        query: ''
      }
    },
    methods: {
      search() {
        this.$router.push(`/search?query=${this.query}`)
      }
    }
  }
</script>

<style scoped lang="scss">
  .container-mobile {
    position: relative;
    z-index: 100;
    background: #ffffff;

    display: none;

    padding-top: 9px;
    padding-bottom: 9px;
  }

  .mobile-menu {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }

  .categories {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    display: none;

    padding-top: 16px;
    padding-bottom: 16px;

    background: #ffffff;
    box-shadow: 0 2px 4px #DBDBDB;
  }

  .search {
    position: absolute;
    top: 100%;
    left: 0;
    display: none;

    width: 100%;
    padding: 8px 32px 8px 32px;

    background: #F2F3EC;
    border: 1px solid #979797;
  }

  .search-arrow {
    position: absolute;
    right: 30px;
    top: 9px;
    width: 14px;
    height: 16px;

    background: url('~assets/images/search-arrow.svg') no-repeat center/contain;
  }

  .search input {
    background: #F2F3EC;
    border: none;
    width: 100%;
  }

  .category-name {
    display: block;
    width: 100%;
    padding: 2px 32px 2px 32px;

    font-weight: 700;
    font-size: 14px;
    color: #5B5B5B;
    letter-spacing: 0;
    line-height: 20px;
  }

  .categories.menu-visible {
    display: block;
  }

  .search-visible {
    display: block;
  }

  .search.search-visible {
    display: block;
  }

  .logo {
    font-size: 24px;
    color: #A3A3A3 !important;
    letter-spacing: 2px;
    font-weight: 700;
    text-decoration: none;
  }

  .burger {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;

    height: 12px;
    width: 18px;
  }

  .burger.active .burger-line {
    &:nth-child(2) {
      display: none;
    }
    &:nth-child(1) {
      transform: rotate(45deg) translate(4px,3px);
    }

     &:nth-child(3) {
       transform: rotate(-45deg) translate(4px, -3px);
     }
  }

  .burger-line {
    width: 16px;
    height: 2px;

    background: #7198BA;
  }

  .search-icon {
    width: 16px;
    height: 16px;
    background: url('~assets/images/search.svg') no-repeat center / contain;
    cursor: pointer;
  }

  .search-icon.active {
    background: url('~assets/images/close.svg') no-repeat center / contain;
  }

@media (max-width: 1200px) {
  .container-mobile {
    display: block;
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>
