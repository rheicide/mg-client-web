<template>
  <router-link tag="div" class="mail row" :class="{ unread: !mail.read }" :to="`/${mail.id}`">
    <div class="col-12 col-md-3 mail-from" :title="mail.from">{{ from }}</div>
    <div class="col-12 col-md mail-subject">{{ mail.subject }}</div>
    <div class="col-12 col-md-2 mail-date" :title="dateTitle">{{ date }}</div>
  </router-link>
</template>

<script>
  import moment from 'moment'
  import addrs from 'email-addresses'

  export default {
    props: {
      mail: {
        type: Object,
        required: true
      }
    },
    computed: {
      from () {
        return addrs.parseOneAddress(this.mail.from).name
      },

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

    &.unread {
      .mail-from {
        font-weight: bold;
      }
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

    .mail-date {
      font-style: italic;
    }

    @media (min-width: 768px) {
      height: 35px;
      line-height: 35px;
      padding: 0;

      .mail-subject, .mail-date {
        color: inherit;
        font-size: inherit;
      }

      .mail-date {
        text-align: right;
        font-style: normal;
      }
    }
  }
</style>
