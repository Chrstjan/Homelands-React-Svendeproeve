#!/bin/bash
#Ensures that the react project is made before installing
if [ ! -d "src"]; then
echo "Error src folder not found. Exiting..."
exit 1
fi

npm install sass react-router-dom react-icons @tanstack/react-query react-hook-form
cd src || exit
#Create sub folders
mkdir components pages styles layouts context hooks router

#Removes index.css and makes app to scss
rm index.css

mv app.css app.scss

#Resets app.scss
cat > app.scss <<EOF
html {scroll-behavior: smooth; box-sizing: border-box;}
body {margin: 0 auto; padding: 0; font-family: sans-serif;}
EOF

#Changes the app.scss import and removes index.css import
sed -i '4s/.*/import ".\/app.scss"/' App.jsx
sed -i '3d' main.jsx

#Creates scss files
cd styles

touch _mixins.scss _variables.scss _placeholders.scss

echo "React Project ready, Happy coding! :)"