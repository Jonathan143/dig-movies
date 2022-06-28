export function useLoading(initValue = false) {
  const isLoading = ref(initValue)

  const setLoading = (value: boolean) => {
    isLoading.value = value
  }

  const toggleLoading = () => {
    isLoading.value = !isLoading.value
  }

  return {
    isLoading,
    setLoading,
    toggleLoading,
  }
}
