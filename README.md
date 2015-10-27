## Install

```
git clone https://github.com/neurotech/rosebank-canvas.git
cd rosebank-canvas
npm i
```

Ensure you have your environment variables set accordingly:

```
export ROSEBANK_CANVAS_BUCKET="bucket-name"
export ROSEBANK_CANVAS_ACCESSKEYID="number"
export ROSEBANK_CANVAS_SECRETACCESSKEY="secret"
```

## Scripts

### dev

**`npm run dev`**

Uses `nodemon` to watch `./src/` for any changes and re-runs `build.js` accordingly.

### build

**`npm run build`**

Builds assets found in `./src/` to `./build/`

### sync

**`npm run sync`**

Copies assets found in `./build/` to your S3 bucket.

### deploy

**`npm run deploy`**

Executes the previous steps in sequential order.