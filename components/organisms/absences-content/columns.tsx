import react, { useRef, useState } from "react";
import { Button, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Tag } from "antd";
import moment from "moment";

function GetColumns() {
  const [searchText, setSearchText] = useState<any>("");
  const [searchedColumn, setSearchedColumn] = useState<any>("");
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

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
    setSearchedColumn("");
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
            onClick={() => clearFilters && handleReset(clearFilters)}
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
      sorter: (a: any, b: any) => a.type.localeCompare(b.type),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("type"),
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
      sorter: (a: any, b: any) => a.startDate.localeCompare(b.startDate),
      sortDirections: ["descend", "ascend"],

      render: (text: string) => moment.utc(text).format("MM/DD/YYYY"),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      sorter: (a: any, b: any) => a.endDate.localeCompare(b.endDate),
      sortDirections: ["descend", "ascend"],

      render: (text: string) => moment.utc(text).format("MM/DD/YYYY"),
    },
  ];
}

export default GetColumns;
