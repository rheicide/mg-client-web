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
  import bus from '@/event-bus'
  import MailSummary from './MailSummary'

  export default {
    components: {
      MailSummary
    },
    data: () => ({
      mails: [],
      defaultLimit: 20
    }),
    computed: {
      limit () {
        return parseInt(this.$route.query.limit) || this.defaultLimit
      },

      offset () {
        return parseInt(this.$route.query.offset) || 0
      }
    },
    mounted () {
      this.fetch(this.limit, this.offset)
    },
    beforeRouteUpdate (to, from, next) {
      this.fetch(to.query.limit || this.defaultLimit, to.query.offset || 0)
      next()
    },
    methods: {
      fetch (limit, offset) {
        bus.$emit('loading', true)
        axios.get('/mails', {params: {limit: limit, offset: offset}})
          .then(({data}) => { this.mails = data || [] })
          .catch(err => console.log(err))
          .finally(() => bus.$emit('loading', false))
      },

      next () {
        this.$router.push(`/?limit=${this.limit}&offset=${this.offset + this.defaultLimit}`)
      },

      previous () {
        this.$router.push(`/?limit=${this.limit}&offset=${this.offset - this.defaultLimit}`)
      }
    }
  }
</script>

<style scoped lang="scss">
  .pagination {
    padding-top: 10px;
    padding-bottom: 10px;
  }
</style>
