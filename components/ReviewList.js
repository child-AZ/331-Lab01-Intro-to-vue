const reviewList = {
  props: {
    reviews: {
      type: Array
    }
  },
  template: /*html*/ `
    <div class="review-container">
      <h3>Reviews:</h3>
      <ul>
        <li v-for="(review, index) in reviews" :key="index">
          {{ review.name }} gave this {{ review.rating }} stars
          <br/>
          "{{ review.review }}"
          <br/>
          Recommends: {{ review.recommend ? 'Yes' : 'No' }}
          <br/>
        </li>
      </ul>
    </div>
  `,
  setup(props){
    const reviews = props.reviews
    return { reviews }
  }
}