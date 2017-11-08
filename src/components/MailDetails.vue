<template>
  <div class="mail-details row" v-if="this.mail">
    <div class="col-12 col-md-10">
      <div><strong>From:</strong> {{ mail.from }}</div>
      <div><strong>To:</strong> {{ mail.to }}</div>
      <div><strong>Date:</strong> {{ date }}</div>
      <div><strong>Subject:</strong> {{ mail.subject }}</div>
    </div>

    <div class="col-12 col-md-2 action-dropdown">
      <b-dropdown text="Delete" split @click="deleteMail">
        <b-dropdown-item @click="showHtml = !showHtml">Toggle HTML</b-dropdown-item>
      </b-dropdown>
    </div>

    <div class="col-12 mail-body">
      <div v-if="mail.body_html && showHtml">
        <div v-show="loadingIframe">Loading...</div>
        <iframe class="mail-body-html" :srcdoc="mail.body_html" @load="prepareIframe"></iframe>
      </div>

      <div class="mail-body-plain" v-else>{{ mail.body_plain }}</div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
  import bus from '@/event-bus'

  export default {
    props: [
      'id'
    ],
    data: () => ({
      mail: null,
      showHtml: true,
      loadingIframe: true
    }),
    computed: {
      date () {
        return moment(this.mail.date).format('ddd, MMM Do YYYY, h:mm a')
      }
    },
    mounted () {
      bus.$emit('loading', true)
      axios.get(`/mails/${this.id}`)
        .then(({data}) => {
          this.mail = data

          if (!this.mail.read) {
            this.markMailAsRead()
          }
        })
        .catch(err => console.log(err))
        .finally(() => bus.$emit('loading', false))
    },
    methods: {
      prepareIframe (evt) {
        evt.target.style.height = evt.target.contentWindow.document.body.scrollHeight + 'px'

        const links = evt.target.contentWindow.document.getElementsByTagName('a')
        for (let link of links) {
          link.target = '_blank'
        }

        this.loadingIframe = false
      },

      deleteMail () {
        axios.delete(`/mails/${this.id}`)
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err))
      },

      markMailAsRead () {
        axios.patch(`/mails/${this.id}`, { read: true })
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

  .mail-body-html {
    width: 100%;
    height: 0;
    border: 0;
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
