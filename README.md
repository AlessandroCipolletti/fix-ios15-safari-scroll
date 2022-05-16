# fix-ios15-safari-scroll

<code>preventScrollBugsIfNeeded()</code> does two things:
* Fix that annoying scroll bug ios has had for many years;
* Prevent pull to refresh whan needed;

Get the code from preventScrollBugsIfNeeded.ts


## preventScrollBugsIfNeeded
* Fixes an annoying iOS15+ scroll bug on apple devices.
* Prevents pull-to-refresh if the element you are pulling down has a scroll.
* If <code>alwaysPreventPullToRefresh = true</code> prevents pull-to-refresh no matter where are you touching the screen.

I used a css class <code>scrollable</code> to identify the dom elements who need to prevent pull to refresh.
You can do it by using <code>getComputedStyle(target).overflow === auto\|scroll</code>, but its more demanding in terms of performance.

(event, [alwaysPreventPullToRefresh]) ⇒ <code>void</code>

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
