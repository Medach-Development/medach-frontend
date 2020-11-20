<template lang="pug">
article.card-wrapper(:class="{'grid-card-wrapper': isGridCard, 'list-card-wrapper': isListCard}" key="article-card")
  nuxt-link.image-wrapper(:style="{height: isListCard ? '300px' : '240px'}" :to="`/post/${id}`")
    image-component(:src="image")
  .content
    .top
      nuxt-link.name(:to="`/post/${id}`")
        | {{ name }}
    .bottom
      .tags
        nuxt-link.tag(v-for="tag in tags" :key="`${id}-${tag}`" :to="`/search?query=${tag}`")
          | {{ tag }}
      .footer(v-if="isMetaVisible")
        .author
          | {{ author }}
        .date
          | {{ formattedDate }}
</template>

<script>
import ImageComponent from '~/components/ImageComponent'
import { format } from 'date-fns'
import ru from 'date-fns/locale/ru'

export default {
  props: {
    image: String,
    tags: Array,
    publicationDate: String,
    id: [Number, String],
    name: String,
    author: String,
    isGridCard: Boolean,
    isListCard: Boolean,
    isMetaVisible: Boolean
  },
  name: 'ArticleCard',
  components: {
    ImageComponent
  },
  computed: {
    formattedDate() {
      return format(this.publicationDate, 'D MMMM YYYY', { locale: ru });
    }
  }
}
</script>

<style lang="scss">

</style>

<style scoped lang="scss">
.card-wrapper {
  overflow: hidden;
  display: flex;
  flex-flow: column nowrap;
}
.name {
  font-size: 16px;
  color: #000000;
  letter-spacing: 0;
  line-height: 22px;
  font-weight: 600;
  margin-top: 24px;
  display: block;
}

.tags {
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: flex-start;
}

.tag {
  display: inline-block;
  font-size: 12px;
  color: #A3A3A3;
  letter-spacing: 0;
  font-weight: 500;
  border: 1px solid #A3A3A3;
  border-radius: 3px;
  padding: 4px 8px;
  margin-top: 8px;
  margin-right: 8px;
  text-align: center;
}

.image-wrapper {
  display: block;
}

.bottom {
  margin-top: 8px;
}

.author {
  font-size: 12px;
  color: #5B5B5B;
  letter-spacing: 0;
  font-weight: 600;
}

.date {
  font-size: 12px;
  color: #5B5B5B;
  letter-spacing: 0;
  white-space: nowrap;
}

.grid-card-wrapper{
  background: #F2F3EC;
  height: 100%;

  .content {
    min-height: 255px;
    padding: 0px 16px 16px 16px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    flex: 1;
  }

  .tag {
    color: #7198BA;
    border-color: #7198BA;
  }
}

.footer {
  margin-top: 24px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
}

.list-card-wrapper {
  .footer {
    flex-flow: column nowrap;
    justify-content: flex-end;
    align-items: flex-end;
    margin-top: 0;
    margin-left: 24px;
  }

  .bottom {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }

  .tags {
    align-self: flex-start;
  }

  .date {
    margin-top: 8px;
    text-align: right;
  }

  .author {
    text-align: right;
  }

  .image-wrapper {
    border-radius: 3px;
    overflow: hidden;
  }

  
}



@media (max-width: 768px) {
  .card-wrapper {
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    box-shadow: 0 2px 2px 0 rgba(219, 219, 219, .5);
  }


  .list-card-wrapper .image-wrapper {
    height: 64vw !important;
    border-radius: 0;
  }

  .content {
    padding-left: 32px;
    padding-right: 32px;
    padding-bottom: 12px;
  }

  .name {
    margin-top: 12px;

    font-size: 14px;
    line-height: 20px;
    font-weight: normal;
  }

  .bottom {
    margin-top: 0px;
  }

  .tag {
    margin-right: 4px;
  }

  .footer {
    display: none;
  }

  .grid-card-wrapper .content {
    min-height: auto;
  }
}

</style>
