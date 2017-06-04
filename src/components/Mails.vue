<template>
  <div class="mails">
    <mail-summary v-for="mail in mails" :mail="mail" :key="mail.id"></mail-summary>

    <div class="row pagination" v-show="mails.length > 0">
      <div class="col text-center">
        <b-button-group>
          <b-button @click="previous" :disabled="offset === 0">Previous</b-button>
          <b-button @click="next" :disabled="mails.length < limit">Next</b-button>
        </b-button-group>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import MailSummary from './MailSummary'

  export default {
    components: {
      MailSummary
    },
    data: () => ({
      mails: []
    }),
    computed: {
      limit () {
        return parseInt(this.$route.query.limit) || 10
      },

      offset () {
        return parseInt(this.$route.query.offset) || 0
      }
    },
    created () {
      this.fetch(this.limit, this.offset)
    },
    beforeRouteUpdate (to, from, next) {
      this.fetch(to.query.limit, to.query.offset)
      next()
    },
    methods: {
      fetch (limit, offset) {
        axios.get('/mails', {params: {limit: limit, offset: offset}})
          .then(({data}) => { this.mails = data || [] })
          .catch(err => console.log(err))
      },

      next () {
        this.$router.push(`/?limit=${this.limit}&offset=${this.offset + 10}`)
      },

      previous () {
        this.$router.push(`/?limit=${this.limit}&offset=${this.offset - 10}`)
      }
    }
  }
</script>

<style scoped lang="scss">
  .pagination {
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
