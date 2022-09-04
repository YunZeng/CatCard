# CatCard

Cat Card Application

## Pre-requirements

node v16.16.0

npm v8.11.0

## To run

```bash
npm install
npm run start
```

The generated image will be stored in `img/` folder.

### Pass environment variables

CAT_GREETING (The text to be shown on the first image, e.g. `Hello`)
CAT_WHO (The text to be shown on the second image, e.g. `You`)
CAT_WIDTH (Image width for a single image, e.g. `400`)
CAT_HEIGHT (Image height for a single image, e.g. `500`)
CAT_COLOR (Color of the text, e.g. `Pink`)
CAT_SIZE (Size of the text, e.g. `100`)
CAT_DIRECTION (Directin how the images will be joined, e.g. `vertical|horizontal`)

E.g.

```bash
CAT_GREETING=Hi CAT_SIZE=200 CAT_DIRECTION=horizontal npm run start
```

## Improvements of initial code

- Use `axios` for api calls instead of `request`, because `request` package has been deprecated.
- Modulize api calls in an `axios instance` for reusablity.
- Use `environment variables` instead of `argv`, so that the params have not to be passed in order.
- User `join-images` package (which is said to be faster) instead of `merge-img`

### Potential improvements

Use `stream` instead of `buffer` to read and write data.
I tried but have not successfully concat two readable streams and pipe into one writable stream.
