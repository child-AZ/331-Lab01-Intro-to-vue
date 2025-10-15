const productDetails = {
  props: {
    details: Array
  },
  template: /*html*/ `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `
}