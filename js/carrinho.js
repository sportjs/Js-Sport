function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
  
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    const cartMap = cart.reduce((acc, item) => {
      if (!acc[item.id]) {
        acc[item.id] = { ...item, quantity: 0 };
      }
      acc[item.id].quantity += 1;
      return acc;
    }, {});
  
    cartItems.innerHTML = '';
  
    let totalPrice = 0;
  
    for (const item of Object.values(cartMap)) {
      const li = document.createElement('li');
      li.textContent = `${item.name} - R$ ${item.price} x ${item.quantity}`;
  
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remover';
      removeButton.setAttribute('data-id', item.id);
      removeButton.addEventListener('click', removeFromCart);
  
      li.appendChild(removeButton);
      cartItems.appendChild(li);
  
      totalPrice += parseFloat(item.price) * item.quantity;
    }
  
    totalPriceElement.textContent = totalPrice.toFixed(2);
  }
  
  function addToCart(event) {
    const id = event.target.getAttribute('data-id');
    const name = event.target.getAttribute('data-name');
    const price = event.target.getAttribute('data-price');
  
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    cart.push({ id, name, price });
  
    localStorage.setItem('cart', JSON.stringify(cart));
  
    updateCart();
  }
  
  function removeFromCart(event) {
    const id = event.target.getAttribute('data-id');
  
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    cart = cart.filter(item => item.id !== id);
  
    localStorage.setItem('cart', JSON.stringify(cart));
  
    updateCart();
  }
  
  function resetCart() {
    localStorage.setItem('cart', JSON.stringify([]));
    updateCart();
  }
  
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    resetCart();
  });
  