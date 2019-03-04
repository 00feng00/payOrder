import React from "react";
import style from "./table.css";
import Map from "lodash.map";
import {Table, Pagination} from "antd";
import Merge from 'lodash.merge'
import DingyiSpin from '../spin/index.js'
import {uuid} from "../../util/uitls";
import TableHeaderLable from "./tableHeaderLable";

class SortTable extends React.Component {
    constructor() {
        super();
        this.state = {
            sortFields: {}
        };
        this.adapterColumns = this.adapterColumns.bind(this);
    }

    render() {
        var self = this
        var {
            loading,
            dataSource, columns,
            paging: {
                offset,
                limit,
                total
            }
        } = this.props;
        return (
            <DingyiSpin spinning={loading}>
                <section className="sortTable" key={uuid()}>
                    <Table
                        key={uuid()}
                        dataSource={dataSource}
                        columns={this.adapterColumns(columns)}
                        pagination={false}
                    />
                    <div className={`${style.hcenter} ${style.vcenter} ${style.padding20}`} key={uuid()}>
                        {
                            this.props.paging && <Pagination total={total} pageSize={limit}
                                                             current={Math.ceil(offset / limit) == 0 ? 1 : Math.ceil(offset / limit) + 1}
                                                             onChange={(page) => {
                                                                 self.props.onPageChange.call(self, {
                                                                     limit,
                                                                     total,
                                                                     offset: page != 0 ? (page - 1) * limit : 0
                                                                 })
                                                             }}
                            />
                        }
                    </div>

                </section>
            </DingyiSpin>
        );
    }

    adapterColumns(columns) {
        var self = this;
        Map(columns, column => {
            let {sortFields} = self.state;
            var title = column.title;
            var _dataIndexArray = column.dataIndex.split('.')
            var _dataIndex = _dataIndexArray[_dataIndexArray.length - 1]

            if (typeof column.sort == 'string') {
                column.title = <TableHeaderLable
                    title={column.title.props ? column.title.props.title : column.title}
                    sort={sortFields[_dataIndex]}
                    onSortClickUp={() => {
                        if (self.props.sortMode == "single") {
                            self.setState({
                                sortFields: {
                                    [_dataIndex]: 'asc'
                                }
                            })
                        } else {
                            self.setState(Merge(sortFields, {
                                    [_dataIndex]: "asc"
                                }
                            ));
                        }

                        setTimeout(() => {
                            var _str = ""
                            Map(self.state.sortFields, (x, key) => {
                                _str += key + "_" + x + ","
                            })
                            self.props.onSortClickUp.call(self, _str.slice(0, _str.length - 1), self.state.sortFields);
                            self.props.onSortChange.call(self, _str.slice(0, _str.length - 1), self.state.sortFields);
                        }, 300)

                    }}
                    onSortClickDown={() => {
                        if (self.props.sortMode == "single") {
                            self.setState({
                                sortFields: {}
                            });
                            self.setState({
                                sortFields: {
                                    [_dataIndex]: "desc"
                                }
                            })
                        } else {
                            self.setState(Merge(sortFields, {
                                    [_dataIndex]: "desc"
                                }
                            ));
                        }

                        setTimeout(() => {
                            var _str = ""
                            Map(self.state.sortFields, (x, key) => {
                                _str += key + "_" + x + ","
                            })
                            self.props.onSortClickDown.call(self, _str.slice(0, _str.length - 1), self.state.sortFields);
                            self.props.onSortChange.call(self, _str.slice(0, _str.length - 1), self.state.sortFields);
                        }, 300)

                    }}
                    dataIndex={column.dataIndex}
                />

            }
        });
        return columns;
    }
}

SortTable.defaultProps = {
    loading: false,
    dataSource: [],
    columns: {},
    column_: {
        key: "",
        dataIndex: "",
        title: ""
    },
    sortFields: {}, //sortField: 'id'// sortOrder: 'desc',
    sortField_: {
        key: "desc" //asc||""
    },
    sortMode: "single",
    paging: {
        offset: 0,
        limit: 10,
        total: 0,
        pageSize: 10,
    },
    onSortClickUp() {
    },
    onSortClickDown() {
    },
    onSortChange() {
    },
    onPageChange() {
    }
};
export default SortTable;
