<div align="center">
    <img src="https://img.shields.io/github/contributors/NoahTheNerd/unpaid-overtime"> <img src="https://img.shields.io/github/stars/noahthenerd/unpaid-overtime">
    <img src="https://img.shields.io/badge/PRs%3F-welcome-sgreen"><br/>
    <img src="./assets/images/loop.gif">
    <h3>🟢 Unpaid Overtime 🔴</h3>
    <p>A custom levels ward for Rhythm Doctor, no mods required.</p>
</div>
<hr>

Ever wanted to have a longer story mode for Rhythm Doctor, without going through the tedious process of moving .dll files? [Unpaid Overtime](https://NoahTheNerd.github.io/unpaid-overtime) is fanmade bonus content for Rhythm Doctor that aims to add new content

## 🕹 Playing Levels
Want to play some levels from wards? Here's some featured ones to get you started.

- [First Shift](https://NoahTheNerd.github.io/unpaid-overtime?ward=firstshift)
    - An abridged version of a RDL Setlist, recommended for new players!  
- [RDRTS - Amen Break](https://NoahTheNerd.github.io/unpaid-overtime?ward=rdrts/amenbreak)
    - Various levels from the RDRTS event in Rhythm Doctor Lounge!
- [🔥 THE GAUNTLET OF TERRY 🔥]()
    - grab a glass of milk before trying this spicy ward of p̶̛͈̦͋ữ̶͕̺̽r̴̠̝̻̐͂̐e̶̠̻̳͑ ̴͍̰͉̍s̶͙͙̙̚h̶͔̼̑̐i̷̧̼̪̓͗̈ṭ̸̄p̴̞̞̐ơ̸̹̐š̵̤ţ̷̦̪̽̅͌ ̵̼̀h̶̞̜̓ë̶͈̩́̏̔l̷͉̰͚̇l̴̗͔͒͂
    - help

You can play these by clicking **Copy Link** or by copying all the links. You can then import them into Rhythm Doctor's Custom Levels menu.

## 📃 Documentation
In this section of the `README.md` file we'll be making our own custom ward in Unpaid Overtime. 

First, we recommend you use a code editor. Notepad or any other text editor works fine but if you're looking for a *fancy* way to edit these JSON files you can use [Visual Studio Code](https://code.visualstudio.com/) or [Sublime Text](https://www.sublimetext.com/). Don't worry, all this is just making a JSON file. It's not that scary!

### Making the ward
Let's start by making a json file. We'll name it `samuraiward.json`!

Now, you can paste this into the `samuraiward.json` file to get started. We'll customize it later.

```json
{
    "name":"Samurai's Ward",
    "author":"Samurai",
    "bg":"hospital",
    "colour":"#004161"
    "data":[
        {
            "type":"level",
            
            "nickname":"1-1", 
            "name":"Samurai Techno",
            "author":"7th Beat Games",
            "id":"7bgSamuraiTechno",
            
            "character":"samurai",
            "prequote":"I don't feel so good.",
            "postquote":"Thank you, doctor.",
            
            "download":"https://example.com/files/Samurai-Techno.rdzip"
        }
    ]
}
```

Feel free to mess with the values. You can scroll down a bit further to see all supported options. 

Once you're done, you can find your ward by adding the `?ward=filename` parameter, replacing filename with the name of your json file without the `.json` extension at the end. Good luck, and have fun!

### Supported Values
These are all supported keys for ward creation. All required ones are marked with \*, and all unsupported ones are marked with [!].

#### Ward Base
| Key | Expected Value |
| --- | -------------- |
| name* | A string |
| author | A string |
| bg | [A supported background](https://github.com/NoahTheNerd/unpaid-overtime/blob/main/loadWard.js#:~:text=%7D-,const%20bgs,-%3D%20%7B) |
| colour | A HEX Colour for scrollbar, transparency is supported |
| color | Bastardized version of the `colour` key |
| data* | [An array of objects](#ward-data) |

#### Ward Data
| Key | Expected values |
| --- | -------------- |
| type*| `level` `exit` |
| nickname*| A string formatted like `1-1` or `4-X` |
| name*| A string that may be cut off |
| id*| `author,author:LevelName` |
| download* | A URL string to a `.rdzip` file |
| character*| [A supported character](https://github.com/NoahTheNerd/unpaid-overtime/blob/main/loadWard.js#:~:text=const%20characters%20%3D%20%7B) |
| prequote | Pre-completion quote |
| postquote [!] | Post-completion quote |
| destination* | A link or path to a page. (ONLY REQUIRED FOR `exit` TYPE ENTRIES |

## ⭐ Contributing
Join [our Discord](https://discord.gg/auk3KmbdXg) if you're interested in contributing. Opening issues & pull requests is always appreciated.
