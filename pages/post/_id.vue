<template lang="pug">
.wrapper(:class="{'is-contents': contents.length !== 0 || leftBanners.length !== 0}" )
  the-header
  scroll-top
  .container.article-container
    .title
      | {{article.title}}
    .tags
      nuxt-link.tag(v-for="tag in article.tags" :key="`${article.id}-${tag}`" :to="`/search?query=${tag}`")
        | {{ tag }}

    .info
      .info-item.origin(v-if="article.origin && article.origin !== ''")
        a(:href="article.origin" target="_blank")
          | Оригинал
      .info-item(v-if="article.author")
        span
          | Автор: {{article.author}}
        br
        nuxt-link(v-if="bloggerId && !isAdmin" :to="`/profile/${bloggerId}`" class="link-blogger")
          | {{ bloggerFirstName || bloggerLastName }}
      .info-item(v-if="article.translate && article.translate !== ''")
        span
         | Перевод: {{article.translate}}
      .info-item(v-if="article.redaction")
        span
         | Редакция: {{article.redaction}}
      .info-item(v-if="article.infographic")
        span
         | Оформление: {{article.infographic}}
      .info-item(v-if="article.createdAt")
        span
         | Публикация: {{publishDate}}
      .info-item(v-if="article.updatedAt")
        span
         | Последнее обновление: {{updateDate}}

    .contents-wrapper(v-if="contents.length !== 0 || article.banners.length !== 0" :class="isContentsMenuOpen ? 'open' : null")
      button.toggle-contents(@click="toggleContents")
      TheArticleContents(:contents="contents")
    .article-wrapper
      .article.content-article-wrapper(v-html="articleBody" ref="articleData")

      .promo.desktop
        GoogleAd(adSlot="2334561718" styles="display: block; min-height: 600px; max-width: 300px; width: 100%;")
      .promo.mobile
        GoogleAd(adSlot="2334561718" styles="display: block; height: 250px; width: 300px;")
    .report-error
      | Нашли опечатку? Выделите фрагмент и нажмите Ctrl+Enter.
    preview(v-if="currentImg" :close="closeImg" :currentImg="currentImg")

  .interested-wrapper.container
    interested-articles(:articles="interested")
  transition(name="fade")
    popup(
      v-if="openPopup===true"
      type="mistake"
      :popupVisible="popupVisible"
      :thanksForComment="thanksForComment"
      :text="mistakeText"
    )

  transition(name="fade")
    .thanks(v-if="openThanks===true")
      .thanks-text
        | Спасибо.
      .thanks-text
        | Опечатка отправлена нашим редакторам
</template>

<script>
import InterestedArticles from "~/components/InterestedArticles";
import ImageComponent from "~/components/ImageComponent";
import ThePopularAuthors from "~/components/ThePopularAuthors";
import Preview from "~/components/Preview";
import TheHeader from "~/components/TheHeader";
import ScrollTop from "~/components/ScrollTop";
import GoogleAd from "~/components/GoogleAd";
import TheArticleContents from "~/components/TheArticleContents";
import Popup from "~/components/popups/Popup";

import { get, maxBy } from "lodash";
import { mapGetters } from "vuex";
import { format } from 'date-fns';

