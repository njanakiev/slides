jupyter-nbconvert --to slides slides.ipynb --reveal-prefix=reveal
mv slides.slides.html index.html

sed -i 's/<title>slides slides<\/title>/<title>Data Science with OpenStreetMap and Wikidata - Nikolai Janakiev<\/title>/g' index.html
