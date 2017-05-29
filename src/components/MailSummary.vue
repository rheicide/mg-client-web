<template>
  <router-link tag="div" class="mail row" :to="`/mails/${mail.id}`">
    <div class="col-12 col-md-3" :title="mail.from">{{ mail.from }}</div>
    <div class="col-12 col-md mail-subject">{{ mail.subject }}</div>
    <div class="col-12 col-md-2 mail-date" :title="dateTitle">{{ date }}</div>
  </router-link>
</template>

<script>
  import moment from 'moment'

  export default {
    props: {
      mail: {
        type: Object,
        required: true
      }
    },
    computed: {
      date () {
        return moment(this.mail.date).fromNow()
      },

      dateTitle () {
        return moment(this.mail.date).calendar(null, {
          sameElse: 'DD/MM/YYYY'
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .mail {
    padding: 10px 0;
    border-bottom: 1px solid #d6d6d6;

    &:hover {
      background-color: #f0f0f0;
      cursor: pointer;
    }

    div {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .mail-subject, .mail-date {
      color: lighten(black, 50%);
      font-size: smaller;
    }

    @media (min-width: 992px) {
      height: 35px;
      line-height: 35px;
      padding: 0;

      .mail-subject, .mail-date {
        color: inherit;
        font-size: inherit;
      }

      .mail-date {
        text-align: right;
      }
    }
  }
</style>
