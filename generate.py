import os
import jinja2


if __name__ == '__main__':
    folders = [f for f in os.listdir("./") 
        if os.path.isdir(f) and not f.startswith(".") and not (f == "reveal.js")]

    template_file = "index.html.j2"
    template_loader = jinja2.FileSystemLoader(searchpath="./")
    template_env = jinja2.Environment(loader=template_loader)
    template = template_env.get_template( template_file )

    rendered_text = template.render({
        'items': folders
    })

    with open("index.html", "wt") as f:
        f.write(rendered_text)
