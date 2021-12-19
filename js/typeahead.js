/* globals zlFetch */
export default function Typeahead (typeaheadElement) {
  const input = typeaheadElement.querySelector('input')
  const ul = typeaheadElement.querySelector('ul')
  let userEnteredValue = ''
  let countries = []

  const state = {
    matches: [],
    highlightedItem: -1
  }

  const typeahead = {
    get inputValue () {
      return input.value.trim().toLowerCase()
    },

    hide () {
      ul.setAttribute('hidden', true)
    },

    show () {
      ul.innerHTML = state.matches.join('')
      ul.removeAttribute('hidden')
    },

    boldSearchTerms (string, searchTerms) {
      const length = searchTerms.length
      const toBold = string.substring(0, length)
      const restOfString = string.substring(length)
      return `<strong>${toBold}</strong>${restOfString}`
    },

    highlightItem (highlightIndex) {
      state.highlightedItem = highlightIndex
      if (highlightIndex === -1) return

      const element = ul.children[highlightIndex]
      element.classList.add('is-highlighted')
      input.value = element.querySelector('span').textContent
    },

    handleInput (event) {
      if (!typeahead.inputValue) return typeahead.hide()

      // Finds a list of matched countries
      const matches = countries.filter(country => {
        const name = country.name.toLowerCase()
        return name.startsWith(typeahead.inputValue)
      })

      // Creates the innerHTML
      const listItems = matches.map(country => {
        return `<li>
          <img src="${country.flag}" alt="${country.name}'s flags" />
          <span>${typeahead.boldSearchTerms(
            country.name,
            typeahead.inputValue
          )}</span>
        </li>`
      })

      // Shows list
      state.matches = listItems
      state.highlightedItem = -1
      typeahead.show()
    },

    handleListItemClick (event) {
      const prediction = event.target.closest('li')
      if (!prediction) return

      const countryName = prediction.querySelector('span').textContent
      input.value = countryName

      state.highlightedItem = -1
      typeahead.hide()
    },

    handleClickOutsideTypeahead (event) {
      if (!event.target.closest('.typeahead')) {
        typeahead.hide()
      }
    },

    handleUpDownArrows (event) {
      const { key } = event
      if (key !== 'ArrowDown' && key !== 'ArrowUp') return
      if (state.matches.length === 0) return
      event.preventDefault()
      ;[...ul.children].forEach(el => {
        el.classList.remove('is-highlighted')
      })

      if (state.highlightedItem === -1) {
        userEnteredValue = input.value.trim()
        if (key === 'ArrowDown') {
          typeahead.highlightItem(0)
        }

        if (key === 'ArrowUp') {
          typeahead.highlightItem(state.matches.length - 1)
        }

        return
      }

      if (
        state.highlightedItem === state.matches.length - 1 &&
        key === 'ArrowDown'
      ) {
        typeahead.highlightItem(-1)
        input.value = userEnteredValue
        return
      }

      if (state.highlightedItem === 0 && key === 'ArrowUp') {
        typeahead.highlightItem(-1)
        input.value = userEnteredValue
        return
      }

      if (key === 'ArrowDown') {
        typeahead.highlightItem(state.highlightedItem + 1)
        return
      }

      if (key === 'ArrowUp') {
        typeahead.highlightItem(state.highlightedItem - 1)
      }
    },

    handleTabKey (event) {
      if (event.key !== 'Tab') return
      typeahead.hide()
    },

    get isListOpen () {
      return !ul.hasAttribute('hidden')
    },

    handleEnterKey (event) {
      if (event.key !== 'Enter') return
      if (typeahead.isListOpen) event.preventDefault()
      state.highlightedItem = -1
      typeahead.hide()
    },

    handleEscapeKey (event) {
      if (event.key !== 'Escape') return
      typeahead.hide()
      input.value = userEnteredValue
      state.highlightedItem = -1
    }
  }

  // Execution
  zlFetch('https://restcountries.com/v2/all?fields=name,flag')
    .then(response => {
      countries = response.body
    })
    .catch(error => console.log(error))

  // Event Listeners
  document.addEventListener('click', typeahead.handleClickOutsideTypeahead)
  ul.addEventListener('click', typeahead.handleListItemClick)
  input.addEventListener('input', typeahead.handleInput)
  input.addEventListener('keydown', typeahead.handleUpDownArrows)
  input.addEventListener('keydown', typeahead.handleTabKey)
  input.addEventListener('keydown', typeahead.handleEnterKey)
  input.addEventListener('keydown', typeahead.handleEscapeKey)
}
