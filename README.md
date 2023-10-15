# TEXT WRITE

## Instalation

```html
<script src="/dist/neil.textwrite.js"></script>
```

## Constructor
Create a Text Write animation with the "new TextWrite ({})" constructor

##### Parameters

* `delay[string]` Set the delay after the text is successfully written.

* `writeTime[number]` Mengatur kecepatan ketik pada text.

* `closeMode[string]` Set the stop type after all the text has been successfully written.
    - `infinity` The animation doesn't stop.
    - `begining` When the text is successfully written, all text elements will be empty.
    - `forward` When text is successfully written, all text elements will remain the same as the last text written.

* `object[string]` Sets the string written at the end of the text.

* `objectShow[boolean]` Sets whether objects will be displayed when writing stops.
    - `true` Displays objects
    - `false` Hide object.

* `deleteAnimation[boolean]` Add animation of deleting text.
    - `true` Add delete animation
    - `false` Remove delete animation


The options in the following code are the default values ​​if the object is not filled in.

```js
const option = {
    delay : 1000,
    writeTime : 200,
    closeMode : "forward",
    object : "|",
    objectShow : false,
    deleteAnimation : true
};
const write = new TextWrite (option)
```

## Added TextWrite
Add Text write to the HTML element.

##### Add in string form

```js

const element = document.querySelector('.element');
write.to(element , "Example text");

```

##### Add in array form

```js

const element = document.querySelector('.element');
write.to(element , ["Example text" , "Neil js" , "Is powrfull"]);

```

## Global variable

`DELETE_SPEED` Change to set the delete animation speed

`CHANGEOVER_DELAY` Change to set the delay between the text being successfully written and being written
    - Berfungsi ketika `deleteAnimation : true`
