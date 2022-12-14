import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video, input {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  /* font: inherit; */
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
@font-face {
  font-family: 'inter';
  src: url('../assets/fonts/inter.ttf') format('truetype');
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-weight: 300;
  font-family: 'Source Sans Pro', sans-serif;
  color:black;
  line-height: 1.2;
}
a {
  text-decoration:none;
  color:inherit;
}
button {
  border: none;
  background-color: transparent;
  cursor: pointer;
}

input, select {
  border-bottom: 2px solid ${theme.inputColor};
  font-weight: 900;
  font-size: 0.8rem;
  height: 4vh;
  font-family: 'inter';
}

input:focus, select:focus {
  outline: none;
}

input, select {
  border-bottom: 2px solid #808080;
  font-weight: 900;
  font-size: 0.8rem;
  height: 4vh;
  font-family: 'inter';
}

input, select {
  border-bottom: 2px solid #808080;
  font-weight: 900;
  font-size: 0.8rem;
  height: 4vh;
  font-family: 'inter';
}

input:focus, select:focus {
  outline: none;
}

`;

export default GlobalStyle;
