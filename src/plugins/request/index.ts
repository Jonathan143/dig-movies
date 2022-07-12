interface RequestParams extends UniNamespace.RequestOptions {
  prefix?: string
  showError?: boolean
}

export async function request<T = any>({
  url,
  prefix = '/api',
  showError = true,
  ...options
}: RequestParams): Promise<[null, T] | [Error, null]> {
  console.log(url, options.data)

  try {
    const { data: response } = (await uni.request({
      ...options,
      url: url.startsWith('http')
        ? url
        : `${import.meta.env.VITE_API_BASE_URL}${prefix}/${url}`,
    })) as unknown as {
      data: {
        data: T
        code: 0 | -1
        message: string
      }
    }

    const { code, data, message } = response

    if (code !== -1) return [null, data]

    throw new Error(message)
  } catch (error) {
    const err = error as Error

    showError &&
      uni.showToast({ title: err.message || '接口出错了', icon: 'none' })
    return [err, null]
  }
}

export function requestMovieDB(api: string, params: Record<string, any> = {}) {
  return request({
    url: 'post/movie_db',
    method: 'POST',
    data: {
      api,
      params,
    },
  })
}
