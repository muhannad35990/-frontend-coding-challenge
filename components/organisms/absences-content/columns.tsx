import react, { useRef, useState } from "react";
import { Button, Input, Space, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Tag } from "antd";
import moment from "moment";

function GetColumns() {
  const [searchText, setSearchText] = useState<string>("");
  const [searchedColumn, setSearchedColumn] = useState<string>("");
  const searchInput = useRef<any>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: any) => void,
    dataIndex: any
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: any, setSelectedKeys: any) => {
    clearFilters({ confirm: false });
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: any): any => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search  ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, setSelectedKeys)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text: string) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const getDateFilter = (dataIndex: any): any => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
      <div style={{ padding: 8, display: "flex", flexDirection: "column" }}>
        <DatePicker
          // format={"DD-MM-YY"}
          onChange={(e: any) => {
            setSelectedKeys([e]);
          }}
          allowClear={true}
        />

        <div style={{ padding: 8 }}>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, margin: 2 }}
          >
            Filter
          </Button>
        </div>
      </div>
    ),
    onFilter: (value: any, record: any) => {
      return value
        ? moment(record[dataIndex]).format("DD-MM-YYYY") === value.format("DD-MM-YYYY")
        : record;
    },
  });

  return [
    {
      title: "Member name",
      dataIndex: "name",
      key: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("name"),
    },
    {
      title: "Type of absence",
      dataIndex: "type",
      key: "type",
      filters: [
        {
          text: "Vacation",
          value: "vacation",
        },
        {
          text: "Sickness",
          value: "sickness",
        },
      ],
      onFilter: (value: string, record: any) => record.type === value,
      sorter: (a: any, b: any) => a.type.localeCompare(b.type),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Period",
      dataIndex: "Period",
      key: "Period",
      render: (text: string, record: any, index: number) => {
        if (record.startDate && record.endDate) {
          const start = moment.utc(record.startDate);
          const end = moment.utc(record.endDate);

          const duration = moment.duration(end.diff(start)).asDays();

          return <p>{duration} Days</p>;
        }
      },
    },
    {
      title: "Member note",
      dataIndex: "memberNote",
      key: "memberNote",
      sorter: (a: any, b: any) => a.memberNote.localeCompare(b.memberNote),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("memberNote"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "Rejected",
          value: "Rejected",
        },
        {
          text: "Confirmed",
          value: "Confirmed",
        },
        {
          text: "Requested",
          value: "Requested",
        },
      ],
      onFilter: (value: string, record: any) =>
        value === "Rejected"
          ? record.rejectedAt
          : value === "Confirmed"
          ? record.confirmedAt
          : !record.confirmedAt && !record.rejectedAt,
      render: (text: string, record: any, index: number) => {
        const currentText = record.rejectedAt
          ? "Rejected"
          : record.confirmedAt
          ? "Confirmed"
          : "Requested";
        return (
          <Tag
            color={
              currentText === "Rejected"
                ? "red"
                : currentText === "Confirmed"
                ? "green"
                : "gray"
            }
          >
            {currentText}
          </Tag>
        );
      },
    },
    {
      title: " Admitter note",
      dataIndex: "admitterNote",
      key: "admitterNote",
      sorter: (a: any, b: any) => a.admitterNote.localeCompare(b.admitterNote),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("admitterNote"),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      sortDirections: ["descend", "ascend"],
      ...getDateFilter("startDate"),
      render: (text: string) => moment.utc(text).format("MM/DD/YYYY"),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      sortDirections: ["descend", "ascend"],
      ...getDateFilter("endDate"),
      render: (text: string) => moment.utc(text).format("MM/DD/YYYY"),
    },
  ];
}

export default GetColumns;
