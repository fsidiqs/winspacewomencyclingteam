import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { apiRequest } from "@/admin/lib/api";
import { getAuth } from "@/admin/lib/localStorage";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/admin/components/ui/table";

interface Page {
    id: number;
    name: string;
}

export default function ManagePagesPage() {
    const [pages, setPages] = useState<Page[]>([
        {
            id: 1,
            name: "home",
        }
    ]);
    //   const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    //   useEffect(() => {
    //     async function fetchPages() {
    //       setLoading(true);
    //       setError(null);
    //       try {
    //         const auth = getAuth();
    //         const token = auth?.access_token;
    //         const data = await apiRequest(
    //           `/api/pages/all`,
    //           "GET",
    //           undefined,
    //           false,
    //           token
    //         );
    //         // Map API data to UI model
    //         const mapped = data.map((p: any) => ({
    //           id: p.id,
    //           name: p.name,
    //         }));
    //         setPages(mapped);
    //       } catch (err: any) {
    //         setError(err.message || "Failed to fetch pages");
    //       } finally {
    //         setLoading(false);
    //       }
    //     }
    //     fetchPages();
    //   }, []);

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
            <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        Pages Management
                    </h3>
                </div>
                <div className="flex items-center gap-3">
                    {/* <button
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
            onClick={() => navigate('/admin/pages/create')}
          >
            Add Page
          </button> */}
                </div>
            </div>
            {error ? (
                <div className="py-8 text-center text-red-500">{error}</div>
            ) : (
                <div className="max-w-full overflow-x-auto">
                    <Table>
                        <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                            <TableRow>
                                <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Page Name
                                </TableCell>
                                <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {pages.map((page) => (
                                <TableRow key={page.id}>
                                    <TableCell className="py-3">
                                        <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                            {page.name}
                                        </span>
                                    </TableCell>
                                    <TableCell className="py-3 text-theme-sm">
                                        <button
                                            className="text-blue-600 hover:underline mr-2"
                                            type="button"
                                            onClick={() => navigate(`/admin/pages/${page.name}/`)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="text-red-600 hover:underline"
                                            type="button"
                                            onClick={() => {
                                                const auth = getAuth();
                                                const token = auth?.access_token;
                                                if (
                                                    window.confirm(
                                                        `Are you sure you want to delete \"${page.name}\"?`
                                                    )
                                                ) {
                                                    apiRequest(
                                                        `/api/pages/${page.id}`,
                                                        "DELETE",
                                                        undefined,
                                                        false,
                                                        token
                                                    )
                                                        .then(() =>
                                                            setPages((prev) =>
                                                                prev.filter((p) => p.id !== page.id)
                                                            )
                                                        )
                                                        .catch((err: any) =>
                                                            alert(err.message || "Failed to delete page")
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
