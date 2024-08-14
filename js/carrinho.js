// Função para atualizar o carrinho na interface
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
  
    // Obter itens do carrinho do localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Agrupar itens por ID e contar as quantidades
    const cartMap = cart.reduce((acc, item) => {
      if (!acc[item.id]) {
        acc[item.id] = { ...item, quantity: 0 };
      }
      acc[item.id].quantity += 1;
      return acc;
    }, {});
  
    // Limpar itens do carrinho na interface
    cartItems.innerHTML = '';
  
    // Variável para armazenar o preço total
    let totalPrice = 0;
  
    // Adicionar cada item do carrinho na interface
    for (const item of Object.values(cartMap)) {
      const li = document.createElement('li');
      li.textContent = `${item.name} - R$ ${item.price} x ${item.quantity}`;
  
      // Botão de remover item
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remover';
      removeButton.setAttribute('data-id', item.id);
      removeButton.addEventListener('click', removeFromCart);
  
      li.appendChild(removeButton);
      cartItems.appendChild(li);
  
      // Somar o preço total (considerando a quantidade)
      totalPrice += parseFloat(item.price) * item.quantity;
    }
  
    // Atualizar o preço total na interface
    totalPriceElement.textContent = totalPrice.toFixed(2);
  }
  
  // Função para adicionar um item ao carrinho
  function addToCart(event) {
    // Obter dados do produto a partir dos atributos data
    const id = event.target.getAttribute('data-id');
    const name = event.target.getAttribute('data-name');
    const price = event.target.getAttribute('data-price');
  
    // Obter itens do carrinho do localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Adicionar o novo item ao carrinho
    cart.push({ id, name, price });
  
    // Salvar o carrinho atualizado no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  
    // Atualizar o carrinho na interface
    updateCart();
  }
  
  // Função para remover um item do carrinho
  function removeFromCart(event) {
    // Obter o ID do produto a ser removido
    const id = event.target.getAttribute('data-id');
  
    // Obter itens do carrinho do localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Remover o item com o ID correspondente
    cart = cart.filter(item => item.id !== id);
  
    // Salvar o carrinho atualizado no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  
    // Atualizar o carrinho na interface
    updateCart();
  }
  
  // Limpar o carrinho no localStorage quando a página carrega
  function resetCart() {
    localStorage.setItem('cart', JSON.stringify([]));
    updateCart();
  }
  
  // Adicionar evento de clique aos botões "Adicionar ao Carrinho"
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
  });
  
  // Atualizar o carrinho na interface ao carregar a página
  document.addEventListener('DOMContentLoaded', () => {
    resetCart();
  });
  