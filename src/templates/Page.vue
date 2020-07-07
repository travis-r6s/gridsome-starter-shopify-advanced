<template>
  <Layout>
    <div class="container has-text-centered">
      <h1 class="title">
        {{ page.title }}
      </h1>
      <hr>
      <br>
      <div
        class="content"
        v-html="page.body" />
    </div>
  </Layout>
</template>

<script>
export default {
  name: 'Page',
  metaInfo () {
    return {
      title: this.page.title
    }
  },
  computed: {
    page () { return this.$page.shopifyPage }
  }
}
</script>

<page-query>
query Page ($id: ID!) {
  shopifyPage (id: $id) {
    id
    title
    body
  }
}
</page-query>
