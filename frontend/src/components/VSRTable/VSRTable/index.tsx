"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { GRID_CHECKBOX_SELECTION_COL_DEF, GridRowSelectionModel } from "@mui/x-data-grid";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { useRouter } from "next/navigation";
import { STATUS_OPTIONS } from "@/components/shared/StatusDropdown";
import { useScreenSizes } from "@/hooks/useScreenSizes";
import { VSR } from "@/api/VSRs";
import { StatusChip } from "@/components/shared/StatusChip";
import { Checkbox, CheckboxProps } from "@mui/material";

const formatDateReceived = (dateReceived: Date) => {
  // Return the empty string on a falsy date received, instead of defaulting to today's date
  return dateReceived ? moment(dateReceived).format("MMMM D, YYYY") : "";
};

/**
 * Custom checkbox component to render in the table, used to customize checkbox size
 */
const CustomCheckbox = (props: CheckboxProps) => {
  const { isMobile } = useScreenSizes();

  return (
    <Checkbox
      {...props}
      style={{ ...props.style, transform: `scale(${isMobile ? "0.625" : "1"})` }}
    />
  );
};

interface VSRTableProps {
  vsrs: VSR[];
  selectedVsrIds: string[];
  onChangeSelectedVsrIds: (newIds: string[]) => unknown;
}

/**
 * A component for the table itself on the VSR table page.
 */
