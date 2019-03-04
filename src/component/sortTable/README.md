## 排序表格
使用
```
   <SortTable 
        sortMode={"single"}
        dataSource={result} 
        columns={columns(self)}
                         onSortChange={(str,obj) => {
                             debugger
                         }}
                         paging={{
                             total,
                             offset,
                             limit
                         }}
                         onPageChange={({offset}) => {
                             self.props.setFilterOptions({
                                 paging: {
                                     offset
                                 }
                             })
                         }}
              />
```
## dataSource
```
export default [{
    "id": 12345,
    "title": "title",
    "designStatusId": 123123,
    "designStatus": {
        "id": '213123',
        "designStatusName": "designStatusName"
    },
    "categoryFilterId": 1,
    "createUser": 1,
    "createTime": 1,
    "updateUser": 1,
    "updateTime": 1,
    "nonPublic": 1,
    "designImageId": 1,
    "designImage":
        {
            "id": 1,
            "imageStorageId": 1,
            "designSmallImage": 1,
            "designMediumImage": 1,
            "designLargeImage": 1
        },
    "shopId": 1,
    "shop":
        {
            "id": 1,
            "shopName": "shopName"
        },
    "publishTime": "publishTime",
    "soldQuantity30Days": 0

}]
```
## columns
```

import React from "react";
import TableHeaderLable from "../ui/tableHeaderLable";
import {uuid} from "../../util/uitls";
import {Popconfirm} from 'antd'

export default (self) => [{
    title: "设计编号",
    dataIndex: 'id',
    key: 'id',
    sort: ''
}, {
    title: "标题",
    dataIndex: 'title',
    key: 'title',
    sort: ''
}, {
    title: "店面",
    dataIndex: 'shop.shopName',
    key: 'shop.shopName',
},
    {
        title: "状态",
        dataIndex: 'designStatus.designStatusName',
        key: 'designStatus.designStatusName',
    },
    {
        title: "销售量",
        dataIndex: 'soldQuantity30Days',
        key: 'soldQuantity30Days',
    },
    {
        title: "更新时间",
        dataIndex: 'publishTime',
        key: 'publishTime',
    },
    {
        title: '操作选项',
        dataIndex: 'address',
        key: 'address',
        render(text, record, index) {
            return <div>
                <span
                    className={`colorBlue pointer`}
                    onClick={() => {
                        self.props.setDetail(record)
                    }}
                    key={uuid()}
                >查看</span>
                <Popconfirm
                    title="确定要删除?"
                    onConfirm={() => {
                        self.props.deleteDesineItem(record)
                    }}
                    okText="确定"
                    cancelText="取消"
                >
                       <span
                           className={`colorRed pointer`}
                           style={{paddingLeft: 10}}
                           key={uuid()}
                       >删除</span>
                </Popconfirm>

            </div>
        }
    },
];
```

# 排序属性
```
 sortFields={
 key:desc,arc,""
 }
 //demo 
  {id:'dec',}
```
# 分页
```
  paging={{
                           total,
                           offset,
                           limit
                       }}
```

## event
### 分页触发 onPageChange
回调参数
```
{ total,
 offset,
 limit }
```
### 排序触发 onSortChange
回调参数
```
(str,obj)
src==>title_desc
obj==>Object {title: desc}
```
## 排序模式
```
  sortMode={"multiple"}
                /*single*/
```

