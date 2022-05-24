interface RouteLocationOptions {
  url: string
  params?: Record<string, string>
}

type RouteLocationRaw = string | RouteLocationOptions

const queryString = (query: Record<string, string> = {}) => {
  let string = ''
  for (const key in query) {
    if (Object.prototype.hasOwnProperty.call(query, key)) {
      string += `${string ? '&' : '?'}${key}=${query[key]}`
    }
  }
  return string
}

export function useRouter() {
  const normalizeUrl = (locationRaw: RouteLocationRaw) => {
    if (typeof locationRaw === 'string') {
      return locationRaw
    } else {
      const { url, params } = locationRaw
      return url + queryString(params)
    }
  }
  /**
   * 保留当前页面，跳转到应用内的某个页面
   * @param to Route location to navigate to
   */
  const push = (to: RouteLocationRaw) => {
    uni.navigateTo({ url: normalizeUrl(to) })
  }

  /**
   * 关闭当前页面，跳转到应用内的某个页面。
   * @param to Route location to navigate to
   */
  const replace = (locationRaw: RouteLocationRaw) => {
    uni.redirectTo({ url: normalizeUrl(locationRaw) })
  }

  /**
   * 关闭所有页面，打开到应用内的某个页面
   * @param to Route location to navigate to
   */
  const reLaunch = (to: RouteLocationRaw) => {
    uni.reLaunch({ url: normalizeUrl(to) })
  }

  /**
   * 关闭当前页面，返回上一页面或多级页面,可通过 getCurrentPages() 获取当前的页面栈，决定需要返回几层
   * @param {Number} delta 返回的页面数，如果 delta 大于现有页面数，则返回到首页。默认 1
   */
  const go = (delta = 1) => {
    uni.navigateBack({ delta })
  }

  /**
   * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
   * @param {string} url 需要跳转的 tabBar 页面的路径（需在 pages.json 的 tabBar 字段定义的页面），路径后不能带参数
   */
  const switchTab = (url: string) => {
    uni.switchTab({ url })
  }

  return {
    push,
    replace,
    reLaunch,
    go,
    switchTab,
  }
}
