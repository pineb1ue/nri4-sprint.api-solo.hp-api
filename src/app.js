/* eslint-disable no-undef */
const URI = 'http://localhost:3000/characters'

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
    addFormButton.addEventListener('click', () => showForm(addCharacterForm))
    updateForm.addEventListener('click', () => showForm(updateCharacterForm))
    deleteForm.addEventListener('click', () => showForm(deleteCharacterForm))

    updateCharacterButton.addEventListener('click', updateCharacter)
    addCharacterButton.addEventListener('click', addCharacter)
    deleteCharacterButton.addEventListener('click', deleteCharacter)

    async function getAllCharacters() {
        try {
            const response = await fetch(URI)
            const characters = await response.json()
            renderCharacters(characters)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    async function addCharacter() {
        const name = document.getElementById('name').value
        const house = document.getElementById('house').value
        const image = document.getElementById('image').value

        try {
            const response = await fetch(URI, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
    }

    async function updateCharacter() {
        const updateId = document.getElementById('updateId').value
        const updateName = document.getElementById('updateName').value
        const updateHouse = document.getElementById('updateHouse').value
        const updateImage = document.getElementById('updateImage').value

        const updatedData = { name: updateName, house: updateHouse, image: updateImage }

        try {
            const response = await fetch(`${URI}/${updateId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
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
    }

    async function deleteCharacter() {
        const deleteId = document.getElementById('deleteId').value

        try {
            const response = await fetch(`${URI}/${deleteId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            })

            if (response.ok) {
                getAllCharacters()
            } else {
                console.error('Failed to delete character')
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    function showForm(formElement) {
        addCharacterForm.style.display = 'none'
        updateCharacterForm.style.display = 'none'
        deleteCharacterForm.style.display = 'none'

        formElement.style.display = 'block'
    }

    function renderCharacters(characters) {
        characterListElement.innerHTML = ''

        characters.items.forEach((character) => {
            const row = document.createElement('tr')

            const idCell = createTableCell(character.id)
            const imageCell = createImageTableCell(character.image, character.name)
            const nameCell = createTableCell(character.name)
            const houseCell = createTableCell(character.house)

            row.appendChild(idCell)
            row.appendChild(imageCell)
            row.appendChild(nameCell)
            row.appendChild(houseCell)

            characterListElement.appendChild(row)
        })
    }

    function createTableCell(text) {
        const cell = document.createElement('td')
        cell.textContent = text
        return cell
    }

    function createImageTableCell(imageUrl, altText) {
        const cell = document.createElement('td')
        const image = document.createElement('img')
        if (isValidImageUrl(imageUrl)) {
            image.src = imageUrl
            image.alt = altText
        }
        image.style.width = '70px'
        cell.appendChild(image)
        return cell
    }
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
