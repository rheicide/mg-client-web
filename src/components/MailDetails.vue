<template>
  <div class="mail-details row" v-if="this.mail">
    <div class="col-12 col-md-10">
      <div><strong>From:</strong> {{ mail.from }}</div>
      <div><strong>To:</strong> {{ mail.to }}</div>
      <div><strong>Date:</strong> {{ date }}</div>
      <div><strong>Subject:</strong> {{ mail.subject }}</div>
    </div>

    <div class="col-12 col-md-2 action-dropdown">
      <b-dropdown text="Toggle HTML" split @click="showHtml = !showHtml">
        <b-dropdown-item variant="danger" @click="deleteMail">Delete</b-dropdown-item>
      </b-dropdown>
    </div>

    <div class="col-12 mail-body">
      <div v-html="mail.body_html" v-if="showHtml"></div>
      <div class="mail-body-plain" v-else>{{ mail.body_plain }}</div>
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
    },
    methods: {
      deleteMail () {
        axios.delete(`/mails/${this.id}`)
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err))
      }
    }
  }
</script>

<style scoped lang="scss">
  .mail-details {
    margin-top: 10px;
  }

  .mail-body {
    margin-top: 20px;
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

  .action-dropdown {
    margin-top: 20px;

    @media (min-width: 768px) {
      margin-top: 0;
      text-align: right;
    }
  }
</style>
