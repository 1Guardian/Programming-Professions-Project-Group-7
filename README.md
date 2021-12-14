# Programming-Professions-Project-Group-7
This is a dart-exploratory Project for the Programming Professions.


# Requirements for building
  Node.JS: 
    https://nodejs.org/en/download/ (*NIX, Linux, And Windows)

  NPM:
    https://nodejs.org/en/download/ (*NIX, Linux, And Windows)

  Electron:
    chocolatey install electron (win 10/11/server2016-2022)
    npm install -g electron (*NIX systems && windows)
    snap install electron (Snap-configured Linux systems)
    or download it from https://www.electronjs.org/ (windows only)
    
    NOTE: ON WINDOWS THE PATH ENV VARIABLES SOMETIMES DO NOT GET SET. 
          IF YOU INSTALL NODEJS AND 'npm' IS NOT RECOGNIZED AS A COMMAND,
          YOU MAY NEED TO GET THE ENVIRONMENTAL VARIABLE FOR NODEJS MANUALLY.
          
# Known Quirks
  MACOS:
      On OSX, there is a weird behavior with the font. It seems that Mac OS overrides the "marker" font that makes up most of the font used in the app. Changing the font name does not fix this, I believe it has something to do with how MacOS renders font in safari (since this uses a chromium webkit backend). The app is functionally fine, the font that is used is just not the one that is intended, or the one that is used in Windows, Linux, or any other version of Unix (BSD etc).
      
# Build Process
  Step 1:
    clone this repo (git clone) or download it as a zip
    
  Step 2:
    navigate into directory and then navigate into 'CS4500 Project'
    
  Step 3:
    Run: npm install
   
  Step 4:
    Run:  npm install electron-builder --save-dev
    
  Step 5 (Windows Users):
    npm run dist-win
    
  Step 5 (Linux and MacOS Users):
    npm run dist-nix
    
 That's it, you should now have system binaries in a folder called ./dist
 
 
Prebuilt binaries are provided (of course) as revisions are made and pushed

NOTE: 
If you are using windows:
You can either run the installer (I don't recommend since this is ALPHA software.), or you can simply go into the win-unpacked section and
run the executable in there (I recommend this)
