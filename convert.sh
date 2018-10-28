#!/bin/bash

# Converts Scss to Css

cp -rf ./src/scss ./src/css;
for i in ./src/css/**/*.scss
do
  mv -- "$i" "${i/%.scss/.css}"
  mv -- "$i" "${i#_}"
done

# Converts Css to Scss

# cp -r ./src/css ./src/scss;
# for i in ./src/scss/**/*.css
# do
#   mv -- "$i" "${i/%.css/.scss}"
#   mv -- "$i" "_${i}"
# done
