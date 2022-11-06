const path = require('path')
const { defineConfig } = require('vite')

console.log(path);

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/main.ts'),
      name: 'zipimage',
      fileName: (format) => `main.${format}.js`
    }
  }
});