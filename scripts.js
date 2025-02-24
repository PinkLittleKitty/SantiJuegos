// Game database
const retroGames = {
    'nes': {
        displayName: 'Nintendo Entertainment System',
        games: {
            'tetris': {
                title: 'Tetris',
                art: 'retro/boxart/nes/tetris.png',
                rom: 'retro/roms/nes/tetris.nes'
            }
        }
    },
    'snes': {
        displayName: 'Super Nintendo Entertainment System',
        games: {
            'super-mario-world': {
                title: 'Super Mario World',
                art: 'retro/boxart/snes/super-mario-world.jpg',
                rom: 'retro/roms/snes/super-mario-world.sfc'
            }
        }
    },
    'gba': {
        displayName: 'Game Boy Advance',
        games: {
            'pokemon-fire-red': {
                title: 'Pokémon Rojo Fuego',
                art: 'retro/boxart/gba/pokemon-fire-red.jpg',
                rom: 'retro/roms/gba/pokemon-fire-red.gba'
            }
        }
    },
};

// Core functions
function generateGameCards() {
    const gameGrid = document.querySelector('.game-grid');
    gameGrid.innerHTML = '';

    Object.entries(retroGames).forEach(([system, systemData]) => {
        Object.entries(systemData.games).forEach(([gameId, gameData]) => {
            const card = document.createElement('div');
            card.className = 'game-card';
            card.dataset.system = system;
            card.style.backgroundImage = `url(${gameData.art})`;
            
            card.innerHTML = `
                <span class="game-console-badge">${systemData.displayName}</span>
                <h3>${gameData.title}</h3>
                <button class="play-button" onclick="loadGame('${system}_${gameId}')">Jugar!</button>
            `;
            
            gameGrid.appendChild(card);
        });
    });
}

function loadGame(gameId) {
    const [system, game] = gameId.split('_');
    if (retroGames[system]?.games[game]) {
        const gameData = retroGames[system].games[game];
        const emulatorUrl = `/SantiJuegos/emulator/index.html?core=${system}&rom=/SantiJuegos/${gameData.rom}`;
        
        const modal = document.getElementById('gameModal');
        const gameFrame = document.getElementById('gameFrame');
        gameFrame.src = emulatorUrl;
        modal.style.display = 'block';
    }
}
function filterGames() {
    const searchTerm = document.getElementById('searchGames').value.toLowerCase();
    const system = document.getElementById('categoryFilter').value;
    const games = document.querySelectorAll('.game-card');

    games.forEach(game => {
        const gameTitle = game.querySelector('h3').textContent.toLowerCase();
        const gameSystem = game.dataset.system;
        const matchesSearch = gameTitle.includes(searchTerm);
        const matchesSystem = system === 'all' || gameSystem === system;
        
        game.style.display = matchesSearch && matchesSystem ? 'block' : 'none';
    });
}

function closeGame() {
    const modal = document.getElementById('gameModal');
    const gameFrame = document.getElementById('gameFrame');
    modal.style.display = 'none';
    gameFrame.src = '';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', generateGameCards);
document.getElementById('searchGames').addEventListener('input', filterGames);
document.getElementById('categoryFilter').addEventListener('change', filterGames);
window.onclick = function(event) {
    const modal = document.getElementById('gameModal');
    if (event.target == modal) {
        closeGame();
    }
};
