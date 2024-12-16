import typescript from 'rollup-plugin-typescript2';

import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';

export default {
    input: 'src/index.ts',
    output: {
        file: 'dist/index.js',
        format: 'umd',
        name: 'YoovPlusFormRender'
    },
    plugins: [
        typescript(),
        postcss({
            extensions: ['.css', '.scss'], // Handle CSS and SCSS
            extract: 'css/style.min.css', // Specify the custom CSS file name
            minimize: true,                // Minimize the CSS
            plugins: [cssnano()],          // Use cssnano for minification
            use: [
                ['sass', { includePaths: ['./src/css'] }] // Enable SCSS compilation
            ]
        })
    ],
};