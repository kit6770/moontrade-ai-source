import React, { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material"
import Pagination from "@mui/material/Pagination"
import Empty from "../empty"
import classNames from "classnames"
import SortTag, { SortType } from "../sort-tag"
import Spin from "../spin"
import { FilterIcon, InfoIcon } from "../icons"
import CustomerFilter from "../customer-filter"
import ITooltip from "../tooltip"
import { useSelectedKOL } from "@/hooks/useKOL"

export type ITableColumnsProps = {
  key?: string
  title: string
  dataIndex: string
  render?: (text: string | number, data: any) => any
  sortable?: boolean
  width?: string | number
  tooltipText?: string
}

export type PageSizeType = {
  page: number
  pageSize: number
  total: number
}

export type SortInfoType = {
  sortKey: string
  sortOrder: SortType
}

export type FilterType = {
  dataIndex: ITableColumnsProps["dataIndex"]
  filter: boolean
  render?: () => any
  filterValue?: any
  filterText?: string
  ref?: React.Ref<HTMLDivElement>
}

export const initPageInfo = { page: 1, pageSize: 10, total: 0 }

type Iprops = {
  dataSource: any[]
  columns: ITableColumnsProps[]
  onSortChange?: (sortkey: string, order: SortType) => void
  pagination?: PageSizeType & {
    onChange?: (page: number) => void
  }
  loading?: boolean
  sortInfo?: SortInfoType
  filterOptions?: FilterType[]
  empty?: React.ReactNode
  loadingExtra?: {
    absolute?: boolean
    absoluteInfo: {
      top?: number
      left?: number
      right?: number
      bottom?: number
    }
  }
  isHover?: boolean
}

function DataTable(props: Iprops) {
  const {
    dataSource = [],
    columns = [],
    onSortChange,
    pagination,
    loading,
    sortInfo: defaultSortInfo,
    filterOptions,
    empty,
    loadingExtra,
    isHover = false,
  } = props
  const [order, setOrder] = useState<SortType>(
    defaultSortInfo?.sortOrder || "asc"
  ) // 显式指定 order 类型
  const [orderBy, setOrderBy] = useState<string>(defaultSortInfo?.sortKey || "")
  const [columnsMap, setColumnsMap] = useState<Map<string, any>>(new Map())

  const { selected, setSelected, setSelectedInfo } = useSelectedKOL("watch")
  const [hoveredRow, setHoveredRow] = useState<string>("")

  useEffect(() => {
    const map = new Map()
    columns.forEach((column) => {
      map.set(column.dataIndex, column)
    })
    setColumnsMap(map)
  }, [columns])

  // Sorting function
  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc"
    const _sortOrder = isAsc ? "desc" : "asc"
    setOrder(_sortOrder)
    setOrderBy(property)
    onSortChange && onSortChange(property, _sortOrder)
  }

  const renderEmpty = () => {
    if (dataSource.length) return null
    return (
      <div className="w-full text-center">
        <div className="flex items-center justify-center pt-[73px] pb-[128px]">
          {empty ? (
            empty
          ) : (
            <Empty description="There is no data to show you right now" />
          )}
        </div>
      </div>
    )
  }

  const renderTableHeader = () => {
    return (
      <TableHead>
        <TableRow>
          {columns.map((column, index) => {
            const itemFilter = (filterOptions || []).find(
              (i: FilterType) => i.dataIndex === column.dataIndex
            )
            if (column.sortable) {
              return (
                <TableCell
                  // sortDirection={orderBy === column.dataIndex ? order : false}
                  sortDirection={false}
                  className="!text-[#000] !border-b-[#F3F1F1]"
                  width={column.width}
                  sx={{
                    fontSize: "12px",
                    height: "40px",
                    padding: "0",
                    borderTop: "1px solid #F3F1F1",
                  }}
                  key={column?.dataIndex + "_" + index}
                >
                  <div className="flex flex-row gap-[6px] font-protomono leading-[16px]">
                    <span className={classNames("")}>
                      {column.title}
                      {itemFilter?.filterText ? itemFilter?.filterText : ""}
                    </span>
                    <TableSortLabel
                      active={orderBy === column.dataIndex}
                      direction={orderBy === column.dataIndex ? order : "asc"}
                      onClick={() => handleRequestSort(column.dataIndex)}
                      sx={{
                        "&.Mui-active, &:hover": {
                          color: "#98989F",
                        },
                        "&.Mui-active .MuiTableSortLabel-icon": {
                          color: "#98989F",
                          visibility: "hidden",
                        },
                        "&:hover .MuiTableSortLabel-icon": {
                          opacity: 0,
                          visibility: "hidden",
                        },
                        ".MuiTableSortLabel-icon": {
                          opacity: 0,
                          // visibility: "hidden !important"
                          display: "none !important",
                        },
                      }}
                      className="flex flex-col items-center gap-[6px]"
                    >
                      <SortTag
                        value={order}
                        needSort={orderBy === column.dataIndex}
                      />
                    </TableSortLabel>
                    {itemFilter?.filter ? (
                      <CustomerFilter
                        render={() => itemFilter?.render?.()}
                        popoverKey={`CustomerFilter_${itemFilter.dataIndex}`}
                        currentValue={itemFilter?.filterValue}
                        ref={itemFilter?.ref}
                      >
                        <FilterIcon
                          className={classNames("!text-[10px] text-[#666666]", {
                            "!text-[#000]": itemFilter?.filterText,
                          })}
                        />
                      </CustomerFilter>
                    ) : null}
                    {column.tooltipText ? (
                      <ITooltip title={column.tooltipText} placement="bottom">
                        <div className="flex items-center">
                          <InfoIcon className="!text-[13.33px] text-[#EBBC63]" />
                        </div>
                      </ITooltip>
                    ) : null}
                  </div>
                </TableCell>
              )
            }
            return (
              <TableCell
                className="!text-[#000] !border-b-[#F3F1F1] leading-[16px]"
                width={column.width}
                sx={{
                  fontSize: "12px",
                  height: "40px",
                  padding: index === 0 ? "0 0 0 10px" : "0",
                  borderTop: "1px solid #F3F1F1",
                }}
                key={column?.dataIndex + "_" + index}
              >
                <div className="font-protomono">{column.title}</div>
              </TableCell>
            )
          })}
        </TableRow>
      </TableHead>
    )
  }

  const renderTableBody = () => {
    if (!dataSource?.length) {
      return "" //<div className="empty_table" />
    }
    return (
      <TableBody>
        {dataSource.map((data, dataSourceIndex) => {
          return (
            <TableRow
              role="checkbox"
              hover={isHover}
              selected={isHover ? selected === data?.name : false}
              onClick={() => {
                setSelected(data?.name === selected ? null : data?.name)
                setSelectedInfo(
                  data?.name === selected ? null : JSON.stringify(data)
                )
              }}
              onMouseEnter={() => isHover && setHoveredRow(data?.name)}
              onMouseLeave={() => isHover && setHoveredRow("")}
              className="!text-[#000] font-protomono cursor-pointer h-[70px] hover:bg-[#fafafa]"
              sx={{ "&.Mui-selected": { backgroundColor: "#FBFFEC" } }}
              key={`${dataSourceIndex}_${data?.id}`}
            >
              {columns.map((column, index) => {
                if (!column.dataIndex) {
                  return (
                    <TableCell
                      key={`${column.dataIndex}-${index}}`}
                      className="!text-[#000] !border-b-[#F3F1F1]"
                      width={column.width}
                      sx={{ padding: "0 0 0 10px" }}
                    >
                      <div className="font-protomono" />
                    </TableCell>
                  )
                }
                const _value = data[column.dataIndex]
                let cellEle = _value
                if (column?.render && typeof column?.render === "function") {
                  cellEle = column.render(_value, data) || _value
                }
                return (
                  <TableCell
                    key={`${column.dataIndex}-${index}}`}
                    className={classNames(
                      "!text-[#000] !border-b-[#F3F1F1] font-protomono",
                      {
                        "!border-b-[0px]":
                          dataSourceIndex === dataSource.length - 1,
                      }
                    )}
                    width={column.width}
                    sx={{ padding: "0 0 0 10px" }}
                  >
                    <div className="font-protomono">{cellEle}</div>
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
      </TableBody>
    )
  }

  const renderPagination = () => {
    if (!pagination) return null
    if (!dataSource.length) return null
    return (
      <div className="text-center flex items-center justify-center py-[32px]">
        <Pagination
          count={Math.ceil(pagination.total / pagination.pageSize)}
          page={pagination.page}
          onChange={(event, page) => {
            pagination?.onChange?.(page)
          }}
          variant="outlined"
          shape="rounded"
          sx={{
            color: "#C9C9C9",
            "& .MuiPaginationItem-root": {
              color: "#C9C9C9",
              backgroundColor: "#212125",
              border: "unset",
              borderRadius: "8px",
              width: "36px",
              height: "36px",
            },
            "& .Mui-selected": {
              color: "#000000 !important",
              backgroundColor: "#C8FF00 !important",
            },
            "& .MuiPaginationItem-ellipsis": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            "& .MuiPaginationItem-root:hover": {
              color: "#ffffff",
              backgroundColor: "#38383D",
            },
          }}
        />
      </div>
    )
  }

  // Render table
  return (
    <React.Fragment>
      <Spin
        spinning={loading}
        iconType={"rocket"}
        absolute={loadingExtra?.absolute}
        absoluteInfo={loadingExtra?.absoluteInfo}
      >
        <TableContainer className="bg-[#fff] w-full overflow-auto">
          <Table
            sx={{ minWidth: 650 }}
            aria-labelledby="tableTitle"
            style={{ tableLayout: "fixed" }}
          >
            {renderTableHeader()}
            {renderTableBody()}
          </Table>
          {renderEmpty()}
          {renderPagination()}
        </TableContainer>
      </Spin>
    </React.Fragment>
  )
}

export default DataTable

export const TableDemo = () => {
  return (
    <div className="bg-[#ffffff]">
      <DataTable
        columns={[
          {
            key: "name",
            title: "name",
            dataIndex: "name",
            sortable: true,
          },
          {
            key: "title",
            title: "title",
            dataIndex: "title",
          },
          {
            key: "car",
            title: "car",
            dataIndex: "car",
          },
        ]}
        dataSource={[]}
      />
    </div>
  )
}
