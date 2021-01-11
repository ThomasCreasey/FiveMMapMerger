const fs = require('fs');

const folder = './maps'

try {
    fs.readdirSync(folder)
}
catch {
    return console.log('No maps folder, please create a folder named maps and try again')
}

if(!fs.existsSync('./merged')) {
    fs.mkdirSync('./merged');
    if(!fs.existsSync('./merged/stream')) {
        fs.mkdirSync('./merged/stream');
    };
};

const all = fs.readdirSync(folder)

var i;

for(i=0; i < all.length; i++ ) {
    const alllocal = fs.readdirSync(`${folder}/${all[i]}`)

    var e;

    for(e=0; e < alllocal.length; e++ ) {
        if(alllocal[e] === 'stream') {
            const streamfolder = fs.readdirSync(`${folder}/${all[i]}/${alllocal[e]}`)
            
            var l;
            for(l=0; l < streamfolder.length; l++) {
                fs.copyFileSync(`${folder}/${all[i]}/${alllocal[e]}/${streamfolder[l]}`, `./merged/stream/${streamfolder[l]}`)
                console.log(`Successfully merged ${streamfolder[l]}`)
            };

        };
    }
}

fs.copyFileSync(`./assets/fxmanifest.lua`, `./merged/fxmanifest.lua`)

console.log('Finished, you can close this now!')
