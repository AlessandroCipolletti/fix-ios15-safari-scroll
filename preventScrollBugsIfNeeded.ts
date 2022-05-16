
/**
 * @function preventScrollBugsIfNeeded
 * This fixes an annoying iOS15+ behavior on apple devices.
 * Prevents 'pull down to refresh' if the element you are pulling down has a scroll.
 * I used a css class "scrollable" to identify the dom elements who needs to prevent 'pull to refresh'.
 * You can do it by using getComputedStyle(target).overflow === 'auto'|'scroll', but it's more demanding in terms of performance.
 *
 * @example
 * mainContainer.addEventListener('touchstart', (event) => {
 *   preventScrollBugsIfNeeded(event, true|false)
 * }, false)
 *
 * @param {TouchEvent} event
 * @param {boolean} [alwaysPreventPullToRefresh = false]
 * @returns {void}
 */
const preventScrollBugsIfNeeded = (
  event: TouchEvent,
  alwaysPreventPullToRefresh = false,
): void => {

  let target = event.target as HTMLElement
  let startY = 0
  let scrollStartedFromTop = false
  let hasVerticalScroll = false
  let hasHorizontalScroll = false

  // 1) Find out if the touched point is inside a 'scrollable' parent
  while (target && target !== document.body) {
    // Heavy on performance, so I'm using a 'scrollable' css class
    // If (['scroll', 'auto'].includes(getComputedStyle(target).overflow)) {
    if (target.classList.contains('scrollable')) {
      hasVerticalScroll = target.scrollHeight > target.clientHeight
      hasHorizontalScroll = target.scrollWidth > target.clientWidth
      break
    }
    target = target.parentNode as HTMLElement
  }

  // 2) Fix an annoying ios bug where scrolling inside a div with scroll triggers a page-scroll instead.
  // This sometimes happens when the scrolling content is "at the end of the race" of its parent scroll.
  // It could happen in every scroll direction top bottom left right.
  if (hasVerticalScroll) {
    if (target.scrollTop === 0) {
      startY = event.touches[0].clientY
      scrollStartedFromTop = true
      target.scrollTop = 1
    } else if (target.scrollTop === (target.scrollHeight - target.clientHeight)) {
      target.scrollTop = (target.scrollHeight - target.clientHeight) - 1
    }
  } else if (hasHorizontalScroll) {
    if (target.scrollLeft === 0) {
      target.scrollLeft = 1
    } else if (target.scrollLeft === (target.scrollWidth - target.clientWidth)) {
      target.scrollLeft = (target.scrollWidth - target.clientWidth) - 1
    }
  }

  // 3) On touchMove, we can prevent pull-to-refresh when needed
  const onTouchMove = (event: TouchEvent) => {

    // 3.1) Prevents pull to refresh if we are inside a target with vertical scroll
    if (hasVerticalScroll && scrollStartedFromTop) {
      const moveY = event.touches[0].clientY
      if (moveY > startY) {
        event.preventDefault()
        event.stopPropagation()
        hideKeyboradIfNeeded()
      }

      return
    }

    // 3.2) If we want to always prevent pull to refresh
    if (alwaysPreventPullToRefresh) {
      // we need to prevent event default behavior only when outside a target with scroll.
      // Elsewhere native scroll would be prevented too.
      if (!hasVerticalScroll && !hasHorizontalScroll) {
        event.preventDefault()
        event.stopPropagation()
        hideKeyboradIfNeeded()
      }
    }

  }

  const onTouchEnd = () => {
    document.body.removeEventListener('touchmove', onTouchMove)
    document.body.removeEventListener('touchend', onTouchEnd)
  }

  document.body.addEventListener('touchmove', onTouchMove)
  document.body.addEventListener('touchend', onTouchEnd, true)
}


/**
 * @function hideKeyboradIfNeeded
 * 3.3) If we have focus inside a text field and the ios keybord is visible on the screen,
 * preventing event defautl behavior prevents event the blur on the text field.
 * So we need to do it by hand to hide the keyboard.
 *
 * @returns {void}
 */
const hideKeyboradIfNeeded = (): void => {
  if (document.activeElement && document.activeElement instanceof HTMLElement) {
    const elementTag: string = document.activeElement.tagName.toLowerCase()
    const elementType: string = (document.activeElement.getAttribute('type') || '').toLowerCase()

    if (elementTag === 'input' && (elementType === 'text' || elementType === 'password')) {
      document.activeElement.blur()
    }
  }
}


export default preventScrollBugsIfNeeded
