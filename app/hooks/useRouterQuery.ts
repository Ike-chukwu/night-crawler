"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useCallback } from "react";

export const useRouterQuery = () => {
    const { replace, push } = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const changeQuery = useCallback(
        (key: string, value: string | undefined) => {
            const params = new URLSearchParams(searchParams.toString());

            if (value === undefined) params.delete(key);
            else params.set(key, value);
            replace(pathname + "?" + params.toString(), { scroll: false });
        },
        [pathname, replace, searchParams],
    );

    const changeQueries = useCallback(
        (queries: Record<string, any>) => {
            const newQuery = new URLSearchParams(searchParams.toString());

            for (const key in queries) {
                const value = queries[key];

                if (value === undefined) {
                    newQuery.delete(key);
                } else {
                    newQuery.set(key, value);
                }
            }
            replace(pathname + "?" + newQuery.toString());
        },
        [pathname, searchParams, replace],
    );

    const changeMultipleQueries = useCallback(
        (queries: Array<{ key: string; value?: string }>) => {
            const params = new URLSearchParams(searchParams.toString());

            for (let { key, value } of queries) {
                if (value === undefined) params.delete(key);
                else params.set(key, value);
            }
            replace(pathname + "?" + params.toString(), { scroll: false });
        },
        [pathname, replace, searchParams],
    );

    const getQuery = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        return params.get(value) as string;
    };

    const queries = useMemo(() => {
        const params = new URLSearchParams(searchParams.toString() ?? "");

        return Object.fromEntries(params) ?? undefined;
    }, [searchParams]);

    return {
        searchParams,
        changeQuery,
        changeMultipleQueries,
        push,
        replace,
        getQuery,
        changeQueries,
        queries,
    };
};
