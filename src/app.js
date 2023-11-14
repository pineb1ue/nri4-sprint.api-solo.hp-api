/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', () => {
    const characterListElement = document.getElementById('characterList')
    const getFormButton = document.getElementById('getForm')

    const addFormButton = document.getElementById('addForm')
    const addCharacterForm = document.getElementById('addCharacterForm')
    const addCharacterButton = document.getElementById('addCharacter')

    const updateForm = document.getElementById('updateForm')
    const updateCharacterForm = document.getElementById('updateCharacterForm')
    const updateCharacterButton = document.getElementById('updateCharacter')

    const deleteForm = document.getElementById('deleteForm')
    const deleteCharacterForm = document.getElementById('deleteCharacterForm')
    const deleteCharacterButton = document.getElementById('deleteCharacter')

    getFormButton.addEventListener('click', getAllCharacters)
    addFormButton.addEventListener('click', () => {
        addCharacterForm.style.display = 'block'
        updateCharacterForm.style.display = 'none'
        deleteCharacterForm.style.display = 'none'
    })
    updateForm.addEventListener('click', () => {
        addCharacterForm.style.display = 'none'
        updateCharacterForm.style.display = 'block'
        deleteCharacterForm.style.display = 'none'
    })
    deleteForm.addEventListener('click', () => {
        addCharacterForm.style.display = 'none'
        updateCharacterForm.style.display = 'none'
        deleteCharacterForm.style.display = 'block'
    })

    deleteCharacterButton.addEventListener('click', async () => {
        const deleteId = document.getElementById('deleteId').value

        try {
            const response = await fetch(`http://localhost:3000/characters/${deleteId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (response.ok) {
                getAllCharacters()
            } else {
                console.error('Failed to delete character')
            }
        } catch (error) {
            console.error('Error:', error)
        }
    })

    updateCharacterButton.addEventListener('click', async () => {
        const updateId = document.getElementById('updateId').value
        const updateName = document.getElementById('updateName').value
        const updateHouse = document.getElementById('updateHouse').value
        const updateImage = document.getElementById('updateImage').value

        const updatedData = {
            name: updateName,
            house: updateHouse,
            image: updateImage,
        }

        try {
            const response = await fetch(`http://localhost:3000/characters/${updateId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            })

            if (response.ok) {
                getAllCharacters()
            } else {
                console.error('Failed to update character')
            }
        } catch (error) {
            console.error('Error:', error)
        }
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
                addCharacterForm.style.display = 'none'
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

    getFormButton.addEventListener('click', getAllCharacters)
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
