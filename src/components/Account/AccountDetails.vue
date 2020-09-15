<template>
  <div>
    <SfHeading
      :level="4"
      class="sf-heading--left"
      :title="displayName" />
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
// Components
import { SfHeading } from '@storefront-ui/vue'

export default {
  components: { SfHeading },
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
