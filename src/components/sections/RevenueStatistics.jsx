import { DatePicker, Select } from "antd";
import React, { useEffect, useState } from "react";
import {
  formatCurrencyVND,
  formatPrice,
  getStartAndEndOfMonth,
  getStartAndEndOfYear,
} from "@/services/utils";

import AuthRequest from "@/services/axios/AuthRequest";
import { Line } from "@ant-design/plots";
import ReactDOM from "react-dom";
import { handleChangeLoadingApp } from "@/services/redux/Slices/bootstrap";
import { useDispatch } from "react-redux";

const { RangePicker } = DatePicker;
const RevenueStatistics = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [customDate, setCustomDate] = useState([]);
  const [option, setOptions] = useState("month");
  useEffect(() => {
    dispatch(handleChangeLoadingApp(true));
    asyncFetch();
  }, [option]);

  useEffect(() => {
    if (customDate?.length == 2) {
      asyncFetch();
    }
  }, [customDate]);

  const asyncFetch = async () => {
    const queryOptions = {};
    if (option != "customs") {
      setCustomDate([]);
    }
    if (option == "month") {
      const { start, end } = getStartAndEndOfMonth();
      queryOptions.startDate = start.getTime();
      queryOptions.endDate = end.getTime();
    } else if (option == "year") {
      const { start, end } = getStartAndEndOfYear();
      queryOptions.startDate = start.getTime();
      queryOptions.endDate = end.getTime();
    } else if (option == "customs" && customDate?.length == 2) {
      const [a, b] = customDate;
      queryOptions.startDate = a;
      queryOptions.endDate = b;
    }
    await AuthRequest.get("orders/revenues", {
      params: queryOptions,
    }).then((response) => setData(response.data ?? []));
    dispatch(handleChangeLoadingApp(false));
  };

  const config = {
    data,
    xField: "date",
    yField: "value",
    colorField: "type",
    axis: {
      y: {
        labelFormatter: (v) => formatCurrencyVND(v),
      },
    },
    scale: {
      color: {
        range: ["#FF6F61", "#4CAF50", "#2196F3", "#FFC107"],
      },
    },
    style: {
      lineWidth: 2,
      lineDash: (data) => {
        if (data[0].type === "register") return [4, 4];
      },
    },
    tooltip: {
      channel: "y",
      valueFormatter: (price) => formatPrice(price),
    },
  };

  return (
    <div className="p-3">
      <div className=" flex justify-between">
        <h1 className="font-dancing-script text-2xl text-rose-500">
          Thống kê doanh thu
        </h1>

        <div className=" flex gap-2">
          {option == "customs" && (
            <RangePicker
              onChange={(value, dateString) => {
                const [a, b] = dateString;
                setCustomDate([new Date(a).getTime(), new Date(b).getTime()]);
              }}
            />
          )}
          <Select
            defaultValue={option}
            // style={{ width: 120 }}
            onChange={setOptions}
            options={[
              { value: "month", label: "Tháng hiện tại" },
              { value: "year", label: "Năm nay" },
              { value: "all", label: "Tất cả thời gian" },
              { value: "customs", label: "Chọn khoảng thời gian" },
            ]}
          />
        </div>
      </div>
      {data?.length == 0 && (
        <h1 className=" text-shadow text-2xl font-dancing-script text-center py-3">
          Không có dữ liệu.
        </h1>
      )}
      <Line {...config} />
    </div>
  );
};

export default RevenueStatistics;
