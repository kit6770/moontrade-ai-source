import { KOLItemInfo, PageType, TwitterFeedInfo } from "@/types"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import useSWR from "swr"
import useSWRMutation from "swr/mutation"

export function useKOLList() {
  const [data, setData] = useState<KOLItemInfo[]>([])
  const { trigger, error, isMutating } = useSWRMutation<{
    data: KOLItemInfo[]
    total_count: number
  }>(`api:/kol_rank`)

  useEffect(() => {
    trigger({
      method: "POST",
      body: JSON.stringify({
        // addresses: '',
        offset: 0,
        limit: 50,
      }),
    })
      .then((res) => {
        setData(
          res?.data?.map((item) => {
            return { ...item, id: item?.user_id }
          })
        )
      })
      .finally(() => {})
  }, [])

  return {
    data,
    isLoading: isMutating,
    error,
  }
}

export function useTwitterByUid(userId?: string) {
  const [data, setData] = useState<TwitterFeedInfo[]>([])
  const [hasMore, setHasMore] = useState<boolean>(true)

  const { trigger, error, isMutating } = useSWRMutation<TwitterFeedInfo[]>(
    `api:/get_twitter_tweets_by_uid?tweet_user_id=${userId}&offset=${data?.length}&limit=50`
  )

  const getTwitterList = () => {
    trigger().then((list) => {
      if (list && list.length > 0) {
        const newData = data.concat(list || [])
        setData(newData)
        setHasMore(true)
      } else {
        setHasMore(false)
      }
    })
  }

  useEffect(() => {
    setData([])
    setHasMore(false)
    if (userId) {
      getTwitterList()
    }
  }, [userId])

  return {
    data,
    isLoading: isMutating,
    error,
    hasMore,
    getTwitterList,
  }
}

export function useSelectedKOL(type: PageType) {
  const { data: selected } = useSWR(type + "Selected")
  const { data: selectedValue } = useSWR(type + "SelectedInfo")
  const { trigger: setSelected } = useSWRMutation(type + "Selected")
  const { trigger: setSelectedInfo } = useSWRMutation(type + "SelectedInfo")

  return {
    selected,
    selectedInfo: JSON.parse(selectedValue ?? "{}"),
    setSelected,
    setSelectedInfo,
  }
}

export function useSelectedFilter(type: PageType) {
  const { data: filterValue } = useSWR(type + "FilterOptions")
  const { data: catorgy } = useSWR(type + "Catorgy")
  const { data: lastTimeType } = useSWR(type + "LastTimeType")
  const { data: dataType } = useSWR(type + "DataType")

  const { trigger: setCatorgy } = useSWRMutation(type + "Catorgy")
  const { trigger: setFilterOptions } = useSWRMutation(type + "FilterOptions")
  const { trigger: setLastTimeType } = useSWRMutation(type + "LastTimeType")
  const { trigger: setDataType } = useSWRMutation(type + "DataType") // side content

  return {
    filterOptions: JSON.parse(filterValue ?? "{}"),
    catorgy,
    lastTimeType,
    dataType,
    setCatorgy,
    setFilterOptions,
    setLastTimeType,
    setDataType,
  }
}
