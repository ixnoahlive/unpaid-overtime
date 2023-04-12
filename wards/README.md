# Documentation (WIP)
Creating a ward takes like a minute, and this document will help you do just that.

First, let's make a folder for your custom ward. We'll just name ours "*Samurai's Ward*" for now.

Inside of our new folder, make two files. One named `index.html` and the other named `ward.json`. This is what you should have now.

```
Samurai's Ward
  ┗ index.html
  ┗ ward.json
```

## index.html
In your `index.html` file, paste the following.

```html
<html>
    <head>
        <link rel="stylesheet" href="../../../css/ward.css">
        <meta property="og:image" content="https://noahthenerd.github.io/unpaid-overtime/assets/ada.png">
        <meta property="og:title" content="Unpaid Overtime">
        <meta property="og:description" content="A more fun & exciting way to play custom levels in Rhythm Doctor.">
        <meta property="og:type" content="website">
        <meta name="theme-color" id="customCol" content="#24A4E3">
        <link rel="icon" type="image/x-icon" href="../../../assets/ada.png">
    </head>
    <body>
    </body>

    <script type="module">
        import loadWard from '../../../loadWard.js'

        import Ward from './ward.json' assert { type: 'json' }
        
        loadWard(Ward)
    </script>
</html>
```

## ward.json
This file is where you really get to customize your ward to your liking. Let's start off with this template.

```json
{
  "name":"Samurai's Ward",
  "author":"Samurai",
  "bg":"betaward",
  "data":[]
}
```

These are the supported parameters for the main ward info.

| Parameter | Description | Value(s) | Example |
| --------- | ----------- | ----- | -----------|
| name | Ward name, shown in page title. | string | `"First Shift"` |
| author | The creator of the ward | string | `"ixNoah"` |
| bg | Background to use | betaward, blissful | `"betaward"` |

Now, onto `data`. This will store all the levels. `data` is an array that consists of **level objects**.

A **level object** can have several parameters. Required ones are marked with \*.

| Parameter | Description | Value | Example |
| --------- | ----------- | ----- | --------|
| type\* | The type of level | level |`"level"` |
| nickname\* | The nickname of the level | string | `"1-1"` |
| name\* | The level's name | string | `"Samurai Techno"` |
| author\* | The author of the level | string | `"fizzd"` |
| id\* | The level's ID | string|  `"fizzdSamuraiTecho"` |
| character\* | The character to use | See below | `"samurai"` |
| prequote | Text above the character before the level is beaten | string | `"..."` |
| postquote | Text above the character after the level is beaten | string | `"... (He seems pleased.)"` |
| download\* | Download URL for level | string | `http://rhythmdr.com/sampleLevel.rdzip"` |
| isBoss | Sets if the level is a boss stage | boolean | `true` |


### Characters
The value for `character` can be the name of a built-in character, or a link to a gif. The following characters have already been added for your convenience:
- `hailey`
- `insom`
- `insomalt`
- `ianbubble`
- `logan`
- `lucia`
- `mystery`
- `samurai`
- `cole`
- `hospitalchair`