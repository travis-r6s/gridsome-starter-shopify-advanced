<template>
  <div class="column is-half">
    <h4 class="subtitle is-family-secondary">
      {{ displayName }}
    </h4>
    <p>{{ customer.email }}</p>
    <br>
    <div v-if="customer.defaultAddress">
      <p
        v-for="(line, i) in customer.defaultAddress.formatted"
        :key="i">
        {{ line }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    customer: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    displayName () { return this.customer.firstName ? `${this.customer.firstName} ${this.customer.lastName}` : this.customer.displayName }
  }
}
</script>