export default function VSRTable({ vsrs, selectedVsrIds, onChangeSelectedVsrIds }: VSRTableProps) {
  const { isMobile, isTablet } = useScreenSizes();
  const router = useRouter();

  // Remove gap between columns on small screens so it will fit better
  const columnsGap = isMobile ? 12 : isTablet ? 16 : 32;

  const createFakeColumn = (fieldIndex: number) => ({
    field: `phantom${fieldIndex}`,
    headerName: "",
    type: "string",
    headerClassName: "header fakeHeader",
    cellClassName: "fakeCell",
    disableColumnMenu: true,
    hideSortIcons: true,
    width: columnsGap,
    minWidth: columnsGap,
    maxWidth: columnsGap,
  });

  // Define the columns to show in the table (some columns are hidden on smaller screens)
  const columns: GridColDef[] = React.useMemo(() => {
    const firstFakeWidth = isMobile ? 8 : 20;
    const checkboxWidth = isMobile ? 20 : isTablet ? 32 : 72;

    const result: GridColDef[] = [
      {
        ...createFakeColumn(0),
        width: firstFakeWidth,
        minWidth: firstFakeWidth,
        maxWidth: firstFakeWidth,
      },
      {
        ...GRID_CHECKBOX_SELECTION_COL_DEF,
        width: checkboxWidth,
        minWidth: checkboxWidth,
        maxWidth: checkboxWidth,
        headerClassName: "header fakeHeader",
      },
    ];
    result.push(createFakeColumn(1));

    if (!isTablet) {
      result.push({
        field: "militaryID",
        headerName: "Military ID (Last 4)",
        type: "string",
        flex: 1,
        headerClassName: "header",
        disableColumnMenu: true,
        hideSortIcons: true,
        width: 100,
      });
      result.push(createFakeColumn(2));
    }

    result.push({
      field: "name",
      headerName: "Name",
      flex: 1,
      headerClassName: "header",
      disableColumnMenu: true,
      hideSortIcons: true,
      width: 100,
    });
    result.push(createFakeColumn(3));

    if (!isTablet) {
      result.push({
        field: "dateReceived",
        headerName: "Date Received",
        type: "date",
        sortable: true,
        flex: 1,
        headerClassName: "header",
        disableColumnMenu: true,
        hideSortIcons: true,
        valueFormatter: (params) => formatDateReceived(params?.value),
        width: 100,
      });
      result.push(createFakeColumn(4));
    }

    result.push({
      field: "status",
      headerName: "Status",
      type: "string",
      flex: 1,
      headerClassName: "header",
      disableColumnMenu: true,
      hideSortIcons: true,
      renderCell: (params) => (
        <StatusChip
          status={
            STATUS_OPTIONS.find((statusOption) => statusOption.value === params.value) ??
            STATUS_OPTIONS[0]
          }
        />
      ),
      width: 100,
    });

    return result;
  }, [isMobile, isTablet]);

  return (
    <Box
      style={{ width: "100%" }}
      sx={{
        ".fakeHeader": {
          padding: "0px !important",
        },
        ".fakeCell": {
          padding: "0px !important",
        },
        ".MuiDataGrid-columnHeadersInner": {
          backgroundColor: "var(--color-tse-accent-blue-1)",
        },
        ".MuiDataGrid-columnHeaderTitleContainerContent": {
          justifyContent: "center",
        },
        "& .header": {
          color: "rgba(247, 247, 247, 1)",
          // Customize color of checkboxes in header
          ".MuiCheckbox-root": {
            color: "white !important",
            padding: isMobile ? "2.5px" : "4px",
          },
          // Customize styles of text in header
          ".MuiDataGrid-columnHeaderTitle": {
            fontSize: "1.125rem",
            fontWeight: 600,
          },
        },
        // Hide the default white bar column separators
        ".MuiDataGrid-columnSeparator": {
          display: "none !important",
        },
        ".MuiDataGrid-cell": {
          cursor: "pointer",
          // Disable the default blue outline around a focused table cell
          outline: "none !important",
        },
        ".MuiDataGrid-cellContent": {
          fontSize: isMobile ? "0.75rem" : isTablet ? "0.875rem" : "1rem",
        },
        "&.MuiDataGrid-root": {
          border: "none",
        },
        border: 0,
        "& .odd": {
          backgroundColor: "var(--color-tse-neutral-gray-0)",
          "&:hover": {
            backgroundColor: "var(--color-tse-neutral-gray-0) !important",
          },
          "&.Mui-hovered": {
            backgroundColor: "var(--color-tse-neutral-gray-0) !important",
          },

          "&.Mui-selected": {
            backgroundColor: "var(--color-tse-neutral-gray-0) !important",

            "&:hover": {
              backgroundColor: "var(--color-tse-neutral-gray-0) !important",
            },
          },
        },
        "& .even": {
          backgroundColor: "var(--color-tse-primary-light)",
          "&:hover": {
            backgroundColor: "var(--color-tse-primary-light) !important",
          },
          "&.Mui-hovered": {
            backgroundColor: "var(--color-tse-primary-light) !important",
          },

          "&.Mui-selected": {
            backgroundColor: "var(--color-tse-primary-light) !important",

            "&:hover": {
              backgroundColor: "var(--color-tse-primary-light) !important",
            },
          },
        },
        // Customize color of checkboxes
        "& .MuiCheckbox-root": {
          color: "#0C2B35 !important",
          padding: isMobile ? "2.5px" : "4px",
        },
      }}
    >
      <DataGrid
        slots={{ baseCheckbox: CustomCheckbox }}
        rows={
          // Each row needs a unique "id" property; we can use the MongoDB "_id" for this
          vsrs?.map((vsr) => ({
            ...vsr,
            id: vsr._id,
          })) ?? []
        }
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 50 },
          },
        }}
        getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd")}
        pageSizeOptions={[50]}
        checkboxSelection
        disableRowSelectionOnClick
        // Callback fired when user clicks on a cell
        onCellClick={(params, event, _details) => {
          // Ignore if they click the column with the checkboxes
          if (params.field === "__check__") {
            return;
          }
          // Otherwise, take them to the page for this row's VSR
          event.stopPropagation();
          if (params.id) {
            router.push(`/staff/vsr/${params.id}`);
          }
        }}
        rowSelectionModel={selectedVsrIds}
        onRowSelectionModelChange={(vsrIds: GridRowSelectionModel) =>
          onChangeSelectedVsrIds(vsrIds as string[])
        }
      />
    </Box>
  );
}
