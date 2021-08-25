<template lang="pug">
header.header
  .container.container-desctop
    nuxt-link.left(to="/")
      .logo-icon
      .logo
        | MEDACH
    .right
      nav.categories(:class="{visible: isOpen}" ref="categories")
        .category
          nuxt-link.category-name(to="/categories/news") Новости
        .category
          nuxt-link.category-name(to="/categories/longread") Статьи
        .category
          nuxt-link.category-name(to="/categories/translated") Переводы
        .category
          nuxt-link.category-name(to="/categories/media") Медиа
        .category
          nuxt-link.category-name(to="/categories/guides") Руководства
        .category
          nuxt-link.category-name(to="/categories/blogs") Блоги
        .category
          nuxt-link.category-name(to="/categories/cases") Кейсы
        .category
          nuxt-link.category-name(to="/vacancies") Вакансии
        .caret(ref="caret")
        .search-wrapper
          label
            form(@submit.prevent="search")
              .search-icon(@click="search")
              input(type="text" class="search" name="search" autocomplete="off" placeholder = "поиск..." v-model="query")
          .search-buffer
  the-mobile-header(:menuHandler="menuHandler" :searchHandler="searchHandler" :isOpenMenu="isOpenMenu" :isOpenSearch="isOpenSearch")
  .overlay(v-if="isOpenMenu || isOpenSearch" @click="overlayHandler")
</template>

<script>
import TheMobileHeader from "~/components/TheMobileHeader"

export default {
  name: 'TheHeader',
  components: {TheMobileHeader},
  data () {
    return {
      query: '',
      isOpen: true,
      isOpenMenu: false,
      isOpenSearch: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.calcCaretPos();
    }, 100);
  },
  methods: {
    search() {
      this.$router.push(`/search?query=${this.query}`)
    },
    menuHandler() {
      this.isOpenSearch = false
      this.isOpenMenu = !this.isOpenMenu
    },
    searchHandler() {
      this.isOpenMenu = false;
      this.isOpenSearch = !this.isOpenSearch
    },
    overlayHandler() {
      this.isOpenMenu = false;
      this.isOpenSearch = false
    },
    async calcCaretPos() {
      await this.$nextTick();
      const { categories, caret } = this.$refs
      const currentLink = categories.querySelector('.nuxt-link-active')
      if (caret && currentLink) {
        const l = currentLink.offsetLeft
        const w = currentLink.offsetWidth
        caret.style = `transform: translateX(${l}px); width: ${w}px;`
      } else {
        caret.style = 'display: none;'
      }
    },
  },
  watch: {
    $route: function () {
      this.calcCaretPos()
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;


  background: #FFFFFF;
  box-shadow: 0 2px 4px 0 rgba(184,184,184,0.50);
  z-index: 100;
}

.container {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
}

.categories {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .nuxt-link-active {
    color: #7198BA;
  }

  /deep/ .is-visible {
    opacity: 1;
  }
}

.caret {
  position: absolute;
  height: 2px;
  bottom: 0;
  background: #7198BA;
  left: 0;
  /* opacity: 0; */
  transition: transform 0.2s ease, width 0.2s ease;
  will-change: width, transform;
}

.logo {
  font-size: 24px;
  color: #A3A3A3 !important;
  letter-spacing: 2px;
  font-weight: 700;
  text-decoration: none;
}

.left {
  display: flex;
  align-items: center;
}

.logo-icon {
  background: url('~assets/images/logo.svg') no-repeat center / contain;
  width: 36px;
  height: 36px;
  margin-right: 16px;
}

.category {
  &:not(:first-child) {
    margin-left: 40px;
  }
}

.category-name {
  font-size: 16px;
  color: #5B5B5B;
  letter-spacing: 0;
  text-decoration: none;
  padding: 25px 0;
  display: inline-block;
  transition: color .2s ease;
  position: relative;

  &:hover {
    color: #7198BA;
  }
}

.search-wrapper {
  position: relative;
  margin-left: 40px;
  max-width: 200px;
}

.search {
  border: 2px solid #DBDBDB;
  border-radius: 3px;
  font-size: 16px;
  letter-spacing: 0;
  padding: 5px 30px 5px 10px;
  outline: none;
  display: block;
  width: 100%;

  &::placeholder {
    color: #7198BA;
  }
}

.search-icon {
  width: 16px;
  height: 16px;
  background: url('~assets/images/search.svg') no-repeat center / contain;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.overlay {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
  background: #000000;
  opacity: 0.6;
}

@media (max-width: 1110px) {
  .category-name {
    font-size: 14px;
  }
}

@media (max-width: 1200px) {
  .container-desctop {
    display: none;
  }
}

</style>
