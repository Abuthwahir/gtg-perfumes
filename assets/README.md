# GTG Perfumes Asset Export Guide

The assignment asks for images exported from Figma instead of third-party URLs.
Use this folder for every final image before you submit the project.

## How to export from Figma

1. Open the Figma file and inspect the design section by section.
2. Select the image layer, frame, or component you need.
3. In the right sidebar, open the `Export` section.
4. Click `+`, choose the format, and export it.
5. Save the file into this `assets/` folder using clear names.

Recommended formats:

- Use `PNG` for product shots, thumbnails, and mocked photos.
- Use `JPG` only for large photographic sections when file size matters.
- Use `SVG` for icons, logos, and simple vector artwork.

If an image is inside a mask:

1. Select the masked frame or the parent group.
2. Export the whole visible frame instead of the hidden source image.

## Suggested file naming

These names fit the current HTML structure and make replacement easy:

- `hero-bottle.png`
- `product-main-01.png` to `product-main-08.png`
- `thumb-01.png` to `thumb-08.png`
- `fragrance-original.png`
- `fragrance-lily.png`
- `fragrance-rose.png`
- `collection-photo.jpg`
- `comparison-gtg.png`
- `comparison-arose.png`
- `comparison-bella.png`
- `comparison-daisies.png`

## After exporting

Replace the temporary image URLs in `index.html` with local paths such as:

```html
<img src="assets/hero-bottle.png" alt="GTG Perfume Bottle" />
```

For the final submission, every product and brand image should come from `assets/`.
