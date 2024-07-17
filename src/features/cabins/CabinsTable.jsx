import PropTypes from "prop-types";
import { BiPencil, BiTrash } from "react-icons/bi";
import TableRow from "../../ui/TableRow";
import TableHeader from "../../ui/TableHeader";
import Table from "../../ui/Table";
import { useDeleteCabin } from "./useDeleteCabin";
import { Fragment } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCabins } from "./useCabins";
import Sppiner from "../../ui/Sppiner";
import Pagination from "../../ui/Pagination";

const CABIN_TABLE_HEADER = [
  { label: "Image", colSpans: 1 },
  { label: "Name", colSpans: 1 },
  { label: "Capacity", colSpans: 1 },
  { label: "Price", colSpans: 1 },
  { label: "Discount", colSpans: 1 },
];

function sortCabins(cabins, sortBy) {
  switch (sortBy) {
    case "name-asc":
      return (cabins = cabins.sort((a, b) => a.name - b.name));

    case "name-desc":
      return (cabins = cabins.sort((a, b) => b.name - a.name));

    case "price-asc":
      return cabins.sort((a, b) => a.regularPrice - b.regularPrice);

    case "price-desc":
      return cabins.sort((a, b) => b.regularPrice - a.regularPrice);

    case "discount-asc":
      return cabins.sort((a, b) => a.discount - b.discount);

    case "discount-desc":
      return cabins.sort((a, b) => b.discount - a.discount);

    case "capacity-asc":
      return cabins.sort((a, b) => a.maxCapacity - b.maxCapacity);

    case "capacity-desc":
      return cabins.sort((a, b) => b.maxCapacity - a.maxCapacity);

    default:
      return cabins;
  }
}
function filterCabins(cabins, filterBy) {
  switch (filterBy) {
    case "no-filter":
      return cabins;
    case "hasDiscount":
      return cabins.filter((cabin) => cabin.discount > 0);

    case "noDiscount":
      return cabins.filter((cabin) => cabin.discount === 0 || !cabin.discount);

    default:
      return cabins;
  }
}

function CabinsTable() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy");
  const filterBy = searchParams.get("filterBy");

  let { cabins, count, isLoadingCabins } = useCabins();

  const { delteCabin } = useDeleteCabin();

  if (cabins?.length > 0) {
    if (sortBy) cabins = sortCabins(cabins, sortBy);
    if (filterBy) cabins = filterCabins(cabins, filterBy);
  }

  function handleDeleteCabin(id) {
    delteCabin(id);
  }

  function handleEditCabin(cabin) {
    navigate(`/edit-cabin/${cabin.id}`, {
      state: { ...cabin },
    });
  }

  const numCols = 6;
  return (
    <Table numCols={numCols} count={count}>
      <TableHeader numCols={numCols} list={CABIN_TABLE_HEADER} />
      {isLoadingCabins ? (
        <div className="col-span-full row-start-2 row-end-none">
          <Sppiner />
        </div>
      ) : (
        cabins.length > 0 &&
        cabins?.map((cabin, i) => (
          <Fragment key={i}>
            <TableRow
              numCols={numCols}
              list={[
                {
                  label: cabin.image ? (
                    <div className="max-h-14 relative h-full aspect-square overflow-hidden rounded-full bg-third">
                      <img
                        src={`${cabin.image}`}
                        className="absolute w-full h-full"
                      />
                    </div>
                  ) : (
                    ""
                  ),
                  colSpans: 1,
                },
                { label: cabin.name, colSpans: 1 },
                { label: cabin.maxCapacity, colSpans: 1 },
                { label: "$" + cabin.regularPrice, colSpans: 1 },
                {
                  label:
                    cabin.discount === 0 || !cabin.discount
                      ? "_"
                      : "$" + cabin.discount,
                  colSpans: 1,
                },
                {
                  label: (
                    <div className="flex">
                      <BiPencil
                        size={30}
                        className="cursor-pointer p-1 rounded-full"
                        onClick={() => handleEditCabin(cabin)}
                      />

                      <BiTrash
                        size={30}
                        className="cursor-pointer p-1 rounded-full"
                        onClick={() => handleDeleteCabin(cabin.id)}
                      />
                    </div>
                  ),
                  colSpans: 1,
                  bgColor: "secondary",
                },
              ]}
            />
          </Fragment>
        ))
      )}
      <div className="col-span-full row-span-1 items-center bg-secondary text-primary font-bold">
        <Pagination count={count} />
      </div>
    </Table>
  );
}

CabinsTable.propTypes = { cabins: PropTypes.array };

export default CabinsTable;
