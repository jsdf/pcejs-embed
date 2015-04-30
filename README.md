# pcejs-embed

## instructions

```bash
# build app JS bundles
npm install
npm run build

# install emulator files and default system disk image
cd lib/
curl -O http://jamesfriend.com.au/pce-js/dist/macplus-system.zip
unzip macplus-system.zip

# grab the extension rom file from the npm package
cp ../node_modules/pcejs-macplus/macplus-pcex.rom ./macplus-pcex.rom

# serve up the lib/ directory
npm install -g http-server
http-server ./ # lib/
open http://localhost:8080/editor.html
```

Add some disk images:
![PCEJS embed editor](http://i.imgur.com/CgyiFyV.png)

Use generated Embed Url to add emulator with disk images to your website. For example:

```html
<iframe src="http://localhost:8080/embed.html?hard_disks%5B0%5D=%2Fhd1.qed&amp;floppy_disks%5B0%5D=%2FNumberMunchers.img">
</iframe>
```

Enjoy

![PCEJS emulator embed](http://i.imgur.com/d6lXlmv.png)
