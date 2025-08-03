import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { apiRequest } from "../../../admin/lib/api";
import { getAuth } from "../../../admin/lib/localStorage";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../admin/components/ui/table";
import Badge from "../../../admin/components/ui/badge/Badge";

interface Rider {
  id: number;
  name: string;
  nationality: string;
  photo: string;
  date_of_birth: string;
  info?: {
    bio: string;
    // ...other info fields if needed
  };
  // Optional UI fields
  team?: string;
  status?: "Active" | "Inactive" | "Suspended";
}


export default function RidersPage() {
  const [riders, setRiders] = useState<Rider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRiders() {
      setLoading(true);
      setError(null);
      try {
        const auth = getAuth();
        const token = auth?.access_token;
        const data = await apiRequest(
          `/api/riders/all`,
          "GET",
          undefined,
          false,
          token
        );
        // Map API data to UI model
        const mapped = data.map((r: any) => ({
          id: r.id,
          name: r.name,
          nationality: r.nationality,
          photo: r.photo,
          date_of_birth: r.date_of_birth,
          info: r.info,
          // Provide defaults for missing fields
          team: r.team || "N/A",
          status:
            r.status === undefined || r.status === null
              ? "Inactive"
              : r.status === "active"
              ? "Active"
              : r.status === "inactive"
              ? "Inactive"
              : r.status,
        }));
        setRiders(mapped);
      } catch (err: any) {
        setError(err.message || "Failed to fetch riders");
      } finally {
        setLoading(false);
      }
    }
    fetchRiders();
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Riders Management
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
            onClick={() => navigate('/admin/riders/create')}
          >
            Add Rider
          </button>
        </div>
      </div>
      {loading ? (
        <div className="py-8 text-center text-gray-500">Loading...</div>
      ) : error ? (
        <div className="py-8 text-center text-red-500">{error}</div>
      ) : (
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
              <TableRow>
                <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Rider
                </TableCell>
                <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Nationality
                </TableCell>
                <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Team
                </TableCell>
                <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Status
                </TableCell>
                <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {riders.map((rider) => (
                <TableRow key={rider.id}>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                        <img
                          src={rider.photo}
                          className="h-[50px] w-[50px]"
                          alt={rider.name}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {rider.name}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {rider.nationality}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {rider.team}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        rider.status === "Active"
                          ? "success"
                          : rider.status === "Inactive"
                          ? "warning"
                          : "error"
                      }
                    >
                      {rider.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3 text-theme-sm">
                    <button
                      className="text-blue-600 hover:underline mr-2"
                      type="button"
                      onClick={() => navigate(`/admin/riders/${rider.id}/edit`)}
                    >
                      Edit
                    </button>
                    <select
                      className="border rounded px-2 py-1 text-xs mr-2"
                      value={rider.status === "Active" ? "active" : "inactive"}
                      onChange={async (e) => {
                        const newStatus = e.target.value as "active" | "inactive";
                        const auth = getAuth();
                        const token = auth?.access_token;
                        try {
                          await apiRequest(
                            `/api/riders/${rider.id}`,
                            "PUT",
                            { status: newStatus },
                            false,
                            token
                          );
                          setRiders((prev) =>
                            prev.map((r) =>
                              r.id === rider.id ? { ...r, status: newStatus === "active" ? "Active" : "Inactive" } : r
                            )
                          );
                        } catch (err: any) {
                          alert(err.message || "Failed to update status");
                        }
                      }}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                    <button
                      className="text-red-600 hover:underline"
                      type="button"
                      onClick={() => {
                        const auth = getAuth();
                        const token = auth?.access_token;
                        if (
                          window.confirm(
                            `Are you sure you want to delete ${rider.name}?`
                          )
                        ) {
                          apiRequest(
                            `/api/riders/${rider.id}`,
                            "DELETE",
                            undefined,
                            false,
                            token
                          )
                            .then(() =>
                              setRiders((prev) =>
                                prev.filter((r) => r.id !== rider.id)
                              )
                            )
                            .catch((err: any) =>
                              alert(err.message || "Failed to delete rider")
                            );
                        }
                      }}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
