import { LoadSpinner } from './loadSpinner'
import { Gallery } from './gallery'

const formatDate = (date) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dateArr = date.split('-')
  const year = dateArr[0]
  const month = months[Number(dateArr[1])-1]
  const day = dateArr[2]
  return `${month} ${day}, ${year}`
}

export const RoverStats = (
  {rovers, selectedRover, photos},
  fetchRoverData,
  fetchRoverPhotos
) => {

  const rover = Object.keys(rovers).find(key => key === selectedRover)

  if (!rover) {
    fetchRoverData(selectedRover)
    fetchRoverPhotos(selectedRover)
  }

  const roverToDisplay = rovers[selectedRover];
  const roverPhotos = photos[selectedRover]

  if(roverToDisplay) {

    return `
      <div class="max-w-7xl sm:m-6 xl:mx-auto">
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h2 class="text-2xl leading-6 font-medium text-gray-900">
            ${selectedRover}
            </h2>
          </div>
          <div class="border-t border-gray-200">
            <dl>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                  Launch Date
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  ${formatDate(roverToDisplay.launch_date)}
                </dd>
              </div>
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                  Landing Date
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  ${formatDate(roverToDisplay.landing_date)}
                </dd>
              </div>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                  Status
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  ${roverToDisplay.status.toUpperCase()}
                </dd>
              </div>
            </dl>
          </div>

          <div class="px-4 py-5 sm:px-6">
            <h4 class="text-md leading-6 font-medium text-gray-900">
              Photos
            </h4>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Check out some of ${roverToDisplay.name}'s most recent photos. The following photos were taken on ${formatDate(roverToDisplay.max_date)}.
            </p>
          </div>

          <div class="m-4">
            ${Gallery(roverPhotos)}
          </div>

        </div>
      </div>
    `
  }

  return LoadSpinner()
}