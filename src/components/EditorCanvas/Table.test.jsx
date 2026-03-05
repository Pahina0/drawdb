import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Table from "./Table";
import * as hooks from "../../hooks";

vi.mock("../../hooks");
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (str) => str,
  }),
}));

describe("Table Component", () => {
  const mockTableData = {
    id: 1,
    name: "users",
    x: 100,
    y: 100,
    fields: [{ id: 1, name: "id", type: "INT" }],
    color: "#ffffff",
    indices: [],
    comment: "",
  };

  const mockHooks = {
    useDiagram: vi.fn(() => ({
      database: "generic",
      deleteTable: vi.fn(),
      deleteField: vi.fn(),
      deleteAllFields: vi.fn(),
      updateTable: vi.fn(),
    })),
    useLayout: vi.fn(() => ({
      layout: { sidebar: true, readOnly: false },
    })),
    useSettings: vi.fn(() => ({
      settings: { mode: "light", tableWidth: 200, showComments: true, showFieldSummary: true, showDataTypes: true },
    })),
    useSelect: vi.fn(() => ({
      selectedElement: { id: -1, element: 0, open: false },
      setSelectedElement: vi.fn(),
      bulkSelectedElements: [],
      setBulkSelectedElements: vi.fn(),
    })),
  };

  Object.assign(hooks, mockHooks);

  it("calls deleteAllFields when 'Clear fields' button is clicked", () => {
    const deleteAllFieldsSpy = vi.fn();
    hooks.useDiagram.mockReturnValue({
      database: "generic",
      deleteTable: vi.fn(),
      deleteField: vi.fn(),
      deleteAllFields: deleteAllFieldsSpy,
      updateTable: vi.fn(),
    });

    render(
      <svg>
        <Table
          tableData={mockTableData}
          onPointerDown={vi.fn()}
          setHoveredTable={vi.fn()}
          handleGripField={vi.fn()}
          setLinkingLine={vi.fn()}
        />
      </svg>
    );

    // Open the popover by clicking the 'more' icon (Button with IconMore)
    // The Button with IconMore is the third button in the header group
    // In our mocked environment, we can look for the button or trigger
    const moreButton = screen.getByRole("button", { name: /more/i }); // semi-ui icons often have aria-labels or we can find by class
    // If IconMore doesn't have a label, we might need a different selector.
    // Let's try to find it by its icon class or just find all buttons.
    
    fireEvent.click(moreButton);

    // Now look for 'clear_fields' button in the popover
    const clearFieldsButton = screen.getByText("clear_fields");
    fireEvent.click(clearFieldsButton);

    expect(deleteAllFieldsSpy).toHaveBeenCalledWith(mockTableData.id);
  });
});
