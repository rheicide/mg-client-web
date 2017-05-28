<template>
  <div class="mail-details row" v-if="this.mail">
    <div class="col">
      <div><strong>From:</strong> {{ mail.from }}</div>
      <div><strong>To:</strong> {{ mail.to }}</div>
      <div><strong>Date:</strong> {{ date }}</div>
      <div><strong>Subject:</strong> {{ mail.subject }}</div>

      <div class="mail-body">
        <b-btn variant="link" v-if="mail.body_html" @click="showHtml = !showHtml">Toggle HTML</b-btn>
        <div v-html="mail.body_html" v-if="showHtml"></div>
        <div class="mail-body-plain" v-else>{{ mail.body_plain }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'

  export default {
    props: [
      'id'
    ],
    data: () => ({
      mail: null,
      showHtml: false
    }),
    computed: {
      date () {
        return moment(this.mail.date).format('ddd, MMM Do YYYY, h:mm a')
      }
    },
    created () {
      axios.get(`/mails/${this.id}`)
        .then(({data}) => { this.mail = data })
        .catch(err => console.log(err))
    }
  }
</script>

<style scoped lang="scss">
  .mail-details {
    margin-top: 10px;
  }

  .mail-body {
    margin-top: 35px;
  }

  .mail-body-plain {
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .btn-link {
    border: none;
    padding-left: 0;
    cursor: pointer;
  }
</style>
