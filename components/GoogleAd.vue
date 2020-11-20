<template>
<div>
  <div class="banner" ref="slot"></div>
  <!-- <adsbygoogle
    :ad-slot="adSlot"
    :ad-style="{width: '400px', height: '1050px'}"
  /> -->
</div>
</template>

<script>
import { mapGetters } from 'vuex'

const adKey = 'ca-pub-9039390016962020'

export default {
  name: 'GoogleAd',
  props: {
    adSlot: String,
    styles: String
  },

  methods: {
    renderWidget(){
      try {
        if (process.browser) {
          const width =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth

          if (this.onlyDesktop && width <= 768) return

          const widget = `
          <ins class="adsbygoogle"
             style="${this.styles}"
             data-ad-client="${adKey}"
             data-ad-slot="${this.adSlot}"></ins>

          <script type="text/javascript"
            src="//pagead2.googlesyndication.com/pagead/show_ads.js">
          ${'<'}/script>
        `
          this.$refs.slot.innerHTML = widget
          ;(adsbygoogle = window.adsbygoogle || []).push({})
        }
      } catch (e) {
        console.log(e)
      }
    },
  },
  // mounted() {
  //   if (this.$route.params.id !== '2347') {
  //     this.renderWidget()
  //   }
  // },
  beforeDestroy() {
    this.$refs.slot.innerHTML = ''
  }
}
</script>

<style scoped lang="scss">

</style>
