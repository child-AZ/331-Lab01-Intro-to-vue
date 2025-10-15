const productDisplay = {
    props: {
        premium: Boolean
    },
    template:
        /*html*/ `
    <div class="product-display">
        <div class="product-container">
            <div class="product-image">
                <img :src="image" alt="Product image">
            </div>
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="inStock > 10">In Stock</p>
            <p v-else-if="inStock <= 10 && inStock > 0">Almost out of Stock</p>
            <p v-else>Out of Stock</p>
            <p>Shipping: {{ shipping }}</p>
            <product-details :details="details"></product-details>
            <div v-for="(variant, index) in variants" :key="variant.id" @mouseover="updateVariant(index)"
                class="color-circle" :style="{ backgroundColor: variant.color }">
            </div>
            <button class="button" :disabled="!inStock" @click="addToCart" :class="{ disabledButton: !inStock }">Add To
                Cart</button>
            <button class="button" @click="removeFromCart">Remove From Cart</button>
            <review-list v-if="reviews.length" :reviews="reviews"></review-list>
            <review-form @review-submitted="addReview"></review-form>
        </div>
    </div>
    `,
    setup(props, { emit }) {
        const product = Vue.ref('Boots')
        const brand = Vue.ref('SE 331')
        const inventory = Vue.ref(100)
        const details = Vue.ref([
            '50% cotton',
            '30% wool',
            '20% polyester'
        ])
        const variants = Vue.ref([
            { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
            { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 }
        ])
        const selectedVariant = Vue.ref(0)

        function updateVariant(index) {
            selectedVariant.value = index
        }

        // Optional helper to update selected variant by image (kept for parity with earlier steps)
        function updateImage(variantImage) {
            const idx = variants.value.findIndex(v => v.image === variantImage)
            if (idx !== -1) selectedVariant.value = idx
        }

        const image = Vue.computed(() => variants.value[selectedVariant.value].image)
        const inStock = Vue.computed(() => variants.value[selectedVariant.value].quantity)
        const title = Vue.computed(() => brand.value + ' ' + product.value)
        const shipping = Vue.computed(() => (props.premium ? 'Free' : 30))

        function addToCart() {
            emit('add-to-cart', variants.value[selectedVariant.value].id)
        }

        function removeFromCart() {
            emit('remove-from-cart', variants.value[selectedVariant.value].id)
        }

        const reviews = Vue.ref([])
        function addReview(review){
            reviews.value.push(review)
        }

        return {
            title,
            image,
            inStock,
            inventory,
            details,
            variants,
            addToCart,
            removeFromCart,
            updateImage,
            updateVariant,
            shipping,
            reviews,
            addReview
        }
    }
}