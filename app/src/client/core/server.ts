import { HTTPError, HttpMethod } from "../../common/http"
import { JSONObject, JSONstring, JSONType } from "../../common/json"
import utils from "../../common/utils"

export interface FetchData {
    params?: {
        [key: string]: string | number | boolean
    }
    body?: JSONObject
    headers?: {
        [key: string]: string
    }
}

export async function fetchAPI(
    method: HttpMethod,
    endPoint: string,
    {
        params = {},
        body = undefined,
        headers = {},
    }: FetchData = {}
): Promise<Response> {
    let url = `/api${endPoint}`
    const sanitizedParams = utils.removeUndefinedKeys(params)
    if (Object.keys(sanitizedParams).length !== 0) {
        url += "?"

        for (const [key, val] of Object.entries(utils.removeUndefinedKeys(sanitizedParams))) {
            url += `${key}=${val}&`
        }

        // remove trailing ? if there are no params or & if there are
        url = url.slice(0, -1)
    }
    if (body !== undefined) {
        headers = {
            "Content-Type": "application/json",
            ...headers
        }
    }
    const res = await fetch(url, {
        method,
        headers,
        body: body !== undefined ? JSONstring(body) : undefined
    })
    if (res.ok) {
        return res
    }
    else {
        const error = HTTPError.fromJSON(await res.json())
        throw new Error(`Error fetching ${url}: ${error.status} ${error.message}`)
    }
}

export async function fetchJSON<T extends JSONType>(
    method: HttpMethod,
    endPoint: string,
    data: FetchData = {}
): Promise<T> {
    return await (await fetchAPI(method, endPoint, data)).json()
}
