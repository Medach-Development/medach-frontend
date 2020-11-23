<template lang="pug">
  .wrapper
    .container
      .breadcrumb
        ul
          li
            nuxt-link(to='/vacancies') Вакансии
          li.active
            | {{vacancy.title}}
      .vacancy_description__wrapper
        .vacancy_description-left
          .vacancy-info-block__title
            | {{ vacancy.employer }}
          .vacancy-info_item(v-if="vacancy.salary")
            .vacancy-info_question
              | Зарплата:
            .vacancy-info_answer
              | {{ vacancy.salary }}
          .vacancy-info_item(v-if="vacancy.employment")
            .vacancy-info_question
              | Занятость:
            .vacancy-info_answer
              | {{ vacancy.employment }}
          .vacancy-info_item(v-if="vacancy.location")
            .vacancy-info_question
              | Локация:
            .vacancy-info_answer
              | {{ vacancy.location }}
          .vacancy-info_item(v-if="vacancy.experience")
            .vacancy-info_question
              | Требуемый стаж:
            .vacancy-info_answer
              | {{ vacancy.experience }}
          .vacancy-info_item(v-if="vacancy.contacts")
            .vacancy-info_question
              | Контакты работодателя:
            .vacancy-info_answer
              a(:href="`mailto:${vacancy.contacts}`")
                | {{ vacancy.contacts }}
          .vacancy-posting-date
            | Вакансия размещена: {{publishDate}}
        .vacancy_description-right
          .vacancy_description__title
            | {{ vacancy.title }}
          .vacancy_description-text.content-article-wrapper(v-html="vacancy.content")
          a(v-if="vacancy.external_url" :href="vacancy.external_url" target="_blank").vacancy_description-btn
            | Откликнуться
          nuxt-link(v-else :to="`/vacancy/apply/${vacancy.id}`").vacancy_description-btn
            | Откликнуться
</template>
<script>
import { format } from 'date-fns';

import { mapGetters } from 'vuex'

export default {
  fetch({store, params}) {
    return store.dispatch('vacancyPage/getVacancy', {
      id: params.id
    })
  },

  computed: {
    ...mapGetters({
      vacancy: 'vacancyPage/vacancy'
    }),

    publishDate() {
      return format(this.vacancy.updated_at, 'DD.MM.YYYY')
    },
  },
}
</script>




<style scoped lang="scss">
.breadcrumb {
  margin-top: 20px;
  ul {
    display: flex;
    padding-left: 0;
    li {
      position: relative;

      text-decoration: none;
      list-style-type: none;
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
      color: #7198ba;

      &:not(:first-child) {
        margin-left: 33px;
      }

      &:not(:first-child)::after {
        content: '>';
        display: block;
        position: absolute;
        left: -21px;
        top: 0;
      }
    }
  }
}
.vacancy_description__wrapper {
  display: flex;
  padding-bottom: 90px;
  margin-top: 28px;
}

.vacancy_description-left {
  align-self: flex-start;

  width: 400px;
  background: #ffffff;
  border: 1px solid #dcdcdc;
  box-sizing: border-box;
  box-shadow: 0px 2px 4px rgba(184, 184, 184, 0.5);
  border-radius: 3px;
  padding-top: 37px;
  padding-left: 32px;
  padding-bottom: 32px;
  padding-right: 32px;
}
.vacancy-info-block__title {
  font-style: normal;
  font-weight: 500;
  font-size: 26px;
  line-height: 32px;
  color: #5b5b5b;
}

.vacancy-info_item {
  margin-top: 21px;
}

.vacancy-info_question {
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #7198ba;
}

.vacancy-info_answer {
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #5b5b5b;
  margin-top: 10px;
}

.vacancy-posting-date {
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #a3a3a3;
  margin-top: 36px;
}

.vacancy_description-right {
  width: 936px;
  height: fit-content;
  margin-left: 24px;
  padding-top: 36px;
  padding-left: 56px;
  padding-right: 56px;
  padding-bottom: 32px;
  background: #ffffff;
  border: 1px solid #dcdcdc;
  box-sizing: border-box;
  box-shadow: 0px 2px 4px rgba(184, 184, 184, 0.5);
  border-radius: 3px;
}

.vacancy_description__title {
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  line-height: 49px;
  color: #7198ba;
}
.vacancy_description-text {
  margin-top: 32px;
  word-wrap: break-word;
  line-height: 130%;
}
.vacancy_description-btn {
  width: 240px;
  height: 60px;
  background: #7198ba;
  box-shadow: 0px 2px 4px rgba(184, 184, 184, 0.5);
  border-radius: 3px;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #ffffff;
  margin-left: auto;
  margin-top: 20px;
  cursor: pointer;
}

@media (max-width: 1200px) {
  .vacancy_description-right {
    width: 666px;
  }
}

@media (max-width: 992px) {
  .vacancy_description__wrapper {
    flex-direction: column;
  }

  .vacancy_description-left {
    width: 100%;
  }
  .vacancy_description-right {
    width: 100%;
    margin-left: 0;
    margin-top: 20px;
  }
}

@media (max-width: 768px) {
  .container {
    padding-left: 16px;
    padding-right: 16px;
  }

  .vacancy_description__title {
    font-size: 28px;
    line-height: 35px;
  }


}

@media (max-width: 576px) {
  .breadcrumb {
    ul {
      li {
        font-size: 15px;
      }
    }
  }
  .vacancy_description-left {
    padding: 10px;
  }
  .vacancy_description-right {
    padding: 10px;
  }
  .vacancy_description__title {
    font-size: 22px;
  }
  .vacancy_description-btn {
    width: 200px;
    margin: 20px auto;
  }
}
</style>
