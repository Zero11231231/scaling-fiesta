// Initialize Stripe
const stripe = Stripe('YOUR_PUBLISHABLE_KEY'); // Replace with your Stripe publishable key
const elements = stripe.elements();
const cardElement = elements.create('card');
cardElement.mount('#card-element');

const form = document.getElementById('payment-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
            name: document.getElementById('name').value,
        },
    });

    if (error) {
        // Show error to your customer (e.g., insufficient funds)
        document.getElementById('card-errors').textContent = error.message;
    } else {
        // Send paymentMethod.id to your server (e.g., using fetch)
        console.log('Payment Method ID:', paymentMethod.id);
        // Here you would typically send the paymentMethod.id to your server for processing
        alert('Payment successful! Payment Method ID: ' + paymentMethod.id);
    }
});