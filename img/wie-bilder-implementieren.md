# beispielmöglichkeiten zur implementierung der bilder
## der html:
```
<div id="weltall"></div>
<div id="erde"></div>
<div id="asteroid"></div>
```

## in der css:

```
#weltall {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: url('img/weltall.png'); 
    background-repeat: repeat-x; 
    z-index: -1;
}

#erde {
    width: 128px;
    height: 128px;
    background-image: url('img/erde.png');
    position: absolute;
    top: 500px;
    transition: top 200ms ease-out;
}

#asteroid {
    width: 256px;
    height: 128px;
    background-image: url('img/asteroid.png');
    position: absolute;
    top: 500px;
    right: 0px;
}
```

## erde nach kollission in der js:
```
document.getElementById('erde').style.backgroundImage = "url('img/erde_over.png')";
```
## weltall in der js:
```
// Position des Hintergrunds des Weltalls wird animiert
var weltall_position = 0;
setInterval(
    function() {
        weltall_position += 2;
        document.getElementById('weltall').style.backgroundPosition = weltall_position + "px 0px";
    },
    10
);

```
