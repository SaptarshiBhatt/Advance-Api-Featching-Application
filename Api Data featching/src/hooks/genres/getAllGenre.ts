import kyServer from "@/lib/ky";
import { GenreType } from "@/lib/types";
import { HTTPError } from "ky";

const getAllGenres = async () => {
    try {
        const data = await kyServer.get("genres/anime", {
            next: {
                tags: ['getAllGenres']
            }
        }).json<GenreType>();




        return {
            data: data.data,
            isError: false,
            error: null
        }
    } catch (error) {
        const httpError = error as HTTPError;
        const errorJson = await httpError.response.json<any>(); // eslint-disable-line

        return {
            data: null,
            isError: true,
            error: errorJson.errors[0].message,
        };
    }
}

export default getAllGenres;