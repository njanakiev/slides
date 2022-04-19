jupyter-nbconvert --to slides presentation.ipynb --reveal-prefix=../reveal.js
mv presentation.slides.html index.html
sed -i 's#<title>presentation slides</title>#<title>Scalable Geospatial Data Science</title>#g' \
  index.html
