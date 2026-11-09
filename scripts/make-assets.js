const sharp=require('sharp'),fs=require('fs');
(async()=>{
 fs.mkdirSync('assets',{recursive:true});
 const bg=fs.readFileSync('branding/logo-bg.svg'),fg=fs.readFileSync('branding/logo-fg.svg');
 await sharp(bg).resize(1024,1024).png().toFile('assets/icon-background.png');
 await sharp(fg).resize(1024,1024).png().toFile('assets/icon-foreground.png');
 const fgb=await sharp(fg).resize(1024,1024).png().toBuffer();
 await sharp(bg).resize(1024,1024).composite([{input:fgb}]).png().toFile('assets/icon-only.png');
 const mask=Buffer.from('<svg width="900" height="900"><circle cx="450" cy="450" r="450"/></svg>');
 const logo=await sharp('assets/icon-only.png').resize(900,900).composite([{input:mask,blend:'dest-in'}]).png().toBuffer();
 for(const n of ['splash','splash-dark'])
  await sharp({create:{width:2732,height:2732,channels:4,background:'#161435'}}).composite([{input:logo,gravity:'center'}]).png().toFile(`assets/${n}.png`);
})();
