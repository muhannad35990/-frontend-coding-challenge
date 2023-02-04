import React, { useState, useEffect } from "react";
import { Table, Spin } from "antd";
import { GetAllAbsences } from "actions/absences";
import GetColumns from "./columns";
import { Styles } from "./styles";

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
    setLoading(false);
  };

  return (
    <Styles>
      {!loading ? (
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
        <div className="loader__container">
          <Spin />
        </div>
      )}
    </Styles>
  );
}

export default AbsencesContent;
