const { createApp, ref, computed, toRefs } = Vue

const app = createApp({
    setup(){
        const cart = ref([])
        const premium = ref(true)

        function updateCart(id){
            cart.value.push(id)
        }

        function removeFromCart(id){
            const index = cart.value.indexOf(id)
            if(index !== -1){
                cart.value.splice(index, 1)
            }
        }

        const cartCounts = computed(() => {
            return cart.value.reduce((acc, id) => {
                acc[id] = (acc[id] || 0) + 1
                return acc
            }, {})
        })

        return {
            cart,
            premium,
            updateCart,
            removeFromCart,
            cartCounts
        }
    }
})

app.component('product-display', productDisplay)
app.component('product-details', productDetails)
app.component('review-form', reviewForm)
app.component('review-list', reviewList)

app.mount('#app')