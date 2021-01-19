import { set } from 'immutable'
import { Header } from './components/header'
import { RoverStats } from './components/roverStats'

const rovers = ['Curiosity', 'Opportunity', 'Spirit']

let initialHover = 'Curiosity'

if (window.location.hash.length && rovers.includes(window.location.hash.substr(1))) {
  initialHover = window.location.hash.substr(1)
}

let store = {
  isMobileMenuOpen: false,
  apod: '',
  roverNames: rovers,
  rovers: {},
  selectedRover: initialHover,
  photos: {},
}

// add our markup to the page
const root = document.getElementById('root')

const onSelectRover = href => {
  const hover = href.substr(1)
  updateStore(store, { selectedRover: hover })
}

const toggleMobileMenu = (bool) => {
  updateStore(store, { isMobileMenuOpen: !bool })
}

window.onSelectRover = onSelectRover
window.toggleMobileMenu = toggleMobileMenu

const updateStore = (store, newState) => {
  store = Object.assign(store, newState)
  render(root, store)
}

const render = async (root, state) => {
  root.innerHTML = App(state)
}

// create content
const App = (state) => {
  console.log(state);
  return `
    <div>
      ${Header(state)}
      <main>
        ${RoverStats(state, fetchRoverData, fetchRoverPhotos)}
      </main>
      <footer class="max-w-7xl my-6 mx-6 xl:mx-auto">
        <h6 class="text-xs text-gray-500 text-center">
          Udacity project brought by <strong>Rodrigo Passos</strong> /
          <a href="https://api.nasa.gov/">NASA API</a>.
        </h6>
      </footer>
    </div>
  `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
  render(root, store)
})



// ------------------------------------------------------  API CALLS
const fetchRoverData = (rover_name) => {
  fetch(`http://localhost:3000/rovers/${rover_name}`)
  .then(res => res.json())
  .then(({ photo_manifest }) => updateStore(store, {
    rovers: set(store.rovers, rover_name, {
      ...store.rovers[rover_name],
      ...photo_manifest
    })
  }))
}

const fetchRoverPhotos = (rover_name) => {
  fetch(`http://localhost:3000/rover_photos/${rover_name}`)
  .then(res => res.json())
  .then(({ latest_photos }) => { updateStore(store, {
    photos: {
      ...store.photos,
      [rover_name]: [...latest_photos],
    }
  })})
}
