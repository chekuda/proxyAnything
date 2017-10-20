
# CHEKUDA PROXY SERVER WITH EXPRESS

I have created this repo in order to test local files in live websites.
With this we can test also remote devices like ipad, android, ipod.

# How you use?
  First make sure you have node and npm installed in your computer

  - git clone (this repo)
  - Go to the repo folder and type `npm i` in your terminal
  - Set up the server
  - `npm run start`

# How to set up the chekuda-proxy-server?

  - Go to server.js file
  - In the magicObject
    - Add the regex to match the file you want to be replaced. ie: 'remotefile\.min\.js'
    - Add the relative path of that file. ie: '/public/localfile.js'
    - You can add as many object as you want to serve different files
  - Set your host file with ip address ie: `192.168.x.xx chekuda.com`
    - Help: In Mac type `sudo nano /etc/hosts`
  - Proxy your mobile/Ipad/laptop device by going to wifi settings. Use your IP address(type ifconfig in console) and the port displayed in console after run `npm run start`.
  - Go to your browser and navigate to any url ie: `http://chekuda.com`
  - Check the console and see if your file has been replaced.
  Note: `>>>>>>>FILE REPLACED should be displayed in the console if file has been replaces`
  - Debug it

  ### Tips
    - As the urls are caching by the browser:
      - Use incognito window
      - Clean your cache.