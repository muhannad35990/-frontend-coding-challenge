import React, { useState, useEffect } from "react";
import { Table, Spin } from "antd";
import { GetAllAbsences } from "actions/absences";
import GetColumns from "./columns";

function AbsencesContent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const columns = GetColumns();

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    setLoading(true);
    const allData = await GetAllAbsences();
    setData(allData);
    console.log("data", allData);
    setLoading(false);
  };

  return data?.length > 0 && !loading ? (
    <Table
      dataSource={data}
      columns={columns}
      loading={{
        spinning: loading,
        indicator: (
          <div>
            <Spin />
          </div>
        ),
      }}
      pagination={{
        position: ["bottomCenter"],
        showSizeChanger: true,
        pageSizeOptions: ["10", "15", "20", "50", "100"],
        total: data?.length,

        showTotal: (total) => `Total ${total} items`,
      }}
    />
  ) : (
    <Spin />
  );
}

export default AbsencesContent;
