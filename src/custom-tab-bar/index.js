Component({
  data: {
    active: 0,
    list: [
      {
        iconfont: 'icon',
        pagePath: '/pages/home/home',
      },
      {
        iconfont: 'icon',
        pagePath: '/pages/home/my',
      },
      {
        iconfont: 'icon',
        pagePath: '/pages/home/home',
      },
      {
        iconfont: 'icon',
        pagePath: '/pages/home/my',
      },
    ],
  },
  attached() {},
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      console.log(data.index)
      const url = data.path

      if (data.index === this.data.active) {
        return
      }

      wx.switchTab({ url })
      this.setData({
        active: data.index,
      })
      console.log(this.data.active)
    },
  },
})
