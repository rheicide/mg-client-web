<template>
  <div class="mails">
    <mail-summary v-for="mail in mails" :mail="mail" :key="mail.id"></mail-summary>
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
    created () {
      axios.get('/mails')
        .then(({data}) => { this.mails = data || [] })
        .catch(err => console.log(err))
    }
  }
</script>

<style>
</style>
