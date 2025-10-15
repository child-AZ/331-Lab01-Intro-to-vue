const reviewForm = {
  template: /*html*/ `
    <form class="review-form" @submit.prevent="onSubmit">
      <h3>Leave a review</h3>

      <div v-if="errors.length" class="error-messages">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="(error, idx) in errors" :key="idx">{{ error }}</li>
        </ul>
      </div>

      <label for="name">Name:</label>
      <input id="name" v-model="name">

      <label for="review">Review:</label>
      <textarea id="review" v-model="review"></textarea>

      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>

      <label for="recommend">Would you recommend this product?</label>
      <select id="recommend" v-model="recommend">
        <option :value="true">Yes</option>
        <option :value="false">No</option>
      </select>

      <input class="button" type="submit" value="Submit">
    </form>
  `,
  setup(props, { emit }) {
    const form = Vue.reactive({
      name: '',
      review: '',
      rating: null,
      recommend: null
    })
    const errors = Vue.ref([])

    function onSubmit() {
      errors.value = []
      if (!form.name) errors.value.push('Name is required.')
      if (!form.review) errors.value.push('Review is required.')
      if (!form.rating) errors.value.push('Rating is required.')
      if (form.recommend === null) errors.value.push('Recommendation is required.')
      if (errors.value.length) return

      const productReview = {
        name: form.name,
        review: form.review,
        rating: form.rating,
        recommend: form.recommend
      }
      emit('review-submitted', productReview)
      form.name = ''
      form.review = ''
      form.rating = null
      form.recommend = null
    }

    return {
      ...Vue.toRefs(form),
      errors,
      onSubmit
    }
  }
}