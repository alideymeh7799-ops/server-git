import { Button } from "@/ui/button";
import {
  DocumentArrowDownIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";

import html2pdf from "html2pdf.js";
import "jspdf-autotable";
import { RefObject } from "react";
import * as XLSX from "xlsx";

type ColumnType = {
  title: string;
  dataIndex: string;
};

type ExcelDataProps = {
  data: any[];
  nameFile: string;
  nameSheet: string;
  columns: ColumnType[];
};

type PrintDataProps = {
  idSelcted: HTMLElement | RefObject<HTMLElement> | null;
  name: string;
};

type Props = {
  dataExcel: ExcelDataProps;
  dataPrint: PrintDataProps;
  className?: string;
};

const PrintData = ({
  dataExcel,
  dataPrint,
  className = "flex justify-end p-2 gap-4",
}: Props) => {
  const handleExportExcel = (
    data: any[],
    nameFile: string,
    nameSheet: string,
    columns: ColumnType[]
  ) => {
    const mappedData = data.map((row) => {
      const newRow: any = {};
      columns.forEach((col) => {
        newRow[col.title] = row[col.dataIndex];
      });
      return newRow;
    });

    const worksheet = XLSX.utils.json_to_sheet(mappedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, nameSheet);
    XLSX.writeFile(workbook, `${nameFile}.xlsx`);
  };

  const handleExportPDF = (
    target: HTMLElement | RefObject<HTMLElement> | null,
    name: string
  ) => {
    const el = target && "current" in target ? target.current : target;

    if (el) {
      html2pdf()
        .from(el)
        .set({
          margin: [5, 5, 40, 5],
          filename: `${name}.pdf`,
          html2canvas: { scale: 3, scrollY: 0 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .save();
    }
  };

  return (
    <div className={className}>
      {dataExcel.nameFile && (
        <Button
          className="bg-chart2 cursor-pointer  text-white flex items-center gap-2 px-3"
          onClick={() =>
            handleExportExcel(
              dataExcel.data,
              dataExcel.nameFile,
              dataExcel.nameSheet,
              dataExcel.columns
            )
          }
        >
          <TableCellsIcon className="w-5 h-5" />
          دریافت اکسل
        </Button>
      )}
      {dataPrint.idSelcted && (
        <Button
          className="flex cursor-pointer  hover:bg-destructive/50 bg-destructive text-white items-center gap-2 px-3"
          onClick={() => handleExportPDF(dataPrint.idSelcted, dataPrint.name)}
        >
          <DocumentArrowDownIcon className="w-5 h-5" />
          دریافت PDF
        </Button>
      )}
    </div>
  );
};

export default PrintData;
