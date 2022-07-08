// {"12":"Adventure","14":"Fantasy","16":"Animation","18":"Drama","27":"Horror","28":"Action","35":"Comedy","36":"History","37":"Western","53":"Thriller","80":"Crime","99":"Documentary","878":"Science Fiction","9648":"Mystery","10402":"Music","10749":"Romance","10751":"Family","10752":"War","10759":"Action & Adventure","10762":"Kids","10763":"News","10764":"Reality","10765":"Sci-Fi & Fantasy","10766":"Soap","10767":"Talk","10768":"War & Politics","10770":"TV Movie"}

export interface MovieState {
  genres: Record<string, string>
  /**
   * file_size: `w200` | `w500` | `w440_and_h660_face` | `original`
   *
   * 大部分场景推荐使用 `w440_and_h660_face`
   */
  baseImageUrl: string
}
