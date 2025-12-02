// Centralização dos scripts das páginas

// Login
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');

    usernameError.classList.add('hidden');
    passwordError.classList.add('hidden');

    let hasError = false;
    if (!username.value.trim()) {
        usernameError.classList.remove('hidden');
        hasError = true;
    }
    if (!password.value.trim()) {
        passwordError.classList.remove('hidden');
        hasError = true;
    }

    if (!hasError) {
        alert('Login realizado com sucesso!');
    }
});

// Cadastro
document.getElementById('productForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Produto cadastrado com sucesso!');
    this.reset();
});

document.getElementById('clearBtn')?.addEventListener('click', function() {
    document.getElementById('productForm').reset();
});

document.getElementById('cancelBtn')?.addEventListener('click', function() {
    if (confirm('Tem certeza que deseja cancelar? Todas as alterações serão perdidas.')) {
        document.getElementById('productForm').reset();
    }
});

// Estoque
document.getElementById('search')?.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const rows = document.querySelectorAll('#productTable tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
});

document.querySelectorAll('#productTable button')?.forEach(button => {
    button.addEventListener('click', function() {
        const action = this.textContent;
        const productName = this.closest('tr').querySelector('td').textContent;
        alert(`${action} produto: ${productName}`);
    });
});

// Atualiza automaticamente os dados do estoque no site
const fetchStockData = async () => {
    try {
        // Simulação de uma chamada para obter dados do estoque
        const stockData = [
            { name: 'Caneta Azul', category: 'Escritório', quantity: 5, price: 'R$ 2,50' },
            { name: 'Caderno Preto', category: 'Escritório', quantity: 20, price: 'R$ 15,00' },
            { name: 'Mouse Óptico', category: 'Eletrônicos', quantity: 8, price: 'R$ 45,00' }
        ];

        const tableBody = document.getElementById('productTable');
        tableBody.innerHTML = '';

        stockData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.quantity <= 10 ? `<span class='badge-low'>${item.quantity}</span>` : item.quantity}</td>
                <td>${item.price}</td>
                <td>
                    <button>Editar</button>
                    <button>Excluir</button>
                    <button>Ajustar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao buscar dados do estoque:', error);
    }
};

// Atualiza os dados do estoque a cada 5 segundos
setInterval(fetchStockData, 5000);

// Chamada inicial para carregar os dados ao abrir a página
fetchStockData();