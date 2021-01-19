export const Gallery = (photos) => {
  return `
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      ${photos.map( photo => (`
        <article class="overflow-hidden rounded-lg shadow-lg">
          <a href="${photo.img_src}" target="_blank">
            <img alt="Placeholder" class="block h-auto w-full" src="${photo.img_src}">
          </a>
          <footer class="flex items-center justify-between leading-none p-2 md:p-4">
            <dl>
              <dt class="text-sm font-medium text-gray-500">Camera</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${photo.camera.full_name}</dd>
            </dl>
          </footer>
        </article>
      `)).join('')}
    </div>
  `
}