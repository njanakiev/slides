set -e

echo $1 $2
cd $1

# reveal_theme: https://revealjs.com/themes/
# --SlidesExporter.theme=light \
# reveal_transition: none, fade, slide, convex, concave, zoom


jupyter-nbconvert \
  --to slides slides.ipynb \
  --SlidesExporter.reveal_theme=simple \
  --SlidesExporter.reveal_transition=slide \
  --reveal-prefix="../reveal.js"

mv slides.slides.html index.html

sed -i "s#<title>slides slides</title>#<title>${2}</title>#g" \
  index.html