export default {
  name: "ArticlesPage",
  components: {
    InterestedArticles,
    ImageComponent,
    ThePopularAuthors,
    Preview,
    TheHeader,
    ScrollTop,
    GoogleAd,
    TheArticleContents,
    Popup
  },

  async fetch({ store, params, redirect }) {
    const article = await store.dispatch("articlePage/fetchArticle", {
      id: params.id
    });
    if (article.hidden) {
      redirect("/");
    }
    await store.dispatch("relatedArticles/fetchRelatedArticles", params.id);
  },

  data() {
    return {
      BASE_URL: process.env.BASE_URL,
      currentImg: "",
      openPopup: false,
      mistakeText: "",
      openThanks: false,
      contents: [],
      isContents: true,
      isContentsMenuOpen: false
    };
  },
  head() {
    return {
      htmlAttrs: {
        prefix: "og: http://ogp.me/ns#"
      },
      title: this.article.title,
      meta: [
        {
          hid: "ogtitle",
          property: "og:title",
          content: this.article.title
        },
        {
          hid: "ogurl",
          property: "og:url",
          content: "https://medach.pro" + this.$route.path
        },
        {
          hid: "ogtype",
          property: "og:type",
          content: "article"
        },
        {
          hid: "ogimage",
          property: "og:image",
          content: this.article.coverImage.url
            ? this.BASE_URL + this.article.coverImage.url
            : ""
        },
        {
          hid: "ogimagetype",
          property: "og:image:type",
          content: "image/jpeg"
        },
        {
          hid: "ogimagewidth",
          property: "og:image:width",
          content: "675"
        },
        {
          hid: "ogimageheight",
          property: "og:image:height",
          content: "475"
        },
        {
          hid: "ogdescription",
          property: "og:description",
          content: this.article.title
        }
      ]
    };
  },

  computed: {
    ...mapGetters({
      article: "articlePage/article",
      interested: "relatedArticles/articles",
      bannersInText: "articlePage/inTextBanners",
    }),
    inTextBanners() {
      let html = "<div class='in-text__banners'>";
      this.bannersInText.forEach(elem => {
        html =
          html +
          `<a href='${elem.url}' target="_blank" ><div class="banner-inText__wrapper" style="background: url(${this.BASE_URL}${elem.image.url}) no-repeat center / cover"><div class="banner-inText__text"><div class="banner-inText__title">${elem.title}</div><div class="banner-inText__description">${elem.description}</div></div></div></a>`;
      });

      return html + "</div>";
    },
    articleBody() {
      let content = this.insertAd(
        this.article.body.replace('<img src=""', `<img src="${this.BASE_URL}`),
        this.inTextBanners
      );
      return content;
    },
    bloggerId() {
      return get(this, "article.user.id", null);
    },
    isAdmin() {
      return get(this, "article.user.admin", false);
    },
    bloggerFirstName() {
      return get(this, "article.user.first_name", null);
    },
    bloggerLastName() {
      return get(this, "article.user.last_name", null);
    },
    publishDate() {
      return format(this.article.createdAt, 'DD.MM.YYYY')
    },
    updateDate() {
      return format(this.article.updatedAt, 'DD.MM.YYYY')
    },
    leftBanners() {
      return this.article.banners.filter(elem => elem.position === "left")
    }
  },

  mounted() {
    const images = Array.from(this.$refs.articleData.querySelectorAll("img"));
    images.map(img => {
      img.addEventListener("click", () => this.renderPreviewImage(img));
    });

    if (process.browser) {
      window.addEventListener("keydown", this.openPopupHandler);

      this.contents = Array.from(
        this.$refs.articleData.querySelectorAll("h1, h2")
      );
    }
  },

  beforeDestroy() {
    const images = Array.from(this.$refs.articleData.querySelectorAll("img"));
    images.map(img => {
      img.removeEventListener("click", () => this.renderPreviewImage(img));
    });

    window.addEventListener("keydown", this.openPopupHandler);
  },

  methods: {
    insertAd(content, adHtml) {
      const tagsForSplitting = ["</div>", "</p>", "<br>"];
      const splittedContent = tagsForSplitting.map(tag => ({
        tag,
        content: content.split(tag)
      }));
      const result = maxBy(splittedContent, el => {
        return el.content.length;
      });

      result.content.splice(Math.floor(result.content.length / 2), 0, adHtml);
      return result.content.join(result.tag);
    },

    renderPreviewImage(image) {
      this.currentImg = image.getAttribute("src");
      document.body.classList.add("scroll-del");
    },

    closeImg() {
      document.body.classList.remove("scroll-del");
      this.currentImg = null;
    },

    popupVisible() {
      this.openPopup = !this.openPopup;
    },

    openPopupHandler(evt) {
      if (evt.ctrlKey && evt.keyCode == 13) {
        const text = window.getSelection().toString();
        if (text.length >= 200) {
          this.mistakeText = text.slice(0, 150);
          this.popupVisible();
          return;
        }
        this.popupVisible();
        this.mistakeText = text;
      }
    },

    thanksForComment() {
      this.openThanks = !this.openThanks;
      setTimeout(() => {
        this.openThanks = false;
      }, 4000);
    },

    toggleContents() {
      this.isContentsMenuOpen = !this.isContentsMenuOpen;
    }
  }
};
</script>



