# Creating A Ward
Creating a ward is very simple with Unpaid Overtime.

First, go to the `wards` folder and create one with the name of your custom ward. This will be used in the URL for the ward.

Now, make a HTML file with this text in it.

```html
<html>
  <head>
        <!--
        Meta Tags, to embed it on all your favourite platforms.
        You can customize the name & description, but the color & image should stay so people know what site is being embedded.
        -->
        <link rel="stylesheet" href="../../css/ward.css">
        <meta property="og:image" content="https://noahthenerd.github.io/unpaid-overtime/assets/ada.png">
        <meta property="og:title" content="Unpaid Overtime">
        <meta property="og:description" content="A more fun & exciting way to play custom levels in Rhythm Doctor.">
        <meta property="og:type" content="website">
        <meta name="theme-color" id="customCol" content="#24A4E3">
        <link rel="icon" type="image/x-icon" href="../../assets/ada.png">
    </head>
    <body></body>
  
    <script type="module">
      import loadWard from '../../loadWard'
      
      loadWard({
        name: "My Ward",
        author: "Dr. Paige",
        data: [
            {
                type: "level",
                nickname: "1-1", name: "Samurai Techno", id: "rdSamuraiTechno",
                character: "../../assets/characters/samurai.gif",
                author: "Rhythm Doctor",
                download: "URL HERE"
            }
        ]
      })
    </script>
</html>
```

Alright, you've got your `index.html` file ready. Now for the fun part: **customization**! You can change the `name` and `author` values to whatever you'd like. Adding levels is our next step. This is done in the `data` value which is an array of objects that contain our level data.

| Parameter | Description |
| --------- | ----------- |
| type | The type of content you want to add, currently only `level` is supported |
| nickname | The level's nickname, something like 1-1 or 4-X |
| name | The level's name |
| id | The level's internal ID. Formatted as `levelauthorLevelName` with no special characters or spaces |
| character | A path to the character to use to display for the level, a 48x48 gif |
| author | The author of the level |
| download | The download link for the level |
| isBoss | Either true or false, determines whether a level is a boss level. |
| mustBeatPrevious | Unused boolean, set to true to force the previous level to be completed to continue. |

Congrats, you've just made a ward! 
