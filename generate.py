import os
import jinja2


BASE_URL = "https://njanakiev.github.io/slides/"

if __name__ == '__main__':
    folders = [f for f in os.listdir("./") 
        if os.path.isdir(f) and not f.startswith(".")]

    template_file = "index.html.j2"
    template_loader = jinja2.FileSystemLoader(searchpath="./")
    template_env = jinja2.Environment(loader=template_loader)
    template = template_env.get_template( template_file )

    rendered_text = template.render({
        'items': folders,
        'base_url': BASE_URL
    })

    with open("index.html", "wt") as f:
        f.write(rendered_text)