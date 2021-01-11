const fs = require('fs');

const folder = './maps'

try {
    fs.readdirSync(folder, (err) => {
        if(err) console.log(err);
    });
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

const all = fs.readdirSync(folder, (err) => {
    if(err) console.log(err);
});

var i;

for(i=0; i < all.length; i++ ) {
    const alllocal = fs.readdirSync(`${folder}/${all[i]}`, (err) => {
        if(err) console.log(err);
    });

    var e;

    for(e=0; e < alllocal.length; e++ ) {
        if(alllocal[e] === 'stream') {
            const streamfolder = fs.readdirSync(`${folder}/${all[i]}/${alllocal[e]}`, (err) => {
                if(err) console.log(err);
            });
            
            var l;
            for(l=0; l < streamfolder.length; l++) {
                fs.copyFileSync(`${folder}/${all[i]}/${alllocal[e]}/${streamfolder[l]}`, `./merged/stream/${streamfolder[l]}`, (err) => {
                    if(err) throw err;
                });
                console.log(`Successfully merged ${streamfolder[l]}`)
            };

        };
    }
}

fs.copyFileSync(`./assets/fxmanifest.lua`, `./merged/fxmanifest.lua`, (err) => {
    if(err) throw err;
});

console.log('Finished, you can close this now!')
