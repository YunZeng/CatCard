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

The generated image will be stored in `img/` foloder.

### Pass environment variables

CAT_GREETING (for `greeting`), CAT_WHO (for `who`), CAT_WIDTH (for `width`), CAT_HEIGHT (for `height`), CAT_COLOR (for `color`), CAT_SIZE (for `size`)

E.g.

```bash
CAT_GREETING=Hi CAT_SIZE=200 npm run start
```

## Improvements of initial code

- Use `axios` for api calls instead of `request`, because `request` package has been deprecated.
- Modulize api calls in an `axios instance` for reusablity.
- Use `environment variables` instead of `argv`, so that the params have not to be passed in order.
