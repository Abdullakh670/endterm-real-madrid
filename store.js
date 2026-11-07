const products = [
    { id: 1, img: 'images/store/home-replica.jpg', name: 'Home Shirt 26/27 (replica)', price: 100, category: 'Match Kits', bg: '#ffffff', icon: '👕' },
    { id: 2, img: 'images/store/home-authentic.jpg', name: 'Home Shirt 26/27 (authentic)', price: 150, category: 'Match Kits', bg: '#ffffff', icon: '👕' },
    { id: 3, img: 'images/store/away.jpg', name: 'Away Shirt 26/27 (dark green)', price: 100, category: 'Match Kits', bg: '#0b3d2e', icon: '👕' },
    { id: 4, img: 'images/store/third.jpg', name: 'Third Shirt 26/27 (pink)', price: 100, category: 'Match Kits', bg: '#f3b6cb', icon: '👕' },
    { id: 5, img: 'images/store/training-top.jpg', name: 'Training Top', price: 65, category: 'Training Wear', bg: '#eef1f6', icon: '🏃‍♂️' },
    { id: 6, img: 'images/store/training-pants.jpg', name: 'Training Pants', price: 55, category: 'Training Wear', bg: '#eef1f6', icon: '👖' },
    { id: 7, img: 'images/store/ball.jpg', name: 'Champions League Ball', price: 45, category: 'Accessories', bg: '#ffffff', icon: '⚽' },
    { id: 8, img: 'images/store/scarf.jpg', name: 'Fan Scarf', price: 25, category: 'Accessories', bg: '#ffffff', icon: '🧣' }
];

// cart = { productId: quantity }, saved in localStorage
let cart = {};
try { cart = JSON.parse(localStorage.getItem('rmCart')) || {}; } catch (e) { cart = {}; }

const $grid = $('#productGrid'), $empty = $('#emptyMessage'), $list = $('#cartItemsList');

function visibleProducts() {
    const cat = $('#categoryFilter').val();
    const q = $('#searchInput').val().trim().toLowerCase();
    const sort = $('#sortSelect').val();
    let items = products.filter(p => (cat === 'All' || p.category === cat) && p.name.toLowerCase().includes(q));
    if (sort === 'asc') items.sort((a, b) => a.price - b.price);
    if (sort === 'desc') items.sort((a, b) => b.price - a.price);
    return items;
}

function renderProducts() {
    const items = visibleProducts();
    $grid.empty();
    $empty.toggle(items.length === 0);
    items.forEach(p => {
        $grid.append(`
        <div class="col-md-6 col-xl-4">
            <div class="card h-100 border-0 shadow-sm text-center p-3 store-card">
                <div class="product-img mb-3" style="background:${p.bg}"><span>${p.icon}</span><img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.remove()"></div>
                <div class="card-body p-0">
                    <span class="badge bg-secondary mb-2">${p.category}</span>
                    <h6 class="card-title fw-bold">${p.name}</h6>
                    <p class="fw-bold fs-5" style="color:var(--ink)">${p.price} €</p>
                    <button class="btn btn-outline-dark w-100 add-to-cart-btn" data-id="${p.id}">Add to cart</button>
                </div>
            </div>
        </div>`);
    });
}

function changeQty(id, delta) {
    cart[id] = (cart[id] || 0) + delta;
    if (cart[id] <= 0) delete cart[id];
    updateCart();
}

function updateCart() {
    localStorage.setItem('rmCart', JSON.stringify(cart));
    const ids = Object.keys(cart);
    $list.empty();
    let total = 0, count = 0;
    if (!ids.length) $list.append('<li class="list-group-item text-muted">Your cart is empty. Add a kit to start.</li>');
    ids.forEach(id => {
        const p = products.find(x => x.id == id), q = cart[id];
        total += p.price * q; count += q;
        $list.append(`<li class="list-group-item d-flex justify-content-between align-items-center px-0">
            <span><small>${p.name}</small><br><small class="text-muted">${p.price} € × ${q}</small></span>
            <span class="btn-group btn-group-sm">
                <button class="btn btn-outline-secondary qty" data-id="${id}" data-d="-1" aria-label="Remove one">−</button>
                <button class="btn btn-outline-secondary qty" data-id="${id}" data-d="1" aria-label="Add one">+</button>
            </span></li>`);
    });
    $('#cartTotalSum').text(total + ' €');
    $('#checkoutBtn').prop('disabled', !count).text(count ? `Checkout (${count})` : 'Checkout');
    $('#cartCard').addClass('cart-bounce');
    setTimeout(() => $('#cartCard').removeClass('cart-bounce'), 350);
}

$(function () {
    renderProducts();
    updateCart();
    $('#categoryFilter, #sortSelect').on('change', renderProducts);
    $('#searchInput').on('input', renderProducts);

    $grid.on('click', '.add-to-cart-btn', function () {
        const $b = $(this);
        changeQty(parseInt($b.data('id')), 1);
        $('#toast').text(products.find(x => x.id == $b.data('id')).name + ' added to cart').stop(true, true).fadeIn(150).delay(1300).fadeOut(300);
        $b.text('Added').addClass('btn-success').removeClass('btn-outline-dark');
        setTimeout(() => $b.text('Add to cart').removeClass('btn-success').addClass('btn-outline-dark'), 900);
    });
    $list.on('click', '.qty', function () { changeQty($(this).data('id'), parseInt($(this).data('d'))); });
    $('#checkoutBtn').on('click', function () {
        cart = {};
        updateCart();
        $list.html('<li class="list-group-item text-success fw-bold">Order placed. ¡Hala Madrid!</li>');
    });
});