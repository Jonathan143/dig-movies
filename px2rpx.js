module.exports = () => {
  return {
    postcssPlugin: 'postcss-uni-px2rpx',
    Once(root) {
      root.walkDecls(decl => {
        decl.value = decl.value.replace(
          /(\d+)px/g,
          (mat, p1) => `${+p1 * 2}rpx`,
        )
      })
    },
  }
}

module.exports.postcss = true
