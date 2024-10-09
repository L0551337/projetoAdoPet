document.addEventListener('DOMContentLoaded', () => {
    const animalList = document.getElementById('animal-list');
    const animalForm = document.getElementById('animal-form');

    
    const loadAnimals = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/animais');
            const animals = await response.json();
            animalList.innerHTML = ''; 

            animals.forEach(animal => {
                const animalCard = document.createElement('div');
                animalCard.className = 'animal-card';
                animalCard.innerHTML = `
                    <img src="${animal.imagem}" alt="${animal.nome}" width="150">
                    <h3>${animal.nome}</h3>
                    <p>Idade: ${animal.idade}</p>
                    <p>Tipo: ${animal.tipo}</p>
                `;
                animalList.appendChild(animalCard);
            });
        } catch (error) {
            console.error('Erro ao carregar animais:', error);
        }
    };

    
    animalForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        const idade = document.getElementById('idade').value;
        const tipo = document.getElementById('tipo').value;
        const imagem = document.getElementById('imagem').value;

        try {
            const response = await fetch('http://localhost:3000/api/animais', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, idade, tipo, imagem }),
            });

            if (response.ok) {
                loadAnimals(); 
                animalForm.reset(); 
            } else {
                console.error('Erro ao cadastrar animal:', await response.text());
            }
        } catch (error) {
            console.error('Erro ao cadastrar animal:', error);
        }
    });

    loadAnimals(); 
});
