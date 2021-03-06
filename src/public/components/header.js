
const Anchor = (name, selectedRover, extraClasses) => {
  const anchorClass = name === selectedRover ? `bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium` : `text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`

  return `
    <a href="#${name}" class="${anchorClass} ${extraClasses}" onclick="onSelectRover('#${name}')">${name}</a>
  `
}

export const Header = ({roverNames, selectedRover, isMobileMenuOpen}) => {

  return `
    <header>
      <nav class="bg-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center">
              <div class="flex-shrink-0 text-white font-medium">
                MARS Dashboard
              </div>
              <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-4">

                  ${roverNames.map((name) => {
                    return `
                    ${Anchor(name, selectedRover, null)}
                    `
                  }).join('')}

                </div>
              </div>
            </div>

            <div class="-mr-2 flex md:hidden">
              <!-- Mobile menu button -->
              <button id="mobileToggleBtn" class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" onclick="toggleMobileMenu(${isMobileMenuOpen})">
                <span class="sr-only">Open main menu</span>
                <!--
                  Heroicon name: menu

                  Menu open: "hidden", Menu closed: "block"
                -->
                <svg class="${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <!--
                  Heroicon name: x

                  Menu open: "block", Menu closed: "hidden"
                -->
                <svg class="${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!--
          Mobile menu, toggle classes based on menu state.

          Open: "block", closed: "hidden"
        -->
        <div class="${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            ${roverNames.map((name) => {
              return `
              ${Anchor(name, selectedRover, 'block')}
              `
            }).join('')}
          </div>
        </div>
      </nav>
    </header>
  `
}