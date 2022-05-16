# fix-ios15-safari-scroll

<code>preventScrollBugsIfNeeded()</code> does two things:
* Fix that annoying scroll bug ios has had for many years;
* Prevent pull to refresh whan needed;

Look at index.ts.

<a name="preventScrollBugsIfNeeded
This fixes an annoying iOS15+ behavior on apple devices.
Prevents pull down to refresh if the element you are pulling down has a scroll.
I used a css class scrollable to identify the dom elements who needs to prevent pull to refresh.
You can do it by using getComputedStyle(target).overflow === auto|scroll, but its more demanding in terms of performance."></a>

## preventScrollBugsIfNeeded
This fixes an annoying iOS15+ behavior on apple devices.
Prevents pull down to refresh if the element you are pulling down has a scroll.
I used a css class scrollable to identify the dom elements who needs to prevent pull to refresh.
You can do it by using getComputedStyle(target).overflow === auto\|scroll, but its more demanding in terms of performance.(event, [alwaysPreventPullToRefresh]) ⇒ <code>void</code>

| Param | Type | Default |
| --- | --- | --- |
| event | <code>TouchEvent</code> |  |
| [alwaysPreventPullToRefresh] | <code>boolean</code> | <code>false</code> |

**Example**  
```js
mainContainer.addEventListener('touchstart', (event) => {
  preventScrollBugsIfNeeded(event, true|false)
}, false)
```


## Authors

**Alessandro Cipolletti**

## License

Do whatever you want :)
