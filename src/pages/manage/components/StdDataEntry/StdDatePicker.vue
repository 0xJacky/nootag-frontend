<template>
    <a-date-picker
        v-model="dateModel"
        @change="(r, d) => {changeDate(d)}"
    />
</template>

<script>
    const moment = require('moment')
    moment.locale('zh-cn')

    export default {
        name: 'StdDatePicker',
        props: {
            date: String,
        },
        model: {
            prop: 'date',
            event: 'changeDate'
        },
        data() {
            return {
                moment,
                dateModel: this.date ? moment(this.date) : null
            }
        },
        watch: {
          date() {
              this.dateModel = this.date ? moment(this.date) : null
          }
        },
        methods: {
            changeDate(d) {
                this.$emit('changeDate', d)
            }
        }
    }
</script>

<style scoped>

</style>
