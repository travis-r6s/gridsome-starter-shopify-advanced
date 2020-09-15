<template>
  <SfFooter
    :column="4"
    multiple>
    <SfFooterColumn
      v-for="column in columns"
      :key="column.title"
      :title="column.title">
      <SfList v-if="column.items">
        <SfListItem
          v-for="item in column.items"
          :key="item">
          <SfMenuItem :label="item" />
        </SfListItem>
      </SfList>
    </SfFooterColumn>
  </SfFooter>
</template>
<script>
// Components
import { SfFooter, SfList, SfMenuItem } from '@storefront-ui/vue'

export default {
  name: 'Footer',
  components: { SfFooter, SfList, SfMenuItem },
  data: () => ({
    columns: [
      {
        title: 'About us',
        items: ['Who we are', 'Quality in the details', 'Customer Reviews']
      },
      {
        title: 'Departments',
        items: ['Women fashion', 'Men fashion', 'Kidswear', 'Home']
      },
      {
        title: 'Help',
        items: ['Customer service', 'Size guide', 'Contact us']
      },
      { title: 'Payment & delivery', items: ['Purchase terms', 'Guarantee'] },
      {
        title: 'Social',
        items: ['facebook', 'pinterest', 'twitter', 'youtube']
      }
    ]
  })
}
</script>