<style scoped lang="scss">
.info {
  margin-top: 13px;
}

.link-blogger {
  color: #7198ba;
  text-decoration: underline;
  display: inline-block;
  margin-top: 12px;
}

.info-item {
  font-size: 16px;
  color: #9b9b9b;
  padding: 5px 0;
}
.interested-wrapper {
  margin-top: 42px;
}

.wrapper {
  padding-bottom: 40px;

  .container {
    padding-left: 80px;
  }
}

.is-contents .article-container {
  padding-left: 400px;
  margin: 0 auto 0 0;
}

.title {
  font-family: "PTSerif", serif;
  font-size: 40px;
  color: #424242;
  letter-spacing: 0;
  margin-top: 36px;
  max-width: 900px;
}

.tags {
  margin-top: 22px;
}

.tag {
  font-size: 12px;
  color: #7198ba;
  letter-spacing: 0;
  font-weight: 500;
  border: 1px solid #7198ba;
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  margin-left: 10px;

  &:first-child {
    border-color: #a3a3a3;
    color: #a3a3a3;
    margin: 0;
  }
}

.image-wrapper {
  margin-top: 40px;
  max-width: 980px;

  img {
    width: 100%;
  }
}

.article-wrapper {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  margin-top: 10px;
}

.article {
  font-family: "PTSerif", serif;
  max-width: 800px;
  width: 100%;
}

.promo {
  flex: 1 1 auto;
  margin-left: 80px;

  &.desktop {
    display: block;
  }

  &.mobile {
    display: none;
  }
}

.info-item.origin a {
  color: #9b9b9b;
  text-decoration: underline;
}

.contents-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 12;
}

.toggle-contents {
  display: none;
}
.banner-inText__description {
  display: none;
}

.article-wrapper .help-widget {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
}

@media (max-width: 1024px) {
  .contents-wrapper {
    width: 280px;
    height: 100%;
    z-index: 12;

    transform: translateX(-100%);

    transition: transform 0.3s linear;
  }

  .contents-wrapper.open {
    transform: translateX(0);
  }

  .contents-wrapper.hide {
    display: none;
  }

  .overlay {
    transform: translateX(-100%);

    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;

    background: rgba(0, 0, 0, 0.4);

    transition: transform 0.3s linear;
  }

  .open .overlay {
    transform: translateX(0);
  }

  .toggle-contents {
    position: absolute;
    z-index: 12;
    top: 50%;
    left: 100%;
    transform: translateY(-50%);

    display: block;
    width: 24px;
    height: 24px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border: none;
    background: #ffffff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);

    &::after,
    &::before {
      content: "";
      position: absolute;
      top: 4px;

      width: 2px;
      height: 16px;
      border-radius: 3px;
      background: #dbdbdb;
    }

    &::after {
      left: 12px;
    }

    &::before {
      left: 16px;
    }
  }

  .is-contents .container {
    padding-left: 80px;
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 18px;
    line-height: 26px;
  }

  .tags {
    margin-top: 8px;
  }

  .tag {
    margin-left: 4px;
    margin-top: 8px;
  }

  .article-wrapper {
    flex-flow: column nowrap;
    margin-top: 16px;
    padding-left: 0;
  }

  .info,
  .tags,
  .title {
    padding-left: 0;
  }

  .info-item.origin {
    word-wrap: break-word;
  }

  .wrapper .container {
    padding-left: 30px;
  }

    .promo {
    &.desktop {
      display: none;
    }

    &.mobile {
      display: block !important;
      margin-left: auto;
      margin-right: auto;
      margin-top: 15px;
    }
  }

  .article-wrapper .help-widget {
    display: block;
    max-width: 250px;
    width: 100%;
    height: 200px;
  }
}

.thanks {
  position: fixed;
  z-index: 20;
  right: 20px;
  top: 20px;
  max-width: 250px;
  width: 100%;
  padding: 10px 20px;

  border: 1px solid #000000;
  background: #ffffff;
}

.thanks-text {
  margin-top: 10px;
  margin-bottom: 10px;
}

.report-error {
  padding-top: 20px;

  font-style: italic;
  color: #aaa;
  font-size: 15px;
}
</style>

<style lang="scss">
.scroll-del {
  overflow: hidden !important;
}
</style>
