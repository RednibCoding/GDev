import eel

# Set web files folder and optionally specify which file types to check for eel.expose()
#   *Default allowed_extensions are: ['.js', '.html', '.txt', '.htm', '.xhtml']
eel.init("web", allowed_extensions=['.js', '.html'])

eel.start("editor.html")             # Start (this blocks and enters loop)
