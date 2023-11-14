/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', () => {
    const characterListElement = document.getElementById('characterList')
    const loadCharactersButton = document.getElementById('loadCharacters')
    const openFormButton = document.getElementById('openForm')
    const characterForm = document.getElementById('characterForm')
    const addCharacterButton = document.getElementById('addCharacter')

    loadCharactersButton.addEventListener('click', getAllCharacters)
    openFormButton.addEventListener('click', () => {
        characterForm.style.display = 'block'
    })

    addCharacterButton.addEventListener('click', async () => {
        const name = document.getElementById('name').value
        const house = document.getElementById('house').value
        const image = document.getElementById('image').value

        try {
            const response = await fetch('http://localhost:3000/characters', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, house, image }),
            })

            if (response.ok) {
                getAllCharacters()
                characterForm.style.display = 'none'
            } else {
                console.error('Failed to add character')
            }
        } catch (error) {
            console.error('Error:', error)
        }
    })

    async function getAllCharacters() {
        try {
            const response = await fetch('http://localhost:3000/characters')
            const characters = await response.json()

            characterListElement.innerHTML = ''

            characters.items.forEach((character) => {
                const row = document.createElement('tr')

                const idCell = document.createElement('td')
                idCell.textContent = character.id

                const imageCell = document.createElement('td')
                const image = document.createElement('img')

                if (isValidImageUrl(character.image)) {
                    image.src = character.image
                    image.alt = character.name
                }
                image.style.width = '70px'

                imageCell.appendChild(image)

                const nameCell = document.createElement('td')
                nameCell.textContent = character.name

                const houseCell = document.createElement('td')
                houseCell.textContent = character.house

                row.appendChild(idCell)
                row.appendChild(imageCell)
                row.appendChild(nameCell)
                row.appendChild(houseCell)

                characterListElement.appendChild(row)
            })
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    loadCharactersButton.addEventListener('click', getAllCharacters)
})

function isValidImageUrl(url) {
    try {
        new URL(url)
        return true
        // eslint-disable-next-line no-unused-vars
    } catch (error) {
        return false
    }
}
